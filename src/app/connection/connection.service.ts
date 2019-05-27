import {Request} from './request.model';
import {Response} from './response.model';
import {Questionnaire} from '../model/questionnaire.model';

import {Event, EventListener} from './event/event.model';
import {ConnectedEvent, DisconnectedEvent} from './event/connection.model';
import {
  QuestionnaireCreatedEvent,
  QuestionnaireDeletedEvent,
  QuestionnaireUpdatedEvent
} from './event/questionnaire.model';
import {QuestionCreatedEvent, QuestionDeletedEvent, QuestionUpdatedEvent} from "./event/question.model";
import {Question} from "../model/question.model";
import {Choice} from "../model/choice.model";
import {ChoiceCreatedEvent, ChoiceDeletedEvent, ChoiceUpdatedEvent} from "./event/choice.model";

export class Connection
{
	public static TOKEN_CHARS: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	public static SERVER_URL: string = 'smsvote.aeres.games:9999';

	private socket: WebSocket = null;
	private requests: Map<string, Request> = new Map();
	private listeners: EventListener[] = [];

	public init(token: string): void
	{
		var that = this;

		try
		{
			this.socket = new WebSocket("wss://" + Connection.SERVER_URL + '/?token=' + token);
		}
		catch(error)
		{
			console.error('An error occured while connecting to WebSocket');
			console.error(error);

			throw error;
		}

		this.socket.onerror = function(event: Event)
		{
			console.error('WebSocket error: ' + event);
			that.socket = null;
		}

		this.socket.onopen = function(event: Event)
		{
			that.emitEvent(new ConnectedEvent());
		}

		this.socket.onmessage = function(event: MessageEvent)
		{
			try
			{
				let data = JSON.parse(event.data);
            if(data.type === "response")
            {
              let response: Response = new Response(data.request, data.status, data.data);
              let request: Request = that.requests.get(response.getRequestId());

              if(request !== null)
              {
                request.setResponse(response);
                that.requests.delete(request.getId());
              }
            }
            else if(data.type === "event")
            {
                let event: Event = null;

                if(data.target === "questionnaire")
                {
                  if(data.action === "create")
                    event = new QuestionnaireCreatedEvent(Questionnaire.fromJSONObject(data.data));
                  else if (data.action === 'delete')
                    event = new QuestionnaireDeletedEvent(data.data._id);
                  else if (data.action === 'update')
                    event = new QuestionnaireUpdatedEvent(Questionnaire.fromJSONObject(data.data));
                }
                else  if(data.target === "question")
                {
                  if(data.action === "create")
                    event = new QuestionCreatedEvent(Question.fromJSONObject(data.data));
                  else if (data.action === 'delete')
                    event = new QuestionDeletedEvent(data.data._id);
                  else if (data.action === 'update')
                    event = new QuestionUpdatedEvent(Question.fromJSONObject(data.data));
                }
                else  if(data.target === "choice")
                {
                  if(data.action === "create")
                    event = new ChoiceCreatedEvent(Choice.fromJSONObject(data.data));
                  else if (data.action === 'delete')
                    event = new ChoiceDeletedEvent(data.data._id);
                  else if (data.action === 'update')
                    event = new ChoiceUpdatedEvent(Choice.fromJSONObject(data.data));
                }

                if(event !== null)
                    that.emitEvent(event);
            }
			}
			catch(error)
			{
				console.error(error);
			}
		}

		this.socket.onclose = function(event: CloseEvent)
		{
			that.emitEvent(new DisconnectedEvent());
			that.socket = null;
		}
	}

	public addListener(listener: EventListener): Connection
	{
		this.listeners.push(listener);
		return this;
	}

	public close()
	{
		this.socket.close();
		this.socket = null;

		this.requests = new Map();
		this.listeners = [];
	}

	public createRequest(target: string, action: string, data: object = {}): Request
	{
		let id: string;

		do {
			id = Connection.generateToken();
		}while(this.requests.has(id));

		let request: Request = new Request(id, target, action, data);
		return request;
	}

	public send(request: Request): void
	{
		this.requests.set(request.getId(), request);

		let data = request.toJSON();
		this.socket.send(JSON.stringify(data));
	}

	private emitEvent(event: Event): void
	{
		for(let listener of this.listeners)
			listener.handle(event);
	}

	public static generateToken(): string
	{
		let token: string = "";

		for(let i = 0; i < 16; ++i)
			token += Connection.TOKEN_CHARS.charAt(Math.floor(Math.random() * Connection.TOKEN_CHARS.length));

		return token;
	}
}

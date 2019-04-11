import {Response} from './response.model';

export class Request
{
	private id: string;
	private target: string;
	private action: string;
	private data: object;

	private listeners: ((response: Response) => void)[] = [];
	private response: Response = null;

	constructor(id: string, target: string, action: string, data: object = {})
	{
		this.id = id;
		this.target = target;
		this.action = action;
		this.data = data;
	}

	public setResponse(response: Response)
	{
		this.response = response;

		for(let listener of this.listeners)
			listener.call(this, response);
	}

	public onResponse(listener: (response: Response) => void)
	{
		this.listeners.push(listener);
	}

	public getId(): string
	{
		return this.id;
	}

	public toJSON(): object
	{
		return {
			type: 'request',
			id: this.id,
			target: this.target,
			action: this.action,
			data: this.data
		};
	}
}
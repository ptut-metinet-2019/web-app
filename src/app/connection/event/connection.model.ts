import {Event, EventListener} from './event.model';
import {User} from '../../model/user.model';

export class ConnectedEvent implements Event
{
	
}

export class DisconnectedEvent implements Event
{

}

export class ConnectionEventListener implements EventListener
{
	private onConnected: ((event: ConnectedEvent) => void);
	private onDisconnected: ((event: DisconnectedEvent) => void);

	constructor(onConnected: ((event: ConnectedEvent) => void), onDisconnected: ((event: DisconnectedEvent) => void))
	{
		this.onConnected = onConnected;
		this.onDisconnected = onDisconnected;
	}

	public handle(event: Event): void
	{
		if(event instanceof ConnectedEvent)
			this.onConnected.call(this, event);

		if(event instanceof DisconnectedEvent)
			this.onDisconnected.call(this, event);
	}
}
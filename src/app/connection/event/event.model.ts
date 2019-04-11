export interface Event
{
	
}

export interface EventListener
{
	handle(event: Event): void;
}
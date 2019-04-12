export class Response
{
	private requestId: string;
	private status: number;
	private data: object;

	constructor(requestId: string, status: number, data: object)
	{
		this.requestId = requestId;
		this.status = status;
		this.data = data;
	}

	public getRequestId(): string
	{
		return this.requestId;
	}

	public getStatus(): number
	{
		return this.status;
	}

	public getData(): any
	{
		return this.data;
	}
}
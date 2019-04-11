export class User
{
	private id: string;
	private email: string;
	private created: Date;

	constructor(id: string, email: string, created: Date)
	{
		this.id = id;
		this.email = email;
		this.created = created;
	}

	public getId(): string
	{
		return this.id;
	}

	public getEmail(): string
	{
		return this.email;
	}

	public getCreated(): Date
	{
		return this.created;
	}

	public static fromJSONObject(data: any): User
	{
		return new User(
            data._id,
            data.email,
            new Date(data.created)
        );
	}
}
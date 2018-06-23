export class User {

	constructor(id : number) {
		this.id = id;
	}

    id: number;
    username: string;
    password: string;
    games: any[];
    active: boolean;
    roleId: number;
}

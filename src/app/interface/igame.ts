import { User } from '../model/user';
import { IPlayer } from '../interface/iplayer';
import { Player } from '../model/player';

export interface IGame {

	id: number;
	startTime: Date;
	endTime: Date;
	type: string;
	paid: boolean;
	tableNumber: number;
	players: Player[];
	user: User;
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IPlayer } from '../interface/iplayer';
import { ConfigService } from '../service/config.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/Rx';
 
@Injectable()
export class PlayerService {  

  selectedPlayer : IPlayer;
  activePlayers : IPlayer[];
  removedPlayers: IPlayer[];

  constructor(private http: HttpClient, private config : ConfigService) { }

  getActivePlayers() {
	return this.http.get<IPlayer[]>(this.config.baseUrl + "player/active", {headers: this.config.authorizationHeader})
	.map(
		(result) => {
			return result;
		}
	).subscribe(
		(data) => {
			this.activePlayers = data;
		}
	)
  }


  getRemovedPlayers() {
  	return this.http.get<IPlayer[]>(this.config.baseUrl + "player/removed", {headers: this.config.authorizationHeader})
  		.map(
  			(response) => {
  				return response;
  			}
  		).subscribe(
  			(data) => {
  				this.removedPlayers = data;
  			}	
  		)
  }

  createPlayer(player : NgForm) {
  	return this.http.post<IPlayer>(this.config.baseUrl + "player/save", player.value, {headers: this.config.authorizationHeader})
  		.map(
  			(response) => {
  				return response;
  			}
  		)
  }

  deletePlayer(player : IPlayer) {
  	return this.http.get(this.config.baseUrl + "player/delete/" + player.id, {headers: this.config.authorizationHeader})
  	.map(
  		(response) => {
  			return response;
  		}
  	)
  }

  //function to retreive player from server and populate form fields
  edit(id : number) : Observable<IPlayer> {
  	return this.http.get<IPlayer>(this.config.baseUrl + "player/" + id, {headers: this.config.authorizationHeader})
  		.map(
  			(result) => {
  				return result;
  			}
  		)
  }

  //function to update player
  update(player : IPlayer) : Observable<IPlayer> {
  	return this.http.put<IPlayer>(this.config.baseUrl + "player/update/" + player.id, player, {headers: this.config.authorizationHeader});
  }

  enablePlayer(id : number) {
  	return this.http.get(this.config.baseUrl + "player/enable/" + id, {headers: this.config.authorizationHeader})
  		.map(
  			(response) => {
  				return response;
  			}
  		)
  }

  resetForm(form? : NgForm) {
    if(form != null) {
      form.reset();
    }
    this.selectedPlayer = {
      id: null,
      firstname: "",
      lastname: "",
      win: null,
      lost: null,
    }
  }

}

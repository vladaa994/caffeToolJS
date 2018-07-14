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
  errorMsg: string = "";

  constructor(private http: HttpClient, private config : ConfigService, private router: Router) { }

  getActivePlayers() {
	return this.http.get<IPlayer[]>(this.config.baseUrl + "/player/active", {headers: {'Authorization': localStorage.getItem("token")}})
	.subscribe(
		(data) => {
			this.activePlayers = data;
		},
    (error) => {
      if(error["error"]["status"] == 403){
         this.errorMsg = "You are not allowed to see this page!";
         setTimeout(() => {
            this.router.navigate(['/dashboard']);
         }, 3500);
      }
    }
	)
  }


  getRemovedPlayers() {
  	return this.http.get<IPlayer[]>(this.config.baseUrl + "/player/removed", {headers: {'Authorization': localStorage.getItem("token")}})
  		.subscribe(
  			(data) => {
  				this.removedPlayers = data;
  			}	
  		)
  }

  createPlayer(player : NgForm) {
  	return this.http.post<IPlayer>(this.config.baseUrl + "/player/save", player.value, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  deletePlayer(player : IPlayer) {
  	return this.http.get(this.config.baseUrl + "/player/delete/" + player.id, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  //function to retreive player from server and populate form fields
  edit(id : number) : Observable<IPlayer> {
    return this.http.get<IPlayer>(this.config.baseUrl + "/player/" + id, { headers: { 'Authorization': localStorage.getItem("token") } });
  }

  //function to update player
  update(player : IPlayer) : Observable<IPlayer> {
  	return this.http.put<IPlayer>(this.config.baseUrl + "/player/update/" + player.id, player, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  enablePlayer(id : number) {
  	return this.http.get(this.config.baseUrl + "/player/enable/" + id, {headers: {'Authorization': localStorage.getItem("token")}});
  }

  getPlayerById(id: number): Observable<IPlayer> {
    return this.http.get<IPlayer>(this.config.baseUrl + "/player/" + id, {headers: {'Authorization': localStorage.getItem("token")}});
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

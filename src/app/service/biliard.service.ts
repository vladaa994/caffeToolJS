import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../service/config.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { IGame } from '../interface/igame';
import { DatePipe } from '@angular/common';

@Injectable()
export class BiliardService {

  constructor(private router: Router, private config : ConfigService, private http: HttpClient, private datePipe : DatePipe) { }

  activeGames : IGame[];
  finishedGames : IGame[];
  errorMsg: string = "";
  page : number = 0;
  pages: Array<number>;

  getActiveGames() {
  	return this.http.get<IGame[]>(this.config.baseUrl + "/game/all/active", {headers: {"Authorization":localStorage.getItem("token")}})
  		.subscribe(
  			(result) => {
  				this.activeGames = result;
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

  getFinishedGames() {
    return this.http.get<IGame[]>(this.config.baseUrl + "/game/findall/" + this.page + "-" + 3, { headers: { "Authorization": localStorage.getItem("token") } })
  		.subscribe(
  			(result) => {
  				this.finishedGames = result["content"];
          this.pages = new Array(result["totalPages"]);
  			}
  		)
  }

  create(game : IGame) : Observable<IGame> {
  		return this.http.post<IGame>(this.config.baseUrl + "/game/save", game, {headers: {"Authorization":localStorage.getItem("token")}});
  }

  finishGame(id : number) : Observable<IGame> {
  	return this.http.get<IGame>(this.config.baseUrl + "/game/finish/" + id, {headers: {"Authorization":localStorage.getItem("token")}});
  }

  payGame(id : number, winnerId: number, lost: number) : Observable<IGame> {
  	return this.http.get<IGame>(this.config.baseUrl + "/game/pay/" + id + "/winner/" + winnerId + 
      "/lost/" + lost, {headers: {"Authorization":localStorage.getItem("token")}})
  }

}

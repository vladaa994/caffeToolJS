import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ConfigService {

  baseUrl: string = environment.API_URL;
  contentTypeHeader = new HttpHeaders({'Content-Type':'application/json'});
  authorizationHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : localStorage.getItem("token")});

  constructor() { }

  getBaseUrl() : string {
  	return this.baseUrl;
  }

  getToken() : string {
  	return localStorage.getItem("token");
  }

}

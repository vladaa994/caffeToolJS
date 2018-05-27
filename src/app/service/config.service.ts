import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {

  baseUrl: string = "http://localhost:8080/";
  contentTypeHeader = new HttpHeaders({'Content-Type':'application/json'});
  authorizationHeader = new HttpHeaders({'Content-Type': 'application/json', 'Authorization' : this.getToken()});

  constructor() { }

  getBaseUrl() : string {
  	return this.baseUrl;
  }

  getToken() : string {
  	return localStorage.getItem("token");
  }

}

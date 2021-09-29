import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  apiUrl= environment.baseUrl+"infos/"

  constructor(private httpClient:HttpClient) { }

  publishMessage(message:string):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"publish",message)
  }

  publishTurnOffLight(command:object):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"turnoff",command)
  }

  publishTurnOnLight(command:object):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"turnon",command)
  }
}

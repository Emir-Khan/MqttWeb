import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Temperature } from '../models/temperature';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private apiUrl=environment.baseUrl+"infos/"

  constructor(private httpClient:HttpClient) { }

  getTemperatureSettings():Observable<Temperature[]>{
    return this.httpClient.get<Temperature[]>(this.apiUrl+"gettempareture")
  }

}

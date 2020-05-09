import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import { Constants } from '../common/constant';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(
    private http: HttpClient
  ) { }

  getUserList(url: string, urlParams?: HttpParams): Observable<any>{
    return this.http.get(Constants.BASE_URL + url, {params: urlParams});
  }
}

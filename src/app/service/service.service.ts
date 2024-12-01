import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }

  IsLogin:boolean=false;
  isSideMenuCollapsed:boolean=false;
  onloadtable: BehaviorSubject<{ load: boolean ,gridData:any[],Page:string}> = 
  new BehaviorSubject<{load: boolean,gridData:any[],Page:string}>({ load: false , gridData:[] ,Page:'' });



  getSampleData(): Observable<any> {
    let url = ApiUrl.getSampleData();
    return this.http.get(url);
  }
  Login(userdata:any): Observable<any> {
    let url = ApiUrl.Login();
    return this.http.post<any>(url, userdata);
  }
}
export const ApiUrl ={
  getSampleData: () => `assets/json/sampledata.json`,
  Login: () => `api/login`,
}
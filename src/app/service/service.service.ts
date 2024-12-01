import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http: HttpClient) { }

  isSideMenuCollapsed:boolean=false;
  onloadtable: BehaviorSubject<{ load: boolean ,gridData:any[],Page:string}> = 
  new BehaviorSubject<{load: boolean,gridData:any[],Page:string}>({ load: false , gridData:[] ,Page:'' });



  getSampleData(): Observable<any> {
    let url = ApiUrl.getSampleData();
    return this.http.get(url);
  }
}
export const ApiUrl ={
  getSampleData: () => `assets/json/sampledata.json`,
}
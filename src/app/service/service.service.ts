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
  onloadtable: BehaviorSubject<{ load: boolean ,gridData:any[],Page:string,totalCount?:number}> = 
  new BehaviorSubject<{load: boolean,gridData:any[],Page:string,totalCount?:number}>({ load: false , gridData:[] ,Page:'',totalCount:0 });


  baseUrl:string='https://b36b-60-243-2-240.ngrok-free.app/'

  getZatacInvoices(criteria?:any): Observable<any> {
    let url = ApiUrl.getZatacInvoices();
    let query:any={};
    if(criteria && criteria.Pagging.PageNo && criteria.Pagging.PageSize){
    query["$page"] = criteria.Pagging.PageNo;
    query["$pageSize"] = criteria.Pagging.PageSize;
    }
    return this.http.get(this.baseUrl + url,{params:{ ...query }});
  }
  getInwardReq(criteria?:any): Observable<any> {
    let url = ApiUrl.getInwardReq();
    let query:any={};
    if(criteria && criteria.Pagging.PageNo && criteria.Pagging.PageSize){
    query["$page"] = criteria.Pagging.PageNo;
    query["$pageSize"] = criteria.Pagging.PageSize;
    }
    return this.http.get(this.baseUrl + url,{params:{ ...query }});
  }
  getOutwardReq(criteria?:any): Observable<any> {
    let url = ApiUrl.getOutwardReq();
    let query:any={};
    if(criteria && criteria.Pagging.PageNo && criteria.Pagging.PageSize){
    query["$page"] = criteria.Pagging.PageNo;
    query["$pageSize"] = criteria.Pagging.PageSize;
    }
    return this.http.get(this.baseUrl + url,{params:{ ...query }});
  }
  getCustomers(criteria?:any): Observable<any> {
    let url = ApiUrl.getCustomers();
    let query:any={};
    if(criteria && criteria.Pagging.PageNo && criteria.Pagging.PageSize){
    query["$page"] = criteria.Pagging.PageNo;
    query["$pageSize"] = criteria.Pagging.PageSize;
    }
    return this.http.get(this.baseUrl + url,{params:{ ...query }});
  }
  getItems(criteria?:any): Observable<any> {
    let url = ApiUrl.getItems();
    let query:any={};
    if(criteria && criteria.Pagging.PageNo && criteria.Pagging.PageSize){
    query["$page"] = criteria.Pagging.PageNo;
    query["$pageSize"] = criteria.Pagging.PageSize;
    }
    return this.http.get(this.baseUrl + url,{params:{ ...query }});
  }
  getSegmentInvoice(criteria?:any): Observable<any> {
    let url = ApiUrl.getSegmentInvoice();
    let query:any={};
    if(criteria && criteria.Pagging.PageNo && criteria.Pagging.PageSize){
    query["$page"] = criteria.Pagging.PageNo;
    query["$pageSize"] = criteria.Pagging.PageSize;
    }
    return this.http.get(this.baseUrl + url,{params:{ ...query }});
  }
  putCustomer(accountId:any,cusdata:any): Observable<any> {
    let url = ApiUrl.putCustomer(accountId);
    return this.http.put<any>(this.baseUrl + url, cusdata);
  }
  putItems(itemdata:any): Observable<any> {
    let url = ApiUrl.putItems();
    return this.http.put<any>(this.baseUrl + url, itemdata);
  }
  Login(userdata:any): Observable<any> {
    let url = ApiUrl.Login();
    return this.http.post<any>(this.baseUrl + url, userdata);
  }
  Register(userdata:any): Observable<any> {
    let url = ApiUrl.Register();
    return this.http.post<any>(this.baseUrl + url, userdata);
  }
  getSampleData(): Observable<any> {
    let url = ApiUrl.getSampleData();
    return this.http.get(url);
  }
}
export const ApiUrl ={
  getZatacInvoices: () => `api/v1/ZatcaInvoice`,
  getInwardReq: () => `api/v1/ZatcaInvoice/InwardRequests`,
  getOutwardReq: () => `api/v1/ZatcaInvoice/OutwardRequests`,
  getCustomers: () => `api/v1/Segments/Customers`,
  putCustomer: (accountId:any) => `api/v1/Segments/Customers/${accountId}`,
  getItems: () => `api/v1/Segments/Items`,
  putItems: () => `api/v1/Segments/Items`,
  getSegmentInvoice: () => `api/v1/Segments/Invoices`,
  Login: () => `api/v1/Auth/Login`,
  Register: () => `api/v1/Auth/Register`,
  getSampleData: () => `assets/json/sampledata.json`,

}
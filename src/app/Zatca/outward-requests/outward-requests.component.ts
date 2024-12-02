import { Component } from '@angular/core';
import { Service } from '../../service/service.service';
import { CommonTableComponent } from "../../common-table/common-table.component";

@Component({
  selector: 'OutwardRequests',
  standalone: true,
  imports: [CommonTableComponent],
  templateUrl: './outward-requests.component.html',
  styleUrl: './outward-requests.component.scss'
})
export class OutwardRequestsComponent {
  constructor(private Service:Service){}
  ngOnInit(): void {
    // this.getInvoices();
  }
  Data:any[]=[]
  fieldsList:any[] = [
    {Field:"RecId",Name:"Rec Id"},
    {Field:"EGSUnitId",Name:"EGS Unit Id"},
    {Field:"EventId",Name:"Event Id"},
    {Field:"Payload",Name:"Payload"},
    {Field:"Status",Name:"Status"},
    {Field:"Comments",Name:"Comments"},
  ];
  Searchcriteria: any = {
    Pagging: {
      PageNo: 1,
      PageSize: 10,
    },
    Where: [],
    SortOrder: null,
  };
  getOutwardReq(criteria?:any) {
    if(criteria){
      this.Searchcriteria = criteria
    }
    this.Service.getOutwardReq(this.Searchcriteria).subscribe((res) => {
        this.Data = res.data;
        this.Service.onloadtable.next({load:true,gridData:this.Data,Page:'OutwardRequests'});
    },
      (error) => {
        throw new Error(error);
      });
  }
}

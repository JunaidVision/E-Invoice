import { Component } from '@angular/core';
import { CommonTableComponent } from "../../common-table/common-table.component";
import { Service } from '../../service/service.service';

@Component({
  selector: 'InwardRequests',
  standalone: true,
  imports: [CommonTableComponent],
  templateUrl: './inward-requests.component.html',
  styleUrl: './inward-requests.component.scss'
})
export class InwardRequestsComponent {
  constructor(private Service:Service){}
  ngOnInit(): void {
    // this.getInvoices();
  }
  Data:any[]=[]
  fieldsList:any[] = [
    {Field:"RecId",Name:"Rec Id"},
    {Field:"EGSUnitId",Name:"EGS Unit Id"},
    {Field:"EventId",Name:"Event Id"},
    {Field:"InvoiceNumber",Name:"Invoice Number"},
    {Field:"TryCount",Name:"TryCount"},
    {Field:"Payload",Name:"Payload"},
    {Field:"Status",Name:"Status"},
    {Field:"UUID",Name:"UUID"},
    {Field:"ICV",Name:"ICV"},
    {Field:"InvoiceHash",Name:"InvoiceHash"},
    {Field:"OriginalICV",Name:"Original ICV"},
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
  getInwardReq(criteria?:any) {
        if(criteria){
      this.Searchcriteria = criteria
    }
    this.Service.getInwardReq(this.Searchcriteria).subscribe((res) => {
        this.Data = res.data;
        this.Service.onloadtable.next({load:true,gridData:this.Data,Page:'InwardRequests'});

    },
      (error) => {
        throw new Error(error);
      });
  }
}

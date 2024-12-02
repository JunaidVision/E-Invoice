import { Component } from '@angular/core';
import { CommonTableComponent } from "../../common-table/common-table.component";
import { Service } from '../../service/service.service';

@Component({
  selector: 'Segment-Invoices',
  standalone: true,
  imports: [CommonTableComponent],
  templateUrl: './segment-invoices.component.html',
  styleUrl: './segment-invoices.component.scss'
})
export class SegmentInvoicesComponent {
  constructor(private Service:Service){}
  ngOnInit(): void {
    // this.getInvoices();
  }
  Data:any[]=[]
  fieldsList:any[] = [
    {Field:"customerID",Name:"Customer ID"},
    {Field:"customerVATNumber",Name:"Customer VAT No"},
    {Field:"documentType",Name:"Document Type"},
    {Field:"invoiceNumber",Name:"Invoice Number"},
    {Field:"issuedDateTime",Name:"Issued DateTime"},
    {Field:"actualDeliveryDate",Name:"Delivery Date"},
    {Field:"documentCurrencyCode",Name:"Currency Code"},
    {Field:"discountAmount",Name:"Discount Amount"},
  ];
  Searchcriteria: any = {
    Pagging: {
      PageNo: 1,
      PageSize: 10,
    },
    Where: [],
    SortOrder: null,
  };
  getSegmentInvoice(criteria?:any) {
    if(criteria){
      this.Searchcriteria = criteria
    }
    this.Service.getSegmentInvoice(this.Searchcriteria).subscribe((res) => {
        this.Data = res.data;
        this.Service.onloadtable.next({load:true,gridData:this.Data,Page:'SegmentInvoice'});
    },
      (error) => {
        throw new Error(error);
      });
  }
  EditCustomers(data:any){
    console.log(data);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonTableComponent } from "../common-table/common-table.component";
import { Service } from '../service/service.service';

@Component({
  selector: 'ZatcaInvoices',
  standalone: true,
  imports: [CommonTableComponent],
  templateUrl: './zatca-invoices.component.html',
  styleUrl: './zatca-invoices.component.scss'
})
export class ZatcaInvoicesComponent implements OnInit{
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
    {Field:"BillingReference",Name:"Billing Reference"},
    {Field:"Payload",Name:"Payload"},
    {Field:"Status",Name:"Status"},
    {Field:"UUID",Name:"UUID"},
    {Field:"ICV",Name:"ICV"},
    {Field:"PreviousInvoiceHash",Name:"Previous InvoiceHash"},
    {Field:"QR",Name:"QR"},
    {Field:"Comments",Name:"Comments"},
  ];

  getInvoices() {
    this.Service.getSampleData().subscribe((res) => {
        this.Data = res.ZatcaInvoices;
        this.Service.onloadtable.next({load:true,gridData:this.Data,Page:'ZatcaInvoices'});
    },
      (error) => {
        throw new Error(error);
      });
  }
  EditInvoices(data:any){
    console.log(data);
  }
}

import { Component } from '@angular/core';
import { CommonTableComponent } from "../../common-table/common-table.component";
import { Service } from '../../service/service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'Segment-Customers',
  standalone: true,
  imports: [CommonTableComponent,CommonModule,FormsModule],
  templateUrl: './segment-customers.component.html',
  styleUrl: './segment-customers.component.scss'
})
export class SegmentCustomersComponent {
  constructor(private Service:Service,private toaster:ToastrService){}
  ngOnInit(): void {
    // this.getInvoices();
    this.editdata = {
      customerType: null,
      streetName: null,
      additionalStreetName: null,
      buildingNumber: null,
      plotIdentification: null,
      citySubdivisionName: null,
      cityName: null,
      postalZone: null,
      countrySubentity: null,
      country: null
    };
  }
  Data:any[]=[]
  fieldsList: any[] = [
    {
        "Field": "accountId",
        "Name": "Account Id"
    },
    {
        "Field": "aShortName",
        "Name": "aShortName"
    },
    {
        "Field": "lShortName",
        "Name": "lShortName"
    },
    {
        "Field": "aName",
        "Name": "aName"
    },
    {
        "Field": "lName",
        "Name": "lName"
    },
    {
        "Field": "aAddress",
        "Name": "aAddress"
    },
    {
        "Field": "lAddress",
        "Name": "lAddress"
    },
    {
        "Field": "isTaxFree",
        "Name": "isTaxFree"
    },
    {
        "Field": "customerCountry",
        "Name": "customerCountry"
    },
    {
        "Field": "customerInfo",
        "Name": "customerInfo"
    }, 
     {
      "Field": "customerType",
      "Name": "customerType"
  },
  {
      "Field": "streetName",
      "Name": "streetName"
  },
  {
      "Field": "additionalStreetName",
      "Name": "additionalStreetName"
  },
  {
      "Field": "buildingNumber",
      "Name": "buildingNumber"
  },
  {
      "Field": "plotIdentification",
      "Name": "plotIdentification"
  },
  {
      "Field": "citySubdivisionName",
      "Name": "citySubdivisionName"
  },
  {
      "Field": "cityName",
      "Name": "cityName"
  },
  {
      "Field": "postalZone",
      "Name": "postalZone"
  },
  {
      "Field": "countrySubentity",
      "Name": "countrySubentity"
  },
  {
      "Field": "country",
      "Name": "country"
  }
];
editField:any[]=[
  {
    "Field": "customerType",
    "Name": "customerType"
},
{
    "Field": "streetName",
    "Name": "streetName"
},
{
    "Field": "additionalStreetName",
    "Name": "additionalStreetName"
},
{
    "Field": "buildingNumber",
    "Name": "buildingNumber"
},
{
    "Field": "plotIdentification",
    "Name": "plotIdentification"
},
{
    "Field": "citySubdivisionName",
    "Name": "citySubdivisionName"
},
{
    "Field": "cityName",
    "Name": "cityName"
},
{
    "Field": "postalZone",
    "Name": "postalZone"
},
{
    "Field": "countrySubentity",
    "Name": "countrySubentity"
},
{
    "Field": "country",
    "Name": "country"
}
]
  Searchcriteria: any = {
    Pagging: {
      PageNo: 1,
      PageSize: 10,
    },
    Where: [],
    SortOrder: null,
  };
  getCustomers(criteria?:any) {
    if(criteria){
      this.Searchcriteria = criteria
    }
    this.Service.getCustomers(this.Searchcriteria).subscribe((res) => {
        this.Data = res.data;
        this.fieldsList =[];

        this.Service.onloadtable.next({load:true,gridData:this.Data,Page:'SegmentCustomers'});
    },
      (error) => {
        throw new Error(error);
      });
  }
  Isedit:boolean=false;
  editdata:any=null;
  EditCustomer(data:any){
    this.editdata = {
      customerType: data.customerType,
      streetName: data.streetName,
      additionalStreetName: data.additionalStreetName,
      buildingNumber: data.buildingNumber,
      plotIdentification: data.plotIdentification,
      citySubdivisionName: data.citySubdivisionName,
      cityName: data.cityName,
      postalZone: data.postalZone,
      countrySubentity: data.countrySubentity,
      country: data.country
    };
    this.Isedit = true;
    this.editdata = data.accountId;
  }
  Close(){
    this.Isedit = false;
    this.editdata = null;
  }
  UpdateCustomer(){
    console.log(this.editdata)
    let UpdateData={
      customerType: this.editdata.customerType,
      streetName: this.editdata.streetName,
      additionalStreetName: this.editdata.additionalStreetName,
      buildingNumber: this.editdata.buildingNumber,
      plotIdentification: this.editdata.plotIdentification,
      citySubdivisionName: this.editdata.citySubdivisionName,
      cityName: this.editdata.cityName,
      postalZone: this.editdata.postalZone,
      countrySubentity: this.editdata.countrySubentity,
      country: this.editdata.country
    }
    this.Service.putCustomer(this.editdata.accountId,UpdateData).subscribe((res) => {
      this.toaster.success('AccoundId :'+this.editdata.accountId,'Customer Updated')
      this.getCustomers();
  },
    (error) => {
      throw new Error(error);
    });
  }
}

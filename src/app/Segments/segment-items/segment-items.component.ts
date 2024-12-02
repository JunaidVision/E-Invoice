import { Component } from '@angular/core';
import { CommonTableComponent } from "../../common-table/common-table.component";
import { Service } from '../../service/service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'Segment-Items',
  standalone: true,
  imports: [CommonTableComponent,CommonModule,FormsModule],
  templateUrl: './segment-items.component.html',
  styleUrl: './segment-items.component.scss'
})
export class SegmentItemsComponent {
  constructor(private Service:Service,private toaster:ToastrService){}
  ngOnInit(): void {
    // this.getInvoices();
  }
  Data:any[]=[]
  fieldsList:any[] = [
    {Field:"itemId",Name:"Item Id"},
    {Field:"aShortName",Name:"Arabic Name"},
    {Field:"itemGroupID",Name:"Item Group ID"},
    {Field:"discountedPrice",Name:"Discounted Price"},
    {Field:"taxFree",Name:"Tax Free"},
    {Field:"taxCategory",Name:"Tax Category"},
  ];
  Searchcriteria: any = {
    Pagging: {
      PageNo: 1,
      PageSize: 10,
    },
    Where: [],
    SortOrder: null,
  };
  getItems(criteria?:any) {
    if(criteria){
      this.Searchcriteria = criteria
    }
    this.Service.getItems(this.Searchcriteria).subscribe((res) => {
        this.Data = res.data;
        this.Service.onloadtable.next({load:true,gridData:this.Data,Page:'SegmentItems'});
    },
      (error) => {
        throw new Error(error);
      });
  }
  Isedit:boolean=false;
  editdata:any=null;
  EditItems(data:any){
    this.editdata = data;
    this.Isedit = true;
  }
  Close(){
    this.Isedit = false;
    this.editdata = null;
  }
  UpdateItem(){
    let UpdateData={
      itemId :this.editdata.itemId,
      taxCategory: this.editdata.taxCategory
    }
    this.Service.putItems(UpdateData).subscribe((res) => {
      this.toaster.success('ItemId :'+UpdateData.itemId,'Item Updated')
      this.getItems();
  },
    (error) => {
      throw new Error(error);
    });
  }
}

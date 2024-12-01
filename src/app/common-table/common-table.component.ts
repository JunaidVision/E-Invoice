import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationPipe } from './pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../service/service.service';

@Component({
  selector: 'common-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PaginationPipe , NgbModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent implements OnInit{
  constructor(private Service:Service){}
  ngOnInit(): void {
    this.Service.onloadtable.subscribe((x) => {
      if (x && x.Page != '') {
        if (x.Page === this.gridId) {
          this.gridData = x.gridData;
          this.getPageCount();
        } else return;
      }
    });
    this._getPaginationListData(this.pageNo,this.pageSize);
  }

  pageCount :number = 0;
  pageNo: number = 1;
  pageSize: number = 10;
  Type:any;
  @Input() gridId:string='';
  @Input() Title:any;
  @Input() fields:any[]=[];
  @Input() gridData:any[]=[];
  @Input() isDelete:boolean=false;
  @Input() isEdit:boolean=false;
  @Input() isCreate:boolean=false;
  @Output() getPageList = new EventEmitter<{ Criteria: any }>();
  @Output() opencreate = new EventEmitter<any>();
  @Output() deleteMethod = new EventEmitter<{ data: any }>();
  @Output() editmethod = new EventEmitter<{ data: any }>();
  @Output() gotodetails = new EventEmitter<{ data: any }>();
  @Output() permission = new EventEmitter<{ data: any }>();

  _getPaginationListData(pageNo:any , pageSize?:any) {
    
    this.pageNo = pageNo;
    if (pageSize){
    this.pageSize = pageSize;
    }
    this._getPageList();
    this.getPageCount();
  }

  Searchcriteria: any = {
    Pagging: {
      PageNo: this.pageNo,
      PageSize: this.pageSize,
    },
    Where: [],
    SortOrder: null,
  };

  _getPageList() {
    this.getPageList.emit({ Criteria: this.Searchcriteria });
  };
  
  getPageCount() {
    this.pageCount = Math.ceil(this.gridData.length / this.pageSize);
  }


  itemsPerPageChanged(pageSize:number): void {
    this.pageNo = 1; // Reset current page to 1
    this.pageSize = pageSize
    this._getPaginationListData(this.pageNo,this.pageSize);
  }
  Create(){
    this.opencreate.emit();
  }
  nowDelete:boolean=false;
  checkDelete() { 
    this.nowDelete = true;
  }
  
    _deleteMethod(data:any) {
      this.nowDelete = false;
      this.deleteMethod.emit({ data: data })
    }

    editData(data:any){
      this.editmethod.emit({data:data});
    }
    gotoDetails(data:any){
      this.gotodetails.emit({data:data});
    }
    showqr:boolean=false;
    QRdata:any=null;
    showQr(data:any){
      this.QRdata = data;
      this.showqr= true;
    }
    closeqr(){
      this.showqr= false;
      this.QRdata = null;
    }

    counter(i:number){
      let Array:number[]=[]
      if(i > 1){
        Array.push(i-1)
      }
      Array.push(i)
      if(i<this.pageCount){
        Array.push(i+1)
      }
      return Array;
    }
}

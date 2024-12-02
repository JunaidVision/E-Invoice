import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../service/service.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'common-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,NgxPaginationModule, NgbModule],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss'
})
export class CommonTableComponent implements OnInit {
  constructor(private Service: Service) { }
  ngOnInit(): void {
    this.Service.onloadtable.subscribe((x) => {
      if (x && x.Page != '') {
        if (x.Page === this.gridId) {
          this.gridData = x.gridData;
          this.tempGridData = x.gridData;
          this.tempFiltergridData = x.gridData;
          if (x.totalCount) {
            this.totalRecordCount = x.totalCount
          } else {
            this.totalRecordCount = this.gridData.length
          }
          this.getPageCount();
        } else return;
      }
    });
    this.totalRecordCount = this.gridData.length;
    this._getPaginationListData(this.pageNo, this.pageSize);
  }
  totalRecordCount: number = 0;
  pageCount: number = 0;
  pageNo: number = 1;
  pageSize: number = 10;
  Type: any;
  @Input() gridId: string = '';
  @Input() Title: any;
  @Input() fields: any[] = [];
  @Input() gridData: any[] = [];
  @Input() isDelete: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() isCreate: boolean = false;
  @Output() getPageList = new EventEmitter<{ Criteria: any }>();
  @Output() opencreate = new EventEmitter<any>();
  @Output() deleteMethod = new EventEmitter<{ data: any }>();
  @Output() editmethod = new EventEmitter<{ data: any }>();
  @Output() gotodetails = new EventEmitter<{ data: any }>();
  @Output() permission = new EventEmitter<{ data: any }>();

  _getPaginationListData(pageNo: any, pageSize?: any) {

    this.pageNo = pageNo;
    this.Searchcriteria.Pagging.PageNo = pageNo;
    if (pageSize) {
      this.pageSize = pageSize;
      this.Searchcriteria.Pagging.PageSize = pageSize;
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
    this.pageCount = Math.ceil(this.totalRecordCount / this.pageSize);
  }


  itemsPerPageChanged(pageSize: number): void {
    this.pageNo = 1; // Reset current page to 1
    this.pageSize = pageSize
    this._getPaginationListData(this.pageNo, this.pageSize);
  }
  Create() {
    this.opencreate.emit();
  }
  nowDelete: boolean = false;
  checkDelete() {
    this.nowDelete = true;
  }

  _deleteMethod(data: any) {
    this.nowDelete = false;
    this.deleteMethod.emit({ data: data })
  }

  editData(data: any) {
    this.editmethod.emit({ data: data });
  }
  gotoDetails(data: any) {
    this.gotodetails.emit({ data: data });
  }
  showqr: boolean = false;
  QRdata: any = null;
  showQr(data: any) {
    this.QRdata = data;
    this.showqr = true;
  }
  closeqr() {
    this.showqr = false;
    this.QRdata = null;
  }

  counter(i: number) {
    let Array: number[] = []
    if (i > 1) {
      Array.push(i - 1)
    }
    Array.push(i)
    if (i < this.pageCount) {
      Array.push(i + 1)
    }
    return Array;
  }
  isFilter: boolean = false;
  toggleFilter() {
    this.isFilter = !this.isFilter;
  }
  tempGridData: any;
  GridFilter: any = {};
  tempFiltergridData: any[] = [];

  getGridSearch(event?: any) {
    if (event?.keyCode == 13) {
      this.tempFiltergridData = this.tempGridData;
      if (this.GridFilter)
        for (let key in this.GridFilter) {
          this.tempFiltergridData = this.tempFiltergridData.filter((x) => {
            if (x[key] && (x[key]).toString().toLowerCase().indexOf((this.GridFilter[key].trim()).toLowerCase()) > -1) {
              return x;
            }
          });
        }
      this.gridData = this.tempFiltergridData;
      this.totalRecordCount = this.tempFiltergridData.length;
      this.getPageCount()
    }
  }
  clearFilter(field: any) {
    if (field) this.GridFilter[field] = null;

    this._getPageList();
  }
  SortingField = { field: '', direction: '' };


  _getGridsorting(event: any) {
    if (this.SortingField.direction == '0')
      this.SortingField.direction = '1';
    else this.SortingField.direction = '0';

    this.SortingField.field = event;

    if (this.isFilter) this.getGridSearch();

    if (this.SortingField.direction == '1') {
      this.gridData = this.tempFiltergridData.sort((a, b) => {
        if (a[this.SortingField.field] < b[this.SortingField.field]) return -1;
        else if (a[this.SortingField.field] > b[this.SortingField.field]) return 1;
        else return 0;
      })
    }

    else if (this.SortingField.direction == '0') {
      this.gridData = this.tempFiltergridData.sort((a, b) => {
        if (a[this.SortingField.field] > b[this.SortingField.field]) return -1;
        else if (a[this.SortingField.field] < b[this.SortingField.field]) return 1;
        else return 0;
      })
    }
  }
}

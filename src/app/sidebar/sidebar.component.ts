import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../service/service.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    isparent:boolean;
    child?:any[];
    isActive?:boolean;
    init?:boolean
}
export const ROUTES: RouteInfo[] = [
    { path:'', title: 'Zatca',  icon: 'fas fa-angle-down', class: '' ,isparent:true ,init:true,child:[
      { path: '/ZatcaInvoices', title: 'Invoices',  icon: 'ni ni-paper-diploma text-orange', class: '' ,isparent:false},
      { path: '/InwardRequests', title: 'Inward Requests',  icon:'ni ni-paper-diploma text-blue', class: '' ,isparent:false},
      { path: '/OutwardRequests', title: 'Outward Requests',  icon:'ni ni-paper-diploma text-info', class: '' ,isparent:false},
    ]},
    { path:'', title: 'Segment',  icon: 'fas fa-angle-down', class: '' ,isparent:true , init:true ,child:[
      { path: '/SegmentInvoices', title: 'Invoices',  icon: 'ni ni-paper-diploma text-orange', class: '' ,isparent:false},
      { path: '/SegmentItems', title: 'Items',  icon:'fas fa-clipboard-list text-purple', class: '' ,isparent:false},
      { path: '/SegmentCustomers', title: 'Customers',  icon:'fas fa-users text-red', class: '' ,isparent:false},
    ]},
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgbModule,RouterLink,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[]=[];

  constructor(public router: Router,public service:Service) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if(this.menuItems.length>0){
          this.menuItems.map(x => {
            if(x.isparent && x?.child?.length>0){
              x.child.map((cx:any) => {
                if(event.url.includes(cx.path)){
                  cx.isActive = true;
                  x.isActive = true;
                }else{
                  cx.isActive = false;
                }
                return cx;
              })
              if(!(x.child.find((cx:any) => cx.isActive == true))){
                x.isActive = false;
              }
            }else{
              if(x.path != '' && event.url.includes(x.path)){
                x.isActive = true;
              }else{
                x.isActive = false;
              }
            }
            return x;
          })
        }
      }
    })
  }

  ngOnInit() {
    ROUTES.map(x => x.init = true);
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.service.isSideMenuCollapsed = true;
   });
   if(this.menuItems.length>0){
    this.menuItems.map(x => {
      if(x.isparent && x?.child?.length>0){
        x.child.map((cx:any) => {
          if(this.router.url.includes(cx.path)){
            cx.isActive = true;
            x.isActive = true;
          }else{
            cx.isActive = false;
          }
          return cx;
        })
        if(!(x.child.find((cx:any) => cx.isActive == true))){
          x.isActive = false;
        }
      }else{
        if(x.path != '' && this.router.url.includes(x.path)){
          x.isActive = true;
        }else{
          x.isActive = false;
        }
      }
      return x;
    })
  }
  }
}

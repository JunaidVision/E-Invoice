import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Service } from '../service/service.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/ZatcaInvoices', title: 'Zatca Invoices',  icon: 'ni-paper-diploma text-orange', class: '' },
    { path: '/InwardRequests', title: 'Inward Requests',  icon:'ni-paper-diploma text-blue', class: '' },
    { path: '/OutwardRequests', title: 'Outward Requests',  icon:'ni-paper-diploma text-info', class: '' },
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

  constructor(private router: Router,public service:Service) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.service.isSideMenuCollapsed = true;
   });
  }
}

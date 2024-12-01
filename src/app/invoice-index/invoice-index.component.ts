import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { Service } from '../service/service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-index',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent,RouterOutlet,CommonModule],
  templateUrl: './invoice-index.component.html',
  styleUrl: './invoice-index.component.scss'
})
export class InvoiceIndexComponent implements OnInit{
constructor(public service:Service){}
  ngOnInit(): void {
    this.service.isSideMenuCollapsed = true;
  }
}

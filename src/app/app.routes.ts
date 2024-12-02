import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ZatcaInvoicesComponent } from './Zatca/zatca-invoices/zatca-invoices.component';
import { InwardRequestsComponent } from './Zatca/inward-requests/inward-requests.component';
import { InvoiceIndexComponent } from './invoice-index/invoice-index.component';
import { OutwardRequestsComponent } from './Zatca/outward-requests/outward-requests.component';
import { SegmentInvoicesComponent } from './Segments/segment-invoices/segment-invoices.component';
import { SegmentItemsComponent } from './Segments/segment-items/segment-items.component';
import { SegmentCustomersComponent } from './Segments/segment-customers/segment-customers.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: InvoiceIndexComponent ,
        children: [
            {path: 'ZatcaInvoices',component:ZatcaInvoicesComponent},
            {path: 'InwardRequests',component:InwardRequestsComponent},
            {path: 'OutwardRequests',component:OutwardRequestsComponent},
            {path: 'SegmentInvoices',component:SegmentInvoicesComponent},
            {path: 'SegmentItems',component:SegmentItemsComponent},
            {path: 'SegmentCustomers',component:SegmentCustomersComponent},
        ]
    },
];

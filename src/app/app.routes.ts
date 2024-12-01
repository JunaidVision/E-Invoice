import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ZatcaInvoicesComponent } from './zatca-invoices/zatca-invoices.component';
import { InwardRequestsComponent } from './inward-requests/inward-requests.component';
import { InvoiceIndexComponent } from './invoice-index/invoice-index.component';
import { OutwardRequestsComponent } from './outward-requests/outward-requests.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: InvoiceIndexComponent ,
        children: [
            {path: 'ZatcaInvoices',component:ZatcaInvoicesComponent},
            {path: 'InwardRequests',component:InwardRequestsComponent},
            {path: 'OutwardRequests',component:OutwardRequestsComponent},
        ]
    },
];

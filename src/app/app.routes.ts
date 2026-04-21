import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EventComponent } from './event-component/event-component';
import { PaymentComponent } from './payment-component/payment-component';
import { Admin } from './pages/admin/admin';
import { AdminTickets } from './pages/admin/admin-tickets/admin-tickets';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: EventComponent },
    { path: 'payments', component: PaymentComponent },
    { path: 'admin', component: Admin },
    { path: 'admin-tickets', component: AdminTickets },
    { path: '**', redirectTo: 'home' },
];
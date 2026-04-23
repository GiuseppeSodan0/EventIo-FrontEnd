import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EventComponent } from './event-component/event-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from '../register-component/register-component';
import { UserAreaComponent } from './user-area-component/user-area-component';
import { PaymentComponent } from './payment-component/payment-component';
import { AdminComponent } from './admin-component/admin-component';
import { AdminTicketsComponent } from './admin-tickets-component/admin-tickets-component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: EventComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-area', component: UserAreaComponent },
    { path: 'payments', component: PaymentComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin-tickets', component: AdminTicketsComponent },
    { path: '**', redirectTo: 'home' }
];
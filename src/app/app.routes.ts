import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EventComponent } from './event-component/event-component';
import { PaymentComponent } from './payment-component/payment-component';
import { RegisterComponent } from '../register-component/register-component';
import { LoginComponent } from './login-component/login-component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path: 'register',component: RegisterComponent},
    { path: 'events', component: EventComponent },
    { path: 'payments', component: PaymentComponent },
    { path: 'login', component:LoginComponent},
    { path: '**', redirectTo: 'home' },
];

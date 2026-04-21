import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EventComponent } from './event-component/event-component';
import { PaymentComponent } from './payment-component/payment-component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path: 'register',component: RegisterComponent},
    { path: 'events', component: EventComponent },
    { path: 'payments', component: PaymentComponent },
    { path: '**', redirectTo: 'home' },
];

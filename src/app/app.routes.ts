import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EventComponent } from './event-component/event-component';
import { PaymentComponent } from './payment-component/payment-component';
import { LoginComponent } from './login-component/login-component';
import { UserAreaComponent } from './user-area/user-area';
import { AdminComponent} from './admin-component/admin-component';
import { RegisterComponent } from '../register-component/register-component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    {path: 'register',component: RegisterComponent},
    { path: 'events', component: EventComponent },
    { path: 'payments', component: PaymentComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user-area', component: UserAreaComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin-events', component: EventComponent },
    { path: '**', redirectTo: 'home' },
];
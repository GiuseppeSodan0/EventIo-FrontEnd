import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EventComponent } from './event-component/event-component';
import { LoginComponent } from './login-component/login-component';
import { RegisterComponent } from '../register-component/register-component';
import { UserAreaComponent } from './user-area-component/user-area-component';
import { PaymentComponent } from './payment-component/payment-component';
import { AdminComponent} from './admin-component/admin-component';
import { AuthGuard } from './guards/auth-guard';
import { ResetPasswordComponent } from './reset-password-component/reset-password-component';
import { ForgotPasswordComponent } from './forgot-password-component/forgot-password-component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: EventComponent },
    { path: 'payments', component: PaymentComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'user-area', component: UserAreaComponent },
    { path: 'payments', component: PaymentComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'admin-events', component: EventComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: '**', redirectTo: 'home' },
];
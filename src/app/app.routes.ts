import { Routes } from '@angular/router';
import { Admin } from './pages/admin/admin';
import { AdminTickets } from './pages/admin-tickets/admin-tickets/admin-tickets';

export const routes: Routes = [
  { path: 'admin', component: Admin },
  { path: 'admin-tickets', component: AdminTickets },
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
];
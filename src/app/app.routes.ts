import { Routes } from '@angular/router';
import { HomeComponent } from './home-component/home-component';
import { EventComponent } from './event-component/event-component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'events', component: EventComponent },
    { path: '**', redirectTo: 'home' },
];

import { Component } from '@angular/core';
import { Router } from 'express';

@Component({
  selector: 'app-event-component',
  imports: [],
  templateUrl: './event-component.html',
  styleUrl: './event-component.css',
})
export class EventComponent {

  constructor(private router: Router) {}

}

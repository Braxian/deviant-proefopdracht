import { Component, inject, signal } from '@angular/core';
import { Oefening } from './oefening/oefening';

@Component({
  imports: [Oefening],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}

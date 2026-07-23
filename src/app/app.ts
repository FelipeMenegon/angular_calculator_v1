import { Component, signal } from '@angular/core';
import { Buttons } from "./components/buttons/buttons";
import { Input } from "./components/input/input";

@Component({
  selector: 'app-root',
  imports: [Buttons, Input],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular_tests');
}

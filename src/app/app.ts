import { Component, signal } from '@angular/core';
import { Buttons } from "./components/buttons/buttons";
import { Input } from "./components/input/input";
import { DisplayService } from './services/display';

@Component({
  selector: 'app-root',
  imports: [Buttons, Input],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular_tests');

  constructor(public calculator: DisplayService){}

  reset(){
    this.calculator.display.set('');
    this.calculator.firstValue.set(null);
    this.calculator.currentOp.set('');
  }

  delete(){
    this.calculator.display.update((value) => value.slice(0, -1));
  }
}

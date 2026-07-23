import { Component } from '@angular/core';
import { DisplayService } from '../../services/display';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
})
export class Buttons {
  constructor(public calculator: DisplayService) {}

  adicionar(value: string) {
    this.calculator.display.update((texto) => texto + value);
  }
}

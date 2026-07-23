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

  add(value: string) {
    if (this.calculator.showResults()) {
      this.calculator.display.set('');
      this.calculator.showResults.set(false);
    }
    this.calculator.display.update((texto) => texto + value);
    this.calculator.showResults.set(false);
  }

  addOp(operacao: string) {
    this.calculator.selecionarOperacao(operacao);
    this.calculator.showResults.set(false);
  }

  calculate() {
    this.calculator.calcular();
  }
}

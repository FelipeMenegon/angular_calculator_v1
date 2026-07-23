import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  display = signal('');
  currentOp = signal('');
  firstValue = signal<number | null>(null);
  showResults = signal(false);

  selecionarOperacao(operacao: string) {
    if (this.firstValue() === null) {
      this.firstValue.set(Number(this.display()));
      this.display.set('');
    }
    this.currentOp.set(operacao);
    this.showResults.set(false);
  }

  calcular() {
    const secondValue = Number(this.display());
    const firstValue = this.firstValue();

    if (firstValue === null) return;

    let resultado = 0;
    switch (this.currentOp()) {
      case '+':
        resultado = firstValue + secondValue;
        break;
      case '-':
        resultado = firstValue - secondValue;
        break;
      case '*':
        resultado = firstValue * secondValue;
        break;
      case '/':
        resultado = firstValue / secondValue;
        break;
    }
    this.display.set(resultado.toString());
    this.currentOp.set('');
    this.firstValue.set(null);
    this.showResults.set(true);
  }
}

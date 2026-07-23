import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
  display = signal('');
  currentOp = signal('');
  firstValue = signal<number | null>(null);
  showResults = signal(false);
  history = signal<string[]>([]);
  showHistory = signal(false);

  selecionarOperacao(operacao: string) {
    if (this.firstValue() === null) {
      this.firstValue.set(Number(this.display()));
      this.display.set('');
    }
    this.currentOp.set(operacao);
    this.showResults.set(false);
  }

  calculate() {
    const secondValue = Number(this.display());
    const firstValue = this.firstValue();

    if (firstValue === null) return;

    const op = this.currentOp();

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

    this.history.update((history) => [
      `${firstValue}⠀${op}⠀${secondValue}⠀=⠀${resultado}`,
      ...history,
    ]);

    this.display.set(resultado.toString());
    this.currentOp.set('');
    this.firstValue.set(null);
    this.showResults.set(true);
    console.log(this.history());
  }
}

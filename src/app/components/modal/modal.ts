import { Component } from '@angular/core';
import { DisplayService } from '../../services/display';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  constructor(public calculator: DisplayService) {}
  history() {
    this.calculator.showHistory.update((value) => !value);
  }
}

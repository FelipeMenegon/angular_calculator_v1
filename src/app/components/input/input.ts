import { Component, effect } from '@angular/core';
import { DisplayService } from '../../services/display';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  constructor(public calculator: DisplayService) {}
}

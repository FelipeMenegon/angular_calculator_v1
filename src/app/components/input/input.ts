import { Component } from '@angular/core';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {}

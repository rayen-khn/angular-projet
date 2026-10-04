import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter-card',
  standalone: true,
  templateUrl: './counter-card.html',
  styleUrl: './counter-card.css',
})
export class CounterCard {
  @Input() label = 'Counter';
  @Input() value = 0;

  @Output() valueChange = new EventEmitter<number>();

  protected decrease(): void {
    this.valueChange.emit(this.value - 1);
  }

  protected increase(): void {
    this.valueChange.emit(this.value + 1);
  }
}

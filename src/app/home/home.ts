import { Component, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { CounterCard } from '../counter-card/counter-card';

@Component({
  selector: 'app-home',
  imports: [DatePipe, UpperCasePipe, CounterCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly title = signal('projectName');
  protected readonly count = signal(0);
  protected readonly name = signal('4SSA5');

  protected readonly modules = [
    { title: 'Angular basics', startDate: new Date(2026, 8, 15), done: true },
    { title: 'Components', startDate: new Date(2026, 8, 20), done: true },
    { title: 'Directives and pipes', startDate: new Date(2026, 8, 27), done: false },
  ];

  protected updateCount(value: number): void {
    this.count.set(value);
  }

  protected updateName(value: string): void {
    this.name.set(value.trim() || '4SSA5');
  }
}

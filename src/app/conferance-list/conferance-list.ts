import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Conferance } from '../services/conferance';

@Component({
  selector: 'app-conferance-list',
  imports: [RouterLink],
  templateUrl: './conferance-list.html',
  styleUrl: './conferance-list.css',
})
export class ConferanceList {
  private conferenceService = inject(Conferance);
  conferances: any[] = this.conferenceService.getAll();
}

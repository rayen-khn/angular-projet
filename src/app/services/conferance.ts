import { Injectable, inject } from '@angular/core';
import { ConferenceService } from './conference.service';
import { Conference } from '../models/conference.model';

export { ConferenceService };
export type { Conference };

@Injectable({
  providedIn: 'root',
})
export class Conferance {
  private conferenceService = inject(ConferenceService);

  get conferences(): Conference[] {
    return this.conferenceService.getAll();
  }

  getAll(): Conference[] {
    return this.conferenceService.getAll();
  }

  getById(id: number): Conference | undefined {
    return this.conferenceService.getById(id);
  }
}

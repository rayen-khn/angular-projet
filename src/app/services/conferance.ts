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

  readonly filteredConferences = this.conferenceService.filteredConferences;
  readonly topics = this.conferenceService.topics;
  readonly selectedTopic = this.conferenceService.selectedTopic;

  getAll(): Conference[] {
    return this.conferenceService.getAll();
  }

  getById(id: number): Conference | undefined {
    return this.conferenceService.getById(id);
  }

  setTopicFilter(topic: string): void {
    this.conferenceService.setTopicFilter(topic);
  }

  addConference(conf: Omit<Conference, 'id'> & { id?: number }): Conference {
    return this.conferenceService.addConference(conf);
  }

  add(conf: Omit<Conference, 'id'> & { id?: number }): Conference {
    return this.conferenceService.addConference(conf);
  }

  update(updatedConf: Conference): Conference | undefined;
  update(id: number, updatedConf: Partial<Conference>): Conference | undefined;
  update(idOrConf: number | Conference, maybeConf?: Partial<Conference>): Conference | undefined {
    return this.conferenceService.update(idOrConf as any, maybeConf as any);
  }

  updateConference(idOrConf: number | Conference, maybeConf?: Partial<Conference>): Conference | undefined {
    return this.conferenceService.update(idOrConf as any, maybeConf as any);
  }

  delete(id: number): boolean {
    return this.conferenceService.delete(id);
  }

  deleteConference(id: number): boolean {
    return this.conferenceService.deleteConference(id);
  }
}

import { Injectable, signal, computed } from '@angular/core';
import { Conference } from '../models/conference.model';

@Injectable({
  providedIn: 'root',
})
export class ConferenceService {
  // Centralized catalog of conferences using Angular 21 Signal
  private conferencesSignal = signal<Conference[]>([
    {
      id: 1,
      name: 'Angular Conference',
      title: 'Angular Conference',
      date: '2026-10-15',
      place: 'Tunis',
      topic: 'Frontend & Architecture',
      category: 'Frontend & Architecture',
      description: 'Découvrez les nouveautés d\'Angular 21 : Signals, hydration, routing avancé et lazy loading modulaire.',
      totalSeats: 80,
      maxParticipants: 80,
      nbParticipants: 68,
      availableSeats: 12,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    },
    {
      id: 2,
      name: 'Java Conference',
      title: 'Java Conference',
      date: '2026-10-20',
      place: 'Sousse',
      topic: 'Backend & Cloud',
      category: 'Backend & Cloud',
      description: 'Microservices, Spring Boot 3, Virtual Threads et architectures résilientes en production.',
      totalSeats: 60,
      maxParticipants: 60,
      nbParticipants: 52,
      availableSeats: 8,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    },
    {
      id: 3,
      name: 'AI Conference',
      title: 'AI Conference',
      date: '2026-10-25',
      place: 'Sfax',
      topic: 'Intelligence Artificielle',
      category: 'Intelligence Artificielle',
      description: 'Agents autonomes, LLMs d\'entreprise, RAG et applications pratiques en entreprise.',
      totalSeats: 100,
      maxParticipants: 100,
      nbParticipants: 28,
      availableSeats: 72,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    },
    {
      id: 4,
      name: 'Cybersecurity Summit',
      title: 'Cybersecurity Summit',
      date: '2026-11-05',
      place: 'Tunis',
      topic: 'Sécurité & DevOps',
      category: 'Sécurité & DevOps',
      description: 'Protection des APIs, Zero Trust, sécurité cloud native et conformité réglementaire.',
      totalSeats: 50,
      maxParticipants: 50,
      nbParticipants: 35,
      availableSeats: 15,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    },
  ]);

  // Selected filter topic
  selectedTopic = signal<string>('Tous');

  // Computed list of unique topics/categories
  topics = computed<string[]>(() => {
    const list = this.conferencesSignal()
      .map((c) => c.topic || c.category)
      .filter((t): t is string => !!t);
    return ['Tous', ...Array.from(new Set(list))];
  });

  // Computed reactive filtered conferences
  filteredConferences = computed<Conference[]>(() => {
    const topic = this.selectedTopic();
    const list = this.conferencesSignal();
    if (topic === 'Tous') {
      return list;
    }
    return list.filter((c) => (c.topic || c.category) === topic);
  });

  // Readonly access to full list
  conferences = this.conferencesSignal.asReadonly();

  getAll(): Conference[] {
    return this.conferencesSignal();
  }

  getById(id: number): Conference | undefined {
    return this.conferencesSignal().find((c) => c.id === id);
  }

  setTopicFilter(topic: string): void {
    this.selectedTopic.set(topic);
  }

  // Prosit 2 & 3: Add new conference from ReactiveForm
  addConference(conf: Omit<Conference, 'id'> & { id?: number }): Conference {
    const list = this.conferencesSignal();
    const newId = list.length > 0 ? Math.max(...list.map((c) => c.id)) + 1 : 1;
    const name = conf.title || conf.name || `Conférence #${newId}`;
    const topic = conf.category || conf.topic || 'Frontend & Architecture';
    const maxParticipants = conf.maxParticipants ?? conf.totalSeats ?? 50;

    const newConf: Conference = {
      ...conf,
      id: newId,
      name,
      title: name,
      topic,
      category: topic,
      maxParticipants,
      totalSeats: maxParticipants,
      nbParticipants: 0,
      availableSeats: maxParticipants,
      image: conf.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    };

    this.conferencesSignal.update((current) => [...current, newConf]);
    return newConf;
  }

  // Alias for addConference
  add(conf: Omit<Conference, 'id'> & { id?: number }): Conference {
    return this.addConference(conf);
  }

  // Prosit / TD: Méthode de mise à jour d'une conférence
  update(updatedConf: Conference): Conference | undefined;
  update(id: number, updatedConf: Partial<Conference>): Conference | undefined;
  update(idOrConf: number | Conference, maybeConf?: Partial<Conference>): Conference | undefined {
    const list = this.conferencesSignal();
    const id = typeof idOrConf === 'number' ? idOrConf : idOrConf.id;
    const patch = typeof idOrConf === 'number' ? (maybeConf ?? {}) : idOrConf;

    const index = list.findIndex((c) => c.id === id);
    if (index === -1) {
      return undefined;
    }

    const current = list[index];
    const name = patch.title || patch.name || current.name;
    const title = patch.title || patch.name || current.title || current.name;
    const topic = patch.category || patch.topic || current.topic || current.category;
    const category = patch.category || patch.topic || current.category || current.topic;
    const maxParticipants = patch.maxParticipants ?? patch.totalSeats ?? current.maxParticipants;
    const totalSeats = patch.totalSeats ?? patch.maxParticipants ?? current.totalSeats;
    const nbParticipants = patch.nbParticipants ?? current.nbParticipants ?? 0;
    const availableSeats =
      patch.availableSeats ??
      (maxParticipants !== undefined ? Math.max(0, maxParticipants - nbParticipants) : current.availableSeats);

    const merged: Conference = {
      ...current,
      ...patch,
      id,
      name,
      title,
      topic,
      category,
      maxParticipants,
      totalSeats,
      nbParticipants,
      availableSeats,
    };

    this.conferencesSignal.update((items) =>
      items.map((c) => (c.id === id ? merged : c))
    );

    return merged;
  }

  // Alias compatible updateConference
  updateConference(idOrConf: number | Conference, maybeConf?: Partial<Conference>): Conference | undefined {
    return this.update(idOrConf as any, maybeConf as any);
  }

  // Prosit / TD: Méthode de suppression d'une conférence par ID
  delete(id: number): boolean {
    const list = this.conferencesSignal();
    const exists = list.some((c) => c.id === id);
    if (!exists) {
      return false;
    }
    this.conferencesSignal.update((current) => current.filter((c) => c.id !== id));
    return true;
  }

  // Alias compatible deleteConference
  deleteConference(id: number): boolean {
    return this.delete(id);
  }
}

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
      date: '2026-10-15',
      place: 'Tunis',
      topic: 'Frontend & Architecture',
      description: 'Découvrez les nouveautés d\'Angular 21 : Signals, hydration, routing avancé et lazy loading modulaire.',
      totalSeats: 80,
      availableSeats: 12,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
    },
    {
      id: 2,
      name: 'Java Conference',
      date: '2026-10-20',
      place: 'Sousse',
      topic: 'Backend & Cloud',
      description: 'Microservices, Spring Boot 3, Virtual Threads et architectures résilientes en production.',
      totalSeats: 60,
      availableSeats: 8,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    },
    {
      id: 3,
      name: 'AI Conference',
      date: '2026-10-25',
      place: 'Sfax',
      topic: 'Intelligence Artificielle',
      description: 'Agents autonomes, LLMs d\'entreprise, RAG et applications pratiques en entreprise.',
      totalSeats: 100,
      availableSeats: 72,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e',
    },
    {
      id: 4,
      name: 'Cybersecurity Summit',
      date: '2026-11-05',
      place: 'Tunis',
      topic: 'Sécurité & DevOps',
      description: 'Protection des APIs, Zero Trust, sécurité cloud native et conformité réglementaire.',
      totalSeats: 50,
      availableSeats: 15,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
    },
  ]);

  // Selected filter topic
  selectedTopic = signal<string>('Tous');

  // Computed list of unique topics
  topics = computed<string[]>(() => {
    const list = this.conferencesSignal()
      .map((c) => c.topic)
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
    return list.filter((c) => c.topic === topic);
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
}

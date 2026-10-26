import { Component, inject, computed, OnInit, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConferenceService } from '../services/conference.service';
import { Conferance } from '../services/conferance';
import { Conference } from '../models/conference.model';

@Component({
  selector: 'app-conference-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './conference-form.component.html',
  styleUrl: './conference-form.component.css',
})
export class ConferenceFormComponent implements OnInit {
  // Prosit / Séance : Utilisation de FormBuilder (formbuild)
  private fb = inject(FormBuilder);
  private conferenceService = inject(ConferenceService);
  private conferance = inject(Conferance);
  private router = inject(Router);
  private route = inject(ActivatedRoute, { optional: true });

  // Optional id input when used for update / editing
  id = input<string | undefined>();
  isEditMode = false;
  editingId: number | null = null;

  // Available categories for selection
  categories = [
    'Frontend & Architecture',
    'Backend & Cloud',
    'Intelligence Artificielle',
    'Sécurité & DevOps',
    'Data Science & Analytics',
    'Mobile & IoT',
  ];

  // Construction du formulaire réactif avec FormBuilder (formbuild)
  conferenceForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    category: ['', [Validators.required]],
    place: ['', [Validators.required]],
    date: ['', [Validators.required]],
    maxParticipants: [null as number | null, [Validators.required, Validators.min(1), Validators.max(1000)]],
    image: [''],
  });

  // Combinaison Reactive Forms et Signals avec toSignal()
  readonly descriptionValue = toSignal(
    this.conferenceForm.controls.description.valueChanges,
    { initialValue: this.conferenceForm.controls.description.value }
  );

  readonly titleValue = toSignal(
    this.conferenceForm.controls.title.valueChanges,
    { initialValue: this.conferenceForm.controls.title.value }
  );

  readonly formStatus = toSignal(
    this.conferenceForm.statusChanges,
    { initialValue: this.conferenceForm.status }
  );

  // 1. Affichage en temps réel du nombre de caractères saisis
  readonly descriptionCharCount = computed(() => (this.descriptionValue() ?? '').length);
  readonly titleCharCount = computed(() => (this.titleValue() ?? '').length);

  // 2. Affichage en temps réel de l'état de validité du formulaire
  readonly isFormValid = computed(() => this.formStatus() === 'VALID');

  ngOnInit(): void {
    // Vérification si un ID est passé en route param, queryParam ou input pour le mode update
    const routeId =
      this.id() ||
      this.route?.snapshot.paramMap.get('id') ||
      this.route?.snapshot.queryParamMap.get('id');

    if (routeId) {
      const numId = Number(routeId);
      const existing = this.conferance.getById(numId) || this.conferenceService.getById(numId);
      if (existing) {
        this.isEditMode = true;
        this.editingId = existing.id;
        this.loadConferenceIntoForm(existing);
      }
    }
  }

  // Pré-remplir le formulaire avec une conférence existante (update)
  loadConferenceIntoForm(conf: Conference): void {
    this.conferenceForm.patchValue({
      title: conf.title || conf.name || '',
      description: conf.description || '',
      category: conf.category || conf.topic || '',
      place: conf.place || '',
      date: conf.date || '',
      maxParticipants: conf.maxParticipants ?? conf.totalSeats ?? null,
      image: conf.image || '',
    });
  }

  // Helpers pour l'affichage conditionnel des erreurs
  isInvalid(controlName: keyof typeof this.conferenceForm.controls): boolean {
    const ctrl = this.conferenceForm.controls[controlName];
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  // Consommation de la méthode update du service
  update(conference: Conference): Conference | undefined {
    return this.conferance.update(conference);
  }

  updateConference(conference: Conference): Conference | undefined {
    return this.conferance.updateConference(conference);
  }

  // Consommation de la méthode delete du service
  delete(id: number): boolean {
    return this.conferance.delete(id);
  }

  deleteConference(id: number): boolean {
    return this.conferance.deleteConference(id);
  }

  // Soumission du formulaire (Ajout ou Mise à jour selon isEditMode)
  onSubmit(): void {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }

    const formVal = this.conferenceForm.getRawValue();

    if (this.isEditMode && this.editingId !== null) {
      // Consommation de update dans le service Conferance
      const updated = this.conferance.update({
        id: this.editingId,
        name: formVal.title,
        title: formVal.title,
        description: formVal.description,
        topic: formVal.category,
        category: formVal.category,
        place: formVal.place,
        date: formVal.date,
        maxParticipants: formVal.maxParticipants ?? 50,
        image: formVal.image || undefined,
      });

      this.router.navigate(['/conferences', this.editingId]);
      return;
    }

    // Consommation de addConference dans le service Conferance
    const created = this.conferance.addConference({
      name: formVal.title,
      title: formVal.title,
      description: formVal.description,
      topic: formVal.category,
      category: formVal.category,
      place: formVal.place,
      date: formVal.date,
      maxParticipants: formVal.maxParticipants ?? 50,
      image: formVal.image || undefined,
    });

    // Navigation programmée vers la conférence ajoutée
    this.router.navigate(['/conferences', created.id]);
  }
}

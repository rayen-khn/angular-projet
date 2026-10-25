import { Component, inject, computed } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ConferenceService } from '../services/conference.service';

@Component({
  selector: 'app-conference-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './conference-form.component.html',
  styleUrl: './conference-form.component.css',
})
export class ConferenceFormComponent {
  private conferenceService = inject(ConferenceService);
  private router = inject(Router);

  // Available categories for selection
  categories = [
    'Frontend & Architecture',
    'Backend & Cloud',
    'Intelligence Artificielle',
    'Sécurité & DevOps',
    'Data Science & Analytics',
    'Mobile & IoT',
  ];

  // Prosit 2 (Séance 5): Construction du formulaire avec FormGroup et FormControl
  conferenceForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
    }),
    category: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    place: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    maxParticipants: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1), Validators.max(1000)],
    }),
    image: new FormControl('', {
      nonNullable: true,
    }),
  });

  // Prosit 3 (Séance 5): Combinaison Reactive Forms et Signals avec toSignal()
  // Alternative performante à valueChanges et statusChanges manuels
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

  // Helpers pour l'affichage conditionnel des erreurs
  isInvalid(controlName: keyof typeof this.conferenceForm.controls): boolean {
    const ctrl = this.conferenceForm.controls[controlName];
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  // Prosit 2: Récupération des données lors de la soumission et enregistrement
  onSubmit(): void {
    if (this.conferenceForm.invalid) {
      this.conferenceForm.markAllAsTouched();
      return;
    }

    const formVal = this.conferenceForm.getRawValue();

    const created = this.conferenceService.addConference({
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConferenceFormComponent } from './conference-form.component';
import { ConferenceService } from '../services/conference.service';

describe('ConferenceFormComponent', () => {
  let component: ConferenceFormComponent;
  let fixture: ComponentFixture<ConferenceFormComponent>;
  let conferenceService: ConferenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceFormComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferenceFormComponent);
    component = fixture.componentInstance;
    conferenceService = TestBed.inject(ConferenceService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form and disabled save button state', () => {
    expect(component.conferenceForm.valid).toBe(false);
    expect(component.isFormValid()).toBe(false);
  });

  it('should update character count signals reactively', () => {
    expect(component.descriptionCharCount()).toBe(0);

    component.conferenceForm.controls.description.setValue('Hello Angular World');
    expect(component.descriptionCharCount()).toBe(19);
  });

  it('should become valid when all required fields meet constraints', () => {
    component.conferenceForm.patchValue({
      title: 'Devoxx 2026',
      description: 'A complete conference covering all modern cloud-native topics and frameworks.',
      category: 'Backend & Cloud',
      place: 'Tunis',
      date: '2026-11-20',
      maxParticipants: 150,
    });

    expect(component.conferenceForm.valid).toBe(true);
    expect(component.isFormValid()).toBe(true);
  });

  it('should consume update and delete methods from the service', () => {
    const list = conferenceService.getAll();
    expect(list.length).toBeGreaterThan(0);
    const target = list[0];

    const updated = component.update({
      ...target,
      name: 'Component Updated Conf',
    });
    expect(updated?.name).toBe('Component Updated Conf');

    const created = conferenceService.addConference({
      name: 'To be deleted by component',
      date: '2026-12-05',
      place: 'Gabes',
    });
    const deleted = component.delete(created.id);
    expect(deleted).toBe(true);
  });
});

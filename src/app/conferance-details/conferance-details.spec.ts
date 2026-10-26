import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ConferanceDetails } from './conferance-details';

describe('ConferanceDetails', () => {
  let component: ConferanceDetails;
  let fixture: ComponentFixture<ConferanceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferanceDetails],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferanceDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should consume update and delete methods from Conferance service', () => {
    expect(component.conference).toBeDefined();

    const updated = component.update({
      ...component.conference!,
      place: 'Kairouan',
    });
    expect(updated?.place).toBe('Kairouan');
    expect(component.conference?.place).toBe('Kairouan');

    const deleted = component.delete(9999);
    expect(deleted).toBe(false);
  });
});

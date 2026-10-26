import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ConferanceList } from './conferance-list';

describe('ConferanceList', () => {
  let component: ConferanceList;
  let fixture: ComponentFixture<ConferanceList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferanceList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ConferanceList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should consume service methods (getAll, getById, update, delete)', () => {
    const list = component.getAll();
    expect(list.length).toBeGreaterThan(0);

    const first = component.getById(list[0].id);
    expect(first).toBeDefined();

    const updated = component.update({
      ...list[0],
      name: 'List Updated Conference',
    });
    expect(updated?.name).toBe('List Updated Conference');

    const created = component.update({
      id: 9999,
      name: 'Non existent',
      date: '2026-12-10',
      place: 'Djerba',
    });
    expect(created).toBeUndefined();
  });
});

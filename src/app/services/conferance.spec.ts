import { TestBed } from '@angular/core/testing';

import { Conferance } from './conferance';

describe('Conferance', () => {
  let service: Conferance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Conferance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update an existing conference', () => {
    const list = service.getAll();
    expect(list.length).toBeGreaterThan(0);
    const target = list[0];

    const updated = service.update({
      ...target,
      name: 'Updated Angular Conf',
      title: 'Updated Angular Conf',
      place: 'Bizerte',
    });

    expect(updated).toBeDefined();
    expect(updated?.name).toBe('Updated Angular Conf');
    expect(service.getById(target.id)?.place).toBe('Bizerte');
  });

  it('should delete a conference by id', () => {
    const newConf = service.addConference({
      name: 'Temp Conference to Delete',
      date: '2026-12-01',
      place: 'Nabeul',
      topic: 'Frontend & Architecture',
      maxParticipants: 30,
    });

    expect(service.getById(newConf.id)).toBeDefined();
    const result = service.delete(newConf.id);
    expect(result).toBe(true);
    expect(service.getById(newConf.id)).toBeUndefined();
  });
});

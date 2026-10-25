import { Component, input, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conferance } from '../services/conferance';

@Component({
  selector: 'app-conferance-details',
  imports: [],
  templateUrl: './conferance-details.html',
  styleUrl: './conferance-details.css',
})
export class ConferanceDetails implements OnInit {
  // Prosit 3: Route Parameter with Signals / withComponentInputBinding
  id = input.required<string>();
  conference?: any;

  private conferenceService = inject(Conferance);
  private router = inject(Router);

  // Alternative ActivatedRoute approaches explained in class:
  // constructor(private aroute: ActivatedRoute) {
  //   this.id = this.aroute.snapshot.params['id'];
  // }
  // OR with Observable:
  // this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => ...);

  ngOnInit(): void {
    const numericId = Number(this.id());
    this.conference = this.conferenceService.getById(numericId);
  }

  // Prosit 3: Programmatic navigation after registration
  register(): void {
    this.router.navigate(['/confirmation'], {
      queryParams: {
        id: this.id(),
        name: this.conference?.name ?? '',
      },
    });
  }

  // Programmatic back navigation
  goBack(): void {
    this.router.navigate(['/conferences']);
  }
}

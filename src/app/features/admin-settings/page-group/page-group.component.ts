import { Component, signal, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../../shared/components/breadcrumbs/breadcrumbs.component';
import { Breadcrumb } from '../../../shared/components/breadcrumbs/breadcrumbs.model';

@Component({
  selector: 'app-page-group',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './page-group.component.html',
  styleUrl: './page-group.component.scss',
})
export class PageGroup implements OnInit {
  breadCrumbItems = signal<Breadcrumb[]>([]);

  ngOnInit(): void {
    this.breadCrumbItems.set([
      { label: 'Forms', active: false },
      { label: 'Basic Elements', active: true },
    ]);
  }
}

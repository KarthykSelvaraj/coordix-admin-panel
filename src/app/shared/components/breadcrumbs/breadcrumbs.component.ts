import { Breadcrumb } from './breadcrumbs.model';
import { Component, signal, input } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  public title = signal<string>('');
  public breadcrumbs = input<Breadcrumb[]>([]);
}

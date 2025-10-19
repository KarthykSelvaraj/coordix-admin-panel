import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, Route } from '@angular/router';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { authGuard } from './core/guards/auth.guard';
import { bootstrapApplication } from '@angular/platform-browser';

import { LoginComponent } from '../app/features/account/login/login.component';
import { DashboardComponent } from '../app/features/account/dashboard/dashboard.component';
import { LayoutComponent } from './layouts/layout.component';
import { PageGroup } from './features/admin-settings/page-group/page-group.component';

export const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [{ component: DashboardComponent, path: '' }],
    canActivate: [authGuard],
  },
  {
    path: 'page-group',
    component: LayoutComponent,
    children: [{ component: PageGroup, path: '' }],
    canActivate: [authGuard],
  },
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};

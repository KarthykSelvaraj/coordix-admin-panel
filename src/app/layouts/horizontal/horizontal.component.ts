import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../topbar/topbar.component';
import { HorizontalTopbarComponent } from '../horizontal-topbar/horizontal-topbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [
    HorizontalTopbarComponent,
    FooterComponent,
    TopbarComponent,
    RightsidebarComponent,
    RouterModule,
  ],
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
})

/**
 * Horizontal Component
 */
export class HorizontalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  /**
   * on settings button clicked from topbar
   */
  onSettingsButtonClicked() {
    document.body.classList.toggle('right-bar-enabled');
    const rightBar = document.getElementById('theme-settings-offcanvas');
    if (rightBar != null) {
      rightBar.classList.toggle('show');
      rightBar.setAttribute('style', 'visibility: visible;');
    }
  }

  /**
   * On mobile toggle button clicked
   */
  onToggleMobileMenu() {
    if (document.documentElement.clientWidth <= 1024) {
      document.body.classList.toggle('menu');
    }
  }
}

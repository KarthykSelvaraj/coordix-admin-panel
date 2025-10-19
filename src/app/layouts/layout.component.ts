import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { LayoutService } from '../core/services/layout.service'; // Your new signal service
import { VerticalComponent } from './vertical/vertical.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { TwoColumnComponent } from './two-column/two-column.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [VerticalComponent, HorizontalComponent, TwoColumnComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  private layoutService = inject(LayoutService);

  // Reactive properties using signals
  layoutType = signal<Required<string>>('');
  layoutState = this.layoutService.layoutState;

  constructor() {
    // Effect to update DOM attributes when layout state changes
    effect(() => {
      const data = this.layoutService.layoutState();
      this.layoutType.set(data.LAYOUT);
      // Update DOM attributes
      document.documentElement.setAttribute('data-layout', data.LAYOUT);
      document.documentElement.setAttribute('data-bs-theme', data.LAYOUT_MODE);
      document.documentElement.setAttribute(
        'data-layout-width',
        data.LAYOUT_WIDTH
      );
      document.documentElement.setAttribute(
        'data-layout-position',
        data.LAYOUT_POSITION
      );
      document.documentElement.setAttribute('data-topbar', data.TOPBAR);

      // Conditional attributes for vertical/twocolumn layouts
      if (data.LAYOUT === 'vertical' || data.LAYOUT === 'twocolumn') {
        document.documentElement.setAttribute(
          'data-sidebar',
          data.SIDEBAR_COLOR
        );
        document.documentElement.setAttribute(
          'data-sidebar-size',
          data.SIDEBAR_SIZE
        );
        document.documentElement.setAttribute(
          'data-sidebar-image',
          data.SIDEBAR_IMAGE
        );
        document.documentElement.setAttribute(
          'data-layout-style',
          data.SIDEBAR_VIEW
        );
      }

      document.documentElement.setAttribute(
        'data-preloader',
        data.DATA_PRELOADER
      );
      document.documentElement.setAttribute(
        'data-sidebar-visibility',
        data.SIDEBAR_VISIBILITY
      );
    });
  }

  ngOnInit(): void {
    // No subscription needed - effects handle reactivity automatically
  }

  /**
   * Check if the vertical layout is requested
   */
  isVerticalLayoutRequested() {
    return this.layoutType() === 'vertical';
  }

  /**
   * Check if the semibox layout is requested
   */
  isSemiboxLayoutRequested() {
    return this.layoutType() === 'semibox';
  }

  /**
   * Check if the horizontal layout is requested
   */
  isHorizontalLayoutRequested() {
    return this.layoutType() === 'horizontal';
  }

  /**
   * Check if the two column layout is requested
   */
  isTwoColumnLayoutRequested() {
    return this.layoutType() === 'twocolumn';
  }
}

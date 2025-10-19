import {
  Component,
  ViewChild,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
  effect,
  DestroyRef,
  inject,
} from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../../core/services/layout.service'; // Adjust path as needed
import { SimplebarAngularModule } from 'simplebar-angular';
@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.scss'],
})

/**
 * Right Sidebar component
 */
export class RightsidebarComponent implements OnInit {
  layout: string | undefined;
  mode: string | undefined;
  width: string | undefined;
  position: string | undefined;
  topbar: string | undefined;
  size: string | undefined;
  sidebarView: string | undefined;
  sidebar: string | undefined;
  attribute: any;
  sidebarImage: any;
  sidebarVisibility: any;
  preLoader: any;
  grd: any;

  private destroyRef = inject(DestroyRef);

  @Output() settingsButtonClicked = new EventEmitter();
  @ViewChild('filtetcontent') filtetcontent!: TemplateRef<any>;

  constructor(
    private eventService: EventService,
    private offcanvasService: NgbOffcanvas,
    private layoutService: LayoutService
  ) {
    // Create effects to react to layout state changes and update DOM attributes
    effect(() => {
      const layoutState = this.layoutService.layoutState();

      // Update component properties
      this.layout = layoutState.LAYOUT;
      this.mode = layoutState.LAYOUT_MODE;
      this.width = layoutState.LAYOUT_WIDTH;
      this.position = layoutState.LAYOUT_POSITION;
      this.topbar = layoutState.TOPBAR;
      this.size = layoutState.SIDEBAR_SIZE;
      this.sidebarView = layoutState.SIDEBAR_VIEW;
      this.sidebar = layoutState.SIDEBAR_COLOR;
      this.sidebarImage = layoutState.SIDEBAR_IMAGE;
      this.preLoader = layoutState.DATA_PRELOADER;
      this.sidebarVisibility = layoutState.SIDEBAR_VISIBILITY;
    });

    // Effect for layout changes
    effect(() => {
      const layout = this.layoutService.getLayout();
      document.documentElement.setAttribute('data-layout', layout);
    });

    // Effect for mode changes
    effect(() => {
      const mode = this.layoutService.getLayoutMode();
      document.documentElement.setAttribute('data-bs-theme', mode);
    });

    // Effect for visibility changes
    effect(() => {
      const visibility = this.layoutService.getSidebarVisibility();
      document.documentElement.setAttribute(
        'data-sidebar-visibility',
        visibility
      );
    });

    // Effect for width changes
    effect(() => {
      const width = this.layoutService.getLayoutWidth();
      const size = this.layoutService.getSidebarSize();
      document.documentElement.setAttribute('data-layout-width', width);
      document.documentElement.setAttribute('data-sidebar-size', size);
    });

    // Effect for position changes
    effect(() => {
      const position = this.layoutService.getLayoutPosition();
      document.documentElement.setAttribute('data-layout-position', position);
    });

    // Effect for topbar changes
    effect(() => {
      const topbar = this.layoutService.getTopbar();
      document.documentElement.setAttribute('data-topbar', topbar);
    });

    // Effect for sidebar size changes
    effect(() => {
      const size = this.layoutService.getSidebarSize();
      document.documentElement.setAttribute('data-sidebar-size', size);
    });

    // Effect for sidebar view changes
    effect(() => {
      const view = this.layoutService.getSidebarView();
      document.documentElement.setAttribute('data-layout-style', view);
    });

    // Effect for sidebar color changes
    effect(() => {
      const color = this.layoutService.getSidebarColor();
      document.documentElement.setAttribute('data-sidebar', color);
    });

    // Effect for sidebar image changes
    effect(() => {
      const image = this.layoutService.getSidebarImage();
      document.documentElement.setAttribute('data-sidebar-image', image);
    });

    // Effect for preloader changes
    effect(() => {
      const loader = this.layoutService.getDataPreloader();
      document.documentElement.setAttribute('data-preloader', loader);
    });
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   if (this.offcanvasService.hasOpenOffcanvas() == false) {
    //     this.openEnd(this.filtetcontent);
    //   }
    // }, 1000);
  }

  ngAfterViewInit() {}

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.attribute = layout;
    this.layoutService.updateLayout(layout);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  // Add Active Class
  addActive(grdSidebar: any) {
    this.grd = grdSidebar;
    document.documentElement.setAttribute('data-sidebar', grdSidebar);
    document.getElementById('collapseBgGradient')?.classList.toggle('show');
    document.getElementById('collapseBgGradient1')?.classList.add('active');
  }

  // Remove Active Class
  removeActive() {
    this.grd = '';
    document.getElementById('collapseBgGradient1')?.classList.remove('active');
    document.getElementById('collapseBgGradient')?.classList.remove('show');
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  //  Filter Offcanvas Set
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });

    setTimeout(() => {
      this.attribute = document.documentElement.getAttribute('data-layout');
      if (this.attribute == 'vertical') {
        var vertical = document.getElementById(
          'customizer-layout01'
        ) as HTMLInputElement;
        if (vertical != null) {
          vertical.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'horizontal') {
        const horizontal = document.getElementById('customizer-layout02');
        if (horizontal != null) {
          horizontal.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'twocolumn') {
        const Twocolumn = document.getElementById('customizer-layout03');
        if (Twocolumn != null) {
          Twocolumn.setAttribute('checked', 'true');
        }
      }
      if (this.attribute == 'semibox') {
        const Twocolumn = document.getElementById('customizer-layout04');
        if (Twocolumn != null) {
          Twocolumn.setAttribute('checked', 'true');
        }
      }
    }, 100);
  }

  // Mode Change
  changeMode(mode: string) {
    this.layoutService.updateMode(mode);
  }

  // Visibility Change
  changeVisibility(sidebarvisibility: string) {
    this.layoutService.updateSidebarVisibility(sidebarvisibility);
  }

  // Width Change
  changeWidth(layoutWidth: string, size: string) {
    this.layoutService.updateLayoutWidth(layoutWidth);
    this.layoutService.updateSidebarSize(size);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }

  // Position Change
  changePosition(layoutPosition: string) {
    this.layoutService.updateLayoutPosition(layoutPosition);
  }

  // Topbar Change
  changeTopColor(topbarColor: string) {
    this.layoutService.updateTopbar(topbarColor);
  }

  // Sidebar Size Change
  changeSidebarSize(sidebarSize: string) {
    this.layoutService.updateSidebarSize(sidebarSize);
  }

  // Sidebar View Change
  changeSidebar(sidebarView: string) {
    this.layoutService.updateSidebarView(sidebarView);
  }

  // Sidebar Color Change
  changeSidebarColor(sidebarColor: string) {
    this.layoutService.updateSidebarColor(sidebarColor);
  }

  // Sidebar Image Change
  changeSidebarImage(sidebarImage: string) {
    this.layoutService.updateSidebarImage(sidebarImage);
  }

  // PreLoader Image Change
  changeLoader(Preloader: string) {
    this.layoutService.updateDataPreloader(Preloader);

    var preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(function () {
        (document.getElementById('preloader') as HTMLElement).style.opacity =
          '0';
        (document.getElementById('preloader') as HTMLElement).style.visibility =
          'hidden';
      }, 1000);
    }
  }
}

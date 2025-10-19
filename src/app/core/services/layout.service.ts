import { Injectable, signal, WritableSignal, computed } from '@angular/core';
import {
  LAYOUT_WIDTH_TYPES,
  LAYOUT_POSITION_TYPES,
  LAYOUT_TOPBAR_COLOR_TYPES,
  PERLOADER_TYPES,
  LAYOUT_TYPES,
  LAYOUT_MODE,
  SIDEBAR_COLOR,
  SIDEBAR_IMAGE,
  SIDEBAR_VIEW,
  SIDEBAR_SIZE,
  SIDEBAR_VISIBILITY,
} from '../models/layout';

export interface LayoutState {
  LAYOUT: string;
  LAYOUT_MODE: string;
  LAYOUT_WIDTH: string;
  LAYOUT_POSITION: string;
  TOPBAR: string;
  SIDEBAR_SIZE: string;
  SIDEBAR_VIEW: string;
  SIDEBAR_COLOR: string;
  SIDEBAR_IMAGE: string;
  SIDEBAR_VISIBILITY: string;
  DATA_PRELOADER: string;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  // Initial State
  private readonly initialState: LayoutState = {
    LAYOUT: LAYOUT_TYPES.TWOCOLUMN,
    LAYOUT_MODE: LAYOUT_MODE.LIGHTMODE,
    LAYOUT_WIDTH: LAYOUT_WIDTH_TYPES.FLUID,
    LAYOUT_POSITION: LAYOUT_POSITION_TYPES.FIXED,
    TOPBAR: LAYOUT_TOPBAR_COLOR_TYPES.LIGHT,
    SIDEBAR_COLOR: SIDEBAR_COLOR.DARK,
    SIDEBAR_SIZE: SIDEBAR_SIZE.LARGE,
    SIDEBAR_VIEW: SIDEBAR_VIEW.DEFAULT,
    SIDEBAR_IMAGE: SIDEBAR_IMAGE.NONE,
    SIDEBAR_VISIBILITY: SIDEBAR_VISIBILITY.SHOW,
    DATA_PRELOADER: PERLOADER_TYPES.DISABLE,
  };

  // Private writable signal
  private readonly layoutStateSignal: WritableSignal<LayoutState> = signal(
    this.initialState
  );

  // Public readonly access to state
  readonly layoutState = this.layoutStateSignal.asReadonly();

  // Update Functions (equivalent to your reducers)
  updateLayout = (layout: string) => {
    this.layoutStateSignal.update((state) => ({ ...state, LAYOUT: layout }));
  };

  updateMode = (mode: string) => {
    this.layoutStateSignal.update((state) => ({ ...state, LAYOUT_MODE: mode }));
  };

  updateLayoutWidth = (layoutWidth: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      LAYOUT_WIDTH: layoutWidth,
    }));
  };

  updateLayoutPosition = (layoutPosition: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      LAYOUT_POSITION: layoutPosition,
    }));
  };

  updateTopbar = (topbarColor: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      TOPBAR: topbarColor,
    }));
  };

  updateSidebarSize = (sidebarSize: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      SIDEBAR_SIZE: sidebarSize,
    }));
  };

  updateSidebarView = (sidebarView: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      SIDEBAR_VIEW: sidebarView,
    }));
  };

  updateSidebarColor = (sidebarColor: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      SIDEBAR_COLOR: sidebarColor,
    }));
  };

  updateSidebarImage = (sidebarImage: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      SIDEBAR_IMAGE: sidebarImage,
    }));
  };

  updateSidebarVisibility = (sidebarVisibility: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      SIDEBAR_VISIBILITY: sidebarVisibility,
    }));
  };

  updateDataPreloader = (preloader: string) => {
    this.layoutStateSignal.update((state) => ({
      ...state,
      DATA_PRELOADER: preloader,
    }));
  };

  // Bulk update function for multiple properties at once
  updateLayoutState = (updates: Partial<LayoutState>) => {
    this.layoutStateSignal.update((state) => ({ ...state, ...updates }));
  };

  // Reset to initial state
  resetLayoutState = () => {
    this.layoutStateSignal.set(this.initialState);
  };

  // Computed signals for specific properties (equivalent to selectors)
  readonly getLayout = computed(() => this.layoutStateSignal().LAYOUT);
  readonly getLayoutMode = computed(() => this.layoutStateSignal().LAYOUT_MODE);
  readonly getLayoutWidth = computed(
    () => this.layoutStateSignal().LAYOUT_WIDTH
  );
  readonly getLayoutPosition = computed(
    () => this.layoutStateSignal().LAYOUT_POSITION
  );
  readonly getTopbar = computed(() => this.layoutStateSignal().TOPBAR);
  readonly getSidebarSize = computed(
    () => this.layoutStateSignal().SIDEBAR_SIZE
  );
  readonly getSidebarView = computed(
    () => this.layoutStateSignal().SIDEBAR_VIEW
  );
  readonly getSidebarColor = computed(
    () => this.layoutStateSignal().SIDEBAR_COLOR
  );
  readonly getSidebarImage = computed(
    () => this.layoutStateSignal().SIDEBAR_IMAGE
  );
  readonly getSidebarVisibility = computed(
    () => this.layoutStateSignal().SIDEBAR_VISIBILITY
  );
  readonly getDataPreloader = computed(
    () => this.layoutStateSignal().DATA_PRELOADER
  );
}

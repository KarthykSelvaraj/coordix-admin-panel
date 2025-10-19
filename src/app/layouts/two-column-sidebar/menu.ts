import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'menu',
    isTitle: true,
  },
  {
    id: 2,
    label: 'Dashboard',
    collapseid: 'sidebarDashboards',
    icon: 'mdi mdi-speedometer',
    isCollapsed: true,
    subItems: [
      {
        id: 3,
        label: 'Dashboard',
        link: '/dashboard',
        parentId: 2,
      },
    ],
  },
  {
    id: 3,
    label: 'AdminSettings',
    collapseid: 'sidebarAdminSettings',
    icon: 'mdi mdi-cogs',
    isCollapsed: true,
    subItems: [
      {
        id: 3,
        label: 'Page Group',
        link: '/page-group',
        parentId: 2,
      },
    ],
  },
];

import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'menus',
    isTitle: true,
  },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'ri-dashboard-2-line',
    subItems: [
      {
        id: 3,
        label: 'Dashboard',
        link: '/dashboard',
        parentId: 2,
      }

    ],
  },
];

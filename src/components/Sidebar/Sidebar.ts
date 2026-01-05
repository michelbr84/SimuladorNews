import { SidebarMenu } from './SidebarMenu';
import { SidebarUser } from './SidebarUser';

export class Sidebar {
    constructor() {
        new SidebarUser();
        new SidebarMenu();
    }
}

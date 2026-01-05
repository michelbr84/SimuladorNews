import { Sidebar } from './components/Sidebar/Sidebar';
import { Toolbar } from './components/Toolbar/Toolbar';
import { NewsList } from './components/News/NewsList';
import { NewsDetail } from './components/News/NewsDetail';
import { Tabs } from './components/Tabs/Tabs';
import { FooterNav } from './components/Footer/FooterNav';
import { EditUserModal } from './components/Modal/EditUserModal';

export class App {
    constructor() {
        this.init();
    }

    init() {
        new Sidebar();
        new Toolbar();
        new NewsList();
        new NewsDetail();
        new Tabs();
        new FooterNav();
        new EditUserModal();
    }
}

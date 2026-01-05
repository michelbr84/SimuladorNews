import { News } from '../models/News';
import { User } from '../models/User';
import { newsData } from '../data/newsData';
import { StorageService } from './StorageService';

export class StateService {
    private _user: User;
    private _filter: string = "all";
    private _selectedIndex: number = -1;
    private _news: News[] = newsData;

    private listeners: (() => void)[] = [];

    constructor() {
        this._user = StorageService.loadUser();
    }

    get user() { return this._user; }
    set user(u: User) {
        this._user = u;
        StorageService.saveUser(u);
        this.notify();
    }

    get filter() { return this._filter; }
    set filter(f: string) {
        this._filter = f;
        this._selectedIndex = -1;
        this.notify();
    }

    get selectedIndex() { return this._selectedIndex; }
    set selectedIndex(i: number) {
        this._selectedIndex = i;
        this.notify();
    }

    get visibleNews(): News[] {
        if (this._filter === "all") return this._news;
        return this._news.filter(n => n.category === this._filter);
    }

    subscribe(fn: () => void) {
        this.listeners.push(fn);
    }

    private notify() {
        this.listeners.forEach(fn => fn());
    }
}

export const state = new StateService();

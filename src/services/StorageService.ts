import { User } from '../models/User';
import { sanitizeName } from '../utils/sanitize';

const STORAGE_KEY = "cm_news_user_v1";

export class StorageService {
    static loadUser(): User {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { firstName: "Michel", lastName: "Duek" };
            const parsed = JSON.parse(raw);
            const firstName = sanitizeName(parsed.firstName) || "Michel";
            const lastName = sanitizeName(parsed.lastName) || "Duek";
            return { firstName, lastName };
        } catch {
            return { firstName: "Michel", lastName: "Duek" };
        }
    }

    static saveUser(user: User): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
}

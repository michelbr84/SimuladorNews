import { state } from '../../services/StateService';
import { News } from '../../models/News';

export class NewsItem {
    static create(item: News, index: number): HTMLElement {
        const row = document.createElement("div");
        row.className = "news-item";
        row.setAttribute("role", "option");
        row.setAttribute("aria-selected", "false");
        row.dataset.index = String(index);

        const date = document.createElement("div");
        date.className = "news-date";
        date.textContent = item.date;

        const title = document.createElement("div");
        title.className = "news-title";
        title.textContent = item.title;

        row.appendChild(date);
        row.appendChild(title);

        row.addEventListener("click", () => {
            state.selectedIndex = index;
        });

        return row;
    }
}

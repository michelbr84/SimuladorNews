import { state } from '../../services/StateService';
import { NewsItem } from './NewsItem';

export class NewsList {
    private listEl: HTMLElement | null;

    constructor() {
        this.listEl = document.getElementById("newsList");
        state.subscribe(() => this.render());
    }

    render() {
        if (!this.listEl) return;

        // Clear
        this.listEl.innerHTML = "";

        const visible = state.visibleNews;
        visible.forEach((item, idx) => {
            const row = NewsItem.create(item, idx);

            // Handle selection style
            if (idx === state.selectedIndex) {
                row.classList.add("is-selected");
                row.setAttribute("aria-selected", "true");
                // Scroll into view logic could go here, simplified for now
            }

            this.listEl?.appendChild(row);
        });
    }
}

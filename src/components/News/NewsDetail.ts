import { state } from '../../services/StateService';

export class NewsDetail {
    private titleEl: HTMLElement | null;
    private bodyEl: HTMLElement | null;
    private readNextBtn: HTMLElement | null;
    private filterSelect: HTMLSelectElement | null;

    constructor() {
        this.titleEl = document.getElementById("newsTitle");
        this.bodyEl = document.getElementById("newsBody");
        this.readNextBtn = document.getElementById("readNextBtn");
        this.filterSelect = document.getElementById("filterSelect") as HTMLSelectElement;

        this.init();
    }

    init() {
        state.subscribe(() => this.render());

        if (this.filterSelect) {
            this.filterSelect.addEventListener("change", (e) => {
                const val = (e.target as HTMLSelectElement).value;
                state.filter = val;
            });
        }

        if (this.readNextBtn) {
            this.readNextBtn.addEventListener("click", () => {
                this.readNext();
            });
        }
    }

    readNext() {
        const visible = state.visibleNews;
        if (visible.length === 0) return;
        const next = (state.selectedIndex + 1) % visible.length;
        state.selectedIndex = next;
    }

    render() {
        if (!this.titleEl || !this.bodyEl) return;

        if (state.visibleNews.length === 0) {
            this.titleEl.textContent = "Sem notícias neste filtro";
            this.bodyEl.textContent = "Altere o filtro para ver resultados.";
            return;
        }

        const item = state.visibleNews[state.selectedIndex];
        if (item) {
            this.titleEl.textContent = item.title;
            this.bodyEl.textContent = item.body;
        } else if (state.selectedIndex === -1 && state.visibleNews.length > 0) {
            // Auto select first
            state.selectedIndex = 0;
        }
    }
}

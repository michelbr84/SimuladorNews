import { state } from '../../services/StateService';

export class FooterNav {
    private backBtn: HTMLElement | null;
    private nextBtn: HTMLElement | null;

    constructor() {
        this.backBtn = document.getElementById("backBtn");
        this.nextBtn = document.getElementById("nextBtn");

        this.init();
    }

    init() {
        if (this.backBtn) this.backBtn.addEventListener("click", () => this.go(-1));
        if (this.nextBtn) this.nextBtn.addEventListener("click", () => this.go(1));
    }

    go(dir: number) {
        const visible = state.visibleNews;
        if (visible.length === 0) return;

        // Simple wrap logic
        let next = state.selectedIndex + dir;
        if (next < 0) next = visible.length - 1;
        if (next >= visible.length) next = 0;

        state.selectedIndex = next;
    }
}

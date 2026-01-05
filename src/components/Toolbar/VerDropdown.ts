export class VerDropdown {
    private root: HTMLElement | null;
    private btn: HTMLElement | null;
    private items: HTMLElement[];
    private labelEl: HTMLElement | null;

    constructor(selector: string, labelId: string) {
        this.root = document.querySelector(selector);
        this.labelEl = document.getElementById(labelId);
        this.items = this.root ? Array.from(this.root.querySelectorAll(".tool-item")) : [];
        this.btn = this.root ? this.root.querySelector(".tool-btn--dd") : null;

        this.init();
    }

    init() {
        if (!this.root || !this.btn) return;

        this.btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggle();
        });

        this.items.forEach(item => {
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                this.select(item);
            });
        });

        document.addEventListener("click", (e) => {
            if (this.root && !this.root.contains(e.target as Node)) {
                this.close();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.close();
        });
    }

    toggle() {
        const isOpen = this.root?.classList.contains("is-open");
        if (isOpen) this.close();
        else this.open();
    }

    open() {
        this.root?.classList.add("is-open");
        this.btn?.setAttribute("aria-expanded", "true");
    }

    close() {
        this.root?.classList.remove("is-open");
        this.btn?.setAttribute("aria-expanded", "false");
    }

    select(item: HTMLElement) {
        this.items.forEach(i => i.classList.remove("is-active"));
        item.classList.add("is-active");

        const value = item.getAttribute("data-value") || item.textContent?.trim() || "";
        if (this.labelEl) this.labelEl.textContent = value;

        this.close();
    }
}

import { state } from '../../services/StateService';

export class SidebarMenu {
    private roots: HTMLElement[];

    constructor() {
        this.roots = Array.from(document.querySelectorAll(".sdd"));
        this.init();
    }

    init() {
        this.roots.forEach(dd => {
            const btn = dd.querySelector(".side-btn--dd");
            if (!btn) return;

            // Toggle
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                this.toggle(dd);
            });

            // Items click
            dd.querySelectorAll(".sdd-item").forEach(item => {
                item.addEventListener("click", () => {
                    if (item.classList.contains("has-sub")) return;
                    this.closeAll();
                });
            });

            // Default Open 'ver'
            if (dd.dataset.sdd === "ver") {
                dd.classList.add("is-open");
            }
        });

        // Close on click outside
        document.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (!this.isInside(target)) this.closeAll();
        });

        // Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") this.closeAll();
        });
    }

    toggle(dd: HTMLElement) {
        const willOpen = !dd.classList.contains("is-open");
        this.closeAll();
        if (willOpen) dd.classList.add("is-open");
    }

    closeAll() {
        this.roots.forEach(dd => dd.classList.remove("is-open"));
    }

    isInside(node: HTMLElement): boolean {
        return this.roots.some(dd => dd.contains(node));
    }
}

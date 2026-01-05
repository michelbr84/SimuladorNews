// Basic Tab Handling (UI only for now as logic is mocked)
export class Tabs {
    private tabs: HTMLElement[];

    constructor() {
        this.tabs = Array.from(document.querySelectorAll(".tab"));
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                this.tabs.forEach(t => {
                    t.classList.remove("is-active");
                    t.setAttribute("aria-selected", "false");
                });
                tab.classList.add("is-active");
                tab.setAttribute("aria-selected", "true");
            });
        });
    }
}

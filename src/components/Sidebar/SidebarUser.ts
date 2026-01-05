import { state } from '../../services/StateService';
import { sanitizeName } from '../../utils/sanitize';

export class SidebarUser {
    private firstNameEl: HTMLElement | null;
    private lastNameEl: HTMLElement | null;
    private editBtn: HTMLElement | null;

    constructor() {
        this.firstNameEl = document.getElementById("sideFirstName");
        this.lastNameEl = document.getElementById("sideLastName");
        this.editBtn = document.getElementById("editUserBtn");

        this.init();
    }

    init() {
        // Initial render
        this.render();

        // Subscribe to state changes
        state.subscribe(() => this.render());

        // Edit button event
        if (this.editBtn) {
            this.editBtn.addEventListener("click", () => {
                // Dispatch custom event or call generic open modal
                document.dispatchEvent(new CustomEvent('open-user-modal'));
            });
        }
    }

    render() {
        if (this.firstNameEl) this.firstNameEl.textContent = state.user.firstName;
        if (this.lastNameEl) this.lastNameEl.textContent = state.user.lastName;
    }
}

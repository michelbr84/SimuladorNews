import { state } from '../../services/StateService';
import { sanitizeName } from '../../utils/sanitize';

export class EditUserModal {
    private root: HTMLElement | null;
    private form: HTMLFormElement | null;
    private firstInput: HTMLInputElement | null;
    private lastInput: HTMLInputElement | null;

    constructor() {
        this.root = document.getElementById("userModal");
        this.form = document.getElementById("userForm") as HTMLFormElement;
        this.firstInput = document.getElementById("firstNameInput") as HTMLInputElement;
        this.lastInput = document.getElementById("lastNameInput") as HTMLInputElement;

        this.init();
    }

    init() {
        if (!this.root || !this.form) return;

        // Open event
        document.addEventListener("open-user-modal", () => this.open());

        // Close logic
        this.root.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).dataset.close === "1") {
                this.close();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.root?.classList.contains("is-open")) {
                this.close();
            }
        });

        // Submit
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            const first = sanitizeName(this.firstInput?.value);
            const last = sanitizeName(this.lastInput?.value);

            state.user = {
                firstName: first || "Michel",
                lastName: last || "Duek"
            };

            this.close();
        });
    }

    open() {
        if (this.root && this.firstInput && this.lastInput) {
            this.firstInput.value = state.user.firstName;
            this.lastInput.value = state.user.lastName;
            this.root.classList.add("is-open");
            this.root.setAttribute("aria-hidden", "false");
            setTimeout(() => this.firstInput?.focus(), 0);
        }
    }

    close() {
        this.root?.classList.remove("is-open");
        this.root?.setAttribute("aria-hidden", "true");
    }
}

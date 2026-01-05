import { VerDropdown } from './VerDropdown';

export class Toolbar {
    constructor() {
        // Initialize "Ver" dropdown
        new VerDropdown('[data-tool-dd="ver"]', 'verLabel');
        // Initialize "Critério" dropdown
        new VerDropdown('[data-tool-dd="criterio"]', 'critLabel'); // Reusing the same class logic
    }
}

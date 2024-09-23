import { fetchLanguagePlaceholders, getPathDetails } from '../scripts.js';

export default class ResponsiveList {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.initialize();
    }

    initialize() {
        const { lang } = getPathDetails();
        Promise.all([
          fetchLanguagePlaceholders(lang),
          loadCSS(`${window.hlx.codeBasePath}/scripts/responsive-list/responsive-list.css`),
        ]).then(([placeholders]) => {
          this.placeholders = placeholders;
        });
    }
}
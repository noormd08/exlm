import { htmlToElement } from '../scripts.js';
import { decorateIcons, loadCSS } from '../lib-franklin.js';
import { decorateBookmark, bookmarkHandler } from './bookmark.js';
import { copyHandler, decorateCopyLink } from './copy-link.js';

let placeholders = {};
try {
  placeholders = await fetchLanguagePlaceholders();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Error fetching placeholders:', err);
}

/**
 * UserActions component to handle user action buttons like bookmark and copy link.
 * 
 * @param {Object} config - Configuration object.
 * @param {HTMLElement} config.container - The container element to which user actions will be appended.
 * @param {string} config.id - Page id.
 * @param {string} config.link - The link to be copied.
 * @param {Function} config.callback - Callback function to be called on button click.
 * 
 * @returns {Object} - Object with a decorate method to render user actions.
 */
const UserActions = (config) => {
    const { container, id, link, callback } = config;

    /**
     * Renders an icon as an HTML string.
     * 
     * @param {string} icon - Icon name.
     * @returns {string} - HTML string for the icon.
     */
    const renderIcon = (icon) => {
        return `<span class="icon icon-${icon}"></span>`;
    }

    /**
     * Adds an action button to the user actions.
     * 
     * @param {Object} param - Action parameters.
     * @param {string} param.name - Action name.
     * @param {Array<string>} param.icons - List of icon names.
     * @param {Function} param.onButtonReady - Callback function called when button is ready.
     * @param {Function} param.onButtonClick - Callback function called when button is clicked.
     * 
     * @returns {HTMLElement} - The action button element.
     */
    const addAction = ({ name, icons, onButtonReady, onButtonClick }) => {
        const iconSpans = icons.map(renderIcon).join('');
        const button = htmlToElement(`<button class="${name}">${iconSpans}</button>`);
        decorateIcons(button);
        if (onButtonReady) {
            onButtonReady(button);
        }
        if (onButtonClick) {
            button.addEventListener('click', (event) => {
                if (event.target === 'button' || event.target.closest('button')) {
                    onButtonClick(button);
                    if (callback) {
                        callback();
                    }
                }
            });
        }
        return button;
    }

    /**
     * Decorates the container with user action buttons.
     */
    const decorate = async () => {
        await loadCSS('/scripts/user-actions/user-actions.css');
        const actions = htmlToElement(`<div class="user-actions"></div>`);
        const actionDefinitions = [{
            name: 'bookmark',
            icons: ['bookmark', 'bookmark-active'],
            onButtonReady: (element) => decorateBookmark({
                element, 
                id,
                placeholders: {
                    bookmarkPage: '',
                    removeBookmark: '',
                    signInToBookmark: ''
                }
            }),
            onButtonClick: (element) => bookmarkHandler({
                element,
                id,
                placeholders: {
                    bookmarkToastText: placeholders?.bookmarkAuthLabelSet || '',
                    removeBookmarkToastText: placeholders?.bookmarkAuthLabelRemove || '',
                }
            }),
        }, {
            name: 'copy-link',
            icons: ['copy'],
            onButtonReady: (element) => decorateCopyLink(element),
            onButtonClick: () => copyHandler({
                id, 
                link, 
                toastText: placeholders?.toastSet || 'Copy',
            }),
        }];

        actionDefinitions.forEach((def) => {
            actions.append(addAction(def));
        });

        container.appendChild(actions);
    }

    return {
        decorate,
    };
};

export default UserActions;

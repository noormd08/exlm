import { htmlToElement } from '../scripts.js';
import { decorateIcons, loadCSS } from '../lib-franklin.js';
import { decorateBookmark, bookmarkHandler } from './bookmark.js';
import { copyHandler, decorateCopyLink } from './copy-link.js';

loadCSS('/scripts/user-actions/user-actions.css');

const UserActions = (config) => {
    const { container, id, link, callback } = config;

    const renderIcon = (icon) => {
        return `<span class="icon icon-${icon}"></span>`;
    }

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

    const decorate = async () => {
        const actions = htmlToElement(`<div class="user-actions"></div>`);
        const actionDefinitions = [{
            name: 'bookmark',
            icons: ['bookmark', 'bookmark-active'],
            onButtonReady: (element) => decorateBookmark({
                element, 
                id
            }),
            onButtonClick: (element) => bookmarkHandler({
                element,
                id,
                toastText: 'Test'
            }),
        }, {
            name: 'copy-link',
            icons: ['copy'],
            onButtonReady: (element) => decorateCopyLink(element),
            onButtonClick: () => copyHandler({
                id, 
                link, 
                toastText: 'Copied'
            }),
        }];

        actionDefinitions.forEach((def) => {
            actions.append(addAction(def));
        });

        container.appendChild(actions);    
        await decorateIcons(container, '', true);
    }

    return {
        decorate,
    };
    
};

export default UserActions;
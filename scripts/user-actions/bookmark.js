import { defaultProfileClient, isSignedInUser } from '../auth/profile.js';
import { createPlaceholderSpan } from '../scripts.js';
import { sendNotice } from '../toast/toast.js';
import { assetInteractionModel } from '../analytics/lib-analytics.js';

/**
 * Checks if a given bookmark ID is present in the user's bookmarks.
 * 
 * @param {string} bookmarkId - The bookmark ID to check.
 * @returns {Promise<boolean>} - Returns true if the bookmark exists, otherwise false.
 */
async function isBookmarked(bookmarkId) {
    const profile = await defaultProfileClient.getMergedProfile();
    return profile?.bookmarks.some((bookmarkIdInfo) => `${bookmarkIdInfo}`.includes(bookmarkId));
}

/**
 * Handles the bookmark action by adding or removing a bookmark.
 * 
 * @param {Object} config - Configuration object.
 * @param {HTMLElement} config.element - The element representing the bookmark button.
 * @param {string} config.id - Unique identifier for the asset to be bookmarked.
 * @param {string} config.placeholders - Placeholder object to be displayed in a toast notification.
 */
export async function bookmarkHandler(config) {
    const { element, id, placeholders } = config;
    const profileData = await defaultProfileClient.getMergedProfile();
    const { bookmarks = [] } = profileData;
    const targetBookmarkItem = bookmarks.find((bookmarkIdInfo) => `${bookmarkIdInfo}`.includes(id));
    const newBookmarks = bookmarks.filter((bookmarkIdInfo) => !`${bookmarkIdInfo}`.includes(id));
    if (!targetBookmarkItem) {
        newBookmarks.push(`${id}:${Date.now()}`);
        element.dataset.bookmarked = true;
        defaultProfileClient.updateProfile('bookmarks', newBookmarks, true);
        sendNotice(placeholders?.bookmarkToastText);
        assetInteractionModel(id, 'Bookmarked');
    } else {
        element.dataset.bookmarked = false;
        defaultProfileClient.updateProfile('bookmarks', newBookmarks, true);
        sendNotice(placeholders?.removeBookmarkToastText);
        assetInteractionModel(id, 'Bookmark Removed');
    }
    return true;
}

/**
 * Decorates a bookmark button with tooltips and handles sign-in state.
 * 
 * @param {Object} config - Configuration object.
 * @param {HTMLElement} config.element - The element representing the bookmark button.
 * @param {string} config.id - Unique identifier for the page/card to be bookmarked.
 * @param {string} config.placeholders - Placeholders object.
 */
export async function decorateBookmark(config) {
    const { element, id, placeholders } = config;
    const isSignedIn = await isSignedInUser();

    if (isSignedIn) {
        element.dataset.signedIn = true;

        const bookmarkTooltip = createPlaceholderSpan(placeholders?.bookmarkPage, 'Bookmark Page', (span) => {
            span.classList.add('action-tooltip', 'bookmark-tooltip');
        });

        const removeBookmarkTooltip = createPlaceholderSpan(placeholders?.removeBookmark, 'Remove Bookmark', (span) => {
            span.classList.add('action-tooltip', 'remove-bookmark-tooltip');
        });

        element.appendChild(bookmarkTooltip);
        element.appendChild(removeBookmarkTooltip);

        element.dataset.bookmarked = await isBookmarked(id);
    } else {
        const signInToBookmarkTooltip = createPlaceholderSpan(placeholders?.signInToBookmark, 'Sign-in to bookmark', (span) => {
            span.classList.add('action-tooltip', 'signedin-tooltip');
        });
        element.appendChild(signInToBookmarkTooltip);
        element.disabled = true;
    }
}

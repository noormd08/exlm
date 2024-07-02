import { defaultProfileClient, isSignedInUser } from '../auth/profile.js';
import { createPlaceholderSpan } from '../scripts.js';
import { sendNotice } from '../toast/toast.js';
import { assetInteractionModel } from '../analytics/lib-analytics.js';

async function isBookmarked(bookmarkId) {
    const profile = await defaultProfileClient.getMergedProfile();
    return profile?.bookmarks.some((bookmarkIdInfo) => `${bookmarkIdInfo}`.includes(bookmarkId));
}

export async function bookmarkHandler(config) {
    const { element, id, toastText } = config;
    const profileData = await defaultProfileClient.getMergedProfile();
    const { bookmarks = [] } = profileData;
    const targetBookmarkItem = bookmarks.find((bookmarkIdInfo) => `${bookmarkIdInfo}`.includes(id));
    const newBookmarks = bookmarks.filter((bookmarkIdInfo) => !`${bookmarkIdInfo}`.includes(id));
    if (targetBookmarkItem) {
        element.dataset.bookmarked = false;
        defaultProfileClient.updateProfile('bookmarks', newBookmarks, true);
        sendNotice(toastText);
        assetInteractionModel(id, 'Bookmark Removed');
    }
    else {
        newBookmarks.push(`${id}:${Date.now()}`);
        element.dataset.bookmarked = true;
        defaultProfileClient.updateProfile('bookmarks', newBookmarks, true);
        sendNotice(toastText);
        assetInteractionModel(id, 'Bookmarked');
    }    
}

export async function decorateBookmark(config) {
    const { element, id } = config;
    const isSignedIn = await isSignedInUser();

    if (isSignedIn) {
        element.dataset.signedIn = true;

        const bookmarkTooltip = createPlaceholderSpan('Bookmark Page', 'Bookmark Page', (span) => {
            span.classList.add('action-tooltip', 'bookmark-tooltip');
        });
    
        const removeBookmarkTooltip = createPlaceholderSpan('Remove Bookmark', 'Remove Bookmark', (span) => {
            span.classList.add('action-tooltip', 'remove-bookmark-tooltip');
        });

        element.appendChild(bookmarkTooltip);
        element.appendChild(removeBookmarkTooltip);

        element.dataset.bookmarked = await isBookmarked(id);
    }
    else {
        const signInToBookmarkTooltip = createPlaceholderSpan('Sign-in to bookmark', 'Sign-in to bookmark', (span) => {
            span.classList.add('action-tooltip', 'signedin-tooltip');
        });
        element.appendChild(signInToBookmarkTooltip);
        element.disabled = true;
    }
}
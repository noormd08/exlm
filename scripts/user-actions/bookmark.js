import { defaultProfileClient, isSignedInUser } from '../auth/profile.js';
import { createPlaceholderSpan } from '../scripts.js';
import { sendNotice } from '../toast/toast.js';
import { assetInteractionModel } from '../analytics/lib-analytics.js';

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

async function isBookmarked(bookmarkId) {
    const profile = await defaultProfileClient.getMergedProfile();
    return profile?.bookmarks.some((bookmarkIdInfo) => `${bookmarkIdInfo}`.includes(bookmarkId));
}

export async function decorateBookmark(bookmarkButton, id) {
    const isSignedIn = await isSignedInUser();

    if (isSignedIn) {
        bookmarkButton.dataset.signedIn = true;

        const bookmarkTooltip = createPlaceholderSpan('Bookmark Page', 'Bookmark Page', (span) => {
            span.classList.add('action-tooltip', 'bookmark-tooltip');
        });
    
        const removeBookmarkTooltip = createPlaceholderSpan('Remove Bookmark', 'Remove Bookmark', (span) => {
            span.classList.add('action-tooltip', 'remove-bookmark-tooltip');
        });

        bookmarkButton.appendChild(bookmarkTooltip);
        bookmarkButton.appendChild(removeBookmarkTooltip);

        bookmarkButton.dataset.bookmarked = await isBookmarked(id);
    }
    else {
        const signInToBookmarkTooltip = createPlaceholderSpan('Sign-in to bookmark', 'Sign-in to bookmark', (span) => {
            span.classList.add('action-tooltip', 'signedin-tooltip');
        });
        bookmarkButton.appendChild(signInToBookmarkTooltip);
        bookmarkButton.disabled = true;
    }
}
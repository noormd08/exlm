import { defaultProfileClient, isSignedInUser } from '../auth/profile.js';
import { createPlaceholderSpan } from '../scripts.js';
import { sendNotice } from '../toast/toast.js';

export async function bookmarkHandler(config) {
    const { element, id, toastText } = config;
    sendNotice(toastText);
    // assetInteractionModel(bookmarkId, 'Bookmarked')
}

async function isBookmarked(bookmarkId) {
    const profile = await defaultProfileClient.getMergedProfile();
    return profile?.bookmarks.find((bookmarkIdInfo) => bookmarkIdInfo.includes(bookmarkId)) || false;
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

        bookmarkButton.dataset.bookmarked = isBookmarked(id);

        const bookmarkId = '';
        const profileData = await defaultProfileClient.getMergedProfile();
        const { bookmarks = [] } = profileData;
        const targetBookmarkItem = bookmarks.find((bookmarkIdInfo) => `${bookmarkIdInfo}`.includes(bookmarkId));
        if (targetBookmarkItem) {
            bookmarkButton.dataset.bookmarked = true;
        }
    }
    else {
        const signInToBookmarkTooltip = createPlaceholderSpan('Sign-in to bookmark', 'Sign-in to bookmark', (span) => {
            span.classList.add('action-tooltip', 'signedin-tooltip');
        });
        bookmarkButton.appendChild(signInToBookmarkTooltip);
        bookmarkButton.disabled = true;
    }
}
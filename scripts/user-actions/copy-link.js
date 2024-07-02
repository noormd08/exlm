import { createPlaceholderSpan } from '../scripts.js';
import { sendNotice } from '../toast/toast.js';
import { assetInteractionModel } from '../analytics/lib-analytics.js';

/**
 * Copies text to the clipboard and shows a toast notification.
 * 
 * @param {Object} params - Parameters for copying to clipboard.
 * @param {string} params.assetId - Page Id.
 * @param {string} params.text - Text to be copied to the clipboard.
 * @param {string} params.toastText - Text to be displayed in a toast notification.
 */
export function copyToClipboard({ assetId = '', text, toastText }) {
    try {
      navigator.clipboard.writeText(text);
      if (toastText) {
        sendNotice(toastText);
      }
      assetInteractionModel(assetId, 'Copy');
    } catch (err) {
      /* eslint-disable-next-line no-console */
      console.error('Error copying link to clipboard:', err);
    }
}

/**
 * Handles the copy action by formatting the link and calling copyToClipboard.
 * 
 * @param {Object} config - Configuration object.
 * @param {string} config.id - Page Id
 * @param {string} config.link - The link to be copied.
 * @param {string} config.toastText - Text to be displayed in a toast notification.
 */
export function copyHandler(config) {
    const { id, link, toastText } = config;
    if (link) {
      const text = link.startsWith('/') ? `${window.location.origin}${link}` : link;
      copyToClipboard({
          assetId: id,
          text,
          toastText
      });
    }    
}

/**
 * Decorates a copy link button with a tooltip.
 * 
 * @param {HTMLElement} copyButton - The button element to be decorated.
 */
export async function decorateCopyLink(copyButton) {
  const tooltip = createPlaceholderSpan('Copy Link', 'Copy Link', (span) => {
    span.classList.add('action-tooltip');
  });
  copyButton.appendChild(tooltip);
}

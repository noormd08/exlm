import { createPlaceholderSpan } from '../scripts.js';
import { sendNotice } from '../toast/toast.js';
import { assetInteractionModel } from '../analytics/lib-analytics.js';

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

export async function decorateCopyLink(copyButton) {
  const tooltip = createPlaceholderSpan('Copy Link', 'Copy Link', (span) => {
    span.classList.add('action-tooltip');
  });
  copyButton.appendChild(tooltip);
}
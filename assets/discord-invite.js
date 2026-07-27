(() => {
  'use strict';
  const inviteUrl = 'https://discord.gg/astria-ss1';
  const currentButton = document.getElementById('discordButton');
  if (!currentButton) return;

  // Replace the original demo button to remove the placeholder toast listener.
  const inviteButton = currentButton.cloneNode(true);
  inviteButton.setAttribute('aria-label', 'เข้าร่วม Discord ของ Astria');
  inviteButton.title = 'เข้าร่วม Astria Discord';
  currentButton.replaceWith(inviteButton);

  inviteButton.addEventListener('click', () => {
    const opened = window.open(inviteUrl, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = inviteUrl;
  });

  const toast = document.getElementById('toast');
  if (toast) toast.remove();
})();

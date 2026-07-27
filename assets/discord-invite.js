(() => {
  'use strict';
  const inviteUrl = 'https://discord.gg/astria-ss1';
  const currentButton = document.getElementById('discordButton');
  if (!currentButton) return;

  // A native link guarantees one navigation. Checking window.open()'s return
  // value is unreliable with noopener and could previously trigger a second URL.
  const inviteLink = document.createElement('a');
  inviteLink.id = currentButton.id;
  inviteLink.className = currentButton.className;
  inviteLink.textContent = currentButton.textContent;
  inviteLink.href = inviteUrl;
  inviteLink.target = '_blank';
  inviteLink.rel = 'noopener noreferrer';
  inviteLink.setAttribute('aria-label', 'เข้าร่วม Discord ของ Astria');
  inviteLink.title = 'เข้าร่วม Astria Discord';
  currentButton.replaceWith(inviteLink);

  const toast = document.getElementById('toast');
  if (toast) toast.remove();
})();

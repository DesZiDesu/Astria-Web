(() => {
  'use strict';

  const MAIN_VIEW = 'main';
  const site = document.querySelector('#siteShell');

  function forceMainPage(){
    document.querySelectorAll('[data-view-panel]').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.viewPanel === MAIN_VIEW);
    });
    document.querySelectorAll('[data-view]').forEach(button => {
      button.classList.toggle('active', button.dataset.view === MAIN_VIEW);
    });

    document.querySelector('#navList')?.classList.remove('open');
    document.querySelector('#menuToggle')?.setAttribute('aria-expanded', 'false');

    const mainUrl = `${location.pathname}${location.search}#${MAIN_VIEW}`;
    history.replaceState(null, '', mainUrl);
    window.scrollTo(0, 0);
  }

  function stopAndRemoveLegacyIntro(){
    const skip = document.querySelector('#skipIntro');
    if(skip) skip.click();

    document.querySelector('#introStage')?.remove();
    document.body.classList.remove('intro-pending');
  }

  function playLandingSequence(){
    if(!site) return;
    site.classList.remove('site-entering', 'landing-entering');
    site.classList.add('is-visible');
    void site.offsetWidth;
    site.classList.add('landing-entering');
    window.setTimeout(() => site.classList.remove('landing-entering'), 4300);
  }

  stopAndRemoveLegacyIntro();
  forceMainPage();
  playLandingSequence();

  window.addEventListener('pageshow', event => {
    forceMainPage();
    if(event.persisted) playLandingSequence();
  });
})();

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

  function buildTeamDirectory(){
    const shell = document.querySelector('[data-view-panel="team"] .team-tree-shell');
    if(!shell || shell.dataset.optimized === 'true') return;

    const memberCard = number => `
      <article class="team-profile">
        <div class="team-photo-placeholder" aria-label="ช่องสำหรับรูปสมาชิก"></div>
        <div class="team-profile-copy">
          <span class="team-profile-kicker">TEAM MEMBER</span>
          <h4>MEMBER ${String(number).padStart(2,'0')}</h4>
          <p>ตำแหน่ง / หน้าที่รับผิดชอบ</p>
        </div>
      </article>`;

    shell.dataset.optimized = 'true';
    shell.innerHTML = `
      <div class="team-directory">
        <header class="team-directory-intro">
          <div class="team-directory-kicker">ASTRIA PROJECT · STAFF DIRECTORY</div>
          <h3>PROJECT TEAM</h3>
          <p>โครงสร้างทีมงานแบบเรียบง่ายและโหลดรวดเร็ว หัวหน้าทีมอยู่ด้านบน สมาชิกแบ่งเป็นสองกลุ่มบนเดสก์ท็อป และเรียงเป็นคอลัมน์เดียวบนมือถือ</p>
        </header>

        <section class="team-lead-area" aria-label="หัวหน้าทีม">
          <article class="team-profile team-profile-lead">
            <div class="team-photo-placeholder" aria-label="ช่องสำหรับรูปหัวหน้าทีม"></div>
            <div class="team-profile-copy">
              <span class="team-profile-kicker">PROJECT LEAD</span>
              <h4>LEAD NAME</h4>
              <p>ตำแหน่ง / หน้าที่หลักของหัวหน้าทีม</p>
            </div>
          </article>
        </section>

        <div class="team-directory-rule" aria-hidden="true"></div>

        <div class="team-columns">
          <section class="team-column" aria-labelledby="teamGroupA">
            <h4 class="team-group-title" id="teamGroupA">TEAM GROUP A</h4>
            ${[1,2,3,4].map(memberCard).join('')}
          </section>

          <section class="team-column" aria-labelledby="teamGroupB">
            <h4 class="team-group-title" id="teamGroupB">TEAM GROUP B</h4>
            ${[5,6,7,8].map(memberCard).join('')}
          </section>
        </div>

        <div class="team-directory-footnote">OPTIMIZED STATIC DIRECTORY · NO HEAVY VISUAL EFFECTS</div>
      </div>`;
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
  buildTeamDirectory();
  forceMainPage();
  playLandingSequence();

  window.addEventListener('pageshow', event => {
    buildTeamDirectory();
    forceMainPage();
    if(event.persisted) playLandingSequence();
  });
})();

(() => {
  'use strict';

  const MAIN_VIEW = 'main';
  const site = document.querySelector('#siteShell');
  const TREE_SIZE = { width: 1200, height: 1600 };
  const TEAM_MEMBERS = [
    { id:'owner', name:'PROJECT OWNER', role:'ROLE PENDING', x:600, y:720, owner:true },
    { id:'member-01', name:'MEMBER 01', role:'ROLE PENDING', x:160, y:205 },
    { id:'member-02', name:'MEMBER 02', role:'ROLE PENDING', x:1040, y:205 },
    { id:'member-03', name:'MEMBER 03', role:'ROLE PENDING', x:115, y:455 },
    { id:'member-04', name:'MEMBER 04', role:'ROLE PENDING', x:1085, y:455 },
    { id:'member-05', name:'MEMBER 05', role:'ROLE PENDING', x:165, y:820 },
    { id:'member-06', name:'MEMBER 06', role:'ROLE PENDING', x:1035, y:820 },
    { id:'member-07', name:'MEMBER 07', role:'ROLE PENDING', x:225, y:1215 },
    { id:'member-08', name:'MEMBER 08', role:'ROLE PENDING', x:975, y:1215 }
  ];

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

  function teamTreeSvg(){
    return `
      <svg class="luminous-tree-svg" viewBox="0 0 1200 1600" role="img" aria-label="ต้นไม้เรืองแสงสีทองแสดงโครงสร้างทีมงาน">
        <defs>
          <linearGradient id="luminousTrunk" x1="440" y1="1500" x2="820" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#805111"/><stop offset=".28" stop-color="#d59621"/>
            <stop offset=".55" stop-color="#fff1a6"/><stop offset=".79" stop-color="#d08a1d"/>
            <stop offset="1" stop-color="#7a4b0e"/>
          </linearGradient>
          <radialGradient id="luminousLeaf" cx="42%" cy="34%" r="78%">
            <stop offset="0" stop-color="#fff9d2"/><stop offset=".42" stop-color="#ffd35b"/>
            <stop offset="1" stop-color="#9b5f0e"/>
          </radialGradient>
          <filter id="treeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="sparkGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="13" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <g class="tree-energy-halo" filter="url(#treeGlow)" fill="none" stroke="#ffc947" stroke-linecap="round">
          <path d="M600 1515C548 1354 570 1185 600 1015C630 845 575 686 606 530C632 396 584 278 604 105" stroke-width="52"/>
          <path d="M603 274C512 219 431 178 316 147M605 274C694 220 778 178 887 147M602 449C487 414 379 404 251 421M604 449C720 414 824 402 950 421M601 672C494 684 400 724 282 801M605 672C712 684 806 724 922 801M598 947C496 981 422 1044 340 1139M606 947C710 981 784 1045 864 1139" stroke-width="22"/>
        </g>
        <g class="tree-wood" filter="url(#treeGlow)" fill="none" stroke="url(#luminousTrunk)" stroke-linecap="round" stroke-linejoin="round">
          <path d="M600 1520C551 1355 573 1185 601 1017C631 845 575 685 606 529C635 397 584 277 604 104" stroke-width="21"/>
          <path d="M603 1518C656 1360 631 1189 607 1017C583 843 638 688 606 532" stroke-width="8" opacity=".58"/>
          <path d="M595 1490C529 1477 456 1491 372 1528M608 1490C678 1477 752 1492 836 1529M594 1474C548 1538 525 1574 488 1595M608 1474C651 1538 674 1574 711 1595M598 1446C521 1419 454 1420 368 1449M607 1446C680 1420 750 1420 838 1450" stroke-width="10"/>
          <path d="M603 274C512 219 431 178 316 147M605 274C694 220 778 178 887 147" stroke-width="12"/>
          <path d="M602 449C487 414 379 404 251 421M604 449C720 414 824 402 950 421" stroke-width="11"/>
          <path d="M601 672C494 684 400 724 282 801M605 672C712 684 806 724 922 801" stroke-width="10"/>
          <path d="M598 947C496 981 422 1044 340 1139M606 947C710 981 784 1045 864 1139" stroke-width="8"/>
          <path d="M316 147C249 112 194 82 138 38M316 147C242 150 184 169 120 205M412 205C357 150 327 101 306 41M478 250C428 203 397 164 376 116M887 147C955 112 1008 82 1063 38M887 147C966 150 1022 170 1083 205M791 205C847 150 877 101 899 41M727 250C777 203 808 164 829 116" stroke-width="5"/>
          <path d="M251 421C177 388 122 354 70 302M251 421C177 429 116 460 61 507M356 412C293 367 265 325 243 278M456 447C397 402 367 363 349 320M950 421C1025 388 1078 354 1130 302M950 421C1026 429 1085 460 1142 507M845 412C909 367 937 325 959 278M745 447C805 402 834 363 853 320" stroke-width="5"/>
          <path d="M282 801C206 835 150 887 95 960M282 801C205 786 146 786 81 802M385 742C318 778 276 826 233 881M474 700C420 735 388 775 361 821M922 801C999 835 1054 887 1109 960M922 801C999 786 1060 786 1124 802M819 742C886 778 929 826 971 881M730 700C784 735 816 775 844 821" stroke-width="4.8"/>
          <path d="M340 1139C280 1194 239 1262 205 1336M340 1139C270 1135 216 1152 159 1186M437 1050C380 1101 350 1157 321 1219M864 1139C925 1194 967 1262 1000 1336M864 1139C934 1134 990 1151 1046 1185M767 1050C824 1101 854 1157 883 1219" stroke-width="4.5"/>
        </g>
        <g class="tree-leaves" fill="url(#luminousLeaf)" filter="url(#sparkGlow)">
          <ellipse cx="138" cy="38" rx="16" ry="34" transform="rotate(-40 138 38)"/><ellipse cx="120" cy="205" rx="15" ry="31" transform="rotate(67 120 205)"/>
          <ellipse cx="306" cy="41" rx="14" ry="31" transform="rotate(-9 306 41)"/><ellipse cx="376" cy="116" rx="13" ry="28" transform="rotate(-19 376 116)"/>
          <ellipse cx="447" cy="70" rx="16" ry="34" transform="rotate(-34 447 70)"/><ellipse cx="1063" cy="38" rx="16" ry="34" transform="rotate(40 1063 38)"/>
          <ellipse cx="1083" cy="205" rx="15" ry="31" transform="rotate(-67 1083 205)"/><ellipse cx="899" cy="41" rx="14" ry="31" transform="rotate(9 899 41)"/>
          <ellipse cx="829" cy="116" rx="13" ry="28" transform="rotate(19 829 116)"/><ellipse cx="765" cy="70" rx="16" ry="34" transform="rotate(34 765 70)"/>
          <ellipse cx="70" cy="302" rx="16" ry="34" transform="rotate(-48 70 302)"/><ellipse cx="61" cy="507" rx="16" ry="34" transform="rotate(72 61 507)"/>
          <ellipse cx="243" cy="278" rx="13" ry="29" transform="rotate(-24 243 278)"/><ellipse cx="349" cy="320" rx="13" ry="29" transform="rotate(-20 349 320)"/>
          <ellipse cx="1130" cy="302" rx="16" ry="34" transform="rotate(48 1130 302)"/><ellipse cx="1142" cy="507" rx="16" ry="34" transform="rotate(-72 1142 507)"/>
          <ellipse cx="959" cy="278" rx="13" ry="29" transform="rotate(24 959 278)"/><ellipse cx="853" cy="320" rx="13" ry="29" transform="rotate(20 853 320)"/>
          <ellipse cx="95" cy="960" rx="16" ry="35" transform="rotate(-42 95 960)"/><ellipse cx="81" cy="802" rx="15" ry="31" transform="rotate(75 81 802)"/>
          <ellipse cx="233" cy="881" rx="14" ry="30" transform="rotate(-34 233 881)"/><ellipse cx="361" cy="821" rx="13" ry="28" transform="rotate(-24 361 821)"/>
          <ellipse cx="1109" cy="960" rx="16" ry="35" transform="rotate(42 1109 960)"/><ellipse cx="1124" cy="802" rx="15" ry="31" transform="rotate(-75 1124 802)"/>
          <ellipse cx="971" cy="881" rx="14" ry="30" transform="rotate(34 971 881)"/><ellipse cx="844" cy="821" rx="13" ry="28" transform="rotate(24 844 821)"/>
          <ellipse cx="205" cy="1336" rx="15" ry="32" transform="rotate(-24 205 1336)"/><ellipse cx="159" cy="1186" rx="14" ry="30" transform="rotate(72 159 1186)"/>
          <ellipse cx="321" cy="1219" rx="13" ry="28" transform="rotate(-34 321 1219)"/><ellipse cx="1000" cy="1336" rx="15" ry="32" transform="rotate(24 1000 1336)"/>
          <ellipse cx="1046" cy="1185" rx="14" ry="30" transform="rotate(-72 1046 1185)"/><ellipse cx="883" cy="1219" rx="13" ry="28" transform="rotate(34 883 1219)"/>
        </g>
        <g class="tree-sparks" fill="#fff0a6" filter="url(#sparkGlow)">
          <circle cx="604" cy="104" r="8"/><circle cx="316" cy="147" r="5"/><circle cx="887" cy="147" r="5"/>
          <circle cx="251" cy="421" r="5"/><circle cx="950" cy="421" r="5"/><circle cx="282" cy="801" r="5"/>
          <circle cx="922" cy="801" r="5"/><circle cx="340" cy="1139" r="4"/><circle cx="864" cy="1139" r="4"/>
          <circle cx="542" cy="318" r="3"/><circle cx="667" cy="344" r="3"/><circle cx="520" cy="608" r="3"/>
          <circle cx="708" cy="618" r="3"/><circle cx="567" cy="878" r="3"/><circle cx="647" cy="907" r="3"/>
        </g>
      </svg>`;
  }

  function teamNodeMarkup(member){
    return `
      <button class="team-focus-node${member.owner ? ' is-owner' : ''}" type="button"
        data-team-id="${member.id}" data-x="${member.x}" data-y="${member.y}"
        style="--node-x:${member.x}px;--node-y:${member.y}px" aria-pressed="false">
        <span class="team-node-avatar" aria-hidden="true"><i></i></span>
        <span class="team-node-copy"><strong>${member.name}</strong><small>${member.role}</small></span>
      </button>`;
  }

  function initTeamTree(){
    const teamPanel = document.querySelector('[data-view-panel="team"]');
    if(!teamPanel) return;

    teamPanel.innerHTML = `
      <div class="section-header"><div><div class="eyebrow">Project Record / Staff Constellation</div><h2 class="section-title">TEAM</h2></div><div class="section-index">07</div></div>
      <div class="team-tree-shell">
        <header class="team-tree-intro">
          <div class="mini-label">ASTRIA PROJECT · LUMINOUS WORLD TREE</div>
          <h3>THE GOLDEN CONSTELLATION</h3>
          <p>แตะชื่อหรือจุดของสมาชิกเพื่อซูมเข้าไปยังกิ่งนั้น แตะซ้ำหรือแตะพื้นที่ว่างเพื่อกลับสู่มุมมองรวม</p>
        </header>
        <div class="team-tree-stage" id="teamTreeStage" tabindex="0" aria-label="Interactive Astria team tree">
          <div class="team-tree-vignette" aria-hidden="true"></div>
          <div class="team-tree-world" id="teamTreeWorld">
            ${teamTreeSvg()}
            <div class="team-node-layer">${TEAM_MEMBERS.map(teamNodeMarkup).join('')}</div>
          </div>
          <div class="team-focus-readout" id="teamFocusReadout" aria-live="polite">FULL TREE · ALL RECORDS</div>
          <button class="team-reset-view" id="teamResetView" type="button" hidden>RETURN TO FULL TREE</button>
        </div>
      </div>`;

    const stage = document.querySelector('#teamTreeStage');
    const world = document.querySelector('#teamTreeWorld');
    const readout = document.querySelector('#teamFocusReadout');
    const resetButton = document.querySelector('#teamResetView');
    const nodes = [...stage.querySelectorAll('.team-focus-node')];
    let activeId = null;
    let baseScale = 1;

    const setTransform = (x, y, scale) => {
      world.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
    };

    const getBaseView = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      baseScale = Math.min(width / TREE_SIZE.width, height / TREE_SIZE.height) * .94;
      return {
        x:(width - TREE_SIZE.width * baseScale) / 2,
        y:(height - TREE_SIZE.height * baseScale) / 2,
        scale:baseScale
      };
    };

    const applyBaseView = (animate = true) => {
      activeId = null;
      stage.classList.remove('is-focused');
      stage.classList.toggle('is-instant', !animate);
      nodes.forEach(node => {
        node.classList.remove('is-active');
        node.setAttribute('aria-pressed', 'false');
      });
      const view = getBaseView();
      setTransform(view.x, view.y, view.scale);
      readout.textContent = 'FULL TREE · ALL RECORDS';
      resetButton.hidden = true;
      if(!animate) requestAnimationFrame(() => stage.classList.remove('is-instant'));
    };

    const focusMember = member => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      getBaseView();
      const focusMultiplier = matchMedia('(max-width:640px)').matches ? 2.75 : 2.15;
      const scale = Math.min(baseScale * focusMultiplier, 1.72);
      const verticalBias = member.owner ? .5 : .47;
      const x = width / 2 - member.x * scale;
      const y = height * verticalBias - member.y * scale;

      activeId = member.id;
      stage.classList.add('is-focused');
      nodes.forEach(node => {
        const selected = node.dataset.teamId === member.id;
        node.classList.toggle('is-active', selected);
        node.setAttribute('aria-pressed', String(selected));
      });
      setTransform(x, y, scale);
      readout.textContent = `${member.name} · ${member.role}`;
      resetButton.hidden = false;
    };

    nodes.forEach(node => {
      node.addEventListener('click', event => {
        event.stopPropagation();
        const member = TEAM_MEMBERS.find(item => item.id === node.dataset.teamId);
        if(!member) return;
        if(activeId === member.id) applyBaseView();
        else focusMember(member);
      });
    });

    stage.addEventListener('click', event => {
      if(activeId && !event.target.closest('.team-focus-node')) applyBaseView();
    });
    resetButton.addEventListener('click', event => {
      event.stopPropagation();
      applyBaseView();
    });
    stage.addEventListener('keydown', event => {
      if(event.key === 'Escape' && activeId) applyBaseView();
    });

    const observer = new ResizeObserver(() => {
      if(!activeId) applyBaseView(false);
      else {
        const member = TEAM_MEMBERS.find(item => item.id === activeId);
        if(member) focusMember(member);
      }
    });
    observer.observe(stage);
    applyBaseView(false);
  }

  stopAndRemoveLegacyIntro();
  initTeamTree();
  forceMainPage();
  playLandingSequence();

  window.addEventListener('pageshow', event => {
    forceMainPage();
    if(event.persisted) playLandingSequence();
  });
})();

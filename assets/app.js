(() => {
  'use strict';
  const L = window.ASTRIA_LORE;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const prose = arr => arr.map(p => `<p>${p}</p>`).join('');

  function renderLucaria(){
    const el = $('#lucariaContent');
    el.innerHTML = `
      <article class="archive-panel">
        <div class="mini-label">LUCARIA ACADEMIA · FIRST BASTION</div>
        <div class="motto"><strong>“${L.lucaria.motto}”</strong><span>“${L.lucaria.mottoTh}”</span></div>
        <div class="prose">${prose(L.lucaria.history)}</div>
        <blockquote class="lore-quote">${L.lucaria.fragments.map(v=>`<div>…${v}…</div>`).join('')}</blockquote>
        <div class="prose">${prose(L.lucaria.founding)}</div>
      </article>
      <div class="lore-accordion">
        <details open>
          <summary><strong>THE FOUR PILLARS · ความสัมพันธ์ระหว่าง 4 College</strong></summary>
          <div class="prose">
            <div class="relationship-grid">${L.lucaria.relationships.map(r=>`<article class="relationship-card"><h4>${r.name}</h4><p>${r.text}</p></article>`).join('')}</div>
            <p style="margin-top:24px">${L.lucaria.relationClosing}</p>
          </div>
        </details>
        <details>
          <summary><strong>ACADEMIA DOCTRINE · เจตจำนงของผู้พิทักษ์</strong></summary>
          <div class="prose"><p>Lucaria ไม่มองนักเรียนเป็นอาวุธไร้เจตจำนง ผู้พิทักษ์ต้องมีความฝัน ความกลัว ความรัก ความผิดพลาด และมีสิทธิ์เลือกเส้นทางของตนเอง แม้กำเนิดของมิติหน้าด่านจะผูกพันกับสงครามก็ตาม</p></div>
        </details>
      </div>`;
  }

  function renderColleges(){
    const el = $('#collegeContent');
    el.innerHTML = `<div class="segmented-tabs" id="collegeTabs">${L.colleges.map((c,i)=>`<button class="${i===0?'active':''}" data-college="${c.id}">${c.icon} ${c.name}</button>`).join('')}</div><div class="college-stage" id="collegeStage"></div>`;
    const draw = id => {
      const c = L.colleges.find(x=>x.id===id) || L.colleges[0];
      $('#collegeStage').innerHTML = `
        <article class="college-hero" style="--accent:${c.accent}">
          <div class="college-art">
            <div class="college-art-placeholder"><span>${c.icon}</span><small>COLLEGE ARTWORK · RESERVED</small></div>
          </div>
          <div class="college-overview">
            <div class="mini-label">FOUNDER · ${c.founder}</div>
            <h3>${c.name}</h3><div class="college-thai">${c.thai}</div>
            <div class="college-motto">“${c.motto}”<br><span>“${c.mottoTh}”</span></div>
            <div class="prose">${prose(c.paragraphs.slice(0,2))}</div>
          </div>
        </article>
        <div class="college-body">
          <details class="lore-detail" open><summary><strong>ORIGIN & DOCTRINE · ต้นกำเนิดและแนวคิด</strong></summary><div class="detail-body prose">${prose(c.paragraphs.slice(2))}<blockquote class="lore-quote">“${c.belief}”</blockquote></div></details>
          <div class="college-pinnacle" style="--college-accent:${c.accent}"><strong>${c.pinnacle.name} · ${c.pinnacle.thai}</strong><div class="prose"><p>${c.pinnacle.text}</p></div></div>
          <div class="sub-grid">${c.subs.map(s=>`
            <article class="sub-card" style="--sub-color:${s.color}">
              <div class="mini-label">${s.icon} SUB-ARCHETYPE</div><h4>${s.name}</h4><div>${s.thai}</div>
              <div class="teacher">อาจารย์ประจำสาขา: ${s.teacher}</div>
              <ul>${s.concepts.map(x=>`<li>${x}</li>`).join('')}</ul>
              <div class="color-chip" style="--sub-color:${s.color}"><i></i><span>${s.colorName} · <code>${s.color}</code><br>${s.colorText}</span></div>
            </article>`).join('')}</div>
        </div>`;
    };
    draw(L.colleges[0].id);
    $('#collegeTabs').addEventListener('click',e=>{
      const b=e.target.closest('[data-college]'); if(!b)return;
      $$('#collegeTabs button').forEach(x=>x.classList.toggle('active',x===b)); draw(b.dataset.college);
    });
  }

  function renderRaces(){
    const el=$('#raceContent');
    el.innerHTML=`
      <div class="race-intro">
        <article class="archive-panel"><div class="mini-label">CODEX OF THE KIN · VOLUME I</div><h3>7 สายเลือดโลหิต</h3><p class="lead">บันทึกเจ็ดสายเลือดปีศาจแห่ง Vaethmoor — รูปลักษณ์ ประวัติถิ่นกำเนิด และพรสืบสายเลือดที่ไหลเวียนอยู่ภายในโลหิตของแต่ละเผ่าพันธุ์</p></article>
        <aside class="archive-panel"><div class="mini-label">SOURCE RECORD</div><p class="prose">ข้อมูลและตราสัญลักษณ์นำมาจาก Codex of the Kin ใน Repository Web_Editor ของโปรเจกต์ และถูกจัดรูปแบบใหม่ให้เข้ากับ Astria Archive</p></aside>
      </div>
      <div class="race-selector" id="raceTabs">${L.races.map((r,i)=>`<button class="${i===0?'active':''}" data-race="${r.id}">${r.svg}<strong>${r.name}</strong><small>${r.epithet}</small></button>`).join('')}</div>
      <div id="raceStage"></div>`;
    const draw=id=>{
      const r=L.races.find(x=>x.id===id)||L.races[0];
      $('#raceStage').innerHTML=`
        <article class="race-stage" style="--race-accent:${r.accent}">
          <div class="race-illustration">${r.svg}<div class="sigil-caption">ORIGINAL BLOODLINE SIGIL · ${r.name.toUpperCase()}</div></div>
          <div class="race-record">
            <div class="race-index">${r.index}</div><h3>${r.name}</h3><div class="race-epithet">${r.epithet}</div>
            <div class="prose" style="margin-top:25px"><p><strong>${r.lead}</strong></p><p>${r.lore}</p></div>
            <div class="race-gift"><small>RACIAL GIFT</small><strong>${r.gift.name}</strong><div class="prose"><p>${r.gift.text}</p></div></div>
            <div class="trait-grid"><div class="trait-box"><small>BEARING</small><span>${r.traits.bearing}</span></div><div class="trait-box"><small>HOMELAND</small><span>${r.traits.homeland}</span></div><div class="trait-box"><small>TEMPER</small><span>${r.traits.temper}</span></div></div>
          </div>
        </article>`;
    };
    draw(L.races[0].id);
    $('#raceTabs').addEventListener('click',e=>{const b=e.target.closest('[data-race]');if(!b)return;$$('#raceTabs button').forEach(x=>x.classList.toggle('active',x===b));draw(b.dataset.race);});
  }

  function renderWorld(){
    const el=$('#worldContent');
    el.innerHTML=`
      <div class="segmented-tabs world-tabs" id="worldTabs"><button class="active" data-world="cities">CITIES</button><button data-world="calamities">CALAMITIES</button><button data-world="landmark">LANDMARK</button><button data-world="trial">PIONEER TRIAL</button></div>
      <section class="world-group active" data-world-group="cities"><div class="city-grid">${L.world.cities.map((c,i)=>`<article class="city-card"><div class="mini-label">CITY · 0${i+1}</div><h4>${c.name}</h4><p><strong>${c.thai}</strong><br>${c.text}</p></article>`).join('')}</div></section>
      <section class="world-group" data-world-group="calamities"><article class="archive-panel"><div class="mini-label">GAIA · FINAL WARNING</div><h3>ภัยพิบัติทั้งสิบ</h3><div class="prose"><p>${L.world.calamityIntro}</p></div><div class="calamity-list">${L.world.calamities.map(x=>`<div class="calamity">${x}</div>`).join('')}</div></article></section>
      <section class="world-group" data-world-group="landmark"><article class="world-feature"><div class="feature-visual"><div class="wave"></div></div><div class="feature-content"><div class="mini-label">LANDMARK · MIRRORED OCEAN</div><h3>${L.world.landmark.name}</h3><div class="prose"><p>${L.world.landmark.text}</p></div><blockquote class="lore-quote">“${L.world.landmark.quote}”</blockquote></div></article></section>
      <section class="world-group" data-world-group="trial"><article class="archive-panel"><div class="mini-label">LEGACY EVENT · SELECTED SOUL</div><h3>${L.world.trial.name}</h3><div class="founder-list">${L.world.trial.founders.map(x=>`<div class="founder">${x}</div>`).join('')}</div><div class="prose">${prose(L.world.trial.paragraphs)}</div></article></section>`;
    $('#worldTabs').addEventListener('click',e=>{const b=e.target.closest('[data-world]');if(!b)return;$$('#worldTabs button').forEach(x=>x.classList.toggle('active',x===b));$$('[data-world-group]').forEach(x=>x.classList.toggle('active',x.dataset.worldGroup===b.dataset.world));});
  }

  function ruleItems(items){return items.map((r,i)=>`<details class="rule-item" ${i===0?'open':''}><summary><span class="rule-no">${String(i+1).padStart(2,'0')}</span><span class="rule-title"><strong>${r.title}</strong><small>${r.en}</small></span><span class="rule-caret">+</span></summary><div class="rule-body"><p>${r.body}</p></div></details>`).join('')}
  function renderRules(){
    $('#rulesContent').innerHTML=`
      <div class="rules-intro"><article class="rules-summary"><div class="mini-label">ASTRIA COMMUNITY DIRECTIVES</div><h3>กฎภายในคอมมูนิตี้</h3><p>แยกพื้นที่ผู้เล่นหลังจอ (OOC) ออกจากการกระทำของตัวละคร (IC) อย่างชัดเจน เพื่อให้เรื่องราวเข้มข้นได้โดยไม่ทำลายขอบเขต ความปลอดภัย และการให้เกียรติระหว่างผู้เล่น</p></article><aside class="rules-status"><div class="status-row"><small>OOC PUBLISHED</small><strong>${String(L.rules.ooc.length).padStart(2,'0')}</strong></div><div class="status-row"><small>IC ACTIVE</small><strong>${String(L.rules.ic.length).padStart(2,'0')}</strong></div><div class="status-row"><small>ENFORCEMENT</small><strong>ACTIVE</strong></div></aside></div>
      <div class="rule-switch" id="ruleTabs"><button class="active" data-rule="ooc">OOC · นอกโรล</button><button data-rule="ic">IC · ในโรล</button></div>
      <div class="rule-group active" data-rule-group="ooc"><div class="rule-group-head"><h3>OOC — Out of Character</h3><span class="rule-count">${String(L.rules.ooc.length).padStart(2,'0')} PUBLISHED RULES</span></div><p class="rule-note">ช่องพูดคุยทั่วไป ภาพ มีม และทุกช่องทางสื่อสารระหว่างผู้เล่นหลังจอ ข้อมูลในพื้นที่นี้ไม่ใช่ความรู้ของตัวละคร</p><div class="rules-list">${ruleItems(L.rules.ooc)}</div></div>
      <div class="rule-group" data-rule-group="ic"><div class="rule-group-head"><h3>IC — In Character</h3><span class="rule-count">${String(L.rules.ic.length).padStart(2,'0')} ACTIVE RULES</span></div><p class="rule-note">ครอบคลุมการสวมบทบาท การดำเนินเนื้อเรื่อง การต่อสู้ และทุกการกระทำภายในโลก Astria</p><div class="rules-list">${ruleItems(L.rules.ic)}</div></div>`;
    $('#ruleTabs').addEventListener('click',e=>{const b=e.target.closest('[data-rule]');if(!b)return;$$('#ruleTabs button').forEach(x=>x.classList.toggle('active',x===b));$$('[data-rule-group]').forEach(x=>x.classList.toggle('active',x.dataset.ruleGroup===b.dataset.rule));});
  }

  function setupNavigation(){
    const nav=$('#navList'), toggle=$('#menuToggle');
    const activate=name=>{
      $$('[data-view-panel]').forEach(p=>p.classList.toggle('active',p.dataset.viewPanel===name));
      $$('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));
      nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
      window.scrollTo({top:0,behavior:'smooth'}); history.replaceState(null,'','#'+name);
    };
    document.addEventListener('click',e=>{
      const v=e.target.closest('[data-view]'), j=e.target.closest('[data-jump]'), l=e.target.closest('[data-view-link]');
      if(v)activate(v.dataset.view);if(j)activate(j.dataset.jump);if(l){e.preventDefault();activate(l.dataset.viewLink)}
      if(e.target.closest('[data-replay]'))requestAnimationFrame(runIntro);
    });
    toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
    const hash=location.hash.slice(1);if(['main','lucaria','colleges','races','world','rules','invite'].includes(hash))activate(hash);
  }

  let timers=[],finished=false;
  const later=(fn,ms)=>{const id=setTimeout(fn,ms);timers.push(id);return id};
  const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
  function splitGraphemes(text){
    let units;
    if(typeof Intl!=='undefined'&&Intl.Segmenter){units=[...new Intl.Segmenter('th',{granularity:'grapheme'}).segment(text.normalize('NFC'))].map(x=>x.segment)}
    else units=text.normalize('NFC').match(/\P{M}\p{M}*/gu)||Array.from(text.normalize('NFC'));
    const joined=[];for(let i=0;i<units.length;i++){const u=units[i];if(/^[เแโใไ]$/u.test(u)&&units[i+1]&&!/^\s$/u.test(units[i+1])){joined.push(u+units[++i])}else joined.push(u)}return joined;
  }
  function buildLegend(){
    const box=$('#legendText');box.replaceChildren();splitGraphemes(L.intro).forEach(u=>{const s=document.createElement('span');s.className='story-unit';if(u==='\n'){s.classList.add('break');s.setAttribute('aria-hidden','true')}else if(/^\s+$/u.test(u)){s.classList.add('space');s.textContent=u}else s.textContent=u;box.appendChild(s)});
  }
  function runIntro(){
    clearTimers();finished=false;const stage=$('#introStage'),page=$('#pageShell'),site=$('#siteShell');stage.style.display='block';stage.scrollTop=0;stage.classList.remove('is-leaving');site.classList.remove('is-visible');page.classList.remove('is-closing');$('#readingStatus').classList.remove('show');$('#countdown').textContent='5';buildLegend();
    const units=$$('#legendText .story-unit');let i=0;const compact=matchMedia('(max-width:780px)').matches;later(function next(){if(finished)return;if(i>=units.length){$('#readingStatus').classList.add('show');let n=5;later(function tick(){n--;$('#countdown').textContent=Math.max(n,0);if(n<=0)finishIntro();else later(tick,1000)},1000);return}const u=units[i++];u.classList.add('is-writing');later(()=>u.classList.add('is-settled'),430);later(next,u.classList.contains('break')?75:(compact?48:44))},compact?650:920);
  }
  function finishIntro(immediate=false){if(finished)return;finished=true;clearTimers();const stage=$('#introStage'),page=$('#pageShell'),site=$('#siteShell');if(immediate){stage.classList.add('is-leaving');site.classList.add('is-visible');return}page.classList.add('is-closing');later(()=>{stage.classList.add('is-leaving');site.classList.add('is-visible')},980)}
  function setupIntro(){ $('#skipIntro').addEventListener('click',()=>finishIntro(true)); addEventListener('orientationchange',()=>{const s=$('#introStage');if(!s.classList.contains('is-leaving'))setTimeout(()=>s.scrollTo({top:0}),120)});runIntro(); }
  function setupTheme(){const q=matchMedia('(prefers-color-scheme:dark)'),meta=$('#themeColor');const sync=()=>meta.setAttribute('content',q.matches?'#101114':'#ebe9e4');sync();q.addEventListener?.('change',sync)}
  function setupMisc(){const toast=$('#toast');$('#discordButton').addEventListener('click',()=>{toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2600)})}

  renderLucaria();renderColleges();renderRaces();renderWorld();renderRules();setupNavigation();setupTheme();setupMisc();setupIntro();
})();

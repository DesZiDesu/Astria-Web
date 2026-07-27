(() => {
  'use strict';
  const L = window.ASTRIA_LORE;
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const prose = arr => arr.map(p => `<p>${p}</p>`).join('');
  const collegeMark = name => name.replace('College of ', '').slice(0, 2).toUpperCase();

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
    el.innerHTML = `<div class="segmented-tabs" id="collegeTabs">${L.colleges.map((c,i)=>`<button class="${i===0?'active':''}" data-college="${c.id}"><span class="college-tab-mark">${collegeMark(c.name)}</span><span>${c.name}</span></button>`).join('')}</div><div class="college-stage" id="collegeStage"></div>`;
    const draw = id => {
      const c = L.colleges.find(x=>x.id===id) || L.colleges[0];
      const source = (window.ASTRIA_COLLEGE_IMAGES || {})[c.id];
      $('#collegeStage').innerHTML = `
        <article class="college-hero" style="--accent:${c.accent}">
          <div class="college-art">
            ${source
              ? `<img class="college-art-image" src="${source}" alt="ตราประจำ ${c.name}">`
              : `<div class="college-art-placeholder"><span class="college-monogram">${collegeMark(c.name)}</span><small>COLLEGE ARTWORK · UNAVAILABLE</small></div>`}
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
              <div class="mini-label">SUB-ARCHETYPE</div><h4>${s.name}</h4><div>${s.thai}</div>
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
    const groupName=g=>g==='bloodline'?'THE SEVEN BLOODLINES':'THE FOUR PEOPLES';
    const groupThai=g=>g==='bloodline'?'เจ็ดสายโลหิต':'สี่เผ่าพันธุ์หลัก';
    el.innerHTML=`
      <div class="lineage-hero">
        <div class="lineage-hero-copy">
          <div class="mini-label">ASTRIA LINEAGE CODEX · VOLUME I</div>
          <h3>ปกรณัมแห่งสายเลือด</h3>
          <p>ก่อนประวัติศาสตร์จะถูกจารึก สายโลหิตหายากทั้งเจ็ดได้แตกหน่อขึ้นเคียงข้างสี่เผ่าพันธุ์หลัก บันทึกนี้รวบรวมรูปลักษณ์ ถิ่นอาศัย ตำนาน และพลังที่ไหลเวียนอยู่ในตัวพวกเขา</p>
        </div>
        <div class="lineage-tally" aria-label="จำนวนเผ่าพันธุ์ในคลัง">
          <div><strong>07</strong><span>สายโลหิต</span><small>BLOODLINES</small></div>
          <div><strong>04</strong><span>เผ่าพันธุ์หลัก</span><small>PEOPLES</small></div>
          <div><strong>11</strong><span>บันทึกทั้งหมด</span><small>RECORDS</small></div>
        </div>
      </div>
      <div class="lineage-toolbar">
        <div class="lineage-groups" id="lineageGroups" role="tablist" aria-label="เลือกหมวดสายเลือด">
          <button class="active" type="button" role="tab" aria-selected="true" data-race-group="bloodline"><span>01</span><strong>THE SEVEN BLOODLINES</strong><small>เจ็ดสายโลหิต</small></button>
          <button type="button" role="tab" aria-selected="false" data-race-group="common"><span>02</span><strong>THE FOUR PEOPLES</strong><small>สี่เผ่าพันธุ์หลัก</small></button>
        </div>
        <div class="lineage-readout"><span>ACTIVE ARCHIVE</span><strong id="lineageReadout">BLOODLINES · 07</strong></div>
      </div>
      <div class="race-selector" id="raceTabs" role="tablist" aria-label="เลือกเผ่าพันธุ์"></div>
      <div id="raceStage" aria-live="polite"></div>`;

    const draw=id=>{
      const r=L.races.find(x=>x.id===id)||L.races[0];
      const ability=r.ability?`
        <section class="race-ability">
          <div class="ability-head"><span>${r.ability.label}</span><i aria-hidden="true"></i></div>
          <h4>${r.ability.name}</h4>
          <p>${r.ability.text}</p>
        </section>`:'';
      $('#raceStage').innerHTML=`
        <article class="race-stage" style="--race-accent:${r.accent}">
          <div class="race-illustration">
            <div class="race-ordinal" aria-hidden="true">${r.ordinal}</div>
            <div class="race-orbit orbit-one" aria-hidden="true"></div><div class="race-orbit orbit-two" aria-hidden="true"></div>
            <div class="race-emblem-frame"><img class="race-portrait" src="${r.image}" alt="ตราประจำเผ่า ${r.name}"></div>
            <div class="sigil-caption"><span>${groupName(r.group)}</span><strong>${r.name}</strong></div>
          </div>
          <div class="race-record">
            <div class="race-record-top"><div class="race-index">${r.index}</div><div class="record-status"><i></i> VERIFIED RECORD</div></div>
            <h3>${r.name}</h3>
            <div class="race-thai">${r.thai}</div>
            <div class="race-epithet"><span>${r.epithetTh}</span><small>${r.epithet}</small></div>
            ${r.gimmick?`<div class="race-gimmick">${r.gimmick}</div>`:''}
            <div class="race-lore"><p>${r.lore}</p></div>
            <div class="trait-grid">
              <div class="trait-box"><small>ถิ่นอาศัย · HOMELAND</small><span>${r.homeland}</span></div>
              <div class="trait-box"><small>ลักษณะเด่น · BEARING</small><span>${r.bearing}</span></div>
            </div>
            ${ability}
            <div class="race-folio"><span>ASTRIA · LINEAGE ARCHIVE</span><span>${groupThai(r.group)} · ${r.ordinal}</span></div>
          </div>
        </article>`;
    };

    const drawSelector=group=>{
      const races=L.races.filter(r=>r.group===group);
      $('#raceTabs').innerHTML=races.map((r,i)=>`
        <button class="${i===0?'active':''}" type="button" role="tab" aria-selected="${i===0}" data-race="${r.id}" style="--race-accent:${r.accent}">
          <span class="race-tab-number">${r.ordinal}</span>
          <img src="${r.image}" alt="" loading="lazy">
          <span class="race-tab-copy"><strong>${r.name}</strong><small>${r.thai}</small></span>
          <span class="race-tab-arrow" aria-hidden="true">↗</span>
        </button>`).join('');
      $('#lineageReadout').textContent=`${group==='bloodline'?'BLOODLINES':'PEOPLES'} · ${String(races.length).padStart(2,'0')}`;
      draw(races[0].id);
    };

    drawSelector('bloodline');
    $('#lineageGroups').addEventListener('click',e=>{
      const b=e.target.closest('[data-race-group]');if(!b)return;
      $$('#lineageGroups button').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-selected',String(active));});
      drawSelector(b.dataset.raceGroup);
    });
    $('#raceTabs').addEventListener('click',e=>{
      const b=e.target.closest('[data-race]');if(!b)return;
      $$('#raceTabs button').forEach(x=>{const active=x===b;x.classList.toggle('active',active);x.setAttribute('aria-selected',String(active));});
      draw(b.dataset.race);
    });
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

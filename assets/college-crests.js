(()=>{
  'use strict';
  const images=window.ASTRIA_COLLEGE_IMAGES||{};
  const $=(selector,root=document)=>root.querySelector(selector);

  function mountLucariaCrest(){
    const root=$('#lucariaContent');
    if(!root||root.querySelector('.lucaria-crest-panel')||!images.lucaria)return;
    const panel=document.createElement('article');
    panel.className='lucaria-crest-panel';
    panel.innerHTML=`<img src="${images.lucaria}" alt="ตราสัญลักษณ์ Lucaria Academia"><div class="lucaria-crest-copy"><div class="mini-label">LUCARIA ACADEMIA · OFFICIAL CREST</div><h3>LUCARIA</h3><p>ตราประจำสถาบันแห่งผู้พิทักษ์ แสดงดวงตะวันและจันทราซึ่งเป็นตัวแทนของแสงที่มนุษย์มองเห็นและความมืดที่พวกเขาเรียนรู้จะควบคุม</p><div class="motto"><strong>“To the light we behold, and the darkness we command.”</strong><span>“แด่แสงสว่างที่เรามองเห็น และความมืดที่เราครอบครอง”</span></div></div>`;
    root.prepend(panel);
  }

  function mountCollegeCrest(){
    const active=$('#collegeTabs [data-college].active');
    const art=$('#collegeStage .college-art');
    if(!active||!art)return;
    const id=active.dataset.college;
    const source=images[id];
    if(!source)return;
    art.innerHTML=`<img class="college-art-image" src="${source}" alt="ตราประจำ College of ${id.charAt(0).toUpperCase()+id.slice(1)}">`;
  }

  function initialise(){
    mountLucariaCrest();
    mountCollegeCrest();
    const tabs=$('#collegeTabs');
    if(tabs&&!tabs.dataset.crestBound){
      tabs.dataset.crestBound='true';
      tabs.addEventListener('click',event=>{
        if(event.target.closest('[data-college]'))requestAnimationFrame(()=>requestAnimationFrame(mountCollegeCrest));
      });
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(initialise,0));
  else setTimeout(initialise,0);
})();

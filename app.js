(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ——— Contenus (provisoires) ——— */
  var STEPS=[
    {v:'Écrire',h:265,t:'Une idée, un scénario, une note d’intention. Tout commence par le texte.',d:['Scénario','Note d’intention','Traitement']},
    {v:'Concevoir',h:200,t:'Direction artistique, storyboard, plan de tournage.',d:['Direction artistique','Storyboard','Plan de tournage']},
    {v:'Tourner',h:20,t:'Image, lumière et son, sur le plateau ou en extérieur.',d:['Équipe et matériel','Lumière','Prise de son']},
    {v:'Monter',h:340,t:'Montage, étalonnage et livraison dans les bons formats.',d:['Montage','Étalonnage','Livraison multi-formats']}
  ];
  var PRICES=[
    {n:'Bande démo',p:'100 € – 450 €',
     d:'Création d’un support audiovisuel destiné à présenter et valoriser l’identité, l’univers et les activités d’un artiste, d’une structure ou d’une entité. Durée indicative : 1 à 3 min.'},
    {n:'Reel / Contenu court',p:'100 € – 350 €',
     d:'Création de contenus audiovisuels courts destinés à dynamiser la communication digitale, promouvoir un projet, un événement ou une activité et favoriser l’engagement sur les plateformes numériques. Durée indicative : 15 à 90 secondes.'},
    {n:'Court-métrage / Film court',compact:'3 formats · 300 € – 2 500 €',
     d:['Durée entre 1 et 6 minutes.','Toute demande portant sur un film d’une durée supérieure fera l’objet d’une tarification adaptée, établie en fonction de la complexité du projet, du temps de production et des moyens nécessaires.'],
     formats:[
       {n:'Création de A à Z',sub:'De l’idée au film final',p:'800 à 2 500 €',all:true,
        d:'Pour les artistes, associations ou structures qui souhaitent donner vie à une idée, une histoire ou un projet audiovisuel, sans nécessairement avoir déjà écrit ou préparé leur scénario.'},
       {n:'Réalisation à partir de votre scénario',p:'700 à 1 500 €',
        d:'Vous avez déjà écrit votre scénario et souhaitez le concrétiser en film ? KOBRAS Productions vous accompagne dans sa réalisation audiovisuelle, de la préparation du tournage à la finalisation du film.'},
       {n:'Conception et écriture de scénario',p:'300 à 800 €',
        d:'Vous avez une idée, une histoire ou un univers à raconter, mais vous souhaitez être accompagné dans sa construction et son écriture ? KOBRAS Productions vous accompagne dans le développement de votre idée et la rédaction de votre scénario.'}
     ]},
    {n:'Clip musical',soon:true}
  ];
  var STRIPS=[
    {k:'clip',t:'Clips musicaux',s:'Donner une image à un son.',h:265},
    {k:'court',t:'Courts-métrages',s:'Raconter en quelques minutes.',h:20},
    {k:'demo',t:'Bandes démo',s:'Se montrer sous son meilleur jour.',h:200}
  ];
  var WORKS=[
    {k:'clip',t:'« 25 Ans »',m:'Clip musical cinématographique · KA BERRA · Mars 2026',h:265,
     role:'Production de A à Z — écriture scénario, tournage, cadrage, montage.',
     url:'https://youtu.be/COoIdcqK0W4?si=lf2ZofH8GnsrWGDF', id:'COoIdcqK0W4'},
    {k:'clip',t:'« Délires d’une Mélomane »',m:'Clip musical cinématographique · KA BERRA · Septembre 2025',h:340,
     role:'Co-écriture scénario et production financière.',
     url:'https://youtu.be/8KNjYSYqMPA?si=kO0F5cL50C-inbxY', id:'8KNjYSYqMPA'},
    {k:'court',t:'« Hypersensibilité »',m:'Court-métrage',h:20,
     role:'Production de A à Z — écriture scénario, tournage, cadrage, montage.',
     url:'https://youtu.be/EmnK2zwiFjc?si=bE6bV2cE2kif-7-s', id:'EmnK2zwiFjc'},
    {k:'court',t:'« I AM »',m:'Court-métrage',h:150,
     role:'Production de A à Z — écriture scénario, tournage, cadrage, montage.',
     url:'https://youtu.be/5sUIpbPgv5M?si=SzDUcV2doapvWPv4', id:'5sUIpbPgv5M'}
  ];
  var DEMO_SOON='';
  var EMPTY_MSG={demo:'Les bandes démo arrivent bientôt : les montages sont en cours.',teaser:'Les premiers teasers arrivent bientôt.'};
  var TITLES={accueil:'Kobra’s Productions',realisations:'Nos réalisations — Kobra’s Productions',services:'Nos services — Kobra’s Productions',tarifs:'Nos tarifs — Kobra’s Productions',univers:'Notre univers — Kobra’s Productions',devis:'Demander un devis — Kobra’s Productions'};

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
  function frame(h,extra){return '<div class="frame" style="--h:'+h+'">'+(extra||'')+'</div>'}

  /* ——— Rendu ——— */
  $('#strips').innerHTML=STRIPS.map(function(s){
    return '<a class="strip reveal" href="#/realisations" data-route="realisations" data-filter="'+s.k+'">'+frame(s.h)+
      '<div class="wrap in"><div><h3>'+esc(s.t)+'</h3><p>'+esc(s.s)+'</p></div><span class="go" aria-hidden="true">↗</span></div></a>';
  }).join('');

  $$('[data-steps]').forEach(function(el){
    var detail=el.getAttribute('data-steps')==='detail';
    el.innerHTML=STEPS.map(function(s,i){
      return '<article class="step reveal" style="--h:'+s.h+'"><span class="n">Étape '+(i+1)+' sur 4</span><div><h3>'+s.v+'</h3><p>'+esc(s.t)+'</p>'+
        (detail?'<ul>'+s.d.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':'')+'</div></article>';
    }).join('');
  });

  function descs(d){return [].concat(d||[]).map(function(x){return '<p class="p-desc">'+esc(x)+'</p>'}).join('')}
  function cta(proj,all){return '<a class="textlink" href="#/devis" data-route="devis" data-project="'+esc(proj)+'"'+(all?' data-etapes="all"':'')+'>Demander ce devis</a>'}
  function priceRow(p,compact){
    if(p.soon) return '<div class="price soon reveal"><div class="p-main"><h3>'+esc(p.n)+'</h3></div><div class="amt">À venir…</div><span></span></div>';
    if(compact) return '<div class="price reveal"><div class="p-main"><h3>'+esc(p.n)+'</h3></div><div class="amt">'+esc(p.compact||p.p)+'</div>'+cta(p.n)+'</div>';
    if(p.formats){
      return '<div class="price has-formats reveal"><div class="p-main"><h3>'+esc(p.n)+'</h3>'+descs(p.d)+'</div><ul class="formats">'+
        p.formats.map(function(f){
          return '<li><div class="p-main"><h4>'+esc(f.n)+(f.sub?'<span>'+esc(f.sub)+'</span>':'')+'</h4>'+descs(f.d)+'</div>'+
            '<div class="amt"><small>Tarif indicatif</small>'+esc(f.p)+'</div>'+cta(p.n,f.all)+'</li>';
        }).join('')+'</ul></div>';
    }
    return '<div class="price reveal"><div class="p-main"><h3>'+esc(p.n)+'</h3>'+descs(p.d)+'</div><div class="amt">'+esc(p.p)+'</div>'+cta(p.n)+'</div>';
  }
  $$('[data-prices]').forEach(function(el){
    var compact=el.getAttribute('data-prices')==='compact';
    el.innerHTML=PRICES.map(function(p){return priceRow(p,compact)}).join('');
  });

  $('#works').innerHTML=WORKS.map(function(w,i){
    var tag=w.url?'a':'div', open=w.url?('href="'+esc(w.url)+'" target="_blank" rel="noopener"'):'aria-disabled="true"';
    var thumb=w.id?'<img class="thumb" src="https://i.ytimg.com/vi/'+w.id+'/hqdefault.jpg" alt="Miniature : '+esc(w.t)+'" loading="lazy" decoding="async">':'';
    return '<'+tag+' class="work reveal" '+open+' data-cat="'+w.k+'">'+
      frame(w.h, thumb+'<span class="ph">'+(w.url?'Voir sur YouTube':'Lien à venir')+'</span><span class="play"></span>')+
      '<h3>'+esc(w.t)+'</h3><p>'+esc(w.m)+'</p><p class="role">'+esc(w.role||'')+'</p></'+tag+'>';
  }).join('')+'<p class="note demo-empty" hidden>'+DEMO_SOON+'</p>';
  /* TEASERS : pour en ajouter un, copier une ligne et la remplir.
     t = titre, m = type de projet, when = date de sortie ou « Bientôt », h = teinte du cadre (0 à 360),
     url = lien du teaser (YouTube, Instagram…) ou null, id = identifiant YouTube pour la miniature ou null. */
  var TEASERS=[
    /* exemple : {t:'Titre du projet',m:'Clip musical',when:'12 décembre',h:265,url:'https://youtu.be/XXXXXXXXXXX',id:'XXXXXXXXXXX'}, */
  ];
  function teaserCard(w){
    var tag=w.url?'a':'div', open=w.url?('href="'+esc(w.url)+'" target="_blank" rel="noopener"'):'aria-disabled="true"';
    var thumb=w.id?'<img class="thumb" src="https://i.ytimg.com/vi/'+w.id+'/hqdefault.jpg" alt="Miniature : '+esc(w.t)+'" loading="lazy" decoding="async">':'';
    return '<'+tag+' class="work reveal" '+open+' data-cat="teaser">'+
      frame(w.h, thumb+'<span class="badge">'+esc(w.when||'Bientôt')+'</span><span class="ph">'+(w.url?'Voir le teaser':'Teaser à venir')+'</span><span class="play"></span>')+
      '<h3>'+esc(w.t)+'</h3><p>'+esc(w.m)+'</p></'+tag+'>';
  }
  $('#works .demo-empty').insertAdjacentHTML('beforebegin',TEASERS.map(teaserCard).join(''));
  $('#teasers-home').innerHTML=TEASERS.slice(0,3).map(teaserCard).join('');
  $('#teasers-sec').hidden=!TEASERS.length;
  $$('.thumb').forEach(function(img){img.addEventListener('error',function(){img.remove()})});

  var TYPES=['Bande démo','Reel / Contenu court','Court-métrage / Film court','Clip musical (à venir)','Autres'];
  $('#types').innerHTML=TYPES.map(function(t){return '<label class="chip"><input type="radio" name="type" value="'+esc(t)+'"><span>'+esc(t)+'</span></label>'}).join('');
  $('#etapes').innerHTML=STEPS.map(function(s){return '<label class="chip"><input type="checkbox" name="etape" value="'+s.v+'"><span>'+s.v+'</span></label>'}).join('')+
    '<label class="chip chip-all"><input type="checkbox" id="etape-all"><span>A à Z (toutes les étapes)</span></label>';
  $('#etape-all').addEventListener('change',function(){
    var all=this.checked;
    $$('input[name="etape"]').forEach(function(c){c.checked=all; c.disabled=all;});
  });

  /* ——— Navigation entre onglets ——— */
  var current='accueil', nav=$('#nav');
  function setFilter(f){
    $$('.filters button').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-filter')===f))});
    var shown=0;
    $$('#works .work').forEach(function(w){var on=(f==='all'||w.getAttribute('data-cat')===f); w.hidden=!on; if(on) shown++;});
    var n=$('.demo-empty'); n.textContent=EMPTY_MSG[f]||''; n.hidden=shown>0;
  }
  function preselect(name,etapes){
    $$('input[name="type"]').forEach(function(i){i.checked=(i.value===name)});
    var all=$('#etape-all'); all.checked=(etapes==='all');
    $$('input[name="etape"]').forEach(function(c){c.checked=all.checked; c.disabled=all.checked;});
  }
  function go(name,o){
    o=o||{};
    if(!TITLES[name]) name='accueil';
    $$('.page').forEach(function(p){
      var on=p.getAttribute('data-page')===name;
      p.hidden=!on;
      if(on){p.classList.remove('enter'); void p.offsetWidth; if(name==='accueil') p.classList.add('enter');}
    });
    $$('.links a[data-route]').forEach(function(a){
      if(a.getAttribute('data-route')===name && !a.classList.contains('only-mobile')) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
    current=name; document.title=TITLES[name];
    if(name==='realisations') setFilter(o.filter||'all');
    if(name==='devis' && o.project) preselect(o.project,o.etapes);
    closeMenu(); window.scrollTo(0,0); requestAnimationFrame(updateProgress);
    if(name==='accueil'){ startHeroIdle(); } else { pauseHeroIdle(0); }
    try{ history.replaceState(null,'','#/'+(name==='accueil'?'':name)); }catch(e){}
  }
  var scrollbar=$('#scrollbar');
  function updateProgress(){
    if(!scrollbar) return;
    var h=document.documentElement.scrollHeight-window.innerHeight;
    var pct=h>0?Math.min(100,Math.max(0,(window.scrollY/h)*100)):0;
    scrollbar.style.width=pct+'%';
  }
  var progressTicking=false;
  window.addEventListener('scroll',function(){
    if(!progressTicking){ progressTicking=true; requestAnimationFrame(function(){updateProgress(); progressTicking=false;}); }
  },{passive:true});

  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-route]'); if(!a) return;
    e.preventDefault(); go(a.getAttribute('data-route'),{filter:a.getAttribute('data-filter'),project:a.getAttribute('data-project'),etapes:a.getAttribute('data-etapes')});
  });
  $$('.filters button').forEach(function(b){b.addEventListener('click',function(){setFilter(b.getAttribute('data-filter'))})});

  /* menu mobile */
  var burger=$('#burger');
  function closeMenu(){nav.classList.remove('open');burger.setAttribute('aria-expanded','false');document.body.classList.remove('lock')}
  burger.addEventListener('click',function(){
    var open=!nav.classList.contains('open'); nav.classList.toggle('open',open);
    burger.setAttribute('aria-expanded',String(open)); burger.textContent=open?'Fermer':'Menu'; document.body.classList.toggle('lock',open);
  });
  new MutationObserver(function(){burger.textContent=nav.classList.contains('open')?'Fermer':'Menu'}).observe(nav,{attributes:true,attributeFilter:['class']});

  /* fenêtre projet */
  var legal=$('#legal'), legalFocus=null;
  function openLegal(){legalFocus=document.activeElement; legal.hidden=false; document.body.classList.add('lock'); $('#l-close').focus();}
  function closeLegal(){legal.hidden=true; document.body.classList.remove('lock'); if(legalFocus) legalFocus.focus();}
  $('#open-legal').addEventListener('click',openLegal);
  $('#l-close').addEventListener('click',closeLegal);
  legal.addEventListener('click',function(e){if(e.target===legal) closeLegal()});

  document.addEventListener('keydown',function(e){if(e.key==='Escape'){ if(!legal.hidden) closeLegal(); else closeMenu(); }});

  /* formulaire de devis : envoi réel par e-mail via Web3Forms */
  var WEB3FORMS_KEY=''; /* coller ici la clé Web3Forms, entre les guillemets */
  var CONTACT_MAIL='kobrasprod@gmail.com';
  var MAIL_LINK='<a href="mailto:'+CONTACT_MAIL+'">'+CONTACT_MAIL+'</a>';
  var form=$('#form'), sent=$('#sent'), formErr=$('#form-err'), submitBtn=$('button[type="submit"]',form);
  function showFormError(html){formErr.innerHTML=html; formErr.hidden=false;}
  function showSent(){form.hidden=true; sent.hidden=false; sent.scrollIntoView({block:'center'});}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    formErr.hidden=true;
    if(!form.checkValidity()){form.reportValidity();return;}
    if(form.elements['website'].value){showSent();return;} /* champ piège rempli : probablement un robot */
    if(!WEB3FORMS_KEY){
      showFormError('L’envoi n’est pas encore activé. Écrivez-nous directement à '+MAIL_LINK+'.');return;
    }
    var type=(form.querySelector('input[name="type"]:checked')||{}).value||'Non précisé';
    var etapes=$('#etape-all').checked?'A à Z (toutes les étapes)':
      ($$('input[name="etape"]:checked',form).map(function(c){return c.value}).join(', ')||'Non précisé');
    var payload={
      access_key:WEB3FORMS_KEY,
      subject:'Demande de devis — '+type,
      from_name:'Site Kobra’s Productions',
      name:form.elements['nom'].value,
      email:form.elements['mail'].value,
      'Type de projet':type,
      'Étapes souhaitées':etapes,
      'Budget indicatif':form.elements['budget'].value,
      'Délai souhaité':form.elements['delai'].value||'Non précisé',
      'Lien de référence':form.elements['ref'].value||'Aucun',
      message:form.elements['message'].value
    };
    var label=submitBtn.textContent; submitBtn.disabled=true; submitBtn.textContent='Envoi en cours…';
    fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)})
      .then(function(r){return r.json().catch(function(){return {};}).then(function(j){return {ok:r.ok&&j.success===true};});})
      .then(function(res){if(!res.ok) throw new Error('envoi refusé'); showSent();})
      .catch(function(){showFormError('Votre demande n’a pas pu être envoyée. Réessayez dans un instant, ou écrivez-nous directement à '+MAIL_LINK+'.');})
      .then(function(){submitBtn.disabled=false; submitBtn.textContent=label;});
  });
  $('#again').addEventListener('click',function(){form.reset();sent.hidden=true;form.hidden=false});

  /* ——— Hero : la lumière suit le pointeur, et dérive doucement au repos ——— */
  var hero=$('#hero'), glow=$('#glow'), cobra=$('#cobra'), beam=$('#beam');
  var VB={x:106,y:99,w:2222,h:3306};
  function light(px,py){
    var hr=hero.getBoundingClientRect(), cr=cobra.getBoundingClientRect(); if(!cr.width||!cr.height) return;
    glow.style.setProperty('--mx',(px-hr.left)+'px'); glow.style.setProperty('--my',(py-hr.top)+'px');
    var vx=VB.x+(px-cr.left)/cr.width*VB.w, vy=VB.y+(py-cr.top)/cr.height*VB.h;
    beam.setAttribute('cx',vx); beam.setAttribute('cy',vy);
  }
  function restLight(){var cr=cobra.getBoundingClientRect(); if(!cr.width) return; light(cr.left+cr.width*.45,cr.top+cr.height*.22)}
  var heroIdleRAF=null, heroIdleTimer=null;
  function heroIdleTick(t){
    var pageEl=hero.closest('.page');
    if(!pageEl||pageEl.hidden){heroIdleRAF=null; return;}
    var cr=cobra.getBoundingClientRect();
    if(cr.width){
      var dx=Math.sin(t/4000)*cr.width*.05, dy=Math.cos(t/5200)*cr.height*.04;
      light(cr.left+cr.width*.45+dx, cr.top+cr.height*.22+dy);
    }
    heroIdleRAF=requestAnimationFrame(heroIdleTick);
  }
  function startHeroIdle(){ if(!reduce && !heroIdleRAF) heroIdleRAF=requestAnimationFrame(heroIdleTick); }
  function pauseHeroIdle(resumeAfter){
    if(heroIdleRAF){cancelAnimationFrame(heroIdleRAF); heroIdleRAF=null;}
    clearTimeout(heroIdleTimer);
    if(resumeAfter) heroIdleTimer=setTimeout(startHeroIdle,resumeAfter);
  }
  if(!reduce){
    hero.addEventListener('pointermove',function(e){pauseHeroIdle(1800); light(e.clientX,e.clientY);});
    hero.addEventListener('pointerleave',function(){pauseHeroIdle(0); startHeroIdle();});
  }
  window.addEventListener('resize',restLight);
  restLight();
  startHeroIdle();

  /* timecode */
  var tc=$('#tc'), t0=performance.now();
  if(!reduce){
    setInterval(function(){
      if(current!=='accueil'||document.hidden) return;
      var ms=performance.now()-t0, f=Math.floor(ms/40)%25, s=Math.floor(ms/1000)%60, m=Math.floor(ms/60000)%60, h=Math.floor(ms/3600000);
      tc.textContent=[h,m,s,f].map(function(n){return ('0'+n).slice(-2)}).join(':');
    },40);
  }

  function initReveals(){
    var els=$$('.reveal');
    if(reduce||!window.IntersectionObserver){ els.forEach(function(el){el.classList.add('in')}); return; }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    },{rootMargin:'0px 0px -8% 0px',threshold:0.12});
    els.forEach(function(el){ io.observe(el); });
  }
  initReveals();

  /* page de départ */
  var start='accueil';
  try{var h=(location.hash||'').replace(/^#\/?/,''); if(TITLES[h]) start=h;}catch(e){}
  go(start);
})();

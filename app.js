(function(){
  var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* ——— Contenus (provisoires) ——— */
  var STEPS=[
    {v:'Écrire',h:265,t:'Une idée, un scénario, une note d’intention. Tout commence par le texte.',d:['Scénario','Note d’intention','Traitement']},
    {v:'Concevoir',h:200,t:'Direction artistique, storyboard, plan de tournage.',d:['Direction artistique','Storyboard','Plan de tournage']},
    {v:'Tourner',h:20,t:'Image, lumière et son, sur le plateau ou en extérieur.',d:['Équipe et matériel','Lumière','Prise de son']},
    {v:'Monter',h:340,t:'Montage, étalonnage et livraison dans les bons formats.',d:['Montage','Étalonnage','Livraison multi-formats']}
  ];
  var PRICES=[
    {n:'Bande démo',p:'XX € — XX €'},{n:'Montage vidéo',p:'XX € — XX €'},{n:'Reel / contenu court',p:'XX € — XX €'},
    {n:'Clip musical',p:'XX € — XX €'},{n:'Court-métrage',p:'XX € — XX €',x:'ou sur devis'}
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
     url:null, id:null}
  ];
  var DEMO_SOON='Les bandes démo arrivent bientôt : les montages sont en cours.';
  var TITLES={accueil:'Kobra’s Productions — Maquette',realisations:'Nos réalisations — Kobra’s Productions',services:'Nos services — Kobra’s Productions',tarifs:'Nos tarifs — Kobra’s Productions',univers:'Notre univers — Kobra’s Productions',devis:'Demander un devis — Kobra’s Productions'};
  var ACCENTS=[['Ultraviolet','#8b6dff'],['Braise','#ff5a3c'],['Or','#e2b04c'],['Venin','#a8f03a']];

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
  function frame(h,extra){return '<div class="frame" style="--h:'+h+'">'+(extra||'')+'</div>'}

  /* ——— Rendu ——— */
  $('#strips').innerHTML=STRIPS.map(function(s){
    return '<a class="strip" href="#/realisations" data-route="realisations" data-filter="'+s.k+'">'+frame(s.h)+
      '<div class="wrap in"><div><h3>'+esc(s.t)+'</h3><p>'+esc(s.s)+'</p></div><span class="go" aria-hidden="true">↗</span></div></a>';
  }).join('');

  $$('[data-steps]').forEach(function(el){
    var detail=el.getAttribute('data-steps')==='detail';
    el.innerHTML=STEPS.map(function(s,i){
      return '<article class="step" style="--h:'+s.h+'"><span class="n">Étape '+(i+1)+' sur 4</span><div><h3>'+s.v+'</h3><p>'+esc(s.t)+'</p>'+
        (detail?'<ul>'+s.d.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>':'')+'</div></article>';
    }).join('');
  });

  $$('[data-prices]').forEach(function(el){
    el.innerHTML=PRICES.map(function(p){
      return '<div class="price"><h3>'+esc(p.n)+'</h3><div class="amt">'+p.p+(p.x?'<small>'+p.x+'</small>':'')+'</div>'+
        '<a class="textlink" href="#/devis" data-route="devis" data-project="'+esc(p.n)+'">Demander ce devis</a></div>';
    }).join('');
  });

  $('#works').innerHTML=WORKS.map(function(w,i){
    var tag=w.url?'a':'div', open=w.url?('href="'+esc(w.url)+'" target="_blank" rel="noopener"'):'aria-disabled="true"';
    var thumb=w.id?'<img class="thumb" src="https://i.ytimg.com/vi/'+w.id+'/hqdefault.jpg" alt="Miniature : '+esc(w.t)+'" loading="lazy" decoding="async">':'';
    return '<'+tag+' class="work" '+open+' data-cat="'+w.k+'">'+
      frame(w.h, thumb+'<span class="ph">'+(w.url?'Voir sur YouTube':'Lien à venir')+'</span><span class="play"></span>')+
      '<h3>'+esc(w.t)+'</h3><p>'+esc(w.m)+'</p><p class="role">'+esc(w.role||'')+'</p></'+tag+'>';
  }).join('')+'<p class="note demo-empty" hidden>'+DEMO_SOON+'</p>';
  $$('.thumb').forEach(function(img){img.addEventListener('error',function(){img.remove()})});

  var TYPES=['Clip musical','Court-métrage','Bande démo','Montage vidéo','Reel / contenu court'];
  $('#types').innerHTML=TYPES.map(function(t){return '<label class="chip"><input type="radio" name="type" value="'+esc(t)+'"><span>'+esc(t)+'</span></label>'}).join('');
  $('#etapes').innerHTML=STEPS.map(function(s){return '<label class="chip"><input type="checkbox" name="etape" value="'+s.v+'"><span>'+s.v+'</span></label>'}).join('');

  /* ——— Navigation entre onglets ——— */
  var current='accueil', nav=$('#nav');
  function setFilter(f){
    $$('.filters button').forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-filter')===f))});
    var shown=0;
    $$('.work').forEach(function(w){var on=(f==='all'||w.getAttribute('data-cat')===f); w.hidden=!on; if(on) shown++;});
    $('.demo-empty').hidden = shown>0;
  }
  function preselect(name){
    var m={'Bande démo':'Bande démo','Montage vidéo':'Montage vidéo','Reel / contenu court':'Reel / contenu court','Clip musical':'Clip musical','Court-métrage':'Court-métrage'};
    $$('input[name="type"]').forEach(function(i){i.checked=(i.value===m[name])});
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
    if(name==='devis' && o.project) preselect(o.project);
    closeMenu(); window.scrollTo(0,0);
    try{ history.replaceState(null,'','#/'+(name==='accueil'?'':name)); }catch(e){}
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-route]'); if(!a) return;
    e.preventDefault(); go(a.getAttribute('data-route'),{filter:a.getAttribute('data-filter'),project:a.getAttribute('data-project')});
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

  /* formulaire (simulé) */
  var form=$('#form'), sent=$('#sent');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!form.checkValidity()){form.reportValidity();return;}
    form.hidden=true; sent.hidden=false; sent.scrollIntoView({block:'center'});
  });
  $('#again').addEventListener('click',function(){form.reset();sent.hidden=true;form.hidden=false});

  /* couleur d'accent à tester */
  var sw=$('#swatches');
  sw.innerHTML=ACCENTS.map(function(a,i){return '<button type="button" style="--c:'+a[1]+'" data-c="'+a[1]+'" aria-label="'+a[0]+'" title="'+a[0]+'" aria-pressed="'+(i===0)+'"></button>'}).join('');
  sw.addEventListener('click',function(e){
    var b=e.target.closest('button'); if(!b) return;
    document.documentElement.style.setProperty('--accent',b.getAttribute('data-c'));
    $$('button',sw).forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});
  });
  $('#mock-x').addEventListener('click',function(){$('#mock').hidden=true});

  /* ——— Hero : la lumière suit le pointeur ——— */
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero=$('#hero'), glow=$('#glow'), cobra=$('#cobra'), beam=$('#beam');
  var VB={x:106,y:99,w:2222,h:3306};
  function light(px,py){
    var hr=hero.getBoundingClientRect(), cr=cobra.getBoundingClientRect();
    glow.style.setProperty('--mx',(px-hr.left)+'px'); glow.style.setProperty('--my',(py-hr.top)+'px');
    var vx=VB.x+(px-cr.left)/cr.width*VB.w, vy=VB.y+(py-cr.top)/cr.height*VB.h;
    beam.setAttribute('cx',vx); beam.setAttribute('cy',vy);
  }
  function restLight(){var cr=cobra.getBoundingClientRect(); light(cr.left+cr.width*.45,cr.top+cr.height*.22)}
  if(!reduce){
    hero.addEventListener('pointermove',function(e){light(e.clientX,e.clientY)});
    hero.addEventListener('pointerleave',restLight);
  }
  window.addEventListener('resize',restLight);
  restLight();

  /* timecode */
  var tc=$('#tc'), t0=performance.now();
  if(!reduce){
    setInterval(function(){
      if(current!=='accueil'||document.hidden) return;
      var ms=performance.now()-t0, f=Math.floor(ms/40)%25, s=Math.floor(ms/1000)%60, m=Math.floor(ms/60000)%60, h=Math.floor(ms/3600000);
      tc.textContent=[h,m,s,f].map(function(n){return ('0'+n).slice(-2)}).join(':');
    },40);
  }

  /* page de départ */
  var start='accueil';
  try{var h=(location.hash||'').replace(/^#\/?/,''); if(TITLES[h]) start=h;}catch(e){}
  go(start);
})();

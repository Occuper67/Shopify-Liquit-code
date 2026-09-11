(() => {
  const demo = {
    'product.title':'Premium Wireless Headphones',
    'product.description':'Designed for everyday comfort with premium sound.',
    'product.vendor':'Demo Store',
    'product.price':'₹2,499',
    'product.compare_at_price':'₹3,499',
    'product.selected_or_first_available_variant.price':'2499',
    'product.variants.first.id':'1234567890',
    'product.id':'1234567890',
    'product.handle':'premium-wireless-headphones',
    'product.featured_image':'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
    'product.url':'/products/premium-wireless-headphones',
    'product.available':'true',
    'product.vendor':'Demo Store',
    'product.tags':'New, Best Seller, Wireless',
    'product.metafields.custom.fabric':'Premium cotton',
    'product.metafields.custom.color':'Black',
    'product.metafields.custom.technique':'Hand finished',
    'product.metafields.custom.shipping_time':'2–4 business days',
    'product.metafields.custom.material':'Premium material',
    'product.metafields.custom.size':'M',
    'product_color':'Black', 'product_fabric':'Premium cotton',
    'product_material':'Premium material', 'product_size':'M',
    'product_shipping_time':'2–4 business days',
    'hours_left':'03','minutes_left':'42','seconds_left':'18',
    'delivery_start':'Sep 13','delivery_end':'Sep 15',
    'viewer_count':'27','buyers':'184','userRatingRounded':'4.8',
    'discount_percentage':'28','discount':'28','quantity':'1',
    'remaining':'8','items_left':'8','stock':'8','vote_count':'2000',
    'followers':'12.4K','tiktok_views':'1.2M','rating':'4.8',
    'color_option.values':'Black, White, Blue'
  };

  function formatValue(expr) {
    let e = expr.trim();
    const base = e.split('|')[0].trim();
    if ((base.startsWith("'") && base.endsWith("'")) || (base.startsWith('"') && base.endsWith('"'))) return base.slice(1,-1);
    if (/^\d+(\.\d+)?$/.test(base)) return base;
    if (demo[base] !== undefined) return demo[base];
    // Common Shopify object paths: fall back to useful demo values.
    if (/\.image|image_url|featured_image/.test(base)) return demo['product.featured_image'];
    if (/\.price|money/.test(base)) return demo['product.price'];
    if (/\.title|\.name/.test(base)) return demo['product.title'];
    if (/\.description/.test(base)) return demo['product.description'];
    if (/\.vendor/.test(base)) return demo['product.vendor'];
    if (/available/.test(base)) return 'true';
    if (/\.url|routes\./.test(base)) return '#';
    if (/\.id/.test(base)) return demo['product.id'];
    if (/\.handle/.test(base)) return demo['product.handle'];
    if (/metafields/.test(base)) return 'Demo value';
    if (/^(true|false)$/.test(base)) return base;
    return 'Demo';
  }

  function transformLiquid(src) {
    let s = src;
    // Remove Liquid comments.
    s = s.replace(/{%[-]?\s*comment\s*[-]?%}[\s\S]*?{%[-]?\s*endcomment\s*[-]?%}/gi,'');
    // Capture/assign variables: preserve useful demo values where possible, then remove tags.
    s = s.replace(/{%[-]?\s*assign\s+([\w-]+)\s*=\s*([^%]+?)\s*[-]?%}/gi,(m,name,expr)=>{
      const v=formatValue(expr.replace(/\s+%}$/,''));
      demo[name]=v;
      return '';
    });
    s = s.replace(/{%[-]?\s*capture\s+([\w-]+)\s*[-]?%}/gi,'').replace(/{%[-]?\s*endcapture\s*[-]?%}/gi,'');
    // Shopify control tags are not executable in a browser. Remove the tags but retain content.
    s = s.replace(/{%[-]?\s*(if|elsif|else|endif|unless|endunless|for|endfor|case|when|endcase|cycle|render|include|section|sections|form|endform|paginate|endpaginate|schema|endschema|style|endstyle|javascript|endjavascript|liquid)\b[^%]*[-]?%}/gi,'');
    // Output expressions, including filters.
    s = s.replace(/{{[-]?\s*([^}]+?)\s*[-]?}}/g,(m,expr)=>formatValue(expr));
    // A few raw Liquid delimiters that may remain.
    s = s.replace(/{%[^%]*%}/g,'').replace(/{{[^}]*}}/g,'');
    return s;
  }
  function escapeHtml(v){
    return String(v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function buildPreview(code){
    if(!code) return '<div style="font-family:Arial;padding:40px;text-align:center">Preview unavailable for this component.</div>';
    let s=transformLiquid(code);
    // Avoid nested document-level behavior inside srcdoc and make previews responsive.
    if(!/<html[\s>]/i.test(s)){
      s='<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+
        '<style>html,body{margin:0;padding:0;background:#fff}*{box-sizing:border-box}</style></head><body>'+s+'</body></html>';
    }
    return s;
  }

  const grid=document.getElementById('grid'), search=document.getElementById('search'), category=document.getElementById('category'), count=document.getElementById('count');
  const categories=[...new Set(window.COMPONENTS.flatMap(c=>c.tags||[]).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  category.innerHTML='<option value="">All categories</option>'+categories.map(x=>`<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`).join('');
  let filtered=window.COMPONENTS.slice();
  const state={};

  function render(){
    const q=search.value.trim().toLowerCase(), cat=category.value;
    filtered=window.COMPONENTS.filter(c=>(!q || (c.title+' '+c.tags.join(' ')+' '+c.id).toLowerCase().includes(q)) && (!cat || c.tags.includes(cat)));
    count.textContent=`${filtered.length} of ${window.COMPONENTS.length} components`;
    grid.innerHTML=filtered.map((c,idx)=>cardHtml(c,idx)).join('');
    bindCards();
  }
  function cardHtml(c,idx){
    const status=c.hasCode?'Preview available':'Code not captured';
    return `<article class="card" data-id="${c.id}">
      <div class="card-head"><div><span class="num">#${String(c.number).padStart(3,'0')}</span><h2>${escapeHtml(c.title)}</h2><div class="tags">${c.tags.map(t=>`<span>${escapeHtml(t)}</span>`).join('')}</div></div><span class="status ${c.hasCode?'ok':'missing'}">${status}</span></div>
      <div class="preview-wrap"><div class="preview-toolbar"><span>LIVE PREVIEW</span><div><button class="mini" data-action="desktop">Desktop</button><button class="mini" data-action="mobile">Mobile</button><button class="mini" data-action="expand">⛶</button></div></div><div class="preview-stage"><iframe title="${escapeHtml(c.title)} preview" sandbox="allow-scripts allow-forms allow-popups" loading="lazy"></iframe></div></div>
      <div class="actions"><button class="primary" data-action="copy">Copy Code</button><button class="secondary" data-action="code">View Code</button><a class="secondary link" href="#component-${c.id}">#${c.id}</a></div>
      <div class="code-panel" hidden><div class="code-top"><span>Original recovered code</span><button class="mini" data-action="copy">Copy</button></div><pre><code>${escapeHtml(c.code||'No code was captured for this component.')}</code></pre></div>
    </article>`;
  }
  function bindCards(){
    document.querySelectorAll('.card').forEach(card=>{
      const id=card.dataset.id, c=window.COMPONENTS.find(x=>x.id===id), iframe=card.querySelector('iframe');
      if(c?.code){ iframe.dataset.srcdoc=buildPreview(c.code); }
      card.id='component-'+id;
      card.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',()=>{
        const a=btn.dataset.action;
        if(a==='copy') navigator.clipboard?.writeText(c.code||'').then(()=>flash(btn,'Copied!')).catch(()=>fallbackCopy(c.code||'',btn));
        if(a==='code'){const p=card.querySelector('.code-panel');p.hidden=!p.hidden;btn.textContent=p.hidden?'View Code':'Hide Code';}
        if(a==='expand'){const wrap=card.querySelector('.preview-wrap');wrap.classList.toggle('fullscreen');}
        if(a==='mobile') card.querySelector('.preview-stage').classList.add('mobile');
        if(a==='desktop') card.querySelector('.preview-stage').classList.remove('mobile');
      }));
    });
    document.querySelectorAll('.card iframe').forEach(f=>observer.observe(f));
  }
  function fallbackCopy(text,btn){const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();flash(btn,'Copied!');}
  function flash(btn,t){const old=btn.textContent;btn.textContent=t;setTimeout(()=>btn.textContent=old,900)}
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const f=e.target;if(f.dataset.srcdoc && !f.srcdoc){f.srcdoc=f.dataset.srcdoc;delete f.dataset.srcdoc;observer.unobserve(f);}}});},{rootMargin:'500px'});
  search.addEventListener('input',render); category.addEventListener('change',render); render();
})();

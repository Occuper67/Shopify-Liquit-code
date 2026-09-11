(() => {
  const DEMO_IMAGE = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80';

  const DEMO = {
    product: {
      id: 1234567890,
      title: 'Premium Wireless Headphones',
      handle: 'premium-wireless-headphones',
      description: 'Designed for everyday comfort with premium sound.',
      vendor: 'Demo Store',
      price: 2499,
      compare_at_price: 3499,
      available: true,
      featured_image: DEMO_IMAGE,
      url: '/products/premium-wireless-headphones',
      tags: ['New', 'Best Seller', 'Wireless'],
      images: [DEMO_IMAGE],
      variants: [
        { id: 1234567890, price: 2499, available: true, title: 'Default' }
      ],
      selected_or_first_available_variant: {
        id: 1234567890,
        price: 2499,
        available: true
      }
    },

    product_color: 'Black',
    product_fabric: 'Premium cotton',
    product_material: 'Premium material',
    product_size: 'M',
    product_shipping_time: '2–4 business days',

    hours_left: '03',
    minutes_left: '42',
    seconds_left: '18',

    delivery_start: 'Sep 13',
    delivery_end: 'Sep 15',

    viewer_count: '27',
    buyers: '184',
    userRatingRounded: '4.8',

    discount_percentage: '28',
    discount: '28',
    quantity: '1',
    remaining: '8',
    items_left: '8',
    stock: '8',

    vote_count: '2000',
    followers: '12.4K',
    tiktok_views: '1.2M',
    rating: '4.8',

    color_option: {
      values: ['Black', 'White', 'Blue']
    },

    settings: {},
    section: { settings: {} },
    block: { settings: {} },

    routes: {
      root_url: '/'
    },

    shop: {
      name: 'Demo Store',
      url: '#'
    },

    cart: {
      item_count: 1,
      total_price: 2499
    },

    customer: null
  };

  function escapeHtml(v) {
    return String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function fallbackValue(expr) {
    let e = String(expr || '').trim();

    const base = e.split('|')[0].trim();

    if (
      (base.startsWith("'") && base.endsWith("'")) ||
      (base.startsWith('"') && base.endsWith('"'))
    ) {
      return base.slice(1, -1);
    }

    if (/^\d+(\.\d+)?$/.test(base)) {
      return base;
    }

    const map = {
      'product.title': DEMO.product.title,
      'product.description': DEMO.product.description,
      'product.vendor': DEMO.product.vendor,
      'product.price': '₹2,499',
      'product.compare_at_price': '₹3,499',
      'product.featured_image': DEMO_IMAGE,
      'product.url': '#',
      'product.id': DEMO.product.id,
      'product.handle': DEMO.product.handle,
      'product.available': 'true',

      'product_color': 'Black',
      'product_fabric': 'Premium cotton',
      'product_material': 'Premium material',
      'product_size': 'M',
      'product_shipping_time': '2–4 business days',

      'hours_left': '03',
      'minutes_left': '42',
      'seconds_left': '18',

      'delivery_start': 'Sep 13',
      'delivery_end': 'Sep 15',

      'viewer_count': '27',
      'buyers': '184',
      'userRatingRounded': '4.8',

      'discount_percentage': '28',
      'discount': '28',
      'quantity': '1',

      'remaining': '8',
      'items_left': '8',
      'stock': '8',

      'vote_count': '2000',
      'followers': '12.4K',
      'tiktok_views': '1.2M',
      'rating': '4.8'
    };

    if (map[base] !== undefined) {
      return map[base];
    }

    if (/image|image_url|featured_image|img_url/.test(base)) {
      return DEMO_IMAGE;
    }

    if (/price|money/.test(base)) {
      return '₹2,499';
    }

    if (/title|name/.test(base)) {
      return DEMO.product.title;
    }

    if (/description/.test(base)) {
      return DEMO.product.description;
    }

    if (/vendor/.test(base)) {
      return DEMO.product.vendor;
    }

    if (/available/.test(base)) {
      return 'true';
    }

    if (/\.url|routes\./.test(base)) {
      return '#';
    }

    if (/\.id/.test(base)) {
      return String(DEMO.product.id);
    }

    if (/handle/.test(base)) {
      return DEMO.product.handle;
    }

    if (/metafields/.test(base)) {
      return 'Demo value';
    }

    return 'Demo';
  }

  function sanitizeShopifyTags(src) {
    let s = src;

    s = s.replace(
      /{%[-]?\s*comment\s*[-]?%}[\s\S]*?{%[-]?\s*endcomment\s*[-]?%}/gi,
      ''
    );

    s = s.replace(
      /{%[-]?\s*(schema|endschema)\s*[-]?%}/gi,
      ''
    );

    s = s.replace(
      /{%[-]?\s*(stylesheet|javascript|style)\s*[-]?%}/gi,
      ''
    );

    s = s.replace(
      /{%[-]?\s*end(stylesheet|javascript|style)\s*[-]?%}/gi,
      ''
    );

    s = s.replace(
      /{%[-]?\s*(render|include|section|sections)\b[^%]*[-]?%}/gi,
      ''
    );

    s = s.replace(
      /{%[-]?\s*(form|endform|paginate|endpaginate)\b[^%]*[-]?%}/gi,
      ''
    );

    s = s.replace(
      /{%[-]?\s*liquid\b[^%]*[-]?%}/gi,
      ''
    );

    return s;
  }

  function rewriteRelativeAssets(src) {
    let s = src;

    s = s.replace(
      /(<img\b[^>]*?\bsrc\s*=\s*["'])(?!https?:|data:|blob:|\/\/)([^"']+)(["'])/gi,
      (m, a, u, b) => a + DEMO_IMAGE + b
    );

    s = s.replace(
      /(<img\b[^>]*?\bsrc\s*=\s*["'])(?:\/cdn\/shop\/|\/files\/|\/assets\/)([^"']+)(["'])/gi,
      (m, a, u, b) => a + DEMO_IMAGE + b
    );

    s = s.replace(
      /url\(\s*["']?(?:\/cdn\/shop\/|\/files\/|\/assets\/|\.\/|\.\.\/)[^"')]+["']?\s*\)/gi,
      `url("${DEMO_IMAGE}")`
    );

    s = s.replace(
      /<link\b[^>]*href\s*=\s*["'](?:\.\/|\.\.\/|\/)(?!\/)[^"']+\.css[^"']*["'][^>]*>/gi,
      ''
    );

    return s;
  }

  function heuristicTransform(src) {
    let s = sanitizeShopifyTags(src);

    s = rewriteRelativeAssets(s);

    const vars = { ...DEMO };

    s = s.replace(
      /{%[-]?\s*assign\s+([\w-]+)\s*=\s*([^%]+?)\s*[-]?%}/gi,
      (m, n, e) => {
        vars[n] = fallbackValue(e);
        return '';
      }
    );

    s = s.replace(
      /{{[-]?\s*([^}]+?)\s*[-]?}}/g,
      (m, e) => fallbackValue(e)
    );

    s = s.replace(
      /{%[-]?\s*(if|elsif|else|endif|unless|endunless|for|endfor|case|when|endcase|cycle)\b[^%]*[-]?%}/gi,
      ''
    );

    s = s.replace(/{%[^%]*%}/g, '');
    s = s.replace(/{{[^}]*}}/g, '');

    return s;
  }

  function wrapDocument(s) {
    if (/<html[\s>]/i.test(s)) {
      return s;
    }

    return (
      '<!doctype html><html><head>' +
      '<meta charset="UTF-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<style>' +
      'html,body{margin:0;padding:0;background:#fff}' +
      '*,*:before,*:after{box-sizing:border-box}' +
      'img{max-width:100%;height:auto}' +
      '</style>' +
      '</head><body>' +
      s +
      '</body></html>'
    );
  }

  let liquidEnginePromise;

  function getLiquidEngine() {
    if (window.Liquid) {
      return Promise.resolve(
        new window.Liquid({ jsTruthy: true })
      );
    }

    if (liquidEnginePromise) {
      return liquidEnginePromise;
    }

    liquidEnginePromise = new Promise(resolve => {
      const sc = document.createElement('script');

      sc.src =
        'https://cdn.jsdelivr.net/npm/liquidjs/dist/liquid.browser.min.js';

      sc.onload = () => {
        resolve(
          window.Liquid
            ? new window.Liquid({ jsTruthy: true })
            : null
        );
      };

      sc.onerror = () => resolve(null);

      document.head.appendChild(sc);
    });

    return liquidEnginePromise;
  }

  async function renderLiquid(code) {
    const cleaned = rewriteRelativeAssets(
      sanitizeShopifyTags(code)
    );

    if (!/[{][{%]/.test(cleaned) && !/{{/.test(cleaned)) {
      return wrapDocument(cleaned);
    }

    const engine = await getLiquidEngine();

    if (!engine) {
      return wrapDocument(
        heuristicTransform(code)
      );
    }

    try {
      const identity = [
        'asset_url',
        'file_url',
        'image_url',
        'img_url',
        'stylesheet_tag',
        'script_tag',
        'payment_type_img_url',
        'customer_login_link',
        'link_to'
      ];

      identity.forEach(name => {
        try {
          engine.registerFilter(
            name,
            v => {
              if (
                name === 'image_url' ||
                name === 'img_url'
              ) {
                return DEMO_IMAGE;
              }

              if (
                name === 'asset_url' ||
                name === 'file_url'
              ) {
                return typeof v === 'string' &&
                  /^https?:/.test(v)
                  ? v
                  : DEMO_IMAGE;
              }

              return v ?? '';
            }
          );
        } catch (_) {}
      });

      engine.registerFilter(
        'money',
        v =>
          '₹' +
          Number(v || 2499).toLocaleString('en-IN')
      );

      engine.registerFilter(
        'money_with_currency',
        v =>
          '₹' +
          Number(v || 2499).toLocaleString('en-IN') +
          ' INR'
      );

      const html = await engine.parseAndRender(
        cleaned,
        DEMO
      );

      return wrapDocument(
        rewriteRelativeAssets(html)
      );

    } catch (err) {
      return wrapDocument(
        heuristicTransform(code)
      );
    }
  }

  function buildPreview(code) {
    if (!code) {
      return wrapDocument(
        '<div style="font-family:Arial;padding:40px;text-align:center">' +
        'Preview unavailable for this component.' +
        '</div>'
      );
    }

    return renderLiquid(code);
  }

  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const count = document.getElementById('count');

  const categories = [
    ...new Set(
      window.COMPONENTS
        .flatMap(c => c.tags || [])
        .filter(Boolean)
    )
  ].sort((a, b) => a.localeCompare(b));

  category.innerHTML =
    '<option value="">All categories</option>' +
    categories
      .map(
        x =>
          `<option value="${escapeHtml(x)}">${escapeHtml(x)}</option>`
      )
      .join('');

  function render() {
    const q = search.value.trim().toLowerCase();
    const cat = category.value;

    const filtered = window.COMPONENTS.filter(
      c =>
        (
          !q ||
          (
            c.title +
            ' ' +
            c.tags.join(' ') +
            ' ' +
            c.id
          )
            .toLowerCase()
            .includes(q)
        ) &&
        (!cat || c.tags.includes(cat))
    );

    count.textContent =
      `${filtered.length} of ${window.COMPONENTS.length} components`;

    grid.innerHTML =
      filtered.map(c => cardHtml(c)).join('');

    bindCards();
  }

  function cardHtml(c) {
    const status =
      c.hasCode
        ? 'Preview available'
        : 'Code not captured';

    return `
      <article class="card"
        data-id="${c.id}"
        id="component-${c.id}">

        <div class="card-head">
          <div>
            <span class="num">
              #${String(c.number).padStart(3, '0')}
            </span>

            <h2>
              ${escapeHtml(c.title)}
            </h2>

            <div class="tags">
              ${c.tags
                .map(
                  t =>
                    `<span>${escapeHtml(t)}</span>`
                )
                .join('')}
            </div>
          </div>

          <span class="status ${
            c.hasCode ? 'ok' : 'missing'
          }">
            ${status}
          </span>
        </div>

        <div class="preview-wrap">
          <div class="preview-toolbar">
            <span>LIVE PREVIEW</span>

            <div>
              <button
                class="mini"
                data-action="desktop">
                Desktop
              </button>

              <button
                class="mini"
                data-action="mobile">
                Mobile
              </button>

              <button
                class="mini"
                data-action="expand">
                ⛶
              </button>
            </div>
          </div>

          <div class="preview-stage">
            <iframe
              title="${escapeHtml(c.title)} preview"
              sandbox="allow-scripts allow-forms allow-popups"
              loading="lazy">
            </iframe>
          </div>
        </div>

        <div class="actions">
          <button
            class="primary"
            data-action="copy">
            Copy Code
          </button>

          <button
            class="secondary"
            data-action="code">
            View Code
          </button>

          <a
            class="secondary link"
            href="#component-${c.id}">
            #${c.id}
          </a>
        </div>

        <div class="code-panel" hidden>
          <div class="code-top">
            <span>Original recovered code</span>

            <button
              class="mini"
              data-action="copy">
              Copy
            </button>
          </div>

          <pre><code>${escapeHtml(
            c.code ||
            'No code was captured for this component.'
          )}</code></pre>
        </div>

      </article>
    `;
  }

  function bindCards() {
    document
      .querySelectorAll('.card')
      .forEach(card => {

        const c =
          window.COMPONENTS.find(
            x => x.id === card.dataset.id
          );

        const iframe =
          card.querySelector('iframe');

        card
          .querySelectorAll('[data-action]')
          .forEach(btn => {

            btn.addEventListener(
              'click',
              async () => {

                const a =
                  btn.dataset.action;

                if (a === 'copy') {
                  navigator.clipboard
                    ?.writeText(c.code || '')
                    .then(
                      () => flash(btn, 'Copied!')
                    )
                    .catch(
                      () =>
                        fallbackCopy(
                          c.code || '',
                          btn
                        )
                    );
                }

                if (a === 'code') {
                  const p =
                    card.querySelector(
                      '.code-panel'
                    );

                  p.hidden = !p.hidden;

                  btn.textContent =
                    p.hidden
                      ? 'View Code'
                      : 'Hide Code';
                }

                if (a === 'expand') {
                  card
                    .querySelector(
                      '.preview-wrap'
                    )
                    .classList.toggle(
                      'fullscreen'
                    );
                }

                if (a === 'mobile') {
                  card
                    .querySelector(
                      '.preview-stage'
                    )
                    .classList.add('mobile');
                }

                if (a === 'desktop') {
                  card
                    .querySelector(
                      '.preview-stage'
                    )
                    .classList.remove('mobile');
                }
              }
            );
          });

        if (c?.code) {
          previewObserver.observe(iframe);
        }
      });
  }

  function fallbackCopy(text, btn) {
    const ta =
      document.createElement('textarea');

    ta.value = text;

    document.body.appendChild(ta);

    ta.select();

    document.execCommand('copy');

    ta.remove();

    flash(btn, 'Copied!');
  }

  function flash(btn, t) {
    const old = btn.textContent;

    btn.textContent = t;

    setTimeout(
      () => {
        btn.textContent = old;
      },
      900
    );
  }

  const previewObserver =
    new IntersectionObserver(
      async entries => {

        for (const e of entries) {

          if (!e.isIntersecting) {
            continue;
          }

          const iframe = e.target;

          previewObserver.unobserve(
            iframe
          );

          const c =
            window.COMPONENTS.find(
              x =>
                x.id ===
                iframe
                  .closest('.card')
                  .dataset.id
            );

          if (!c?.code) {
            continue;
          }

          iframe.srcdoc =
            await buildPreview(c.code);

          iframe.addEventListener(
            'load',
            () => {
              try {
                const h =
                  iframe.contentDocument
                    ?.body
                    ?.scrollHeight || 0;

                if (h > 120) {
                  iframe.style.height =
                    Math.min(
                      Math.max(h + 16, 260),
                      760
                    ) + 'px';
                }

              } catch (_) {}
            },
            { once: true }
          );
        }
      },
      {
        rootMargin: '700px'
      }
    );

  search.addEventListener(
    'input',
    render
  );

  category.addEventListener(
    'change',
    render
  );

  render();

})();

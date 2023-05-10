import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    footer.querySelectorAll(':scope > div:nth-child(4) > h3').forEach((el) => {
      console.log('el', el);
      el.addEventListener('click', (e) => {
        console.log('click', e.target, el);
        el.nextElementSibling.classList.toggle('expanded');
      });
    });

    decorateIcons(footer);
    block.append(footer);
  }
}

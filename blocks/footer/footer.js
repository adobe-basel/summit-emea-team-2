import { readBlockConfig, decorateIcons } from '../../scripts/lib-franklin.js';
import { li } from '../../scripts/dom-helpers.js';

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
      el.addEventListener('click', () => {
        el.classList.toggle('expanded');
        el.nextElementSibling.classList.toggle('expanded');
      });
    });

    const originalSocial = footer.querySelector(':scope > div:nth-child(5)');
    originalSocial.classList.add('social-buttons');
    const clonedSocial = li(originalSocial.cloneNode(true));
    const connectWithUs = footer.querySelector(':scope > div:nth-child(4) > ul:nth-of-type(2)');
    connectWithUs.appendChild(clonedSocial.cloneNode(true));

    decorateIcons(footer);
    block.append(footer);
  }
}

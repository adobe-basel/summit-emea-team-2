import { div } from '../../scripts/dom-helpers.js';

export default async function decorate(block) {
  const quote = block.querySelector('p');
  const author = block.querySelector('p:nth-child(2)');
  const image = block.querySelector('picture img');

  const quoteBlock = div(
    { class: 'quote-block' },
    div({ class: 'summit-quote-left blue-background' }),
    div({ class: 'summit-quote-right red-background' }),
    div(
      { class: 'summit-quote-container' },
      div(
        { class: 'row align-items-center' },
        div(
          { class: 'quote-element col-12 col-lg-6' },
          div(
            { class: 'quote-text' },
            quote,
          ),
          div(
            { class: 'quote-author' },
            author,
          ),
        ),
        div(
          { class: 'quote-image col-12 col-lg-6', style: `background-image: url(${image.src})`, preload: 'metadata' },
          div({ class: 'summit-quote-sliver green' }),
          div({ class: 'summit-quote-right red' }),
        ),
      ),
    ),
  );

  block.innerHTML = quoteBlock.innerHTML;
}

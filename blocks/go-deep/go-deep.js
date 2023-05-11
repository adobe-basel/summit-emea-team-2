function allowToStyleListBullet(block) {
  block.querySelectorAll('li').forEach((li) => {
    const span = document.createElement('span');
    span.textContent = li.textContent;
    li.innerHTML = span.outerHTML;
  });
}

function movePictureInTopLevelDiv(block) {
  const p = block.querySelector('p:first-child');
  const image = p.querySelector('picture');
  const div = document.createElement('div');
  div.innerHTML = image.outerHTML;
  block.prepend(div);
  p.remove();
}

/**
 * decorates the go deep block
 * @param {Element} block The go-deep block element
 */
export default async function decorate(block) {
  allowToStyleListBullet(block);
  movePictureInTopLevelDiv(block);
}
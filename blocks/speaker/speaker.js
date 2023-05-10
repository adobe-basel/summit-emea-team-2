const decorateVideo = (container) => {
  const link = container.querySelector('a[href$=".mp4"]');

  container.innerHTML = `<video preload="metadata" playsinline autoplay muted loop>
    <source src="${link.href}" type="video/mp4" />
  </video>`;
};

const decorateBlockBg = (block, node) => {
  if (!node.querySelector(':scope img') && !node.querySelector(':scope video')) {
    block.style.background = node.textContent;
    node.remove();
  }
};

const decorateImage = (media) => {
  media.classList.add('image');

  const imageLink = media.querySelector('a');
  const picture = media.querySelector('picture');

  if (imageLink && picture) {
    imageLink.textContent = '';
    imageLink.append(picture);
  }
};

export default async function init(el) {
  // decorate item contents
  const children = el.querySelectorAll(':scope > div > div');
  console.log(children)
  if(children.length === 2) {
    children[0].classList.add('image');
    children[1].classList.add('text');
  }
}

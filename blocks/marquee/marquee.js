const decorateVideo = (container) => {
  const link = container.querySelector('a[href$=".mp4"]');

  container.innerHTML = `<video class="lazy" playsinline autoplay muted loop poster="/images/marquee-video-poster.png">
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

export default async function decorate(el) {
  const isLight = el.classList.contains('light');
  if (!isLight) el.classList.add('dark');
  const children = el.querySelectorAll(':scope > div');
  const foreground = children[children.length - 1];
  if (children.length > 1) {
    children[0].classList.add('background');
    decorateBlockBg(el, children[0]);
  }
  foreground.classList.add('foreground', 'container');
  const headline = foreground.querySelector('h1, h2, h3, h4, h5, h6');
  const text = headline.closest('div');
  text.classList.add('text');
  const media = foreground.querySelector(':scope > div:not([class])');

  if (media) {
    media.classList.add('media');

    if (media.querySelector('a[href$=".mp4"]')) {
      decorateVideo(media);
    } else {
      decorateImage(media);
    }
  }
}

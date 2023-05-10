import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

let gul = null;
let gdata = [];
let previousWindowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

function handleWindowResize() {
  const windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  if (!gul || gdata.length === 0
    || ((previousWindowWidth <= 768 && windowWidth <= 768)
    || (previousWindowWidth > 768 && windowWidth > 768))
  ) {
    return;
  }

  if (windowWidth <= 768) {
    gdata.forEach((item) => {
      gul.children[item.row].querySelector('picture').replaceWith(item.mobile);
      if (!gul.children[item.row].querySelector('.cards-card-body')) {
        gul.children[item.row].append(item.text);
        gul.children[item.row].classList.toggle('image');
      }
    });
  } else {
    gdata.forEach((item) => {
      gul.children[item.row].querySelector('picture').replaceWith(item.desktop);
      gul.children[item.row].querySelector('.cards-card-body')?.remove();
      gul.children[item.row].classList.toggle('image');
    });
  }

  previousWindowWidth = windowWidth;
}

export default function decorate(block) {
  const windowWidth = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  const viewPortCardData = [];
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row, rind) => {
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    const tmpViewPortData = {};
    [...li.children].forEach((div) => {
      if (div.querySelector(':scope picture')) {
        div.className = 'cards-card-image';
        // check if two images are provided for desktop / mobile
        const images = div.querySelectorAll('picture');
        if (images.length > 1) {
          const [desk, mob] = images;
          tmpViewPortData.row = rind;
          tmpViewPortData.desktop = desk;
          tmpViewPortData.mobile = mob;
          if (windowWidth <= 768) {
            images[0].remove();
          } else {
            images[1].remove();
          }
        }
      } else if (div.children.length >= 1) {
        div.className = 'cards-card-body';
        tmpViewPortData.text = div;
      } else {
        div.remove();
      }
    });
    // viewport handling
    if (Object.keys(tmpViewPortData).length > 1 && tmpViewPortData.text && windowWidth > 768) {
      li.querySelector('.cards-card-body').remove();
    }
    if (Object.keys(tmpViewPortData).length > 1) {
      viewPortCardData.push(tmpViewPortData);
    }
    // special cases
    if (!li.querySelector(':scope picture')) {
      li.classList.add('text');
    } else if (!li.querySelector(':scope p')) {
      li.classList.add('image');
    } else {
      const bleft = document.createElement('div');
      bleft.classList.add('border-left');
      const bb = document.createElement('div');
      bb.classList.add('border-bottom');
      const imdiv = li.querySelector('.cards-card-image');
      imdiv.append(bleft);
      imdiv.append(bb);
    }
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);

  // capture resize events
  gul = ul;
  gdata = viewPortCardData;
  window.onresize = handleWindowResize;
}

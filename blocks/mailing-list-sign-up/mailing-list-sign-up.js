import { domEl, form, div, button, img, h2, p, label, input } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const modal = domEl(
    'div',
    div({ class: 'summit-modal modal fade show mailinglist-modal', tabIndex: -1, style: 'display: block', role: 'dialog' },
      div({ class: 'modal-dialog modal-lg' },
        div({ class: 'modal-content' },
          div({ class: 'modal-header' },
            button({ class: 'btn-close', type: 'button' },
              img({ src: 'https://summit.adobe.com/_assets/images/global/btn-close-modal.png', alt: '' }),
            ),
          ),
          div({ class: 'modal-body' },
            div({ class: 'mailinglist-signup-content' },
              // <h2 id="" className=""></h2>
              // <p className="modal-copy">Join the mailing list to get the latest updates.</p>
              // <div className="mailing-list-form">
              h2({ class: 'mailinglist-modal-title modal-title' }, 'Stay up to date on all things Summit.'),
              p( { class: 'modal-copy' }, 'Join the mailing list to get the latest updates.' ),
              div({ class: 'mailing-list-form' },
                form({ class: 'summit-mailing-list summit-form needs-validation', noValidate: '', autocomplete: 'off' },
                  div({ class: 'form-flex' },
                    div( { class: 'form-field' },
                      label({ htmlFor: 'mailing-list-email' }, 'Email address *'),
                      input({ class: 'email_primary', type: 'email', name: 'email_primary', autocomplete: 'email', required: '' }),
                      div( { class: 'invalid-feedback' }, 'Please enter an email address.')
                    ),
                  ),
                  disclaimer(),
                  button({ class: 'summit-button primary submit-desktop', type: 'button' }, 'Sign up'),
                ),
              ),
            ),
            div({class: 'mailinglist-thankyou-content'},
              h2({ class: 'mailinglist-modal-title2 modal-title' }, 'Thank you.'),
              thankyou(),
            ),
            div({class: 'mailinglist-error-content'},
              h2({ class: 'mailinglist-modal-title2 modal-title' }, 'Unable to sign up.'),
              error(),
            ),
          ),
          div({ class: 'modal-bottom-border' }),
        ),
      ),
    ),
  );

  block.appendChild(modal);
}

function disclaimerLink(url, text) {
  const aTag = document.createElement('a');
  aTag.classList.add('text-link');
  aTag.classList.add('blue-on-light-bg');
  aTag.target = '_blank';
  aTag.rel = 'noopener noreferrer';
  aTag.href = url;
  aTag.textContent = text;

  return aTag;
}

function disclaimer() {
  const pTag = document.createElement('p');
  pTag.classList.add('legal');

  pTag.appendChild(document.createTextNode('The '));
  pTag.appendChild(disclaimerLink('https://www.adobe.com/privacy/policy.html#info-share', 'Adobe family of companies'));
  pTag.appendChild(document.createTextNode(' may keep me informed with '));
  pTag.appendChild(disclaimerLink('https://www.adobe.com/privacy/marketing.html#mktg-email', 'personalized emails'));
  pTag.appendChild(document.createTextNode(' about Adobe Summit. See our '));
  pTag.appendChild(disclaimerLink('https://www.adobe.com/privacy/policy.html', 'Privacy Policy'));
  pTag.appendChild(document.createTextNode(' for more details or to '));
  pTag.appendChild(disclaimerLink('https://accounts.adobe.com/', 'opt-out'));
  pTag.appendChild(document.createTextNode(' at any time.'));

  return pTag;
}

function thankyou() {
  const pTag = document.createElement('p');
  pTag.classList.add('modal-copy');

  pTag.appendChild(document.createTextNode('Thank you, you’re subscribed to the Summit mailing list. '));
  const aTag = document.createElement('a');
  aTag.href = '/emea/registration';
  aTag.textContent = 'Register now';
  aTag.classList.add('text-link');
  aTag.classList.add('blue-on-light-bg');
  pTag.appendChild(aTag);
  pTag.appendChild(document.createTextNode(' for Summit.'));

  return pTag;
}

function error() {
  const pTag = document.createElement('p');
  pTag.classList.add('modal-copy');

  pTag.appendChild(document.createTextNode('We could not add you to our mailing list.'));
  pTag.appendChild(document.createElement('br'));
  pTag.appendChild(document.createTextNode('Please try again later.'));

  return pTag;
}

import './../scss/index.scss';
import {Tomato} from './tomato';

export const app = new Tomato({});
app.renderPage();

let count = 0;
const imp = ['default', 'important', 'so-so'];
// eslint-disable-next-line max-len
document.querySelector('.button-importance').addEventListener('click', ({target}) => {
  count += 1;
  if (count >= imp.length) {
    count = 0;
  }

  for (let i = 0; i < imp.length; i++) {
    if (count === i) {
      target.classList.add(imp[i]);
    } else {
      target.classList.remove(imp[i]);
    }
  }
});

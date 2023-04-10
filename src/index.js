import { URL, modal } from './js/modal.js';

fetch(URL)
  .then(Response => Response.json())
  .then(data => modal(data.results))
  .catch(error => console.log(error));

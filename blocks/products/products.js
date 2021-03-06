import { Component } from '../component';
import template from './products.pug';
import _ from './products.scss';
import { ImageHelper } from '../image-helper';

const modifierSelected = "selected";

export class Products extends Component {

  constructor(data) {
    super(data);

    this.el.addEventListener('click', e => {

      let clickedProduct = e.target && e.target.closest('[data-id]');
      if (clickedProduct)
      {
        this._unselectAll();
        clickedProduct.classList.add(modifierSelected);       
        this.onItemClick(clickedProduct.dataset.id);
      }
    });
  }

  render(products) {
    this.el.innerHTML = template({ products: products });

    ImageHelper.replaceImages();
  }
  
  onItemClick(productId) {}

  search(query) {

    query = query && query.toLowerCase() || "";
    let items = this.el.querySelectorAll(".js-search-item");
    items.forEach(item => item.hidden = item.textContent.toLowerCase().indexOf(query) < 0);
  }

  select(productId) {

    this._unselectAll();
    let selectingElement = this.el.querySelector(`[data-id="${productId}"]`);
    selectingElement.classList.add(modifierSelected);
    this.onItemClick(productId);
  }

  _unselectAll() {

    let selectedElement = this.el.querySelector("." + modifierSelected);
    if (selectedElement)
    {
      selectedElement.classList.remove(modifierSelected);
    }
  }
}

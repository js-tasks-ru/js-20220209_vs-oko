export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.render();
  }

  getTemplate () {
    return `<div data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">
  <div data-element="header" class="sortable-table__header sortable-table__row"></div>
  <div data-element="body" class="sortable-table__body"></div>
  <\div><\div>`;
  }
  renderHeaders (sortColumn, order) {
    let headerArr = [];
    for (const obj of this.headerConfig) {
      let arrowTemplate = '';
      let orderType = '';
      if (obj.id === sortColumn) {
        arrowTemplate = `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
        </span>`;
        orderType = order;
      }
      headerArr.push(`<div class="sortable-table__cell" data-id="${obj.id}" data-sortable="${obj.sortable}" data-order="${orderType}">
      <span>${obj.title}</span>${arrowTemplate}
      </div>`);
    }
    return headerArr.join('');
  }
  renderBody () {
    let bodyArr = [];
    for (const obj of this.data) {
      bodyArr.push(`<a href="/products/${obj.id}" class="sortable-table__row">
        ${this.headerConfig
        .filter(item => obj[item.id])
        .map(el => el.template ? el.template(obj[el.id]) : `<div class="sortable-table__cell">${obj[el.id]}</div>`)
        .join('')}
        </a>`);
    }
    return bodyArr.join('');
  }
  render() {
    const element = document.createElement('div'); // (*)
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
    this.header = this.element.querySelector('.sortable-table__header');
    this.body = this.element.querySelector('.sortable-table__body');
    this.header.innerHTML = `${this.renderHeaders()}`;
    this.body.innerHTML = `${this.renderBody()}`;
  }
  sort(fieldValue, orderValue) {
    const directions = {
      asc: 1,
      desc: -1
    };
    const direction = directions[orderValue];
    const sortType = this.headerConfig.find(item => item.id === fieldValue).sortType;
    this.data.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[fieldValue] - b[fieldValue]);
      case 'string':
        return direction * a[fieldValue].localeCompare(b[fieldValue], ['ru', 'en']);
      default:
        return direction * (a[fieldValue] - b[fieldValue]);
      }
    });
    this.header.innerHTML = `${this.renderHeaders(fieldValue)}`;
    this.body.innerHTML = `${this.renderBody()}`;
    this.subElements = {body: this.body};
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}



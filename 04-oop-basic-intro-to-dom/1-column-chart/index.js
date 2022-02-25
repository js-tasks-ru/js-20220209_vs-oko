export default class ColumnChart {
  chartHeight = 50;
  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = ''
  } = {}) {
    this.data = data;
    this.label = label;
    this.linkTemplate = link ? `<a href="${link}" class="column-chart__link">View all</a>` : '';
    this.formatHeading = formatHeading ? formatHeading(value) : value;
    this.render();
    this.update(this.data);}

  getTemplate () {
    return `    <div class="column-chart column-chart_loading" style="--chart-height: 50">
      <div class="column-chart__title">
        Total ${this.label}
        ${this.linkTemplate}
      </div>
      <div class="column-chart__container">
        <div data-element="header" class="column-chart__header">${this.formatHeading}</div>
        <div data-element="body" class="column-chart__chart">`;
  }
  render() {
    const element = document.createElement('div'); // (*)
    element.innerHTML = this.getTemplate();
    this.element = element.firstElementChild;
  }
  update(data) {
    const innerElement = this.element.lastElementChild.lastElementChild;
    innerElement.innerHTML = '';
    if (!data.length) {
      this.element.classList.add('column-chart_loading');
      return;
    }
    this.element.classList.remove('column-chart_loading');
    const maxValue = Math.max(...data);
    for (const key of data) {
      const scale = this.chartHeight / maxValue;
      const percent = (key / maxValue * 100).toFixed(0);
      innerElement.innerHTML += `<div style="--value: ${Math.floor(key * scale)}" data-tooltip="${percent}%"></div>`;
    }
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}

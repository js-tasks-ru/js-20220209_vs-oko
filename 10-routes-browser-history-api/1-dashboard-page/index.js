import RangePicker from '../../08-forms-fetch-api-part-2/2-range-picker/index.js';
import SortableTable from '../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js';
import ColumnChart from '../../07-async-code-fetch-api-part-1/1-column-chart/index.js';
import header from './bestsellers-header.js';

import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru/';

export default class Page {
  element;
  subElements = {};
  components = {};
  url = new URL('api/dashboard/bestsellers', BACKEND_URL);

  async updateComponents(from, to) {
    const data = await this.loadData(from, to);

    this.components.sortableTable.update(data);
    this.components.ordersChart.update(from, to);
    this.components.salesChart.update(from, to);
    this.components.customersChart.update(from, to);
  }

  loadData(from, to) {
    this.url.searchParams.set('_start', '1');
    this.url.searchParams.set('_end', '21');
    this.url.searchParams.set('_sort', 'title');
    this.url.searchParams.set('_order', 'asc');
    this.url.searchParams.set('from', from.toISOString());
    this.url.searchParams.set('from', to.toISOString());

    return fetchJson(this.url);
  }

  initComponents() {
    const now = new Date();
    const range = {
      from: new Date(now.setMonth(now.getMonth() - 1)),
      to: new Date()
    };
    const rangePicker = new RangePicker(range);

    const ordersChart = new ColumnChart({
      url: 'api/dashboard/orders',
      range,
      label: 'orders',
      link: '#'
    });
    const salesChart = new ColumnChart({
      url: "/api/dashboard/sales",
      label: 'sales',
      range,
    });
    const customersChart = new ColumnChart({
      url: "/api/dashboard/customers",
      label: 'customers',
      range
    });
    const sortableTable = new SortableTable(header,{
      url: `api/dashboard/bestsellers?_start=1&_end=20&from=${range.from.toISOString()}&to=${range.to.toISOString()}`,
      isSortLocally: true
    });
    this.components = {
      rangePicker,
      ordersChart,
      salesChart,
      customersChart,
      sortableTable
    };
  }

  get template() {
    return `<div class="dashboard">
      <div class="content__top-panel">
        <h2 class="page-title">Dashboard</h2>
        <!-- RangePicker component -->
        <div data-element="rangePicker"></div>
      </div>
      <div data-element="chartsRoot" class="dashboard__charts">
        <!-- column-chart components -->
        <div data-element="ordersChart" class="dashboard__chart_orders"></div>
        <div data-element="salesChart" class="dashboard__chart_sales"></div>
        <div data-element="customersChart" class="dashboard__chart_customers"></div>
      </div>
      <h3 class="block-title">Best sellers</h3>
      <div data-element="sortableTable">
        <!-- sortable-table component -->
      </div>
    </div>`;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;
    this.getSubElements(element);

    this.initComponents();
    this.renderComponents();
    this.initEventListeners();

    return this.element;
  }
  renderComponents() {
    for (const component of Object.keys(this.components)) {
      this.subElements[component].append(this.components[component].element);
    }
  }
  initEventListeners() {
    this.components.rangePicker.element.addEventListener('date-select', event => {
      const { from, to } = event.detail;

      this.updateComponents(from, to);
    });
  }
  getSubElements(element) {
    const arr = element.querySelectorAll('[data-element]');
    for (const elem of arr) {
      this.subElements[elem.dataset.element] = elem;
    }
  }
  remove() {
    this.element.remove();
  }
  destroy() {
    this.subElements = {};
    for (const component of Object.values(this.components)) {
      component.destroy();
    }
    this.remove();
  }
}

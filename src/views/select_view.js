const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const SelectView = function (element) {
  this.element = element;
}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:all-countries', (evt) => {
    const allCountries = evt.detail;
    this.populate(allCountries);
  });

  this.element.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });

};

SelectView.prototype.populate = function (allCountriesData) {
  allCountriesData.forEach((country, index) => {
      const option = document.createElement('option');
      option.textContent = country.name;
      option.value = index;
      this.element.appendChild(option);
  });
};

module.exports = SelectView;

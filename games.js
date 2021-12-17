let products;

fetch('games.json').then(function(response) {
  return response.json();
}).then(function(json) {
  products = json;
  initialize(products);
}).catch(function(err) {
  console.log('Fetch problem: ' + err.message);
});

function initialize(products) {
  const series = document.querySelector('#series');
  const searchTerm = document.querySelector('#searchTerm');
  const searchBtn = document.querySelector('button');
  const main = document.querySelector('main');

  let lastSeries = series.value;
  let lastSearch = '';

  let seriesGroup;
  let finalGroup;

  finalGroup = products;
  updateDisplay();

  seriesGroup = [];
  finalGroup = [];

  searchBtn.onclick = selectSeries;

  function selectSeries(e) {
    e.preventDefault();

    seriesGroup = [];
    finalGroup = [];

    if(series.value === lastSeries && searchTerm.value.trim() === lastSearch) {
      return;
    } else {
      lastSeries = series.value;
      lastSearch = searchTerm.value.trim();

      if(series.value === 'All') {
        seriesGroup = products;
        selectProducts();
      } else {
        let lowerCaseType = series.value.toLowerCase();
        for(let i = 0; i < products.length ; i++) {
          if(products[i].series === lowerCaseType) {
            seriesGroup.push(products[i]);
          }
        }

        selectProducts();
      }
    }
  }

  function selectProducts() {
    if(searchTerm.value.trim() === '') {
      finalGroup = seriesGroup;
      updateDisplay();
    } else {
      let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      for(let i = 0; i < seriesGroup.length ; i++) {
        if(seriesGroup[i].name.toLowerCase().indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(seriesGroup[i]);
        }
      }

      updateDisplay();
    }

  }

  function updateDisplay() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    if(finalGroup.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No results to display!';
      main.appendChild(para);
    } else {
      for(let i = 0; i < finalGroup.length; i++) {
        showProduct(finalGroup[i]);
      }
    }
  }

  function showProduct(product) {
    var section = document.createElement('section');
    var heading = document.createElement('h2');
    var para = document.createElement('p');
    var a = document.createElement('a');
    var image = document.createElement('img');

    main.className = 'products'
    section.className = 'product';
    heading.className = 'product__title';
    image.className = 'product__img';

    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

    para.textContent = product.date;

    a.href = "https://store.steampowered.com/app/" + product.id.toString();
    a.textContent = "Steam";

    image.src = "img/icons/" + product.image;
    image.alt = product.name;
    
    main.appendChild(section);
    section.appendChild(image);
    section.appendChild(heading);
    section.appendChild(a);
    section.appendChild(para);
  }
}
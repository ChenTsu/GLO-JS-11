'use strict';

document.addEventListener('DOMContentLoaded', ()=>{
  console.log('DOM LOADED');
  let content  = document.body.getElementsByClassName('main-content')[0],
      products = [];
  
  let statusMsg = {
    loading: '<div style="color: wheat; line-height: 2;"><span>Loading....</span><img src="../icons/tenor.gif" style="vertical-align: middle;" alt="" width="20" /> </div>',
    // success: '<div style="color: greenyellow; line-height: 2;"><spn>Data sent successfully</spn><img src="../icons/checked.png" width="20" style="vertical-align: middle;" alt=""></div>',
    fail:    '<div style="color: red; line-height: 2;" ><span>something wrong... jo_Oj</span><img src="../icons/explosion.png" width="20" style="vertical-align: middle;" alt=""></div>'
  };
  
  // let goods;
  
  //////////// получаем товары ////////////
  let request = new XMLHttpRequest();
  request.open('GET', 'cars.json', true);
  request.send();
  
  request.addEventListener('readystatechange', ()=>{
    if (request.readyState < 4) {
      content.innerHTML = statusMsg.loading;
      return;
    }
    
    if (request.status !== 200){
      content.innerHTML = statusMsg.fail;
      return;
    }
  
    console.log(request.status);
  
    renderContent( JSON.parse(request.responseText) );
  });
  
  //////////// рисование товаров  ////////////
  function renderContent(goods) {
    console.log('START RENDERING');
    console.log(goods.cars);
    
    let ul = document.createElement('ul');
    ul.classList.add('GoodsList', 'ProductCards');
    content.innerHTML = '';
  
    for (let i=0; i<goods.cars.length; i++){
      let tmp = document.createElement('li');
      tmp.classList.add('GoodsList-Item');
  
      tmp.innerHTML = `
      <div class="ProductCard ProductCard">
            <div class="ProductCard-ImgWrap listView ">
              <a href="#product" class="ProductCard-ProdImgLink">
                <img src="${goods.cars[i].img}" alt="car" class="ProductCard-Image">
              </a>
            </div>
            <div class="ProductCard-ProductDetails listView">
              <a href="#product" class="ProductCard-ProdLink">${goods.cars[i].name}</a>
              <div class="ProductCard-CategoriesWrap">
                <a href="#productFirm" class="ProductCard-FirmLink">Firm</a>
                <span>-</span>
                <a href="#productCategory" class="ProductCard-CategoryLink">${goods.cars[i].category}</a>
              </div>

              <div class="ProductCard-PriceWrap">
                <span class="ProductCard-Price">$${goods.cars[i].price}</span>
                <!--<span class="ProductCard-OldPrice">$70.70</span>-->
              </div>
            </div>
            <div class="ProductCard-Description listView">
              <!--<div class="ProductCard-Delivery">Delivery type</div>-->
              <!--<h4 class="ProductCard-DescHeader">product desc</h4>-->
              <p class="ProductCard-DescText">${goods.cars[i].description}</p>
            </div>
          </div>
      `;
  
      ul.appendChild(tmp);
      products.push(tmp);
    }
    content.appendChild(ul);
  }
  
  
  //////////// фильтры  ////////////
  let filtersBox   = document.body.getElementsByClassName('main-filters')[0];
  
  filtersBox.addEventListener('change', event =>{
    if (event.target && event.target.tagName === 'INPUT'){
      products.forEach(el =>{ // проходим по всем карточкам
        if (event.target.parentElement.textContent.trim() === 'Все'){
          el.style.display = '';
        } else if (el.getElementsByClassName('ProductCard-CategoryLink')[0].textContent === event.target.parentElement.textContent.trim()){ // категория совпала с названием фильтра
          el.style.display = '';
        } else {
          el.style.display = 'none';
        }
      });
    }
  });
});
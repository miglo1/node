
var head=[
  '<div class="topModel">',
      '<a name="topBox" id="topBox"></a>',
      '{@each head as it, k}',
      '<img src="${it.image}" alt="topModel">',
      '{@/each}',
  '</div>'
].join('\n');

var foot=[
  '<div class="modelBottom">',
  '{@each foot as it, k}',
  '<img src="${it.image}" alt="bottomModel">',
  '{@/each}',
  '</div>'
].join('\n');

var coupon=[
  '<div class="codeModel codeBtn">',
  '{@each coupon as it, k}',
  '<img src="${it.image}" code="${it.code}" alt="codeModel">',
  '{@/each}',
 '</div>'
].join('\n');

var goods=[
  '{@each goods as item, k}',
  '<div class="clickModel">',
      '{@if item.title!=0}',
        '<h3 class="titleModel">',
            '<a name="topOne" id="topOne"></a>',
            '<img src="${item.title.image}" alt="titleOne">',
        '</h3>',
      '{@/if}',
      '{@if item.icon.length!=0}',
        '<div class="clickModel_item">',
            '{@each item.icon as it, k}',
              '<a href="${it.url}" target="_blank">',
                  '<img src="${it.image}" alt="clickModel">',
              '</a>',
            '{@/each}',
        '</div>',
      '{@/if}',
      '{@if item.goods.length!=0}',
        '<div class="modelGoods">',
            '<div class="goodsBox bg1">',
                '<ul class="goodsList">',
                    '{@each item.goods as it, k}',
                    '<li class="item">',
                        '<a href="${it.url}" target="_blank">',
                            '<img src="${it.image}" alt="">',
                        '</a>',
                        '<div class="descript">',
                            '<h3><a href="${it.brand_url}" target="_blank">${it.brand}[${it.country}]</a></h3>',
                            '<p><a href="${it.url}" target="_blank">${it.name}</a></p>',
                            '<div class="prise">',
                                '<strong><span>¥</span>${it.price}</strong>',
                                '<em>市场价:${it.market_price}</em>',
                            '</div>',
                        '</div>',
                        '{@if it.product_stock_total == 0}',
                        '<span class="leftLogo">已售罄</span>',
                        '{@/if}',
                    '</li>',
                    '{@/each}',
                '</ul>',
            '</div>',
        '</div>',
      '{@/if}',
  '</div>',
  '{@/each}'
].join('\n');

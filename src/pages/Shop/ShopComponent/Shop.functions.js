import fishing_rod_shop_1 from '@/assets/shop/fishing_rod-shop.png'
import fishing_rod_shop_2 from '@/assets/shop/fishing_rod-shop_1.png'
import fishing_rod_shop_3 from '@/assets/shop/fishing_rod-shop_2.png'
import fishing_line_shop_1 from '@/assets/shop/fishing_line-shop.png'
import fishing_line_shop_2 from '@/assets/shop/fishing_line-shop_1.png'
import fishing_line_shop_3 from '@/assets/shop/fishing_line-shop_2.png'
import coil_shop_1 from '@/assets/shop/coil-shop.png'
import coil_shop_2 from '@/assets/shop/coil-shop_1.png'
import coil_shop_3 from '@/assets/shop/coil-shop_2.png'
import hook_shop_1 from '@/assets/shop/hook-shop.png'
import hook_shop_2 from '@/assets/shop/hook_shop_1.png'
import hook_shop_3 from '@/assets/shop/hook_shop_2.png'
import bait_shop_1 from '@/assets/shop/bait-shop_1.png'
import bait_shop_2 from '@/assets/shop/bait-shop_2.png'
import bait_shop_3 from '@/assets/shop/bait-shop_3.png'
import bait_shop_4 from '@/assets/shop/bait-shop_4.png'
import bait_shop_5 from '@/assets/shop/bait-shop_5.png'
import {storage} from '@core/utils'

export function tackleItemHtml(fish, name = 'fishingrod', index) {
  const defineAmountBait = () => {
    const result = JSON.parse(storage('state'))
      .allTackle['bait']
      .map(b => b.name === fish.name ? b.quantity : '').join(' ')

    return result.trim().length
      ? result
      : 0
  }

  return `<div class="tackle-item">
            <div data-info="${name}:${index}" class="transparent-background">КУПИТЬ</div>
            <img class="tackle-item__img" src="${fish.img}">
            <span class="tackle-item__name">${fish.name} ${fish.price}руб.</span>
            ${ 
                name === 'bait' && JSON.parse(storage('state'))
                  ? `<span class="tackle-item__quantity"> 
                      ${defineAmountBait()}                      
                     </span>`
                  : ''
              }
         </div>`
}

export function fishHtml(fish) {
  return `<tr>
            <td>${fish.name}</td>
            <td>${fish.fishWeight}кг.</td>
          </tr>`
}

export function tableHtml(resultFishCage) {
  return `
         <table>
          <tbody>
            <tr>
              <th>Рыба:</th>
              <th>Вес:</th>
            </tr>
            ${resultFishCage ? resultFishCage.join(' ') : ''}
          </tbody>
         </table>
  `
}

export function optionsShop() {
  return {
    fishingrod: [
      {
        name: 'Lord',
        price: 10,
        img: fishing_rod_shop_1,
        maxWeight: 3
      },
      {
        name: 'Flagman',
        price: 15,
        img: fishing_rod_shop_2,
        maxWeight: 4
      },
      {
        name: 'Garbalino',
        price: 20,
        img: fishing_rod_shop_3,
        maxWeight: 5
      }
    ],
    fishingline: [
      {
        name: 'Brutal',
        price: 5,
        img: fishing_line_shop_1,
        maxWeight: 2,
        length: 20
      },
      {
        name: 'G-Line',
        price: 10,
        img: fishing_line_shop_2,
        maxWeight: 3,
        length: 40
      },
      {
        name: 'Camo Feeder',
        price: 15,
        img: fishing_line_shop_3,
        maxWeight: 4,
        length: 60
      }
    ],
    coil: [
      {
        name: 'Daiwa 3200',
        price: 10,
        img: coil_shop_1,
        bearings: 1,
        strength: 20
      },
      {
        name: 'Flagman 5000',
        price: 15,
        img: coil_shop_2,
        bearings: 2,
        strength: 30
      },
      {
        name: 'Shimano 16',
        price: 25,
        img: coil_shop_3,
        bearings: 3,
        strength: 40
      }
    ],
    hook: [
      {
        name: 'Одинарный крючок',
        price: 2,
        img: hook_shop_1,
        maxWeight: 3
      },
      {
        name: 'Двойной крючок',
        price: 4,
        img: hook_shop_2,
        maxWeight: 3
      },
      {
        name: 'Тройной крючок',
        price: 5,
        img: hook_shop_3,
        maxWeight: 3
      }
    ],
    bait: [
      {
        name: 'Тесто',
        price: 2,
        img: bait_shop_1
      },
      {
        name: 'Опарышь',
        price: 2,
        img: bait_shop_2
      },
      {
        name: 'Мотыль',
        price: 2,
        img: bait_shop_3
      },
      {
        name: 'Хлеб',
        price: 2,
        img: bait_shop_4
      },
      {
        name: 'Червь',
        price: 2,
        img: bait_shop_5
      }
    ],
  }
}

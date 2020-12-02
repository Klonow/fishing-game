import TenchImage from '@/assets/fish/Tench.png'
import RoachImage from '@/assets/fish/Roach.png'
import TroutImage from '@/assets/fish/Trout.png'

export function mapOptions() {
  return [
    {
      name: 'Форель',
      bait: ['Тесто', 'Червь', 'Опарышь'],
      weight: 2.5,
      chance: .1,
      creditFrom: 0.8,
      creditFishPrice: 80,
      image: TroutImage
    },
    {
      name: 'Плотва',
      bait: ['Тесто', 'Червь'],
      weight: 3,
      chance: .5,
      creditFrom: 0.6,
      creditFishPrice: 50,
      image: RoachImage
    },
    {
      name: 'Линь',
      bait: ['Мотыль', 'Хлеб'],
      chance: .5,
      weight: 5,
      creditFrom: 0.5,
      creditFishPrice: 100,
      image: TenchImage
    }
  ]
}

export function bottomLineMap(canvasHeight, floatHeight) {
  return canvasHeight - floatHeight
}

export function allFilesUploaded(filesForLoad, index) {
  return (filesForLoad.length - 1) <= index
}

export function message(html, where = 'canvas-layout') {
  const element = document.createElement('div')
  element.className = 'message'
  element.innerHTML = `<a class="message__close"></a>${html}`
  document.querySelector(`.${where}`).append(element)
}

export function loaderHtml() {
  return `<div class="loader">
            <div class="loader-spin"></div>
          </div>`
}

export function fishInfoHTML(weight, fish) {
  return `<div class="message__title">
            <div class="content">
              <h2 class="content__title">Рыба: ${fish[0].name}</h2>
              <span>Вес: ${weight}кг.</span>
            </div>
          </div>
          <div class="message__image">
            <img class="fish-image" src="${fish[0].image}" alt="">
          </div>`
}

export function randomNumberInDiapason(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function check() {

}

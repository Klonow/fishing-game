import fishingrodImage from '@/assets/other/fishingrod.png'
import floatImage from '@/assets/other/float.png'
import locationImage from '@/assets/backgrounds/location.jpg'
import backgroundShopImage from '@/assets/backgrounds/shop-bg.jpg'
import fishingrodDefaultImage from '@/assets/tackle-default/tackle-fishing-rod.png'

import pulledOut from '@/assets/sounds/pulledOut.mp3'
import threw from '@/assets/sounds/threw.mp3'

export function images() {
    return {
      location: locationImage,
      fishing_rod: fishingrodImage,
      float: floatImage,
      backgroundShop: backgroundShopImage,
      fishingrodDefaultImage
    }
}

export function sounds() {
  return {
    pulledOut: pulledOut,
    threw: threw
  }
}

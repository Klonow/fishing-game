import {$} from '@core/Dom'
import {GAME_TIME} from '@core/constans'

export function normalizeState(state) {
  if (state !== null) {
    return JSON.parse(state)
  } else {
    return state
  }
}

function checkTime(hour, $canvas) {
  $canvas.css({
    background: hour >= 20 || hour < 6
      ? 'rgba(0,0,0,0.5)'
      : 'rgba(0,0,0,0)'
  })
}

export function timerStart() {
  const date = new Date()
  const canvasStyleBackground = $('.canvas-layout')
  const $time = $('.time')


  if (storage('time') && !!storage('time').indexOf('NaN')) {
    const storageTime = storage('time').split(':')
    date.setHours(storageTime[0], storageTime[1], 0)
  } else {
    storage('time', '12:00')
    $time.text(`12:00`)
    date.setHours(12, 0, 0)
  }

  checkTime(date.getHours(), canvasStyleBackground)

  const timeInterval = setInterval(() => {
    if ($time.isNotElement()) {
      clearInterval(timeInterval)
      return;
    }

    const time = $time.text().split(':')
    date.setMinutes(+time[1] + 5)

    const minute =
      JSON.stringify(date.getMinutes()).length === 1
        ? '0' + JSON.stringify(date.getMinutes())
        : date.getMinutes()


    checkTime(date.getHours(), canvasStyleBackground)

    $time.text(`${date.getHours()}:${minute}`)
    storage('time', `${date.getHours()}:${minute}`)
  }, GAME_TIME)
}

export function clearTimeouts(intervals) {
  if (intervals) {
    intervals.map(interval => {
      clearInterval(interval)
    })
    return;
  }

  let max_id = setTimeout(function () {
  });
  while (max_id--) {
    clearTimeout(max_id);
  }

  timerStart()
}

export function calculateFishWeight(maxWeight) {
  if (Math.random() <= .95) {
    return (Math.floor(Math.random() * (150 - 20 + 1)) + 20) / 100
  } else {
    return (Math.floor(Math.random() * ((maxWeight * 100) - 150 + 1)) + 150) / 100
  }
}

export function storage(key, value) {
  if (!value) {
    return localStorage.getItem(key)
  }
  return localStorage.setItem(key, value)
}


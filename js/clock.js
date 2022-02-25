import HEXtoHSL from './hex-to-hsl.js'
import formatNumberto2digits from './format-number-to-2digits.js'

const body = document.querySelector('body')

const clockTimer = document.querySelector('#clock-timer')

const clockHandHour = document.querySelector('#clock-hand-hours')
const clockHandMinute = document.querySelector('#clock-hand-minutes')
const clockHandSecond = document.querySelector('#clock-hand-seconds')

// const favicon = document.querySelector('link[rel="shortcut icon"]')
const browserColor = document.querySelector('meta[name="theme-color"]')

// clockSetting;
let hoursTurnCounter = 0
let minutesTurnCounter = 0
let secondsTurnCounter = 0

function clock (now, hours, minutes, seconds) {
  now = new Date()
  hours = formatNumberto2digits(now.getHours())
  minutes = formatNumberto2digits(now.getMinutes())
  seconds = formatNumberto2digits(now.getSeconds())

  const mergedTime = `${hours}${minutes}${seconds}`
  const { h, s, l } = HEXtoHSL('#' + mergedTime)
  const hslTimeColor = `hsl(${h}, ${s}%, ${l}%)`
  const colorAccent = `hsl(${h}, ${s}%, ${l + 50}%)`

  // favicon.href = favicon.href.replace(/%23[0-9]{6}/gi, `%23${mergedTime}`)
  browserColor.setAttribute('content', `#${mergedTime}`)

  body.style.setProperty('--clock-color', hslTimeColor)
  body.style.setProperty('--clock-color-accent', colorAccent)

  clockTimer.textContent = `#${mergedTime}`
  clockTimer.setAttribute('datetime', `${hours}:${minutes}:${seconds}`)

  // Count turns avoid to back to a zero-degree rotation and
  // it keeps the clock hands rotation realistically.
  if (hours == 0 && seconds == 0) hoursTurnCounter++
  if (minutes == 0 && seconds == 0) minutesTurnCounter++
  if (seconds == 0) secondsTurnCounter++

  clockHandHour.style.transform = `rotate(${hoursTurnCounter * 360 +
    hours * (360 / 12)}deg)`
  clockHandMinute.style.transform = `rotate(${minutesTurnCounter * 360 +
    minutes * (360 / 60)}deg)`
  clockHandSecond.style.transform = `rotate(${secondsTurnCounter * 360 +
    seconds * (360 / 60)}deg)`
}

clock()
const updateClock = setInterval(clock, 1000)

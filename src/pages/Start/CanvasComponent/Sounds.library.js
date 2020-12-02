class AudioLibrary {
  constructor(audioTitle, audio) {
    this.srcAudio = audio
    this.prepare()
  }

  prepare() {
    this.currentAudio = new Audio()
    this.currentAudio.src = this.srcAudio
  }

  play() {
    this.currentAudio.play()
  }

  get audio() {
    return this.currentAudio
  }
}

export default function initializationAudioLibrary(audios) {
  return Object.keys(audios).map(audioTitle => {
    return this[audioTitle] = new AudioLibrary(audioTitle, audios[audioTitle])
  })
}

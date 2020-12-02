import {InitListeners} from '@core/initListeners'
import {allFilesUploaded} from '@/pages/Start/CanvasComponent/Cavnas.functions'
import {$} from '@core/Dom'

export class FishingComponent extends InitListeners {
  constructor($root, options) {
    super($root, options)
    if (!$root) {
      throw new Error('no $root provided for FishingComponent')
    }

    this.emitter = options.emitter
    this.store = options.store
  }

  $subscribe(event, fn) {
    this.emitter.subscribe(event, fn)
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $dispatch(reducerName, action) {
    this.store.dispatch(reducerName, action)
  }

  $getState(reducerName) {
    return this.store.getState(reducerName)
  }

  async load(files) {
    const filesForLoad = [
      ...files,
      ...document.querySelectorAll('img')
    ]

    const promise = resolve => {
      filesForLoad.forEach((file, index) => {
        switch (file.tagName) {
          case 'AUDIO':
            loadFile.apply(this, ['oncanplaythrough', file, index])
            break
          case 'IMG':
            loadFile.apply(this, ['onload', file, index])
            break
        }
      })

      function loadFile(method, file, index) {
        file[method] = () => {
          file[method] = null

          if(allFilesUploaded(filesForLoad, index)) {
            this.$root.removeAttr('style')
            $('.loader').removeElement()
            resolve()
          }
        }
      }
    }

    return await new Promise(promise)
  }
}

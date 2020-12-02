import {Emitter} from './Emitter'

describe('Emitter: emit, subscribe', () => {
  const emitter = new Emitter()

  test('Emitter should have methods: emit, subscribe', () => {
    expect(emitter.emit).toBeDefined()
    expect(emitter.subscribe).toBeDefined()
  })

  const fn = () => 'test'
  emitter.subscribe('test', fn)

  test('method must return a signed function', () => {
    expect(emitter.listeners.test).toContain(fn)
  })

  test('as a result of execution the method should return true', () => {
    expect(emitter.emit('test')).toBeTruthy()
  })
})

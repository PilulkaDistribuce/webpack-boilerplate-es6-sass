export default class MyClass {
  constructor () {
    this.initEvents()
  }

  initEvents () {
    document.getElementById('js-demo').addEventListener('click', (e) => {
      e.preventDefault()
      alert('Hello world')
    })
  }
}
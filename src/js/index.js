const debounce = (fn, debounceTime = 0) => {
  // your code goes here
  let timerId
  return function (...args) {
    const context = this
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(context, args)
    }, debounceTime)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input')
  const label = document.querySelector('.pressEnter')

  if (input && label) {
    input.addEventListener('input', () => {
      if (input.value.length > 0) {
        label.style.display = 'flex'
      } else {
        label.style.display = 'none'
      }
    })
  }
})

export function debounce(fn, delay = 300) {
  let timer = null

  return function () {
    const _self = this
    const args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(_self, args)
    }, delay)
  }
}

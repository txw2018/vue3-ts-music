export default function useAnimation() {
  let entering = false
  let leaving = false
  const cdWrapperRef = ref<HTMLDivElement>()

  const getPosAndScale = () => {
    const targetWidth = 40 // 小cd的宽度
    const paddingLeft = 40// 小cd圆心离左边的距离
    const paddingBottom = 30// 小cd圆心离底部距离
    const paddingTop = 80// 大cd离顶部距离
    const witdh = window.innerWidth * 0.8 // 大cd的宽度
    const x = -(window.innerWidth / 2 - paddingLeft)
    const y = window.innerHeight - paddingTop - witdh / 2 - paddingBottom
    const scale = targetWidth / witdh
    return {
      x,
      y,
      scale,
    }
  }
  function enter(el: any, done: any) {
    if (leaving)
      afterEnter()

    entering = true
    const { x, y, scale } = getPosAndScale()
    const keyframes = [
      {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      },
      { transform: 'translate3d(0, 0, 0) scale(1)' },
    ]
    const options = {
      duration: 600,
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
    }
    const cdWrapperEl = cdWrapperRef.value!
    cdWrapperEl.animate(keyframes, options)
    cdWrapperEl.addEventListener('animationend', next)
    function next() {
      cdWrapperEl.removeEventListener('animationend', next)
      done()
    }
  }
  function afterEnter() {
    entering = false
    cdWrapperRef.value!.style.animation = ''
  }
  function leave(el: any, done: any) {
    if (entering)
      afterEnter()
    leaving = true
    const { x, y, scale } = getPosAndScale()
    const cdWrapperEl = cdWrapperRef.value!
    cdWrapperEl.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrapperEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrapperEl.addEventListener('transitionend', next)

    function next() {
      cdWrapperEl.removeEventListener('transitionend', next)
      done()
    }
  }
  function afterLeave() {
    leaving = false
    const cdWrapperEl = cdWrapperRef.value!

    cdWrapperEl.style.transition = ''
    cdWrapperEl.style.transform = ''
  }
  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave,
  }
}

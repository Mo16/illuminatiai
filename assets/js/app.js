const html = document.documentElement
const body = document.body

/** Utils */

class Utils {
  static qs(selector, parent = document) {

    return parent.querySelector(selector)

  }
  static qsa(selector, parent = document) {

    return parent.querySelectorAll(selector)

  }
  static detectClickOutside(div, callback) {

    const clickHandler = e => {
      if (!div.contains(e.target)) {
        callback()
      }
    }

    document.addEventListener('click', clickHandler)

    const removeClickListener = () => {
      document.removeEventListener('click', clickHandler)
    }

    return removeClickListener

  }
}

const qs = Utils.qs
const qsa = Utils.qsa

/** Scroller */

class Scroller {
  constructor () {

    this.class = {
      fix: 'fix',
      reveal: 'reveal'
    }
    this.fixer = 100
    this.pos = 0
    this.elementsToObserve = qsa('[data-reveal]')
    this.each = 200
    this.scrollableDivs = qsa('.scroll-x')

    window.addEventListener('scroll', () => this.fixDetect())

    this.revelAnimation()

  }
  fixDetect () {

    const scrollY = window.scrollY

    if (scrollY > 0) {
      body.classList.add(this.class.fix)
    } else {
      body.classList.remove(this.class.fix)
    }

    this.pos = scrollY

  }
  revelAnimation () {

    const observer = new IntersectionObserver((entries, observer) => {
      let delay = 0
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add(this.class.reveal), delay)
          delay += this.each
          observer.unobserve(entry.target)
        }
      })
    })

    this.elementsToObserve.forEach(element => {
      observer.observe(element)
    })

  }
}

const $Scroller = new Scroller()

/** Header Nav */

class Nav {
  constructor () {

    this.class = {
      open: 'open-nav'
    }

    const header = qs('.header')
    const btnNav = qs('.btn-nav')

    btnNav.addEventListener('click', () => this.toggle())
    Utils.detectClickOutside(header, () => this.close())

  }
  toggle () {
    body.classList.toggle(this.class.open)
  }
  open () {
    body.classList.add(this.class.open)
  }
  close () {
    body.classList.remove(this.class.open)
  }
}

const $Nav = new Nav()

/** If mobile */

const ifMobile = () => {

      return false
  
}

if (ifMobile()) {
  html.classList.add('mobile')
}

/** Lenis */

const lenis = new Lenis({
  duration: 1
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({
  ease: 'none'
})
gsap.config({
  nullTargetWarn: false
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/** Motifs */

gsap.fromTo('.motif > *', { y: '0%' }, { y: '25%',
  scrollTrigger: {
    trigger: '.motif',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
})

/** Hero */

gsap.fromTo('.hero-bg', { y: '0%' }, { y: '25%',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
})

/** About */

const about = gsap.timeline({scrollTrigger: {
  trigger: '.about',
  start: 'top bottom',
  end: 'bottom top',
  scrub: true
}})

about
  .fromTo('.about-bg', { y: '-20%' }, { y: '20%' }, 'a')
  .fromTo('.about-word div', { x: '20%' }, { x: '-20%' }, 'a')

/** How */

gsap.fromTo('.how-bg', { y: '-20%' }, { y: '20%',
  scrollTrigger: {
    trigger: '.how',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
})

/* Load iframe */

const iframe = qs('#uniswap-iframe')
const iframe_load = ScrollTrigger.create({
  trigger: iframe,
  start: 'top bottom',
  onEnter() {
    iframe.setAttribute('src', iframe.dataset.src)
    iframe.scrollIntoView(false)
    iframe_load.kill()
  }
})

/** Tokenomics */

gsap.fromTo('.token-triangle-svg svg', { width: '0%', opacity: 0 }, { width: '100%', opacity: .5,
  scrollTrigger: {
    trigger: '.token',
    start: 'top 60%',
    end: 'top top',
    scrub: true
  }
})

const circle_timeline = {
  trigger: '.token-triangle-trigger',
  start: 'top bottom',
  end: 'bottom bottom',
  scrub: true
}

const circle = gsap.timeline({ scrollTrigger: circle_timeline })
circle
  .from('.c92', { duration: 60, strokeDasharray: '0 360' })
  .from('.c7', { duration: 30,  strokeDasharray: '0 360' })
  .from('.c1', {  duration: 20, strokeDasharray: '0 360' })

gsap.fromTo('.token-circle-svg', { rotate: 180 }, { duration: 110, rotate: 360, scrollTrigger: circle_timeline })
gsap.from('.token-title text', { y: '100%', scrollTrigger: circle_timeline })

gsap.fromTo('.token-bg', { y: '-20%' }, { y: '20%',
  scrollTrigger: {
    trigger: '.token .bg',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
})

gsap.fromTo('.token-triangle', { opacity: 1 }, { opacity: 0,
  scrollTrigger: {
    trigger: '.token .content',
    start: 'top bottom',
    end: 'top 20%',
    scrub: true
  }
})

/** Roadmap */

gsap.fromTo('.road-bg', { y: '-20%' }, { y: '20%',
  scrollTrigger: {
    trigger: '.road',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
})

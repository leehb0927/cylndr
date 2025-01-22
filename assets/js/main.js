/* 스크롤 부드럽게 */
/* const lenis = new Lenis()

lenis.on('scroll', (e) => {
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf) */

/* 스크롤 부드럽게 lenis + gsap */
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

/* header pin 고정 */
let navPin = ScrollTrigger.create({
    trigger: '.header nav',
    pin: '.header nav',
    markers: true
})

/* header 시계 */
const currentTime = document.querySelector('.header-inner .header-bottom .time');

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2,'0');
    /* 
    getHours() _ 시간을 24시간 형식으로 가져옴
    String() _ 시간을 문자열로 변환
    .padStart() _ 문자열의 길이가 2자리, 한자리일 경우 0 숫자 추가해줌
    */
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    currentTime.textContent = `${hours}:${minutes}:${seconds}`;
}

updateTime()
setInterval(updateTime, 1000)
/* 
setInterval _ 특정 함수를 일정한 간격으로 반복 실행하기 위해 사용하는 함수

setInterval(callback, delay)
callback _ 반복적으로 호출될 실행할 함수
delay _ 호출 간격을 밀리초 (1초  = 1000밀리초)단위로 설정
*/


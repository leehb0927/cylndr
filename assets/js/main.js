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
/* let navPin = ScrollTrigger.create({
    trigger: '.header nav',
    pin: '.header nav',
    markers: true
}) */

let navPin = gsap.timeline({
    scrollTrigger: {
        trigger: '.header nav',
        pin: '.nav-wrapper',
        start: '0% 0%',
        end: '90% 0%',
        markers: true,
        //gsap onUpdate찾아보기
        onUpdate: (self) => {
            if (self.progress >= 1) {
                // 스크롤의 끝에 도달했을 때 opacity를 0으로 설정
                gsap.to('.nav-wrapper ul', { opacity: 0, y: 100, duration: 0.5 })
            } else {
                // 스크롤 중간에서는 opacity를 유지
                gsap.to('.nav-wrapper ul', { opacity: 1, y: 0, duration: 0.5 });
            }
        }
    }
});


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


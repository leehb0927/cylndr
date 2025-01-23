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
        end: '100% 0',
        // markers: true,
        //gsap onUpdate찾아보기
        onUpdate: (self) => {
            if (self.progress >= 1) {
                // 스크롤의 끝에 도달했을 때 opacity를 0으로 설정
                gsap.to('.nav-wrapper ul', { opacity: 0, y: 50, duration: 0.6 });
                gsap.to('.nav-wrapper .top', { opacity: 0, y: 50, duration: 0.6 });
            } else {
                // 스크롤 중간에서는 opacity를 유지
                gsap.to('.nav-wrapper ul', { opacity: 1, y: 0, duration: 0.6 });
                gsap.to('.nav-wrapper .top', { opacity: 1, y: 0, duration: 0.6 });
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




/* .about-us .area1 */


//두 동작을 바로 잇기
/* gsap.timeline({
    scrollTrigger: {
        trigger: '.main .area1',
        start: 'top bottom',
    }
})
.to(showTextList, { y: 0, delay: (index) => index * 0.03 })
.to('.main .about-us .area1 .text-ko-wrap p', {y: 0, opacity: 1, duration: 1}, 1.6) */

//두 동작에 scrollTrigger을 따로따로 주기
/* 
    showTextList에 포함된 각 요소(element)에 대해 반복을 진행
    element _ 반복문 내에서 현재 요소 (.units)
    index _ 반복문에서 현재 요소의 인덱스
    */

//.show-text-wrap 공통 함수
function showTextAnimation(elements, trigger, startPoint, markers = false) {
    elements.forEach((element, index) => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: trigger,
                start: startPoint,
                markers: markers
            },
            y: 0,
            delay: (index + 1) * 0.03
        })
    })
}
//.text-ko-wrap 공통 기능 함수
function showSubTextAnimation(elements, trigger, options = {}) {
    //매개변수 값을 순서에 구애 받지 않고 받을 수 있게 된다.

    //구조 분해 할당 - 객체나 배열에서 값을 추출하여 변수에 할당하는 방법
    const {
        start = 'bottom bottom',
        end = 'bottom bottom',
        markers = false,
    } = options;

    gsap.to(elements, {
        scrollTrigger: {
            trigger: trigger,
            start: start,
            end: end,
            markers: markers
        },
        y: 0,
        opacity: 1,
        duration: .6
    })
}

const showTextList = document.querySelectorAll('.main .about-us .area1 .line .units');
//공통 기능을 함수로 추출한 것을 적용
showTextAnimation(showTextList, '.main .area1', 'top bottom')
showSubTextAnimation('.main .about-us .area1 .text-ko-wrap p', '.main .area1');

// 따로 적용할 경우 아래 코드를 길게 중복해서 적어야한다.
/* showTextList.forEach((element, index) => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: '.main .area1',
            start: 'top bottom',
        },
        y: 0,
        delay: (index + 1) * 0.03
    });
}); */
/* gsap.to('.main .about-us .area1 .text-ko-wrap p', {
    scrollTrigger: {
        trigger: '.main .area1',
        start: 'bottom bottom',
        end: 'bottom bottom',
        // markers:true
    }
    ,y: 0,
    opacity: 1,
    duration: .5
}) */




/* .about-us .area2 */
const showTextList2 = document.querySelectorAll('.main .about-us .area2 .line .units');
//텍스트 나타나는 애니메이션
showTextAnimation(showTextList2, '.main .area2', '70% bottom');
showSubTextAnimation('.main .about-us .area2 .text-ko-wrap p', '.main .area2');

//카드 리스트 이미지가 스크롤에 맞춰 움직이고, 중앙에 온 카드 이미지 opacity 조절하기





/* .about-us .area3 */
const showTextList3 = document.querySelectorAll('.main .about-us .area3 .line .units');
//텍스트 나타나는 애니메이션
showTextAnimation(showTextList3, '.main .area3','70% bottom');
showSubTextAnimation('.main .about-us .area3 .text-ko-wrap p', '.main .area3', {
    start : '150% bottom',
    end : '150% bottom',
});
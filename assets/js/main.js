/* 이미지 프리로드 */
//area14 이미지 프리로드
const area14ImageCount = 43;
const area14ImageCache = [];

for (let i = 1; i <= area14ImageCount; i++) {
    const area14Img = new Image();
    area14Img.src = `./assets/image/area14/area14_${i}.jpg`;
    area14ImageCache.push(area14Img); // 여기를 고침
}















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
  lenis.raf(time * 750)
})

gsap.ticker.lagSmoothing(0)

/* header pin 고정 */
/* let navPin = ScrollTrigger.create({
    trigger: '.header nav',
    pin: '.header nav',
}) */











/* header */
// header nav 특정 위치에서 사라짐
let navPin = gsap.timeline({
    scrollTrigger: {
        trigger: '.header nav',
        pin: '.nav-wrapper',
        start: '0% 0%',
        end: '100% 0',
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

// header 시계
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









/* about-us 공통 */
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

//공통 기능을 함수로 추출한 것을 적용
// .area1
const showTextList = document.querySelectorAll('.main .about-us .area1 .line .units');
showTextAnimation(showTextList, '.main .area1', 'top bottom')
showSubTextAnimation('.main .about-us .area1 .text-ko-wrap p', '.main .area1');

// .area2
const showTextList2 = document.querySelectorAll('.main .about-us .area2 .line .units');
showTextAnimation(showTextList2, '.main .area2', '70% bottom');
showSubTextAnimation('.main .about-us .area2 .text-ko-wrap p', '.main .area2');

// .area3
const showTextList3 = document.querySelectorAll('.main .about-us .area3 .line .units');
showTextAnimation(showTextList3, '.main .area3','70% bottom');
showSubTextAnimation('.main .about-us .area3 .text-ko-wrap p', '.main .area3', {
    start : '150% bottom',
    end : '150% bottom',
});

// .area6
const showTextList4 = document.querySelectorAll('.main .about-us .area6 .line .units');
showTextAnimation(showTextList4, '.main .area6', '50% bottom')
showSubTextAnimation('.main .area6 .text-ko-wrap p', '.main .area6', {
    start: '75% bottom',
})













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

//카드 리스트가 스크롤에 맞춰 오른쪽에서 왼쪽으로 이동 & 센터에 위치한 카드는 opacity:1
//(ul전체길이 + li/2) - window/2 = 이 값을 .cards-wrap 에 transform: translateX(이값)
function cardSlideScrollTrigger() {
    const area2CardsWrap = document.querySelector('.main .about-us .area2 .cards-wrap');
    const area2Cards = area2CardsWrap.querySelector('.cards');
    const area2Card = area2CardsWrap.querySelector('li');

    const area2WrapWidth = area2Cards.offsetWidth;
    const area2CardWidth = area2Card.offsetWidth / 2;
    const windowHalf = window.innerWidth / 2;
    const cardsTransform = area2WrapWidth + area2CardWidth - windowHalf;
    const cardsGap ='15rem';

    //cards-wrap 이동시킬 값
    area2CardsWrap.style.transform = `translateX(calc(-${cardsTransform}px + ${cardsGap}))`
}
cardSlideScrollTrigger();

window.addEventListener('resize', cardSlideScrollTrigger);

//카드리스트 이동 스크롤 트리거
/* 
utils() _ gsap에서 제공하는 여러 가지 유용한 함수들이 모여있는 객체
toArray _ 선택된 dom요소들을 배열로 변환해주는 함수
*/
const area2List = gsap.utils.toArray('.main .about-us .area2 .cards li');
const scrollTween = gsap.to(area2List, {
    xPercent: -100 * (area2List.length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger: '.main .about-us .area2 .portfolio-inner',
        scrub: 1,
        start: '-80% top',
        end: '300%',
        //뷰포트 높이의 300%
    }
})
gsap.utils.toArray('.main .about-us .area2 li .img').forEach(function(list) {
    gsap.timeline({
        scrollTrigger: {
            trigger: list,
            containerAnimation: scrollTween,
            start: 'left center',
            end: 'right center',
            scrub: true,
        }
    })
    .to(list, {opacity: 1, duration: .3})

    gsap.timeline({
        scrollTrigger: {
            trigger: list,
            containerAnimation: scrollTween,
            start: '110% center',
            end: '150% center',
            scrub: true,
        }
    })
    .to(list, {opacity: .2, duration: .3})
})



















/* .about-us .area4 */
//시계 나라이름 스크롤트리거
//시계 스크롤 트리거
const area3Clocks = gsap.utils.toArray('.main .about-us .area4 .clocks .clock-wrap');
const clocksScroll = gsap.to(area3Clocks, {
    y: '-120%',
    scrollTrigger: {
        trigger: '.main .about-us .area4',
        start: 'top bottom',
        end: '128% bottom',
        scrub: true,
    }
})

//나라이름 스크롤 트리거
/* const oddCity = gsap.utils.toArray('.main .about-us .area4 .worlds p:nth-child(odd)');
const oddCityScroll = gsap.to(oddCity, {
    x: 65,
    ease: 'none',
    scrollTrigger: {
        trigger: '.main .about-us .area4',
        start: 'top bottom',
        end: '140% bottom',
        scrub: true,
    }
})

const evenCity = gsap.utils.toArray('.main .about-us .area4 .worlds p:nth-child(even)');
const evenCityScroll = gsap.to(evenCity, {
    x: -75,
    ease: 'none',
    scrollTrigger: {
        trigger: '.main .about-us .area4',
        start: 'top bottom',
        end: '140% bottom',
        scrub: true,
    }
}) */

/* 
나라이름 스크롤 트리거 코드 리팩토링
-> 겹치는 코드가 많아 코드가 매우 길어짐
*/

/* 
화살표 함수 사용
const 함수 이름 = (매개변수1, 매개변수2) => {}
원래 함수 형태
const 함수 이름 = function(매개변수1, 매개변수2) {}
*/
const CityScrollAnimation = (cities, direction) => {
    gsap.to(cities, {
        x: direction === 'odd' ? 65 : -75,
        ease: 'none',
        scrollTrigger: {
            trigger: '.main .about-us .area4',
            start: 'top bottom',
            end: '140% bottom',
            scrub: true,
        }
    })
}
/* 
        삼항 연산자 direction이 'odd'가 참이면 65, 거짓이면 -75반환

        if(direction === 'odd){
            return 65;
        }else {
            return -75
        }
        if-else 구문과 같다.
        */

const oddCity = gsap.utils.toArray('.main .about-us .area4 .worlds p:nth-child(odd)');
const evenCity = gsap.utils.toArray('.main .about-us .area4 .worlds p:nth-child(even)');
CityScrollAnimation(oddCity, 'odd');
CityScrollAnimation(evenCity, 'even');










/* .about-us .area5 */
gsap.to('.main .about-us .area5 .bg-image', {
    opacity: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: '.main .about-us .area5',
        start: 'top bottom',
        end: '70% bottom',
        scrub: true
    }
});

//현재시간 나타내기
const area5Date = document.querySelector('.main .area5 .box-text .date');

function getDaySuffix(day) {
    if (day >= 11 && day <= 13) return 'TH';
    const lastDigit = day % 10;
    if (lastDigit === 1) return 'ST';
    if (lastDigit === 2) return 'ND';
    if (lastDigit === 3) return 'RD';
    return 'TH';
}

function updateDate() {
    const now = new Date();
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = months[now.getMonth()];
    const day = now.getDate();
    const suffix = getDaySuffix(day);
    const year = now.getFullYear();

    area5Date.textContent = `${month} ${day}${suffix}. ${year}`;
}

updateDate();


const area5CurrnetTime = document.querySelector('.main .area5 .box-text .time');
const area5Hour = area5CurrnetTime.querySelector('.hour');
const area5Minute = area5CurrnetTime.querySelector('.minute');
const area5Second = area5CurrnetTime.querySelector('.second');

function currentUpdateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    area5Hour.textContent = `${hours}`;
    area5Minute.textContent = `${minutes}`;
    area5Second.textContent = `${seconds}`;
}

currentUpdateTime()
setInterval(currentUpdateTime, 1000);










/* .about-us .area6 */

/* 스크롤 내리면 이미지 변경 */
//스크롤 거리에 맞춰서 .main .about-us .area6 .bg-img-list의 전체길이를 .main .about-us .area6 .bg-img-list li 길이만큼 n번 움직여서 이미지를 바꾼다.

const area6ImgList = document.querySelector('.main .about-us .area6 .bg-img-list');
const area6Imgs = document.querySelectorAll('.main .about-us .area6 .bg-img-list li');
const area6ImgWidths = [...area6Imgs].map(img => img.getBoundingClientRect().width); 
// offsetwidth는 정수값만 반환해 주는데 getBoundingClientRect().width는 소숫값까지 반환해준다.
/* 
[...] _ spread operator
- 배열을 만들거나 기존 배열을 복사할 때 사용
[...areaImgs] _ li요소들이 담겨있는 배열처럼 보이는 객체를 배열로 변환

.map은 배열의 각 항목을 하나씩 처리하여 새로운 배열을 만들어주는 메소드
*/

const area6ImageTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: '.main .about-us .area6',
        start: '60% bottom',
        end: '65% top',
        scrub: true,
        onUpdate: (self) => {
            const progress = self.progress
            let moveDistance = 0;

            area6Imgs.forEach((img, index) => {
                if (progress > (index / area6Imgs.length) && progress <= ((index + 1) / area6Imgs.length)) {
                    moveDistance = area6ImgWidths.slice(0, index).reduce((a, b) => a + b, 0);
                }
            });

            area6ImgList.style.transform = `translateX(-${moveDistance}px)`;
        }
    }
});










/* .about-us .area7 */
//텍스트 순서대로 등장
/* gsap.to('.about-us .area7 .text-en', {
    y: 0,
    opacity: 1,
    scrollTrigger: {
        tirgger: '.about-us .area7 .text-en',
        start: 'bottom bottom',
        end: 'bottom top'
    }
}) */
gsap.utils.toArray('.about-us .area7 .introduce-text .title-wrap').forEach(function(title) {
    gsap.to(title, {
        y: 0, opacity: 1,
        scrollTrigger: {
            trigger: title,
            start: '300% bottom',
            end: '500% bottom',
            scrub: 1
        }
    }
    )
})

gsap.utils.toArray('.about-us .area7 .introduce-text .text-en').forEach(function(textEn) {
    gsap.to(textEn, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: textEn,
            start: '200% bottom',
            end: '500% bottom',
            scrub: 1
        }
    })
})

gsap.utils.toArray('.about-us .area7 .introduce-text .text-ko').forEach(function(textKo) {
    gsap.to(textKo, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: textKo,
            start: '300% bottom',
            end: '500% bottom',
            scrub: 1
        }
    })
})

gsap.utils.toArray('.about-us .area7 .introduce-text .line').forEach(function(lines) {
    gsap.to(lines, {
        y: 0, opacity: 1,
        scrollTrigger: {
            trigger: lines,
            start: '15000% bottom',
            end: '20000% bottom',
            scrub: 1
        }
    })
})










/* .about-us .area8 */
//화면 고정 & 커지는 원 & 텍스트 움직임이 스크롤에 맞춰 순서대로 진행
ScrollTrigger.create({
    trigger: '.about-us .area8',
    pin: '.about-us .area8 .wrap',
    start: 'top top',
    end: '+=3100', //start 위치에서 3100px만큼 스크롤이 진행되었을 때 end됨
})

/* gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 .wrap',
        start: 'top top',
        end: `${3100 + window.innerHeight}px bottom`,
        scrub: 1,
    }
}) */
/* .to('.about-us .area8 .circle', { width: '140vmax', height: '140vmax'})
.to('.about-us .area8 .contents-box', {x: 0}, 0)
.to('.about-us .area8 .contents-box svg .svg-logo-dim', {opacity: 0.15})
.to('.about-us .area8 .contents-box .text-box .bottom-text', {opacity: 1}) */
//여기에 한번에 타임라인을 작성하면 타이밍 조절이 안됨

gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8',
        start: 'top top',
        end: `${500 + window.innerHeight}px bottom`, //위치를 지정해주기
        scrub: 1,
    }
})
.to('.about-us .area8 .circle', { width: '140vmax', height: '140vmax'})
.to('.about-us .area8 .contents-box', {x: 0}, 0)

gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 ',
        start: `${500 + window.innerHeight}px bottom`, //전 스크롤 트리거가 끝나는 지점을 시작점으로
        end: `${520 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.about-us .area8 .contents-box svg .svg-logo-dim', {opacity: 0.15})

gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 ',
        start: `${520 + window.innerHeight}px bottom`,
        end: `${540 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.about-us .area8 .contents-box .text-box .bottom-text', {opacity: 1})

gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 ',
        start: `${540 + window.innerHeight}px bottom`,
        end: `${560 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.about-us .area8 .contents-box .text-box .top-text .texts', {opacity: 1})

//텍스트 roller
// action-1
gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 ',
        start: `${560 + window.innerHeight}px bottom`,
        end: `${900 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.about-us .area8 .contents-box .text-box .top-text.box1 .from p',
    {
        rotationX: 90,
        opacity: 0,
        transformOrigin: "50% 0%",
    },
    1
)
.to('.about-us .area8 .contents-box .text-box .top-text.box2 .from p',
    {
        rotationX: 0,
        opacity: 1,
        transformOrigin: "50% 100%"
    },
    1
)

// action-2
gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 ',
        start: `${1200 + window.innerHeight}px bottom`,
        end: `${1550 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.about-us .area8 .contents-box .text-box .top-text.box1 .to p',
    {
        rotationX: 90,
        opacity: 0,
        transformOrigin: "50% 0%"
    },
    1
)
.to('.about-us .area8 .contents-box .text-box .top-text.box2 .to p',
    {
        rotationX: 0,
        opacity: 1
    },
    1
)

// action-3
gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 ',
        start: `${1900 + window.innerHeight}px bottom`,
        end: `${2250 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.about-us .area8 .contents-box .text-box .top-text.box2 .from p',
    {
        rotationX: 90,
        opacity: 0,
        transformOrigin: "50% 0%"
    },
    1
)
.to('.about-us .area8 .contents-box .text-box .top-text.box3 .from p',
    {
        rotationX: 0,
        opacity: 1
    },
    1
)

// action-4
gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area8 ',
        start: `${2600 + window.innerHeight}px bottom`,
        end: `${2950 + window.innerHeight}px bottom`,
        scrub: 1,
    }
})
.to('.about-us .area8 .contents-box .text-box .top-text.box2 .to p',
    {
        rotationX: 90,
        opacity: 0,
        transformOrigin: "50% 0%"
    },
    1
)
.to('.about-us .area8 .contents-box .text-box .top-text.box3 .to p',
    {
        rotationX: 0,
        opacity: 1
    },
    1
)










/* .about-us .area9 */
//.area9 보이기 시작하면 배경색 변함
gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .area9 .text-box',
        start: 'top bottom',
        end: '65% bottom',
        scrub: 2,
    }
})
.to('.about-us .area8 .circle', {backgroundColor: '#000'}, 0)
.to('.about-us .area9', {backgroundColor: '#000'}, 0)

//텍스트 이동 scrollTrigger
const area9Lines = [
    {selector: '.about-us .area9 .line1', xValue: '80rem'},
    {selector: '.about-us .area9 .line2', xValue: '-160rem'},
    {selector: '.about-us .area9 .line3', xValue: '120rem'},
    {selector: '.about-us .area9 .line4', xValue: '-112rem'},
    {selector: '.about-us .area9 .line5', xValue: '56rem'},
    {selector: '.about-us .area9 .line6', xValue: '-72rem'},
    {selector: '.about-us .area9 .line7', xValue: '96rem'},
]

area9Lines.forEach(line => {
    gsap.to(line.selector, {
        x: line.xValue,
        scrollTrigger: {
            trigger: line.selector,
            start: 'top bottom',
            end: '150% top',
            scrub: true,
        }
    })
})










/* .about-us .horizontal-wrap */
//가로스크롤
//이미지 고정 pin
/*
    height를 늘려서 영역이 겹치게 pin애니메이션이 종료되는 것 막고
    첫번째 pin이 풀리면 다음 pin(가로스크롤) 연결되도록
    
*/
const horiList = gsap.utils.toArray('.about-us .horizontal-wrap .wrap > div');
//가로스크롤 영역 width
const totalWidth = horiList.reduce((total, el) => total + el.offsetWidth, 0);
//width가 커질때까지 걸리는 스크롤 거리
const horiWidthScrollArea = 1800;
//여유 스크롤 길이 _ 이 길이가 없으면 바로 가로스크롤로 넘어가버려 width 100%가 완전히 된 형상이 화면에 보이게 한 후 가로스크롤로 넘어가게 하기 위함
const horiWidthScrollBlank = 800;

gsap.timeline({
    scrollTrigger: {
        trigger: '.about-us .horizontal-wrap',
        pin: '.about-us .horizontal-wrap .wrap',
        start: 'top top',
        end: `+=${horiWidthScrollArea}+=450%`,
        //총 스크롤 거리는 width커질때가지 걸리는 스크롤 거리 가로 스크롤 영역 200%(div가 두개임)
    }
})
//이미지 width가 늘어나고 dark이미지로 변경됨
gsap.timeline({
    scrollTrigger: {
        trigger :'.about-us .horizontal-wrap',
        start: 'top top',
        end: `+=${horiWidthScrollArea-horiWidthScrollBlank} `,
        scrub: .3,
    }
})
.to('.about-us .horizontal-wrap .wrap .area10 .inner', {width: '100%',}, 0)

gsap.timeline({
    scrollTrigger: {
        trigger :'.about-us .horizontal-wrap',
        start: 'top top',
        end: `+=${(horiWidthScrollArea - horiWidthScrollBlank) * 0.5}`,
        scrub: .3,
    }
})
.to('.about-us .horizontal-wrap .wrap .area10 .inner .dark', {opacity: 1,}, 0)

gsap.timeline({
    scrollTrigger: {
        trigger :'.about-us .horizontal-wrap',
        start: `+=${(horiWidthScrollArea - horiWidthScrollBlank) * 0.5} top`,
        end: `+=${(horiWidthScrollArea - horiWidthScrollBlank)}`,
        scrub: .3,
    }
})
.to('.about-us .horizontal-wrap .wrap .area10 .inner .night', {opacity: 1,}, 0)

//스크롤이 x축으로 이동
gsap.to(horiList, {
    xPercent: -100 * (horiList.length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger :'.about-us .horizontal-wrap',
        start: `+=${horiWidthScrollArea} bottom`,
        end: `+=${horiWidthScrollArea}+=200%`,
        scrub: .3,

    }
})












/* .area12 가로 스크롤 이동 후 .area13 fadeIn/Out 슬라이드 */
/* .about-us .area12 */

// area12 가로스크롤 구현
const area12ScrollTween = gsap.to('.about-us .horizontal-area-wrap .area12', {
    x: () => -document.querySelector('.about-us .horizontal-area-wrap .area12').offsetWidth - 10, //10px넣은건 .about-us .horizontal-area-wrap .area12가 rem으로 설정해둬 px이 소숫점으로 떨어져 완전히 스크롤이 넘어가지 않아 여유분
    //이걸 자꾸 scrollWidth로 측정해놔서 뒤에 화사표 잘린 부분도 width 포함돼서 스크롤이 더 넘어간 걸로 보임
    //넘치는 가로 크기 포함 _ scrollWidth / offsetWidth _ border 부분 포함
    // x: () => -document.querySelector('.about-us .horizontal-area-wrap .area12').scrollWidth + window.innerHeight + 1600,

    //코딩은 정말 생각보다 더 세세하고 정확하고... 한 치의 오차도 없고ㅠㅠ봐 주는 거 없음 정말 정확해서 좋은데 너무 야박해...힘들어... 근데 정확해서 좋아 답은 늘 정해져있으니가

    scrollTrigger: {
        trigger: '.horizontal-area-wrap',
        start: 'top top',
        //end값이 있어야 onComplete가 실행된다.
        end: () => `+=${document.querySelector('.about-us .horizontal-area-wrap .area12').offsetWidth + window.innerWidth * 3}`,
        // end: () => `+=${document.querySelector('.about-us .horizontal-area-wrap .area12').offsetWidth}`,
        scrub: 1,
        // markers: true
    },
    onComplete: () => {
        console.log('가로스크롤 이동 끝');

        // startTimeline();
    }
})


//area12스크롤 맞춰 움직이는 canvas랜더
const setupCanvasAnimation = ({ 
    canvasSelector,
    imagePath,
    totalFrames,
    loopCount,
    scrollTrigger
}) => {
    const canvas = document.querySelector(canvasSelector);
    const ctx = canvas.getContext('2d');
    const images = [];

    // 이미지 프리로드
    for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = `${imagePath}/${i}.png`;
        images.push(img);
    }

    const renderImage = (index = 0) => {
        const img = images[index];
        if (img && img.complete) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        } else {
            // 이미지 아직 안 로드됐으면 로드 완료 후 다시 시도
            img.onload = () => renderImage(index);
        }
    };

    gsap.timeline({
        scrollTrigger: {
            trigger: scrollTrigger.trigger,
            containerAnimation: scrollTrigger.containerAnimation,
            start: scrollTrigger.start,
            end: scrollTrigger.end,
            scrub: scrollTrigger.scrub,
            markers: scrollTrigger.markers,
            onUpdate: (self) => {
                let progress = self.progress * loopCount;
                let frame = Math.round((progress * totalFrames) % totalFrames);
                renderImage(frame);
            }
        }
    });
};


const scrollTriggerConfig = {
    trigger: '.about-us .horizontal-area-wrap .area12',
    containerAnimation: area12ScrollTween,
    scrub: 1,
};

setupCanvasAnimation({
    canvasSelector: '.area12 .object1',
    imagePath: './assets/image/area12/image_4',
    totalFrames: 100,
    loopCount: 2,
    scrollTrigger: {
        ...scrollTriggerConfig,

        // ... spread operator (스프레드 연산자)
        // 속성들을 풀어서 객체에 복사해 준다.

        start: '4% left',
        end: '13% left',
    }
});

setupCanvasAnimation({
    canvasSelector: '.area12 .object2',
    imagePath: './assets/image/area12/image_1',
    totalFrames: 49,
    loopCount: 3,
    scrollTrigger: {
        ...scrollTriggerConfig,
        start: '5% left',
        end: '30% left',
    }
})

setupCanvasAnimation({
    canvasSelector: '.area12 .object3',
    imagePath: './assets/image/area12/image_2',
    totalFrames: 100,
    loopCount: 2,
    scrollTrigger: {
        ...scrollTriggerConfig,
        start: '16% left',
        end: '40% left',
    }
})

setupCanvasAnimation({
    canvasSelector: '.area12 .object4',
    imagePath: './assets/image/area12/image_3',
    totalFrames: 110,
    loopCount: 2,
    scrollTrigger: {
        ...scrollTriggerConfig,
        start: '28% left',
        end: '65% left',
    }
})

setupCanvasAnimation({
    canvasSelector: '.area12 .object5',
    imagePath: './assets/image/area12/image_4',
    totalFrames: 100,
    loopCount: 2,
    scrollTrigger: {
        ...scrollTriggerConfig,
        start: '43% left',
        end: '100% left',
    }
})




















/* area13 스크롤 내리면 fade in/ out 내가 쓴 코드 */
//.area13이 시작되는 지점은 전체 높이에서 start지점 

//.horizontal-area-wrap의 전체 높이
/* const horiAreaWrapHeight = document.querySelector('.about-us .horizontal-area-wrap').clientHeight;

//.area13이 시작하는 지점 = .area12 가로스크롤이 모두 끝나는 지점
const area13StartPoint = document.querySelector('.about-us .horizontal-area-wrap .area12').offsetWidth + window.innerWidth * 3;

//전체에서 .area12스크롤 끝나는 지점을 빼면 .area13 스크롤트리거가 진행될 높이가 나옴
const area13ScrollHeight = horiAreaWrapHeight - area13StartPoint

//배경화면은 총 4개이므로 .area13ScrollHeight를 4로 나눠 각각 영역에 스크롤 트리거 적용ㄱ 가능
const area13ScrollActionArea = area13ScrollHeight / 7

// .about-us .area13
gsap.timeline({
    scrollTrigger: {
        trigger: '.horizontal-area-wrap',
        start: () => `+=${area13StartPoint}`,
        //area12 가로스크롤이 끝난 후 시작
        end: () => `+=${area13ScrollActionArea}`,
        scrub: 1,
    }
})
.to('.area13 .video-wrap .video1', {opacity: 0, delay: .1}, 0)
.to('.area13 .text-wrap .text1', {opacity: 0, delay: .1}, 0)
.to('.area13 .text-wrap .text2 .top', {opacity: 0, immediateRender: false}, 0)
.to('.area13 .text-wrap .text2 .bottom', {opacity: 0, immediateRender: false}, 0)
.to('.area13 .video-wrap .video2', {opacity: 0, immediateRender: false}, 0);

gsap.timeline({
    scrollTrigger: {
        trigger: '.horizontal-area-wrap',
        start: () => `+=${area13StartPoint + area13ScrollActionArea}`,
        //area12 가로스크롤이 끝난 후 시작
        end: () => `+=${area13ScrollActionArea}`,
        scrub: 1,
    }
})
.to('.area13 .text-wrap .text2 .top', {opacity: 1},.03)
.to('.area13 .text-wrap .text2 .bottom', {opacity: 1},.05)
.to('.area13 .video-wrap .video2', {opacity: 1},.08)


gsap.timeline({
    scrollTrigger: {
        trigger: '.horizontal-area-wrap',
        start: () => `+=${area13StartPoint + (area13ScrollActionArea * 2)}`,
        //area12 가로스크롤이 끝난 후 시작
        end: () => `+=${area13ScrollActionArea}`,
        scrub: 1,
    }
})
.to('.area13 .text-wrap .text2 .top', {opacity: 0},0)
.to('.area13 .text-wrap .text2 .bottom', {opacity: 0},0)
.to('.area13 .video-wrap .video2', {opacity: 0}, 0)
.to('.area13 .text-wrap .text3 .top', {opacity: 0, immediateRender: false}, 0)
.to('.area13 .text-wrap .text3 .bottom', {opacity: 0, immediateRender: false}, 0)
.to('.area13 .video-wrap .video3', {opacity: 0, immediateRender: false}, 0);

gsap.timeline({
    scrollTrigger: {
        trigger: '.horizontal-area-wrap',
        start: () => `+=${area13StartPoint + (area13ScrollActionArea * 3)}`,
        //area12 가로스크롤이 끝난 후 시작
        end: () => `+=${area13ScrollActionArea}`,
        scrub: 1,
    }
})
.to('.area13 .text-wrap .text3 .top', {opacity: 1},.03)
.to('.area13 .text-wrap .text3 .bottom', {opacity: 1},.05)
.to('.area13 .video-wrap .video3', {opacity: 1},.08)

gsap.timeline({
    scrollTrigger: {
        trigger: '.horizontal-area-wrap',
        start: () => `+=${area13StartPoint + (area13ScrollActionArea * 4)}`,
        //area12 가로스크롤이 끝난 후 시작
        end: () => `+=${area13ScrollActionArea}`,
        scrub: 1,
    }
})
.to('.area13 .text-wrap .text3 .top', {opacity: 0},0)
.to('.area13 .text-wrap .text3 .bottom', {opacity: 0},0)
.to('.area13 .video-wrap .video3', {opacity: 0}, 0)

gsap.timeline({
    scrollTrigger: {
        trigger: '.horizontal-area-wrap',
        start: () => `+=${area13StartPoint + (area13ScrollActionArea * 5)}`,
        //area12 가로스크롤이 끝난 후 시작
        end: () => `+=${area13ScrollActionArea}`,
        scrub: 1,
    }
})
.to('.area13 .text-wrap .text4 .top', {opacity: 1},.03)
.to('.area13 .text-wrap .text4 .bottom', {opacity: 1},.05)
.to('.area13 .video-wrap .video4', {opacity: 1},.08) */





/* area13 fade in/out 리팩토링 코드 */


// GSAP 애니메이션 적용
/* animations.forEach(({ start, actions }) => {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.horizontal-area-wrap',
            start: () => `+=${area13StartPoint + start}`,
            end: () => `+=${area13ScrollActionArea}`,
            scrub: 1,
            markers: true
        }
    });

    actions.forEach(([target, properties, delay = 0]) => {
        timeline.to(target, properties, delay);
    });
}); */


/* .area13 리팩토링 코드 함수 안에 넣어서 관리하기 */

function area13Animation() {
    //변수 선언
    //전체 스크롤 높이 area12, 13을 포함한 영역의 높이
    const horiAreaWrapHeight = document.querySelector('.about-us .horizontal-area-wrap').clientHeight;
    //area12 가로스크롤이 끝나는 지점 or area13 스크롤 애니메이션이 시작하는 지점
    const area13StartPoint = document.querySelector('.about-us .horizontal-area-wrap .area12').offsetWidth + window.innerWidth * 3;
    //area13애니메이션이 진행될 영역의 높이
    const area13ScrollHeight = horiAreaWrapHeight - area13StartPoint;
    //area13의 스크롤 트리거 구간 나눔
    const area13ScrollActionArea = area13ScrollHeight / 7;

    //애니메이션 속성값들 배열
    const animationSets = [
        {
            start: 0,
            actions: [
                ['.area13 .video-wrap .video1', { opacity: 0, delay: 0.1 }],
                ['.area13 .text-wrap .text1', { opacity: 0, delay: 0.1 }],
                ['.area13 .text-wrap .text2 .top', { opacity: 0, immediateRender: false }],
                ['.area13 .text-wrap .text2 .bottom', { opacity: 0, immediateRender: false }],
                ['.area13 .video-wrap .video2', { opacity: 0, immediateRender: false }]
            ]
        },
        {
            start: area13ScrollActionArea,
            actions: [
                ['.area13 .text-wrap .text2 .top', { opacity: 1 }, 0.03],
                ['.area13 .text-wrap .text2 .bottom', { opacity: 1 }, 0.05],
                ['.area13 .video-wrap .video2', { opacity: 1 }, 0.08]
            ]
        },
        {
            start: area13ScrollActionArea * 2,
            actions: [
                ['.area13 .text-wrap .text2 .top', { opacity: 0 }],
                ['.area13 .text-wrap .text2 .bottom', { opacity: 0 }],
                ['.area13 .video-wrap .video2', { opacity: 0 }],
                ['.area13 .text-wrap .text3 .top', { opacity: 0, immediateRender: false }],
                ['.area13 .text-wrap .text3 .bottom', { opacity: 0, immediateRender: false }],
                ['.area13 .video-wrap .video3', { opacity: 0, immediateRender: false }]
            ]
        },
        {
            start: area13ScrollActionArea * 3,
            actions: [
                ['.area13 .text-wrap .text3 .top', { opacity: 1 }, 0.03],
                ['.area13 .text-wrap .text3 .bottom', { opacity: 1 }, 0.05],
                ['.area13 .video-wrap .video3', { opacity: 1 }, 0.08]
            ]
        },
        {
            start: area13ScrollActionArea * 4,
            actions: [
                ['.area13 .text-wrap .text3 .top', { opacity: 0 }],
                ['.area13 .text-wrap .text3 .bottom', { opacity: 0 }],
                ['.area13 .video-wrap .video3', { opacity: 0 }]
            ]
        },
        {
            start: area13ScrollActionArea * 5,
            actions: [
                ['.area13 .text-wrap .text4 .top', { opacity: 1 }, 0.03],
                ['.area13 .text-wrap .text4 .bottom', { opacity: 1 }, 0.05],
                ['.area13 .video-wrap .video4', { opacity: 1 }, 0.08]
            ]
        }
    ]


    animationSets.forEach(({start, actions}) => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.horizontal-area-wrap',
                start: () => `+=${area13StartPoint + start}`,
                end: () => `+=${area13ScrollActionArea}`,
                scrub: 1
            }
        })

        actions.forEach(([target, properties, delay = 0]) => {
            timeline.to(target, properties, delay);
        })
    })
}
area13Animation()



















/* .are14 이미지 리스트 pin */
ScrollTrigger.create({
    trigger: '.area14 .pin-wrap .inner',
    pin: '.area14 .pin-wrap .inner',
    // start: 'top top', //기본값
    // end: 'bottom top', //기본값
    onUpdate: (self) => {
        const frameIndex = Math.round(self.progress * 42) + 1;
        //index는 0 부터 시작이라 +1을 해주어야 1.jpg부터 시작한다.
        //총 43개의 이미지

        document.querySelector('.area14 .pin-wrap .img-wrap img').src = `./assets/image/area14/area14_${frameIndex}.jpg`;
    }
})

















/* .area16 */
const showTextList5 = document.querySelectorAll('.main .about-us .area16 .line .units');
showTextAnimation(showTextList5, '.main .about-us .area16 .show-text-wrap', '50% bottom');
showSubTextAnimation('.main .about-us .area16 .text-ko-wrap p', '.main .about-us .area16 .text-ko-wrap')

//이미지 transform
function scrollImgUp(element, yPercent, markers = false) {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            scrub: 1,
            markers: markers
        },
        y: yPercent
    })
}
scrollImgUp('.area16 .img-box.box1', '-40%')
scrollImgUp('.area16 .img-box.box2', '-36%')
scrollImgUp('.area16 .img-box.box3', '-64%')
scrollImgUp('.area16 .img-box.box4', '-32%')





















/* work */
/* gsap.timeline({
    scrollTrigger: {
        trigger: '.main .work',
        start: 'top top',
        end: '+=400vh',
        scrub: 1
    }
})
.to('.main .work .work-list .work-content.work1', {y: 0})
.to('.main .work .work-list .work-content.work1 .bg-wrap', {scale: 1.06})

gsap.timeline({
    scrollTrigger: {
        trigger: '.main .work',
        start: 'top+=800vh top',
        end: '+=400vh',
        scrub: 1
    }
})
.to('.main .work .work-list .work-content.work2', {y: 0})
.to('.main .work .work-list .work-content.work2 .bg-wrap', {scale: 1.06})

gsap.timeline({
    scrollTrigger: {
        trigger: '.main .work',
        start: 'top+=1400vh top',
        end: '+=400vh',
        scrub: 1
    }
})
.to('.main .work .work-list .work-content.work3', {y: 0})
.to('.main .work .work-list .work-content.work3 .bg-wrap', {scale: 1.06})

 */

//work 코드 공통으로 묶어 관리
function workSectionAnimation() {
    const animationValue = [
        {element: 'work1', startValue: 0},
        {element: 'work2', startValue: 800},
        {element: 'work3', startValue: 1400}
    ]

    animationValue.forEach(({element, startValue}) => {
        const workSlide =  `.main .work .work-list .work-content.${element}`;
        const workSlideBg = `${workSlide} .bg-wrap`;

        gsap.timeline({
            scrollTrigger: {
                trigger: '.main .work',
                start: `top+=${startValue}vh top`,
                end: '+=400vh',
                scrub: 1
            }
        })
        .to(workSlide, {y: 0})
        .to(workSlideBg, {scale: 1.06})
    })
}

workSectionAnimation()















/* recruit */

//recruit title 애니메이션
const recruitTitle = '.main .recruit .title-wrap .title';

gsap.timeline({
    scrollTrigger: {
        trigger: '.main .recruit .recruit-wrap .title-wrap',
        start: 'top bottom',
        end: '150% bottom',
        scrub: 1,
    }
})
.to(`${recruitTitle} .card-wrapper`, {y: 0, opacity: 1})
.to(`${recruitTitle} .card-wrapper`, {rotate: 15})
.to(`${recruitTitle} h2 p:nth-child(1)`, {opacity: 1}, "<") //"<"를 넣으면 이전 동작과 동시 실행이 가능하다
.to(`${recruitTitle} h2 p:nth-child(2)`, {opacity: 1})










/* 메인 footer */
//footer 고정
ScrollTrigger.create({
    tirgger: '.footer',
    pin: '.footer .footer-wrap',
})
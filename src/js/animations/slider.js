import gsap, { Power3 } from "gsap";
import { Linear } from "gsap/all";
import Draggable from "gsap/Draggable";

// export default class Slider{
//     constructor(domContent){
//         this.number;
//         this.domContent= {};
//         this.domContent.rightBtn = '';
//         this.domContent.leftBtn = '';
//         this.domContent.sliderImageCover = '';
//         this.domContent.sliderImageCover2 = '';
//         this.domContents = domContent;
//         this.isRunning = false;
//         this.current = 0;

//         // this.slides = this.domContents.sliderImageCover.children;
//         // this.numSlides = this.slides.length;
//         // this.wrapWidth = 0;
//         // this.slideWidth = 0;
//         // this.proxy = document.createElement("div");
//         // gsap.set(this.proxy, { x: 0 });
//         // this.slideAnimation = gsap.to({}, { duration: 0.1 });

//         // this.options = {
//         //     duration: 0.3,
//         //     ease: "Power2.easeOut",
//         //     paused: true,
//         //     xPercent: "+=" + (this.numSlides * 100),
//         //     repeat: -1,
//         //     modifiers: {
//         //         xPercent: gsap.utils.wrap(-100, (this.numSlides - 1) * 100)
//         //     }
//         // };
//         // this.animation = gsap.to(this.slides, this.options);
//         // for (var i = 0; i < this.numSlides; i++) {
//         //     gsap.set(this.slides[i], {
//         //         xPercent: i * 100,
//         //     });
//         // }
//         // this.resize();
//         // this.controller();
//     }
//     snapX(x) {
//         return Math.round(x / this.slideWidth) * this.slideWidth;
//     }

//     animateSlides(dir) {
//         this.slideAnimation.kill();

//         let x = this.snapX(gsap.getProperty(this.proxy, "x") + dir * this.slideWidth);
//         this.slideAnimation = gsap.to(this.proxy, {
//             duration: 0.3,
//             x,
//             onUpdate: this.updateProgress
//         });
//     }
//     updateProgress() {
//         this.animation.progress(gsap.utils.wrap(0, 1, gsap.getProperty(this.proxy, "x") / this.wrapWidth));
//     }
//     resize() {
//         var norm = (gsap.getProperty(this.proxy, "x") / this.wrapWidth) || 0;

//         this.slideWidth = this.slides[0].offsetWidth;
//         this.wrapWidth = this.slideWidth * this.numSlides;

//         gsap.set(this.proxy, {
//             x: norm * this.wrapWidth
//         });

//         this.animateSlides(0);
//         this.slideAnimation.progress(1);
//     }

//     controller(){
//         this.domContents.rightBtn.addEventListener('click',(e)=>{
//             this.animateSlides(1);
//         });
//         this.domContents.leftBtn.addEventListener('click', (e) => {
//             this.animateSlides(-1);
//         });
//     }

// }

gsap.registerPlugin(Draggable);

var slideDelay = 1.5;
var slideDuration = 0.3;
var snapX;

var slides = document.querySelectorAll(".firstSlide img");
var prevButton = document.querySelector(".left-btn");
var nextButton = document.querySelector(".right-btn");
var autoPlayLimit = slides.length * 2;
var autoPlayCount = 0;
var progressWrap = gsap.utils.wrap(0, 1);

var numSlides = slides.length;

gsap.set(slides, {
    backgroundColor: "random([red, blue, green, purple, orange, yellow, lime, pink])",
    xPercent: i => i * 100
});

var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
var timer = gsap.delayedCall(slideDelay, autoPlay);

var animation = gsap.to(slides, {
    xPercent: "+=" + (numSlides * 100),
    duration: 1,
    ease: "none",
    paused: true,
    repeat: -1,
    modifiers: {
        xPercent: wrap
    }
});

var proxy = document.createElement("div");
var slideAnimation = gsap.to({}, {});
var slideWidth = 0;
var wrapWidth = 0;
resize();

var draggable = new Draggable(proxy, {
    trigger: ".slides-container",
    inertia: true,
    onPress: updateDraggable,
    onDrag: updateProgress,
    onThrowUpdate: updateProgress,
    snap: {
        x: snapX
    }
});

window.addEventListener("resize", resize);

prevButton.addEventListener("click", function () {
    animateSlides(1);
});

nextButton.addEventListener("click", function () {
    animateSlides(-1);
});

function updateDraggable() {
    timer.restart(true);
    slideAnimation.kill();
    this.update();
}

function animateSlides(direction) {

    timer.restart(true);
    slideAnimation.kill();

    var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

    slideAnimation = gsap.to(proxy, {
        x: x,
        duration: slideDuration,
        onUpdate: updateProgress
    });
}

function autoPlay() {
    if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
        timer.restart(true);
    } else {
        autoPlayCount++;
        if (autoPlayCount < autoPlayLimit) {
            animateSlides(-1);
        }
    }
}

function updateProgress() {
    animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
}

function resize() {

    var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;

    slideWidth = slides[0].offsetWidth;
    wrapWidth = slideWidth * numSlides;
    snapX = gsap.utils.snap(slideWidth);

    gsap.set(proxy, {
        x: norm * wrapWidth
    });

    animateSlides(0);
    slideAnimation.progress(1);
}
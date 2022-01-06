import gsap, { Power3 } from "gsap";
import { Linear } from "gsap/all";
import Draggable from "gsap/Draggable";
import Swiper from "swiper";
// import img from '../../assets/images/landscape.jpg'
// import img2 from '../../assets/images/boat1.jpg'

export default class Slider {
    constructor() {
        console.log('Hey man why are you not working');
        // this.svg = document.querySelector('imgfilter');
        // const svFilter = document.getElementById('turbulence');
        // const freq = svFilter.attributes.getNamedItem('baseFrequency');
        // this.buttons = document.querySelectorAll("[data-carousel-button]");
        
        // let num = 0;
        // const Animate = () => {
            //     num += 0.005;
            //     freq.value = `${Math.abs(Math.sin(num))} ${Math.abs(Math.cos(num))}`
            //     requestAnimationFrame(Animate)
            // }
            // Animate();


            this.isRunning = true;
            this.Swiper();
    }
    ImageSlider(button, slide) {
        // const elemTimeline = gsap.timeline({
        //     onComplete: () => {
        //         this.paused = true;
        //     }
        // });
        // elemTimeline.to(slide, {
        //     css: {
        //         filter: `url(#noise)`,
        //     },
        //     duration: 0.3,
        //     ease: 'ease',
        // });
        // elemTimeline.to(slide, {
        //     css: {
        //         filter: 'none',
        //     },
        //     duration: 0.3,
        //     ease: 'ease',
        // })
        // console.log(this.buttons);
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        
        const slides = slide.querySelectorAll("[data-slides]");
        console.log(slide);
        slides.forEach(slide=>{
            console.log(slide);
            const activeSlide = slide.querySelector("[data-active]");
            console.log(activeSlide);
            let newIndex = [...slide.children].indexOf(activeSlide) + offset;
            if (newIndex < 0) newIndex = slide.children.length - 1;
            if (newIndex >= slide.children.length) newIndex = 0;
            
            slide.children[newIndex].dataset.active = true
            delete activeSlide.dataset.active;
        })

        // elemTimeline.to(slides.children[newIndex], {
        //     css: {
        //         filter: `url(#noise)`,
        //     },
        //     duration: 0.4,
        //     ease: 'ease',
        //     delay: -0.4,
        // });
        // elemTimeline.to(slides.children[newIndex], {
        //     css: {
        //         filter: 'none',
        //     },
        //     duration: 0.3,
        //     ease: 'ease',
        // })
    }
    Swiper(){
        this.swiper = new Swiper('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    // next() {
    //     if (this.isRunning) return;
    //     this.isRunning = true;
    //     let titleLen = this.titles.length;
    //     let descLen = this.descriptions.length;
    //     let nextTitle = this.titles[(this.current + 1) % titleLen];
    //     let nextDesc = this.descriptions[(this.current + 1) % descLen];
    //     this.currentTitle.innerHTML = nextTitle;
    //     this.currentDesc.innerHTML = nextDesc;
    //     const splittedText = new SplitTextJS(this.currentTitle).chars;

    //     gsap.from(splittedText, {
    //         duration: 0.4,
    //         y: 20,
    //         opacity: 0,
    //         stagger: 0.01,
    //         delay: 0.3,
    //         ease: Power2.easeOut,
    //         onComplete: () => {
    //             this.current = (this.current + 1) % len;
    //             this.isRunning = false;
    //         }
    //     });
    //     gsap.from(this.currentDesc, {
    //         duration: 0.6,
    //         y: 10,
    //         opacity: 0,
    //         stagger: 0.01,
    //         delay: 0.3,
    //         ease: Power2.easeOut,

    //     });
    // }
    // Prev() {
    //     if (this.isRunning) return;
    //     this.isRunning = true;
    //     let titleLen = this.titles.length;
    //     let descLen = this.descriptions.length;
    //     let nextTitle = this.current === 0 ? this.titles[titleLen - 1] : this.titles[(this.current - 1) % titleLen];
    //     let nextDesc = this.current === 0 ? this.descriptions[descLen - 1] : this.descriptions[(this.current - 1) % descLen];

    //     this.currentTitle.innerHTML = nextTitle;
    //     this.currentDesc.innerHTML = nextDesc;
    //     const splittedText = new SplitTextJS(this.currentTitle).chars;
    //     gsap.from(splittedText, {
    //         duration: 0.4,
    //         y: -20,
    //         opacity: 0,
    //         stagger: 0.01,
    //         delay: 0.3,
    //         ease: Power2.easeOut,
    //         onComplete: () => {
    //             this.current = this.current === 0 ? len - 1 : (this.current - 1) % len;
    //             this.isRunning = false;
    //         }
    //     });
    //     gsap.from(this.currentDesc, {
    //         duration: 0.6,
    //         y: -20,
    //         opacity: 0,
    //         stagger: 0.01,
    //         delay: 0.3,
    //         ease: Power2.easeOut,
    //     });
    // }
}
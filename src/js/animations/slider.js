import gsap, { Power3 } from "gsap";
import { Linear } from "gsap/all";
import Draggable from "gsap/Draggable";
import Swiper from "swiper";
// import img from '../../assets/images/landscape.jpg'
// import img2 from '../../assets/images/boat1.jpg'

export default class Slider {
    constructor() {
        console.log('Hey man why are you not working');
        this.svg = document.querySelector('imgfilter');
        const svFilter = document.getElementById('turbulence');
        const freq = svFilter.attributes.getNamedItem('baseFrequency');
        // this.buttons = document.querySelectorAll("[data-carousel-button]");

        let num = 0;
        const Animate = () => {
            num += 0.005;
            freq.value = `${Math.abs(Math.sin(num))} ${Math.abs(Math.cos(num))}`
            requestAnimationFrame(Animate)
        }
        Animate();
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

        const slides = slide.querySelector("[data-slides]");
        const activeSlide = slides.querySelector("[data-active]");
        let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        if (newIndex < 0) newIndex = slides.children.length - 1;
        if (newIndex >= slides.children.length) newIndex = 0;
        
        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active;

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
        console.log('hello swiper why the fuck are you not working?????')
        this.swiper = new Swiper('.swiper', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}
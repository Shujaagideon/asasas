import gsap from 'gsap'
import SplitTextJS from 'split-text-js';


export default class Animations {
    constructor(text, config = {}) {
        this.config = {};
        this.config.duration = config.duration || 1.5;
        this.config.splitType = config.splitType || 'chars words';
        this.config.delay = config.delay || 0;
        this.config.ease = config.ease || 'ease';
        this.config.replay = config.replay || false;
        this.config.stagger = config.stagger || 0.02;
        this.section2 = document.querySelector('.window');
        if (text !== undefined) {
            this.text = new SplitTextJS(text);
            console.log(this.text);
        }
        
        this.introTl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflowY = 'scroll';
                document.querySelector('.intro').style.display = 'none';
            }
        });
        this.section2Tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.window',
                endTrigger: '.slideSection',
                scroller: '#smoothScroll',
                start: 'top -40%',
                scrub: 1.5,
                pin: true,
                // pinSpacing: false,
                end: this.section2.clientHeight + 20,
            },
        });
        this.section4Tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.stories',
                scroller: '#smoothScroll',
                start: 'top 80%',
                scrub: 1,
                end: 'bottom 10%',
            },
        });
        this.introAnim();
        this.animate();
        this.sectionsAnimation()
    }
    introAnim() {
        const introText = new SplitTextJS(document.querySelector('.intro h1'));

        this.introTl.from(introText.chars, {
            y: 20,
            opacity: 0,
            duration: this.config.duration,
            delay: this.config.delay,
            ease: this.config.ease,
            stagger: this.config.stagger,
        })
        this.introTl.to(introText.chars, {
            y: -20,
            opacity: 0,
            duration: this.config.duration,
            delay: 1.3,
            ease: this.config.ease,
            stagger: this.config.stagger,
        });
        this.introTl.to('.intro', {
            opacity: 0,
            duration: 0.4,
            delay: -0.5,
        });
        this.introTl.to('.landingCover', {
            maskSize: '500%',
            duration: 2,
            ease: 'Power2.easeIn',
        })
        this.introTl.to('.rightContent', {
            x: 0,
            duration: 0.6,
            ease: 'Power2.easeOut',
            delay: -0.4,
        })
        this.introTl.to('.icon', {
            opacity: 1,
            duration: 2,
            ease: 'Power2.easeOut',
            delay: -0.4,
        })
    }
    textAnim(text, y=50, stagger = this.config.stagger){
        this.introTl.from(text, {
            y: y,
            rotateX: '20deg',
            skewX: '-50deg',
            opacity: 0,
            duration: 0.6,
            ease: 'Power2.easeOut',
            stagger: stagger,
            delay: -1.2,
        })
    }

    animate() {
        [...document.querySelectorAll('.text h1')].forEach( text=>{
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars);
        });
        [...document.querySelectorAll('.text h3')].forEach( text=>{
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars);
        });
        [...document.querySelectorAll('.text h5')].forEach(text => {
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars);
        });
        [...document.querySelectorAll('.text p')].forEach(text => {
            let newText = new SplitTextJS(text);
            this.textAnim(newText.chars, 0, 0.005);
        });
        this.introTl.to('header ',{
            opacity: 1,
            duration: 0.8,
            ease: 'cubic-bezier(.6,.04,.12,.96)',
            delay: -0.2,
        })
    }
    sectionsAnimation(){
        
        let circle = document.querySelector('.circleExpand .circle');
        let circleCover = document.querySelector('.circleExpand');

        
        let newText = new SplitTextJS(document.querySelector('.section2Cover .text h2'));
        gsap.from(newText.chars,{
            scrollTrigger: {
                trigger: '.section2Cover',
                scroller: '#smoothScroll',
                top:'top 40%'
            },
            y: 50,
            rotateX: '40deg',
            skewX: '-80deg',
            opacity: 0,
            duration: 0.8,
            ease: 'Power2.easeOut',
            stagger: 0.01,
        })
        this.section2Tl.to('.circle',{
            height: `${circleCover.clientHeight}px`,
            width: `${circleCover.clientWidth}px`,
            borderRadius: 0,
            duration: 0.6,
            ease: 'none',
        })
        this.section2Tl.to('.circle .cover',{
            duration: 0.4,
            filter: 0,
            css:{
                backdropFilter: 'blur(0) brightness(100%)',
            }
        })
        this.section2Tl.to('.circle img', {
            duration: 0.4,
            opacity: 0,
            delay: -1
        })
        this.section2Tl.to('.circle h6', {
            duration: 0.6,
            opacity: 0,
            delay: 1
        })
        this.section4Tl.to('.storiesBody .img1', {
            rotateZ: -4,
            // duration: 0.6,
            ease: 'none',
            y: -150
        })
        this.section4Tl.to('.storiesBody .img3', {
            rotateZ: 10,
            delay: -0.5,
            ease: 'none',
            y: -150
        })
        this.section4Tl.to('.storiesBody .img2', {
            rotateZ: -10,
            delay: -0.5,
            ease: 'none',
            y: -150
        })
    }
}
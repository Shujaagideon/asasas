import Animations from "./animations/animations";
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap'
import imagesLoaded from 'imagesloaded';
import Sketch from './animations/ThreeDAnimations'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { sliderData } from "./data/slider1data";
import SplitTextJS from "split-text-js";
gsap.registerPlugin(ScrollTrigger);
// import Slider from "./animations/slider";


void new class {
    constructor() {
        this.introElements = {
            cover: document.querySelector('.intro'),
            text: document.querySelector('.intro h1'),
            config: {
                duration: 0.6,
                splitType: 'chars'
            }
        }
        const sliderImageCover = document.querySelector('.firstSlide');
        const titles = document.querySelector('.sliderText h4');
        const description = document.querySelector('.sliderText p');
        const pageContainer = document.querySelector('#smoothScroll');
        const sliderImageCover2 = document.querySelector('.secondSlide');
        const rightBtn = document.querySelector('.right-btn');
        const leftBtn = document.querySelector('.left-btn');
        this.sliderElements = {
            sliderImageCover,
            sliderImageCover2,
            rightBtn,
            leftBtn,
        }

        const scroller = new LocomotiveScroll({
            el: pageContainer,
            smooth: true
        });

        // data passed down to threejs 
        // first declare the variables
        // second deconstruct the sliderData and store values in the variales
        this.titles = [];
        this.descriptions = [];
        this.images = [];
        this.sliderData = sliderData.map(data => {
            console.log(data)
            this.titles.push(data.title);
            this.descriptions.push(data.description);
            let image = new Image();
            image.src = data.imgLink;
            this.images.push(document.querySelectorAll('img'));
        })
        this.ThreeDProps = {
            container: 'threedContainer',
            data:{
                titles: this.titles,
                description: this.descriptions,
                images: this.images
            },
            slider:{
                position: [sliderImageCover, sliderImageCover2],
                buttons:{
                    right: rightBtn,
                    left: leftBtn
                },
            },
            text:{
                title: titles,
                description,
            },
            currentScroll: scroller.scroll.instance.scroll.y,

        };
        
        scroller.on("scroll", ()=>{
            this.ThreeDProps.currentScroll = scroller.scroll.instance.scroll.y;
            ScrollTrigger.update()
        });

        ScrollTrigger.scrollerProxy(pageContainer, {
            scrollTop(value) {
                return arguments.length
                    ? scroller.scrollTo(value, 0, 0)
                    : scroller.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    left: 0,
                    top: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: pageContainer.style.transform ? "transform" : "fixed"
        });
        window.addEventListener("load", function () {
            ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

            ScrollTrigger.refresh();
        });
        
        //load all Images First
        // first have an animation
        const introText = new SplitTextJS(document.querySelector('.intro h1'));
        this.loadAnimComplete = false;
        this.intro = gsap.timeline({
            yoyo: !this.loadAnimComplete,
            onComplete: () => {
                gsap.set('.intro h1',{opacity:0, y:20})
                if (this.loadAnimComplete = true) {
                    this.Start();
                }
            }
        });

        this.intro.from(introText.chars, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'Power3.easeIn',
            stagger: 0.03,
        })
        this.intro.to(introText.chars, {
            y: -20,
            opacity: 0,
            duration: 0.6,
            delay: 1.3,
            ease: 'Power3.easeIn',
            stagger: 0.03,
            
        });
        
        const preloadImages = new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll("img"), resolve);
        });
        let myPromises = [preloadImages]
        
        Promise.all(myPromises).then(() => {
            this.loadAnimComplete == true
        });


        // this.Sketch = new Sketch(this.ThreeDProps);
        // this.slider = ;
    }

    setActive(elem){
        elem.parentNode.children.forEach(child =>{
            if(child.classList.contains = 'active'){
                child.classList.remove('active');
            }
        })
        elem.classList.add('active');
    }

    Start() {
        this.animations = new Animations(this.introElements.text, this.introElements.config);
    }


}
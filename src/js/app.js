import Animations from "./animations/animations";
import LocomotiveScroll from 'locomotive-scroll';
import gsap from 'gsap'
// import imagesLoaded from 'imagesloaded';
import Sketch from './animations/ThreeDAnimations'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { sliderData } from "./data/slider1data";
import SplitTextJS from "split-text-js";
import Slider from "./animations/slider";
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';


gsap.registerPlugin(ScrollTrigger);
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

        // import a bunch of Dom elements
        const sliderImageCover = document.querySelector('.firstSlide');
        const titles = document.querySelector('.sliderText h4');
        const description = document.querySelector('.sliderText p');
        const pageContainer = document.querySelector('#smoothScroll');
        const sliderImageCover2 = document.querySelector('.secondSlide');
        this.rightBtn = document.querySelector('.right-btn');
        this.leftBtn = document.querySelector('.left-btn');
        


        this.sliderElements = {
            sliderImageCover,
            sliderImageCover2,
            rightBtn: this.rightBtn,
            leftBtn: this.leftBtn,
        }

        // const scroller = new LocomotiveScroll({
        //     el: pageContainer,
        //     smooth: true
        // });
        // scroller.on("scroll", ()=>{
        //     this.ThreeDProps.currentScroll = scroller.scroll.instance.scroll.y;
        //     ScrollTrigger.update()
        // });

        // ScrollTrigger.scrollerProxy(pageContainer, {
        //     scrollTop(value) {
        //         return arguments.length
        //             ? scroller.scrollTo(value, 0, 0)
        //             : scroller.scroll.instance.scroll.y;
        //     },
        //     getBoundingClientRect() {
        //         return {
        //             left: 0,
        //             top: 0,
        //             width: window.innerWidth,
        //             height: window.innerHeight
        //         };
        //     },
        //     pinType: pageContainer.style.transform ? "transform" : "fixed"
        // });
        // window.addEventListener("load", function () {
        //     ScrollTrigger.addEventListener("refresh", () => scroller.update()); //locomotive-scroll

        //     ScrollTrigger.refresh();
        // });



        //============data passed down to threejs==========//
        // first declare the variables
        // second deconstruct the sliderData and store values in the variales
        this.titles = [];
        this.descriptions = [];
        this.images = [];
        this.sliderData = sliderData.map(data => {
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
                    right: this.rightBtn,
                    left: this.leftBtn
                },
            },
            text:{
                title: titles,
                description,
            },
            // currentScroll: scroller.scroll.instance.scroll.y,

        };
        
        //==============load Images First===========//
        //=============== first have an animation =========================//

        const introText = new SplitTextJS(document.querySelector('.intro h1'));
        this.loadAnimComplete = false;
        this.intro = gsap.timeline({
            yoyo: !this.loadAnimComplete,
            onComplete: () => {
                gsap.set('.intro h1',{opacity:0, y:20})
                if (this.loadAnimComplete = true) {
                    this.Start();
                    this.animatedSlider();
                    this.navigation();
                    this.form();
                    this.slider = new Slider();
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
        
        // const preloadImages = new Promise((resolve, reject) => {
        //     imagesLoaded(document.querySelectorAll("img"), resolve);
        // });
        // let myPromises = [preloadImages]
        
        // Promise.all(myPromises).then(() => {
            let src = document.querySelector('#bgImg').style.backgroundImage;
            let url = src.match(/\((.*?)\)/)[1].replace(/('|")/g, '');

            var img = new Image();
            img.onload = function () {
                this.loadAnimComplete == true
            }
            img.src = url;
            if (img.complete) img.onload();
        // });


        // this.Sketch = new Sketch(this.ThreeDProps);
    }

    setActive(elem){
        Array.from(elem.parentElement.children).forEach(child =>{
            if(child.classList.contains('activeLink')){
                child.classList.remove('activeLink');
            }
        })
        elem.classList.add('activeLink');
    }

    Start() {
        this.animations = new Animations(this.introElements.text, this.introElements.config);
        this.animations.customCursor(document.querySelector('.sliderBody .right'), document.querySelector('.customSliderCursor'), 100);
        this.animations.customCursor(document.querySelector('.storiesBody'), document.querySelector('.customStoriesCursor'), 250);
        this.sliderLink = document.querySelectorAll('.sliderNav .cover .link');
        this.sliderLink.forEach(link=>{
            link.addEventListener('click',()=>{
                this.setActive(link);
                if(link.innerText === 'Corporate'){
                    document.querySelector('.sliderNav .cover .activeLink').style.color = '#fff';
                    document.querySelector('.sliderNav .cover .link').style.color = '#fff';
                    // document.querySelector('.sliderNav .cover .link').classList.toggle('linkOnColoredBg');
                    document.querySelector('.stories').style.background = '#f5f5f5';
                    document.querySelector('.stories').style.color = '#2a2a2a';
                    document.querySelector('.slideSection').style.background = '#07424D';``
                    document.querySelector('.slideSection').style.color = '#fff';
                    document.querySelector('.slideSection .sliderText p').style.color = '#fff';
                    document.querySelectorAll('.sliderBtns .btn').forEach(btn=> btn.style.color = '#fff');
                    document.querySelectorAll('.sliderBtns .btn').forEach(btn => btn.style.borderColor = '#fff');
                }
                else{
                    document.querySelector('.sliderNav .cover .activeLink').style.color = '#2a2a2a';
                    document.querySelector('.sliderNav .cover .link').style.color = '#58595B';
                    document.querySelector('.stories').style.background = '#07424D';
                    document.querySelector('.stories').style.color = '#fff';
                    document.querySelector('.slideSection').style.color = '#2a2a2a';
                    document.querySelector('.slideSection').style.background = '#f5f5f5';
                    document.querySelector('.slideSection .sliderText p').style.color = '#58595B';
                    document.querySelectorAll('.sliderBtns .btn').forEach(btn => btn.style.color = '#2a2a2a');
                    document.querySelectorAll('.sliderBtns .btn').forEach(btn => btn.style.borderColor = '#2a2a2a');
                }
            })
        })

    }

    animatedSlider(){
        const landing = document.querySelector('.landingCover');
        const landingSliderBtn = document.querySelector('.landingSliderBtn');

        landingSliderBtn.addEventListener('click',()=>{
            this.slider.ImageSlider(landingSliderBtn, document.querySelector('.landingSlideCover'));
        })
        this.rightBtn.addEventListener('click',()=>{
            this.slider.ImageSlider(this.rightBtn, document.querySelector('.sliderBody .right'));
        })
        this.leftBtn.addEventListener('click', () => {
            this.slider.ImageSlider(this.leftBtn, document.querySelector('.sliderBody .right'));
        })
    }

    navigation(){
        this.hamburger = document.querySelector('.hamburgerMenu');
        this.hamburgerDiv = document.querySelectorAll('.hamburgerMenu div');
        this.hamburgerImg = document.querySelector('.hamburgerMenu img');
        this.expandedMenu = document.querySelector('.headerExpand');
        this.navlist = document.querySelector('.navlist');
        this.header = document.querySelector('header');

        this.hamburger.addEventListener('click',()=>{
            this.expandedMenu.classList.toggle('displayedExpand');
            this.navlist.classList.toggle('displayedNav');
            if (this.navlist.classList.contains('displayedNav')) {
                this.hamburgerDiv.forEach(div => div.style.display = 'none');
                this.hamburgerImg.style.visibility = 'visible';
                this.navlist.style.display = 'flex';
                this.header.style.background = '#07424D';
            } else {
                this.hamburgerDiv.forEach(div => div.style.display = 'block');
                this.hamburgerImg.style.visibility = 'hidden';
                this.navlist.style.display = 'none';
                this.header.style.background = 'none';
            }
        })
    }
    form(){
        const input = document.querySelector("#phoneInput");
        intlTelInput(input, {
            // any initialisation options go here
            
        });
    }


}
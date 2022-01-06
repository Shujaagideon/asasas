import gsap from 'gsap';
import Slider from './animations/slider'


void new class{
    constructor(){
        this.slider = new Slider();
        this.strip = document.querySelector('.golden-strip');
        this.rightBtn = document.querySelector('.btns .right-btn');
        this.leftBtn = document.querySelector('.btns .left-btn');

        this.slideManager();
    }
    slideManager(){

        this.rightBtn.addEventListener('click', () => {
            gsap.to('.markers',{
                rotateZ: '+=' + 45,
            })
            this.slider.ImageSlider(this.rightBtn, document.querySelector('.main'));
        })
        this.leftBtn.addEventListener('click', () => {
            gsap.to('.markers', {
                rotateZ: '-=' + 45,
            })
            this.slider.ImageSlider(this.leftBtn, document.querySelector('.main'));
        })
    }
}
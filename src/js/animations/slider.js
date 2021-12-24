import gsap, { Power3 } from "gsap";
import { Linear } from "gsap/all";
import Draggable from "gsap/Draggable";
import img from '../../assets/images/landscape.jpg'
import img2 from '../../assets/images/boat1.jpg'

export default class Slider{
    constructor(){
        this.bgImg = img;
        this.svg = document.querySelector('imgfilter');
        const svFilter = document.getElementById('turbulence');
        const freq = svFilter.attributes.getNamedItem('baseFrequency');
        let num = 0;
        const Animate = () => {
            num += 0.005;
            freq.value = `${Math.abs(Math.sin(num))} ${Math.abs(Math.cos(num))}`
            requestAnimationFrame(Animate)
        }
        Animate();
    }
    backgroundSlider(elem, bgUrl){
        const elemTimeline = gsap.timeline({
            onComplete:()=>{
                this.paused = true;
            }
        });
        elemTimeline.to(elem, {
            opacity: 0,
            css:{
                filter: `url(#noise)`,
                backgroundImage: ` url(${this.bgImg})`,
            },
            duration: 0.6,
            ease:'Power4.easeIn',
            onComplete:()=>{
                // gsap.set(elem,{})
                if(this.bgImg === img){
                    console.log('image is img')
                    this.bgImg = img2;
                }else{
                    console.log('this.bgImg is img2')
                    this.bgImg = img;
                }
            }
        });
        elemTimeline.to(elem,{
            css:{
                filter: 'none',
            },
            duration: 0.2,
            ease: 'Power4.easeIn',
        })
    }
}
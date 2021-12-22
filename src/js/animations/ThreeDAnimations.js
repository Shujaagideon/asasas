import * as THREE from 'three'
import SplitTextJS from 'split-text-js';

import vertex from '../shaders/transitionEffect/vertex.glsl'
import fragment from '../shaders/transitionEffect/fragment.glsl'

import vertexOverlay from '../shaders/background/vertex.glsl'
import fragmentOverlay from '../shaders/background/fragment.glsl'
import disp from '../../assets/images/disp1.jpg'
import boat from '../../assets/images/boat.jpg'
import landscape from '../../assets/images/landscape.jpg'
import stories from '../../assets/images/stories1.jpg'
import stories2 from '../../assets/images/stories3.jpg'


// import * as dat from 'dat.gui'
import gsap, { Power2 } from 'gsap'

// let OrbitControls = require('three-orbit-controls')(THREE);

// const createInputEvents = require('simple-input-events')
// const event = createInputEvents(window);

export default class Sketch {
    constructor(props) {
        this.props = props;
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.colorPalette = {
            darkest: '#191A19',
            darkGreen: '#1E5128',
            lightGreen: '#4E9F3D',
            lightest: '#D8E9A8'
        }
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.width, this.height);
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.container = document.getElementById(props.container);
        this.imgPos = props.slider.position;
        this.btn = props.slider.buttons;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.container.appendChild(this.renderer.domElement);
        this.texLoader = new THREE.TextureLoader();
        this.plane =[];


        this.current = 0;
        this.textures = [];
        props.data.images.forEach(img=>{
            let texture = new THREE.Texture(img);
            texture.needsUpdate = true;
            // this.textures.push(texture);
        })
        this.textures.push(this.texLoader.load(landscape))
        this.textures.push(this.texLoader.load(stories))
        this.textures.push(this.texLoader.load(stories2))
        this.textures.push(this.texLoader.load(boat));
        this.disp = this.texLoader.load(disp);
        this.duration = { value: 0.8 };


        this.titles = props.data.titles;
        this.descriptions = props.data.description;
        console.log(this.descriptions)
        this.currentTitle = props.text.title;
        this.currentDesc = props.text.description;

        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.1, 2000);
        this.camera.position.z = 450;

        this.camera.fov = 2 * Math.atan((this.height / 2) / this.camera.position.z) * (180 / Math.PI);

        // let frustumSize = 10;
        // let aspect = window.innerWidth / window.innerHeight;
        // this.camera = new THREE.OrthographicCamera(frustumSize* aspect / -2, frustumSize*aspect);
        // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.time = 0;
        this.mouse = new THREE.Vector2(0, 0);
        this.raycaster = new THREE.Raycaster();

        this.paused = false;

        this.setupResize();
        this.tabEvents();
        this.addObjects();
        this.mouseMovement();
        // this.resize();
        this.render();
        // this.settings();
    }
    // settings() {
    //     let that = this;
    //     this.settings = {
    //         time: 0,
    //     };
    //     this.gui = new dat.GUI();
    //     this.gui.add(this.settings, 'time', 0, 100, 0.01);
    //     this.gui.addImage(this.settings, 'texturePath').onChange((image) => {
    //         body.append(image);
    //     });
    // }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;

        this.imageAspect = 853 / 1280;
        let a1; let a2;
        if (this.height / this.width > this.imageAspect) {
            a1 = (this.width / this.height) * this.imageAspect;
            a2 = 1;
        } else {
            a2 = (this.height / this.width) * this.imageAspect;
            a1 = 1;
        }
        this.material.uniforms.resolution.value.x = this.width;
        this.material.uniforms.resolution.value.y = this.height;
        this.material.uniforms.resolution.value.z = a1;
        this.material.uniforms.resolution.value.w = a2;

        // const dist = this.camera.position.z;
        // const height = 1;
        // this.camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist));

        // if (this.width / this.height > 1) {
        //     this.plane.scale.x = this.camera.aspect;
        //     // this.plane.scale.y = this.camera.aspect;
        // } else {
        //     this.plane.scale.y = 1 / this.camera.aspect;
        // }

        this.camera.updateProjectionMatrix();
    }

    addObjects() {
        let that = this;
        this.material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: '#extension GL_OES_standard_derivatives : enable'
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: { type: "f", value: 0 },
                progress: { value: 0 },
                animProgress: { value: 0 },
                displacement: { value: new THREE.TextureLoader().load(this.disp) },
                vColor: { value: new THREE.Color(this.colorPalette.lightest) },
                resolution: { type: "v4", value: new THREE.Vector2(this.width, this.height) },
                uTextureSize: { type: "v2", value: new THREE.Vector2(100, 100) },
                uQuadSize: { type: "v2", value: new THREE.Vector2(100, 100) },
                texture1: { type: "f", value: this.textures[0] },
                texture2: { type: "f", value: this.textures[1] },
                uvRate: {
                    value: new THREE.Vector2(1, 1)
                }
            },
            // wireframe: true,
            // transparent: true,
            vertexShader: vertex,
            fragmentShader: fragment
        });
        this.plane = this.imgPos.map(img=>{
            let bounds = img.getBoundingClientRect();
            this.material.uniforms.uQuadSize.value = new THREE.Vector2(bounds.width, bounds.height);
    
            this.geometry = new THREE.PlaneBufferGeometry(bounds.width, bounds.height, 20, 20);
    
            
            return{
                plane: new THREE.Mesh(this.geometry, this.material),
                bounds: bounds
            }
        })
        // this.plane.position.x = this.bounds.left - this.width / 2 + this.bounds.width / 2;
        // this.plane.position.y = -this.bounds.top + this.height / 2 - this.bounds.height / 2;
        // this.plane.rotation.y = Math.PI / 0.5002;
        this.plane.forEach(plane=>{
            this.scene.add(plane.plane);
        })

        this.overlay = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(this.width, this.height, 20, 20),
            new THREE.ShaderMaterial({
                uniforms: {
                    time: { type: "f", value: 0 },
                    progress: { value: 0 },
                    // displacement: { value: new THREE.TextureLoader().load(disp) },
                    vColor: { value: new THREE.Color(this.colorPalette.lightest) },
                    resolution: { type: "v4", value: new THREE.Vector2(this.width, this.height) },
                    uTextureSize: { type: "v2", value: new THREE.Vector2(100, 100) },
                    uQuadSize: { type: "v2", value: new THREE.Vector2(100, 100) },
                    texture1: { type: "f", value: this.textures[0] },
                    texture2: { type: "f", value: this.textures[1] },
                    uvRate: {
                        value: new THREE.Vector2(1, 1)
                    }
                },
                // wireframe: true,
                transparent: true,
                side: THREE.DoubleSide,
                depthTest: false,
                depthWrite: false,
                vertexShader: vertexOverlay,
                fragmentShader: fragmentOverlay
            })
        );
        // this.scene.add(this.overlay);
    }

    setPosition() {
        // console.log(this.props.currentScroll)
        this.plane.forEach(plane=>{
            plane.plane.position.y = this.props.currentScroll - plane.bounds.top + this.height / 2 - plane.bounds.height / 2;
            plane.plane.position.x = plane.bounds.left - this.width / 2 + plane.bounds.width / 2;
        })
    }
    mouseMovement() {
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / this.width) * 2 - 1;
            this.mouse.y = - (event.clientY / this.height) * 2 + 1;

            // update the picking ray with the camera and mouse position
            this.raycaster.setFromCamera(this.mouse, this.camera);

            // calculate objects intersecting the picking ray
            const intersects = this.raycaster.intersectObjects(this.scene.children);

            if (intersects.length > 0) {
                // console.log(intersects[0]);
            }
        }, false);
        this.btn.left.addEventListener('click', () => this.Prev());
        this.btn.right.addEventListener('click', () => this.next());
    }
    transition() {
        gsap.to(this.material.uniforms.animProgress, {
            value: 1,
            duration: 1,
            ease: Power2.easeOut
        })
    }

    tabEvents() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stop()
            } else {
                this.play();
            }
        });
    }
    stop() {
        this.paused = true;
    }

    play() {
        this.paused = false;
    }

    next() {
        if (this.isRunning) return;
        this.isRunning = true;
        let len = this.textures.length;
        let titleLen = this.titles.length;
        let descLen = this.descriptions.length;
        let nextTexture = this.textures[(this.current + 1) % len];
        let nextTitle = this.titles[(this.current + 1) % titleLen];
        let nextDesc= this.descriptions[(this.current + 1) % descLen];
        this.currentTitle.innerHTML = nextTitle;
        this.currentDesc.innerHTML = nextDesc;
        const splittedText = new SplitTextJS(this.currentTitle).chars;
        this.material.uniforms.texture2.value = nextTexture;
        this.overlay.material.uniforms.texture2.value = nextTexture;
        gsap.to([this.material.uniforms.progress, this.overlay.material.uniforms.progress, this.duration], {
            value: 1,
            ease: Power2.easeInOut,
            onComplete: () => {
                this.current = (this.current + 1) % len;
                this.material.uniforms.texture1.value = nextTexture;
                this.overlay.material.uniforms.texture1.value = nextTexture;
                this.material.uniforms.progress.value = 0;
                this.overlay.material.uniforms.progress.value = 0;
                this.isRunning = false;
            }
        })

        gsap.from(splittedText, {
            duration: 0.4,
            y: 20,
            opacity: 0,
            stagger: 0.01,
            delay: 0.3,
            ease: Power2.easeOut,

        });
        gsap.from(this.currentDesc, {
            duration: 0.6,
            y: 10,
            opacity: 0,
            stagger: 0.01,
            delay: 0.3,
            ease: Power2.easeOut,

        });
    }
    Prev() {
        if (this.isRunning) return;
        this.isRunning = true;
        let len = this.textures.length;
        let titleLen = this.titles.length;
        let descLen = this.descriptions.length;
        let nextTexture = this.current === 0 ? this.textures[len - 1] : this.textures[(this.current - 1) % len];
        let nextTitle = this.current === 0 ? this.titles[titleLen - 1] : this.titles[(this.current - 1) % titleLen];
        let nextDesc = this.current === 0 ? this.descriptions[descLen - 1] : this.descriptions[(this.current - 1) % descLen];

        this.currentTitle.innerHTML = nextTitle;
        this.currentDesc.innerHTML = nextDesc;
        const splittedText = new SplitTextJS(this.currentTitle).chars;
        this.material.uniforms.texture2.value = nextTexture;
        this.overlay.material.uniforms.texture2.value = nextTexture;
        gsap.to([this.material.uniforms.progress, this.overlay.material.uniforms.progress, this.duration], {
            value: 1,
            ease: Power2.easeInOut,
            onComplete: () => {
                this.current = this.current === 0 ? len - 1 : (this.current - 1) % len;
                this.material.uniforms.texture1.value = nextTexture;
                this.overlay.material.uniforms.texture1.value = nextTexture;
                this.material.uniforms.progress.value = 0;
                this.overlay.material.uniforms.progress.value = 0;
                this.isRunning = false;
            }
        });
        gsap.from(splittedText, {
            duration: 0.4,
            y: -20,
            opacity: 0,
            stagger: 0.01,
            delay: 0.3,
            ease: Power2.easeOut,
        });
        gsap.from(this.currentDesc, {
            duration: 0.6,
            y: -20,
            opacity: 0,
            stagger: 0.01,
            delay: 0.3,
            ease: Power2.easeOut,
        });
    }

    render() {
        if (this.paused) return;
        this.time += 0.05;
        this.material.uniforms.time.value = this.time;
        this.overlay.material.uniforms.time.value = this.time;
        this.setPosition();
        requestAnimationFrame(this.render.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}

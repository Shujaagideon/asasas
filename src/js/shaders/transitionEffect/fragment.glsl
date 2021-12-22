uniform float time;
uniform float progress;
uniform float animProgress;
uniform float width;
uniform float scaleX;
uniform float scaleY;
uniform float transition;
uniform float radius;
uniform vec2 uQuadSize;
uniform float intensity;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D displacement;
uniform vec2 resolution;
varying vec2 vUv;
varying vec3 vPosition;




void main()	{
    vec4 d1 = texture2D(texture1, vUv);
    vec4 d2 = texture2D(texture2, vUv);
    float displace1 = (d1.r + d1.g + d1.b)*0.33;
    float displace2 = (d2.r + d2.g + d2.b)*0.33;
    
    vec4 t1 = texture2D(texture1, vec2(vUv.x, vUv.y + progress * (displace2 * 1.)));
    vec4 t2 = texture2D(texture2, vec2(vUv.x, vUv.y + (1.0 - progress) * (displace1 * 1.)));
    gl_FragColor = mix(t1, t2, progress);
    // gl_FragColor = vec4(1., 0, 0., 1.);
}
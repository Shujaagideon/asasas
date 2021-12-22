uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D displacement;
uniform vec4 resolution;
varying vec2 vUv;
varying vec3 vPosition;
uniform vec3 vColor;
uniform vec2 uTextureSize;
uniform vec2 uQuadSize;
uniform sampler2D tDiffuse;

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

mat2 getRotM(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}
const float PI = 3.1415;
const float angle1 = PI *0.25;
const float angle2 = -PI *0.75;

vec2 getUv(vec2 uv){
    vec2 fin = uv - vec2(0.5);

    float quadAspect = uQuadSize.x/uQuadSize.y;
    float texAspect = uTextureSize.x/uTextureSize.y;
    quadAspect < texAspect ? fin*= vec2( quadAspect / texAspect , 1.) : fin *= vec2(1. , texAspect / quadAspect);

    fin += vec2(0.5);
    return fin;
}


void main(){
    vec4 diffuseColor = texture2D(tDiffuse, vUv);
    diffuseColor.rgb *= 0.3;

    float glowStrength = distance(vUv, vec2(0.5)) / 1.5;
    glowStrength *= 2.5;
    // glowStrength = clamp(glowStrength, 0.0, 2.0);

    vec2 newUV = getUv(vUv);

    vec4 disp = texture2D(displacement, newUV);
    vec2 dispVec = vec2(disp.r, disp.g);
    vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * 1. * progress;
    vec4 t1 = texture2D(texture1, distortedPosition1);
    vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * 1. * (1.0 - progress);
    vec4 t2 = texture2D(texture2, distortedPosition2);

    vec4 fin = mix(t1, t2, progress);
    fin *= 0.2;
    float variable = sin(time/20.)* 4.;
    variable = cnoise(vUv - cnoise(vec2(variable + vUv)));
    variable = clamp(variable, 0.3, 3.);
    vec3 color = mix(fin.rgb, vColor* variable, glowStrength);

    gl_FragColor = vec4(color, 0.1);
}
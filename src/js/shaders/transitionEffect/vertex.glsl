uniform vec2 uQuadSize;
uniform vec2 uTextureSize;
varying vec2 vUv;
varying vec3 vPosition;


vec2 getUv(vec2 uv){
    vec2 fin = uv - vec2(0.5);

    float quadAspect = uQuadSize.x/uQuadSize.y;
    float texAspect = uTextureSize.x/uTextureSize.y;
    quadAspect < texAspect ? fin*= vec2( quadAspect / texAspect , 1.) : fin *= vec2(1. , texAspect / quadAspect);

    fin += vec2(0.5);
    return fin;
}


void main(){
    vUv = getUv(uv);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
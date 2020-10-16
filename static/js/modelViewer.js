// import * as THREE from '../js/three.module.js';
// import { ColladaLoader } from '../js/ColladaLoader.js';

import * as THREE from 'https://unpkg.com/three@0.120.0/build/three.module.js';
import { ColladaLoader } from 'https://unpkg.com/three@0.120.0/examples/jsm/loaders/ColladaLoader.js';


var scene, camera, renderer;
var dae;


const loader = new ColladaLoader();
loader.load('/static/collada/ur5_copy.dae', function colladaReady( collada ){
        dae = collada.scene;

        dae.traverse( function ( child ) {

            if ( child.isMesh ) {

                // instanceof THREE.SkinnedMesh
                // abb_irb52_7_120.dae
                // var animation = new THREE.Animation(child, child.geometry.animation);
                // animation.play();

                // model does not have normals
                child.material.flatShading = true;
                // child.frustumCulled = false;

            }

        } );

        dae.scale.x = dae.scale.y = dae.scale.z = 5.0;
        dae.updateMatrix();

        // call Init and Render functions
        init();
        render();
});

function init() {
    // 1. Set up the camera, scene and add objects to scene
    // 2. Set up renderer and add to HTML DOM

    // Create the Scene
    scene = new THREE.Scene();

    // Create the Camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 10;
    camera.position.x = 5;
    camera.position.y = 10;

    // Grid
    var grid = new THREE.GridHelper( 20, 20 );
    scene.add( grid );

    // add collada
    scene.add( dae );

    // Lights
    var light = new THREE.HemisphereLight( 0xffeeee, 0x111122 );
    scene.add( light );

    // Define a renderer, and set it to fill the browser window
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xdddddd); // for a nice, light background
    renderer.setSize( window.innerWidth, window.innerHeight );

    // Get an element from the DOM and append renderer.domElement to it
    document.getElementById('model-viewer').appendChild( renderer.domElement );

    // resizing browser window
    window.addEventListener( 'resize', onWindowResize, false );
}


function render() {
    requestAnimationFrame(render);

    var timer = Date.now() * 0.0001;

    camera.position.x = Math.cos( timer ) * 20;
    camera.position.y = 10;
    camera.position.z = Math.sin( timer ) * 20;
    camera.lookAt( 0, 5, 0 );

    renderer.render(scene, camera);
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
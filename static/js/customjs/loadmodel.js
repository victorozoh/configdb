// import { LoadingManager } from '../node_modules/three';
// import URDFLoader from '../urdf-js/src/URDFLoader.js';

// const manager = new LoadingManager();
// const loader = new URDFLoader(manager);
import { STLLoader } from '../../node_modules/three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from '../../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { ColladaLoader } from '../../node_modules/three/examples/jsm/loaders/ColladaLoader.js';
import { OBJLoader } from '../../node_modules/three/examples/jsm/loaders/OBJLoader.js';

const loadmodel = document.getElementById("load-model");
const viewer = document.querySelector("urdf-viewer");

document.addEventListener('WebComponentsReady', () => {

    viewer.loadMeshFunc = (path, manager, done) => {

        const ext = path.split(/\./g).pop().toLowerCase();
        switch (ext) {

            case 'gltf':
            case 'glb':
                new GLTFLoader(manager).load(
                    path,
                    result => done(result.scene),
                    null,
                    err => done(null, err)
                );
                break;
            case 'obj':
                new OBJLoader(manager).load(
                    path,
                    result => done(result),
                    null,
                    err => done(null, err)
                );
                break;
            case 'dae':
                new ColladaLoader(manager).load(
                    path,
                    result => done(result.scene),
                    null,
                    err => done(null, err)
                );
                break;
            case 'stl':
                new STLLoader(manager).load(
                    path,
                    result => {
                        const material = new THREE.MeshPhongMaterial();
                        const mesh = new THREE.Mesh(result, material);
                        done(mesh);
                    },
                    null,
                    err => done(null, err)
                );
                break;
        } // end of switch statement
    }; // end of loadMeshFunc

    // document.querySelector('li[urdf]').dispatchEvent(new Event('click'));
    //
    // if (/javascript\/example\/build/i.test(window.location)) {
    //     viewer.package = '../../../urdf';
    // }
    viewer.package = '/static/models/';
});

// event to load robot model
loadmodel.onclick = showModel;

function showModel(){
  // viewer.package = '/static/models/';
  viewer.urdf = '/static/models/UR5/urdf/ur5.urdf';
}

"use strict";
export default class Sample {

    constructor(opts = {}) {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.output = opts.output || document.createElement('div');

        this.loop = 0;
        this.init();
    }

    init() {
        { // FPS
            this.stats = new Stats();
            this.stats.showPanel(0);
            this.output.appendChild(this.stats.dom);
        }
        { // scene
            this.scene = new THREE.Scene();
        }
        { // camera
            this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);
            this.camera.position.z = 5;
        }
        { // cube
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.set(5, 0, -2);
            this.scene.add(this.mesh);
        }
        { // cube
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
            this.mesh2 = new THREE.Mesh(geometry, material);
            // this.mesh2.position.set(5, 0, -2);
            this.scene.add(this.mesh2);
        }
        { // renderer
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(0x222222); // 背景色
            this.renderer.setPixelRatio(window.devicePixelRatio || 1);
            this.renderer.setSize(this.width, this.height);
            this.output.appendChild(this.renderer.domElement);
        }
        // this.render();
        window.addEventListener('resize', () => {
            this.onResize();
        }, false);
        // var animate = () => {
        //     requestAnimationFrame(animate);
        //     this.mesh.rotation.x += 0.05;
        //     this.mesh.rotation.y += 0.07;
        //     this.renderer.render(this.scene, this.camera);
        // };
        // animate();

    }

    render() {
        this.stats.begin();
        // this.controls.update();
        this.mesh2.rotation.x += 0.05;
        this.mesh2.rotation.y += 0.07;
        this.mesh.rotation.x += 0.05;
        this.mesh.rotation.y += 0.07;
        this.mesh.position.x = Math.sin(this.loop * 0.05) * 3;
        this.mesh.position.y = Math.cos(this.loop * 0.05) * 3;
        this.mesh.position.z = Math.tan(this.loop * 0.05) * 3;
        this.renderer.render(this.scene, this.camera);

        this.loop++;

        this.stats.end();

        requestAnimationFrame(() => {
            this.render();
        });
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}
"use strict";
export default class Sample {

    constructor(opts = {}) {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.output = opts.output || document.createElement('div');

        this.move = false;

        this.socket = io();

        this.loop = 0;
        this.keys = {};
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
            this.camera.position.z = 50;
        }
        { // Light
            const directionalLight = new THREE.PointLight(0xffffff, 3);
            directionalLight.position.set(0, 0, 3);
            this.scene.add(directionalLight);
        }
        { // 自分側バー
            const geometry = new THREE.CubeGeometry(20, 2, 2);
            const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            this.mybar = new THREE.Mesh(geometry, material);
            this.mybar.position.set(0, -30, 0);
            this.scene.add(this.mybar);
        }
        { // 相手側バー
            const geometry = new THREE.CubeGeometry(20, 2, 2);
            const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
            this.enemybar = new THREE.Mesh(geometry, material);
            this.enemybar.position.set(0, 30, 0);
            this.scene.add(this.enemybar);
        }
        { // renderer
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setClearColor(0x222222); // 背景色
            this.renderer.setPixelRatio(window.devicePixelRatio || 1);
            this.renderer.setSize(this.width, this.height);
            this.output.appendChild(this.renderer.domElement);
        }
        { // Event
            window.addEventListener('resize', () => this.onResize(), false);
            window.addEventListener('keydown', (event) => this.keys[event.keyCode] = true, false);
            window.addEventListener('keyup', (event) => this.keys[event.keyCode] = false, false);
        }
        { // Socket Event
            this.socket.on('bar pos', (msg) => {
                this.enemybar.position.set(-msg.x, 30, 0);
            });
        }
    }

    render() {
        this.stats.begin();
        // this.controls.update();
        // this.mesh.position.x = Math.sin(this.loop * 0.05) * 3;
        // this.mesh.position.y = Math.cos(this.loop * 0.05) * 3;
        // this.mesh.position.z = Math.tan(this.loop * 0.05) * 3;

        if (this.keys[68]) {
            this.mybar.position.x += 0.5;
            this.move = true;
        }
        if (this.keys[65]) {
            this.mybar.position.x -= 0.5;
            this.move = true;
        }
        // if (this.keys[87]) this.mybar.position.y += 0.05;//W
        // if (this.keys[83]) this.mybar.position.y -= 0.05;//S
        if (this.move) {
            this.socket.emit('bar pos', {
                x: this.mybar.position.x
            });
            this.move = false;
        }
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
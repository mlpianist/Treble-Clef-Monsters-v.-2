/* Translucent ceiling floating face (wave 6)
   Uses global CORRIDOR_HEIGHT for its bobbing height. */
window.EnemyTypes = window.EnemyTypes || {};

EnemyTypes.ceiling_float = {
    floating: true,

    build() {
        const group = new THREE.Group();

        const faceMat = new THREE.MeshStandardMaterial({
            color: 0xa5f3fc,
            transparent: true,
            opacity: 0.45,
            roughness: 0.1,
            emissive: 0x06b6d4,
            emissiveIntensity: 0.6
        });

        const headGeo = new THREE.SphereGeometry(1.1, 20, 20);
        const head = new THREE.Mesh(headGeo, faceMat);
        group.add(head);

        const eyeGeo = new THREE.SphereGeometry(0.09, 10, 10);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0369a1 });

        const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
        leftEye.position.set(-0.25, 0.2, 0.95);
        group.add(leftEye);

        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.position.set(0.25, 0.2, 0.95);
        group.add(rightEye);

        const grinGeo = new THREE.TorusGeometry(0.55, 0.08, 8, 20, Math.PI);
        const grinMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
        const grin = new THREE.Mesh(grinGeo, grinMat);
        grin.position.set(0, -0.15, 0.9);
        grin.rotation.x = Math.PI;
        group.add(grin);

        return {
            group,
            parts: { head, grin },
            speed: 0.045,
            health: 1,
            points: 30,
            hitColor: 0x38bdf8
        };
    },

    animate(enemy, animTime) {
        enemy.mesh.position.y = (CORRIDOR_HEIGHT - 1.6) + Math.sin(animTime * 1.5) * 0.25;
        enemy.mesh.rotation.z = Math.sin(animTime) * 0.08;
    }
};

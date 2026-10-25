/* Spindle Stalker (wave 6): tall, skinny, fast */
window.EnemyTypes = window.EnemyTypes || {};

EnemyTypes.spindle = {
    floating: false,

    build() {
        const group = new THREE.Group();

        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x111122, roughness: 0.3, metalness: 0.8 });
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });

        const torsoGeo = new THREE.CylinderGeometry(0.18, 0.1, 2.8, 8);
        const torso = new THREE.Mesh(torsoGeo, bodyMat);
        torso.position.y = 1.6;
        group.add(torso);

        const headGeo = new THREE.SphereGeometry(0.28, 12, 12);
        const head = new THREE.Mesh(headGeo, bodyMat);
        head.position.set(0, 3.1, 0);
        group.add(head);

        const eyeGeo = new THREE.SphereGeometry(0.12, 8, 8);
        const eye = new THREE.Mesh(eyeGeo, eyeMat);
        eye.position.set(0, 3.1, 0.22);
        group.add(eye);

        const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.8, 6);
        const legs = [];
        for (let i = 0; i < 4; i++) {
            const leg = new THREE.Mesh(legGeo, bodyMat);
            leg.position.y = 0.9;
            group.add(leg);
            legs.push(leg);
        }

        return {
            group,
            parts: { torso, head, legs },
            speed: 0.15,
            health: 2,
            points: 35,
            hitColor: 0xa855f7
        };
    },

    animate(enemy, animTime, isTwitching) {
        const legs = enemy.parts.legs;
        for (let k = 0; k < legs.length; k++) {
            legs[k].rotation.x = Math.sin(animTime * 4 + k) * 0.4;
            legs[k].rotation.z = (k % 2 === 0 ? 0.2 : -0.2) + Math.cos(animTime * 4) * 0.15;
        }
        enemy.parts.torso.rotation.z = Math.sin(animTime * 2) * 0.1;
        enemy.parts.head.rotation.x = isTwitching ? (Math.random() - 0.5) * 0.8 : 0;
    }
};

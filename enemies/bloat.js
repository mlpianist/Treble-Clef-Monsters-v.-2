/* Bloat Crawler (wave 6): wide, bulky, slow */
window.EnemyTypes = window.EnemyTypes || {};

EnemyTypes.bloat = {
    floating: false,

    build() {
        const group = new THREE.Group();

        const blobMat = new THREE.MeshStandardMaterial({ color: 0x1a2e05, roughness: 0.9, emissive: 0x0f2302 });
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

        const bodyGeo = new THREE.SphereGeometry(1.2, 12, 12);
        bodyGeo.scale(1.4, 0.7, 1.2);
        const body = new THREE.Mesh(bodyGeo, blobMat);
        body.position.y = 0.7;
        group.add(body);

        const eyeGeo = new THREE.SphereGeometry(0.1, 8, 8);
        for (let i = 0; i < 6; i++) {
            const e = new THREE.Mesh(eyeGeo, eyeMat);
            const angle = (i / 6) * Math.PI - Math.PI / 2;
            e.position.set(Math.sin(angle) * 0.9, 0.8 + Math.cos(i) * 0.2, Math.cos(angle) * 0.9);
            group.add(e);
        }

        const legGeo = new THREE.CylinderGeometry(0.1, 0.06, 0.8, 6);
        const legs = [];
        for (let i = 0; i < 6; i++) {
            const leg = new THREE.Mesh(legGeo, blobMat);
            const side = i % 2 === 0 ? 1 : -1;
            leg.position.set(side * 1.1, 0.3, (Math.floor(i / 2) - 1) * 0.7);
            group.add(leg);
            legs.push(leg);
        }

        return {
            group,
            parts: { body, legs },
            speed: 0.07,
            health: 4,
            points: 50,
            hitColor: 0x84cc16
        };
    },

    animate(enemy, animTime, isTwitching) {
        const legs = enemy.parts.legs;
        for (let k = 0; k < legs.length; k++) {
            legs[k].rotation.z = Math.sin(animTime * 2 + k) * 0.3;
        }
        enemy.parts.body.scale.y = 0.7 + Math.sin(animTime * 3) * 0.1;
    }
};

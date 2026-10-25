/* Jittering Specter (wave 6): medium-fast, violent jitter */
window.EnemyTypes = window.EnemyTypes || {};

EnemyTypes.jitterer = {
    floating: false,

    build() {
        const group = new THREE.Group();

        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x31081f, roughness: 0.4, emissive: 0x210010 });
        const mouthMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });

        const bodyGeo = new THREE.DodecahedronGeometry(0.7, 1);
        bodyGeo.scale(0.8, 1.3, 0.8);
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        body.position.y = 1.1;
        group.add(body);

        const mouthGeo = new THREE.BoxGeometry(0.6, 0.2, 0.4);
        const mouth = new THREE.Mesh(mouthGeo, mouthMat);
        mouth.position.set(0, 1.2, 0.5);
        group.add(mouth);

        const legGeo = new THREE.CylinderGeometry(0.08, 0.05, 1.3, 6);
        const leftLeg = new THREE.Mesh(legGeo, bodyMat);
        leftLeg.position.set(-0.4, 0.65, 0);
        group.add(leftLeg);

        const rightLeg = new THREE.Mesh(legGeo, bodyMat);
        rightLeg.position.set(0.4, 0.65, 0);
        group.add(rightLeg);

        return {
            group,
            parts: { body, mouth, legs: [leftLeg, rightLeg] },
            speed: 0.11,
            health: 2,
            points: 40,
            hitColor: 0xef4444
        };
    },

    animate(enemy, animTime, isTwitching) {
        const legs = enemy.parts.legs;
        legs[0].rotation.x = Math.sin(animTime * 5) * 0.6;
        legs[1].rotation.x = -Math.sin(animTime * 5) * 0.6;
        enemy.parts.mouth.scale.y = 1.0 + Math.abs(Math.sin(animTime * 6)) * 1.5;
    }
};

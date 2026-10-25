/* ---------------- GHOULS (waves 1-5) ----------------
   Waves 1-3: cute ghouls. Waves 4-5: shadow ghouls with horns.
   Uses globals from index.html: THREE, wave, scene, ghouls,
   CORRIDOR_WIDTH, CORRIDOR_LENGTH
------------------------------------------------------ */
function createCuteGhoul() {
    const ghoulGroup = new THREE.Group();
    const isScaryPhase = wave === 4 || wave === 5;

    let mainColor, eyeColor, requiredHits, baseSpeed;

    if (isScaryPhase) {
        mainColor = 0x1f1135;
        eyeColor = 0xef4444;
        requiredHits = 2;
        baseSpeed = 0.0825 + (wave - 3) * 0.01;
    } else {
        const colors = [
            { main: 0x9333ea, eye: 0x22d3ee },
            { main: 0x0284c7, eye: 0x4ade80 },
            { main: 0x059669, eye: 0xfacc15 },
            { main: 0xc084fc, eye: 0xf43f5e }
        ];
        const theme = colors[Math.floor(Math.random() * colors.length)];
        mainColor = theme.main;
        eyeColor = theme.eye;
        requiredHits = 1;
        baseSpeed = 0.0825 + wave * 0.008;
    }

    const bodyGeo = new THREE.SphereGeometry(0.9, 16, 16);
    bodyGeo.scale(1, 1.35, 0.9);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: mainColor,
        roughness: 0.2,
        transparent: true,
        opacity: isScaryPhase ? 0.82 : 0.92,
        emissive: isScaryPhase ? 0x450a0a : mainColor,
        emissiveIntensity: isScaryPhase ? 0.35 : 0.2
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.2;
    ghoulGroup.add(body);

    if (isScaryPhase) {
        const hornGeo = new THREE.ConeGeometry(0.18, 0.65, 8);
        const hornMat = new THREE.MeshStandardMaterial({ color: 0x3f0713, roughness: 0.3 });

        const leftHorn = new THREE.Mesh(hornGeo, hornMat);
        leftHorn.position.set(-0.45, 2.1, 0.1);
        leftHorn.rotation.z = -Math.PI / 8;
        ghoulGroup.add(leftHorn);

        const rightHorn = new THREE.Mesh(hornGeo, hornMat);
        rightHorn.position.set(0.45, 2.1, 0.1);
        rightHorn.rotation.z = Math.PI / 8;
        ghoulGroup.add(rightHorn);
    }

    const eyeGeo = new THREE.SphereGeometry(isScaryPhase ? 0.24 : 0.22, 12, 12);
    const eyeMat = new THREE.MeshBasicMaterial({ color: eyeColor });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.3, 1.4, 0.72);
    ghoulGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.3, 1.4, 0.72);
    ghoulGroup.add(rightEye);

    const pupilGeo = new THREE.SphereGeometry(isScaryPhase ? 0.08 : 0.1, 8, 8);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.3, 1.4, 0.88);
    ghoulGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.3, 1.4, 0.88);
    ghoulGroup.add(rightPupil);

    const mouthGeo = new THREE.TorusGeometry(isScaryPhase ? 0.18 : 0.15, 0.05, 8, 12, Math.PI);
    const mouthMat = new THREE.MeshBasicMaterial({ color: 0x050510 });
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, 1.05, 0.82);
    mouth.rotation.x = isScaryPhase ? 0 : Math.PI;
    ghoulGroup.add(mouth);

    const armGeo = new THREE.SphereGeometry(0.25, 12, 12);
    armGeo.scale(0.8, 1.8, 0.8);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-1.0, 1.1, 0.1);
    leftArm.rotation.z = Math.PI / 6;
    ghoulGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(1.0, 1.1, 0.1);
    rightArm.rotation.z = -Math.PI / 6;
    ghoulGroup.add(rightArm);

    const footGeo = new THREE.SphereGeometry(0.25, 10, 10);
    const leftFoot = new THREE.Mesh(footGeo, bodyMat);
    leftFoot.position.set(-0.35, 0.25, 0);
    ghoulGroup.add(leftFoot);

    const rightFoot = new THREE.Mesh(footGeo, bodyMat);
    rightFoot.position.set(0.35, 0.25, 0);
    ghoulGroup.add(rightFoot);

    const spawnX = (Math.random() - 0.5) * (CORRIDOR_WIDTH - 3.5);
    const spawnZ = -CORRIDOR_LENGTH + 8;
    ghoulGroup.position.set(spawnX, 0, spawnZ);

    const ghoulObj = {
        type: 'ghost',
        mesh: ghoulGroup,
        leftArm, rightArm, leftFoot, rightFoot,
        speed: baseSpeed,
        animOffset: Math.random() * 100,
        health: requiredHits,
        isScary: isScaryPhase,
        hitTimer: 0
    };

    scene.add(ghoulGroup);
    ghouls.push(ghoulObj);
}

// Per-frame animation for ghouls
function animateGhoul(enemy, animTime) {
    enemy.mesh.position.y = Math.sin(animTime * 2) * 0.22;
    enemy.mesh.rotation.z = Math.sin(animTime) * 0.12;

    enemy.leftArm.rotation.z = Math.PI / 6 + Math.sin(animTime * 2) * 0.25;
    enemy.rightArm.rotation.z = -Math.PI / 6 - Math.sin(animTime * 2) * 0.25;

    enemy.leftFoot.position.z = Math.sin(animTime * 3) * 0.22;
    enemy.rightFoot.position.z = -Math.sin(animTime * 3) * 0.22;
}

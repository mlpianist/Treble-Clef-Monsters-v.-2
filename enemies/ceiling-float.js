/* Ceiling floating face (wave 6) - hand-drawn face image on a flattened sphere
   Uses global CORRIDOR_HEIGHT for its bobbing height. */
window.EnemyTypes = window.EnemyTypes || {};

const CEILING_FACE_IMG = "data:image/png;base64,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";

// ---- tweakables ----
const CEILING_FACE = {
    fadeStart: 0.68,       // 0..1: distance from center where the edge starts fading out
    twinkleEvery: 3,       // seconds between eye twinkles
    twinkleLength: 0.5,    // seconds each twinkle lasts
    innerCenter: '#04060c', // color deep inside the body (seen through the mouth)
    innerRim: '#9fb0cc'     // color of the inner wall near the edges
};

// Inside of the hollow body: dark in the middle (far away), lighter near the rim
function makeCeilingInnerMap() {
    const s = 256, c = document.createElement('canvas');
    c.width = c.height = s;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    gr.addColorStop(0, CEILING_FACE.innerCenter);
    gr.addColorStop(0.55, '#1b2233');
    gr.addColorStop(1, CEILING_FACE.innerRim);
    g.fillStyle = gr;
    g.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
}

// Radial alpha map: opaque in the middle, smoothly fading to nothing at the rim
function makeCeilingFadeMap() {
    const s = 256, c = document.createElement('canvas');
    c.width = c.height = s;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    const f0 = CEILING_FACE.fadeStart;
    for (let i = 0; i <= 10; i++) {
        const r = f0 + (1 - f0) * (i / 10);
        const t = i / 10, a = 1 - t * t * (3 - 2 * t);   // smoothstep
        const v = Math.round(a * 255);
        grad.addColorStop(r, `rgb(${v},${v},${v})`);
    }
    grad.addColorStop(0, '#fff');
    g.fillStyle = '#000';
    g.fillRect(0, 0, s, s);
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
}

// Red glow with a 4-point sparkle, used for the eye twinkle
function makeCeilingGlowMap() {
    const s = 128, c = document.createElement('canvas');
    c.width = c.height = s;
    const g = c.getContext('2d');
    g.translate(s / 2, s / 2);
    const blob = (sx, sy, r, inner) => {
        g.save(); g.scale(sx, sy);
        const gr = g.createRadialGradient(0, 0, 0, 0, 0, r);
        gr.addColorStop(0, inner);
        gr.addColorStop(0.25, 'rgba(255,40,40,0.85)');
        gr.addColorStop(1, 'rgba(255,0,0,0)');
        g.fillStyle = gr;
        g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.fill();
        g.restore();
    };
    blob(1, 1, 38, 'rgba(255,200,200,1)');     // round glow
    blob(1, 0.07, 62, 'rgba(255,120,120,1)');  // horizontal spike
    blob(0.07, 1, 62, 'rgba(255,120,120,1)');  // vertical spike
    return new THREE.CanvasTexture(c);
}

EnemyTypes.ceiling_float = {
    floating: true,

    build() {
        const group = new THREE.Group();

        // Face image mapped onto a flattened sphere ("pillow") so it keeps
        // the 3D shape. Emissive-only material = exact image colors, no lighting shift.
        const tex = new THREE.TextureLoader().load(CEILING_FACE_IMG);
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        tex.anisotropy = 4;

        const fadeMap = makeCeilingFadeMap();
        // 'map' is only here for its alpha (the see-through mouth); its color is black
        // because the visible color comes from emissiveMap.
        const faceMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            map: tex,
            emissive: 0xffffff,
            emissiveMap: tex,
            alphaMap: fadeMap,
            transparent: true,
            depthWrite: false,
            roughness: 1,
            metalness: 0
        });

        const geo = new THREE.SphereGeometry(1, 48, 32);
        // Planar front projection: x/y of the unit sphere -> image UV
        const pos = geo.attributes.position, uv = geo.attributes.uv;
        for (let i = 0; i < pos.count; i++) {
            uv.setXY(i, pos.getX(i) * 0.5 + 0.5, pos.getY(i) * 0.5 + 0.5);
        }
        uv.needsUpdate = true;

        const SX = 1.26, SY = 1.1, SZ = 0.45;    // width, height, depth of the pillow
        // Inside of the body: the same shape drawn from the inside, so the player
        // sees the back wall through the mouth hole.
        const innerMat = new THREE.MeshStandardMaterial({
            color: 0x000000,
            emissive: 0xffffff,
            emissiveMap: makeCeilingInnerMap(),
            alphaMap: fadeMap,
            transparent: true,
            depthWrite: false,
            side: THREE.BackSide,
            roughness: 1,
            metalness: 0
        });
        const inner = new THREE.Mesh(geo, innerMat);
        inner.scale.set(SX, SY, SZ);
        inner.renderOrder = 0;
        group.add(inner);

        const head = new THREE.Mesh(geo, faceMat);
        head.scale.set(SX, SY, SZ);
        head.renderOrder = 1;
        group.add(head);

        // Eye twinkles: additive red glow planes sitting on the front surface
        const glowTex = makeCeilingGlowMap();
        const eyeGlows = [[-0.311, 0.614], [0.280, 0.610]].map(([x, y]) => {
            const mat = new THREE.MeshBasicMaterial({
                map: glowTex, color: 0xff2222, transparent: true, opacity: 0,
                blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.FrontSide
            });
            const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
            m.position.set(x * SX, y * SY, Math.sqrt(1 - x * x - y * y) * SZ + 0.03);
            m.renderOrder = 2;
            group.add(m);
            return m;
        });

        group.userData.eyeGlows = eyeGlows;
        group.userData.twinklePhase = Math.random() * CEILING_FACE.twinkleEvery;  // desync enemies

        return {
            group,
            parts: { head, inner, eyeGlows },
            speed: 0.045,
            health: 1,
            points: 30,
            hitColor: 0x38bdf8
        };
    },

    animate(enemy, animTime) {
        enemy.mesh.position.y = (CORRIDOR_HEIGHT - 1.6) + Math.sin(animTime * 1.5) * 0.25;
        enemy.mesh.rotation.z = Math.sin(animTime) * 0.08;

        // Eyes: dim red ember, then a bright sparkle every few seconds
        const ud = enemy.mesh.userData;
        if (ud.eyeGlows) {
            const t = (animTime + ud.twinklePhase) % CEILING_FACE.twinkleEvery;
            const p = t < CEILING_FACE.twinkleLength ? t / CEILING_FACE.twinkleLength : 1;
            const flash = p < 1 ? Math.pow(Math.sin(Math.PI * p), 2) : 0;
            for (const g of ud.eyeGlows) {
                g.material.opacity = 0.18 + 0.82 * flash;
                g.scale.setScalar(0.55 + 1.15 * flash);
                g.rotation.z = flash * 0.6;
            }
        }
    }
};

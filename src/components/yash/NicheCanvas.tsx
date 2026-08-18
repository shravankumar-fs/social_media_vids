"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import * as THREE from "three";

/* ---------------------------------------------------------------------------
 * A kostha — the arched wall niche a Hoysala temple sets its figures into.
 *
 * The depth here is real, not painted: the portrait plane sits behind the wall,
 * the wall is an extruded shape with the arch cut clean through it, and the
 * jambs stand proud of both. Turning the group with the pointer therefore
 * produces genuine parallax between the face and the opening, which is the
 * entire reason this section is WebGL and not a photograph with a frame on it.
 * ------------------------------------------------------------------------- */

const CUSPS = 5;

/** The multifoil opening. |sin(nθ)| scallops the arc into Chalukyan cusps. */
function archPoints(halfW: number, sill: number, spring: number, segs = 200) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const th = t * Math.PI;
    const scallop = 1 - 0.075 * Math.abs(Math.sin(CUSPS * th));
    pts.push(
      new THREE.Vector2(
        Math.cos(th) * halfW * scallop,
        spring + Math.sin(th) * halfW * 1.12 * scallop,
      ),
    );
  }
  pts.push(new THREE.Vector2(-halfW, sill));
  return pts;
}

function useNicheGeometry(halfW: number, sill: number, spring: number) {
  return useMemo(() => {
    const pts = archPoints(halfW, sill, spring);

    // The wall: a generous slab with the niche cut out of it.
    const wall = new THREE.Shape();
    wall.moveTo(-9, -7);
    wall.lineTo(9, -7);
    wall.lineTo(9, 8.5);
    wall.lineTo(-9, 8.5);
    wall.closePath();

    const hole = new THREE.Path();
    hole.moveTo(halfW, sill);
    hole.lineTo(halfW, spring);
    pts.forEach((p) => hole.lineTo(p.x, p.y));
    hole.closePath();
    wall.holes.push(hole);

    const wallGeo = new THREE.ExtrudeGeometry(wall, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.16,
      bevelSegments: 3,
      curveSegments: 24,
    });
    wallGeo.computeVertexNormals();

    // The archivolt: the gilded band that follows the opening.
    const bandOuter = new THREE.Shape();
    const o = archPoints(halfW + 0.34, sill, spring);
    bandOuter.moveTo(halfW + 0.34, sill);
    bandOuter.lineTo(halfW + 0.34, spring);
    o.forEach((p) => bandOuter.lineTo(p.x, p.y));
    bandOuter.closePath();

    const bandInner = new THREE.Path();
    bandInner.moveTo(halfW, sill);
    bandInner.lineTo(halfW, spring);
    pts.forEach((p) => bandInner.lineTo(p.x, p.y));
    bandInner.closePath();
    bandOuter.holes.push(bandInner);

    const bandGeo = new THREE.ExtrudeGeometry(bandOuter, {
      depth: 0.2,
      bevelEnabled: true,
      bevelThickness: 0.09,
      bevelSize: 0.09,
      bevelSegments: 2,
      curveSegments: 24,
    });
    bandGeo.computeVertexNormals();

    return { wallGeo, bandGeo };
  }, [halfW, sill, spring]);
}

function Portrait({ z, halfW, sill, archTop }: {
  z: number;
  halfW: number;
  sill: number;
  archTop: number;
}) {
  // Configured on load rather than mutated afterwards — the texture belongs to
  // the loader's cache, and writing to it from an effect races other consumers.
  const tex = useTexture("/yash/portrait-tex.jpg", (loaded) => {
    const t = Array.isArray(loaded) ? loaded[0] : loaded;
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });

  // Cover the opening on both axes, then hang the plane from the crown of the
  // arch rather than from a fixed offset — anchoring to the sill instead lets
  // a narrow viewport push the top of his head up behind the wall.
  const openH = archTop - sill;
  const openW = halfW * 2.2;
  const fitW = Math.max(openW, openH * (722 / 1024));
  const fitH = fitW * (1024 / 722);
  const y = archTop - fitH * 0.5 - 0.06;

  return (
    <mesh position={[0, y, z]}>
      <planeGeometry args={[fitW, fitH]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

function Niche({ tilt }: { tilt: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const key = useRef<THREE.PointLight>(null);
  const { viewport } = useThree();

  /*
   * The opening is sized and placed from the real viewport, because the type
   * has to have a wall to sit on that is not his face. Wide screens push the
   * niche off to one side and give the inscription the other; a phone stacks
   * them, niche above, inscription below.
   */
  const wide = viewport.aspect > 1.15;
  const vw = viewport.width;
  const vh = viewport.height;

  const halfW = wide ? Math.min(2.4, vw * 0.14) : Math.min(1.55, vw * 0.4);
  // Keep the crown of the arch inside the frame; a clipped cusp reads as a
  // mistake rather than as a wall continuing past the edge.
  const archTop = wide ? vh * 0.34 : vh * 0.42;
  const sill = wide ? -vh * 0.44 : -vh * 0.022;
  const spring = archTop - halfW * 1.12;
  const offsetX = wide ? vw * 0.21 : 0;
  const openH = archTop - sill;

  const { wallGeo, bandGeo } = useNicheGeometry(halfW, sill, spring);

  useFrame((state) => {
    const t = tilt.current ?? { x: 0, y: 0 };
    if (group.current) {
      // Small angles. A wall does not swing; it catches light differently.
      group.current.rotation.y += (t.x * 0.16 - group.current.rotation.y) * 0.06;
      group.current.rotation.x += (t.y * 0.1 - group.current.rotation.x) * 0.06;
      const targetX = offsetX - t.x * 0.35;
      group.current.position.x += (targetX - group.current.position.x) * 0.06;
    }
    if (key.current) {
      const e = state.clock.elapsedTime;

      /*
       * The arrival: for the first second and a half the burnisher's lamp
       * crosses the archivolt from the far side, so the gold is discovered
       * rather than simply present. After that the lamp belongs to the
       * pointer, and the drift is only enough to keep the leaf alive.
       */
      const intro = Math.min(1, e / 1.5);
      const eased = 1 - Math.pow(1 - intro, 3);
      const sweep = (1 - eased) * -13;

      key.current.position.x =
        sweep + t.x * 5 + Math.sin(e * 0.35) * 1.2 * eased;
      key.current.position.y =
        -t.y * 3.4 + 3 + Math.cos(e * 0.27) * 0.8 * eased;
      key.current.intensity = 40 + 55 * eased;
    }
  });

  return (
    <group ref={group} position={[offsetX, 0, 0]}>
      <Portrait z={-1.5} halfW={halfW} sill={sill} archTop={archTop} />

      {/* Depth cue: the recess falls off to black behind the face. Light
          enough that the face still reads — a niche is shaded, not sealed. */}
      <mesh position={[0, 0, -1.44]}>
        <planeGeometry args={[halfW * 3, 22]} />
        <meshBasicMaterial color="#0e120c" transparent opacity={0.26} />
      </mesh>

      <mesh geometry={wallGeo} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1b2117"
          roughness={0.94}
          metalness={0.06}
          flatShading
        />
      </mesh>

      <mesh geometry={bandGeo} position={[0, 0, 0.5]}>
        <meshStandardMaterial
          color="#c08d24"
          roughness={0.26}
          metalness={1}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Jambs: the pilasters flanking the opening, standing proud of the wall. */}
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[s * (halfW + 0.78), sill + openH * 0.42, 0.62]}
        >
          <boxGeometry args={[0.72, openH * 0.84, 0.7]} />
          <meshStandardMaterial
            color="#242c1e"
            roughness={0.9}
            metalness={0.08}
            flatShading
          />
        </mesh>
      ))}

      {/* Capitals: a gilded block closing each pilaster. */}
      {[-1, 1].map((s) => (
        <mesh
          key={`c${s}`}
          position={[s * (halfW + 0.78), sill + openH * 0.86, 0.66]}
        >
          <boxGeometry args={[0.92, 0.3, 0.82]} />
          <meshStandardMaterial
            color="#966c19"
            roughness={0.32}
            metalness={1}
            envMapIntensity={1.3}
          />
        </mesh>
      ))}

      {/* Plinth: the course the whole thing stands on. */}
      <mesh position={[0, sill - 0.42, 0.5]}>
        <boxGeometry args={[halfW * 2 + 3.1, 0.52, 0.95]} />
        <meshStandardMaterial
          color="#141911"
          roughness={0.88}
          metalness={0.1}
          flatShading
        />
      </mesh>

      <pointLight
        ref={key}
        position={[3, 3, 6]}
        intensity={95}
        color="#ffd98a"
        distance={26}
        decay={2}
      />
    </group>
  );
}

function Scene({ tilt }: { tilt: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.34} color="#7d8f6e" />
      {/* Mysore pigment as light: indigo fill against the leaf-warm key. */}
      <directionalLight position={[-6, 2, 4]} intensity={0.8} color="#3a63a4" />
      <directionalLight position={[0, 8, 3]} intensity={0.5} color="#c0cbb4" />

      <Niche tilt={tilt} />

      {/* Procedural env map — gold needs something to reflect, and this ships
          no network request, unlike a preset HDRI. */}
      <Environment resolution={128} frames={1}>
        <Lightformer
          intensity={2.6}
          color="#ffe9b0"
          position={[0, 5, -9]}
          scale={[12, 6, 1]}
        />
        <Lightformer
          intensity={1.1}
          color="#2f5590"
          position={[-8, 0, 4]}
          scale={[8, 8, 1]}
        />
        <Lightformer
          intensity={0.7}
          color="#3a4632"
          position={[8, -3, 4]}
          scale={[8, 8, 1]}
        />
      </Environment>
    </>
  );
}

export default function NicheCanvas({
  tilt,
  active,
}: {
  tilt: React.RefObject<{ x: number; y: number }>;
  active: boolean;
}) {
  return (
    <Canvas
      // Off the screen, the scene stops rendering entirely rather than
      // burning a phone's battery behind eight screens of stone.
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 11], fov: 42 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* The portrait texture suspends; the boundary has to be inside the
          Canvas so the fallback is an empty scene, not an empty page. */}
      <Suspense fallback={null}>
        <Scene tilt={tilt} />
      </Suspense>
    </Canvas>
  );
}

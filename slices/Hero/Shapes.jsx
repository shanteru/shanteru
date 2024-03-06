"use client"


import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Float, Environment } from "@react-three/drei"
import { Suspense, useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

export default function Shapes() {
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas className="z-0" shadows gl={{ antialias: false }} dpr={[1, 1.5]}

                camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}>
                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={1}
                        far={9}
                    />
                    <Environment preset="studio" />

                </Suspense>
            </Canvas>
        </div>
    )
}

function Geometries() {


    const geometries = [
        {
            position: [0, 0, 0],
            r: 0.4,
            geometry: new THREE.TorusKnotGeometry(1.35, 1.2, 64, 11, 9, 17)
        },
        {
            position: [-1, -0.95, 4.5],
            r: 0.3,
            geometry: new THREE.TorusKnotGeometry(0.35, 0.4, 44, 10, 10,6)
        },
        {
            position: [2.2, 1.2, -2.5],
            r: 0.3,
            geometry: new THREE.TorusKnotGeometry(0.55, 0.72, 64, 11, 1, 19)
        },
        {
            position: [-1.6, 2.2, -4],
            r: 0.3,
            geometry: new THREE.TorusKnotGeometry(0.5, 1.2, 37, 10, 6,16)
        },

        {
            position: [1.2, -0.95, 3],
            r: 0.3,
            geometry: new THREE.TorusKnotGeometry(0.45, 0.3, 37, 11, 10,12)
        },
        // {
        //     position: [1, -0.65, 3],
        //     r: 0.4,
        //     geometry: new THREE.TorusKnotGeometry(0.5, 0.2, 100, 9, 4, 3)
        // },
        // {
        //     position: [-1.4, 2, -4],
        //     r: 0.4,
        //     geometry: new THREE.DodecahedronGeometry(1.5) //Soccer

        // },
        // {
        //     position: [1.6, 1.6, -4],
        //     r: 0.5,
        //     geometry: new THREE.TorusGeometry(0.5, 0.7, 8, 26) //Donut
        // },
        // {
        //     position: [1.6, 1.6, -4],
        //     r: 0.5,
        //     geometry: new THREE.OctahedronGeometry(1.5)//Diamond
        // }
    ];

    const materials = [
        // new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0x6BAAAF, roughness: 0.8, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0xCECAFE, roughness: 0.1, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x617E96, roughness: 0.3, metalness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0xD2E7D2, roughness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0x9584D2, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0xF39292, roughness: 0.2 }),

    ];

    const soundEffects = [
        new Audio("/sounds/sound1.wav"),
        new Audio("/sounds/sound2.wav"),
        new Audio("/sounds/sound3.wav"),
       
    ];

    return geometries.map(({ position, r, geometry }) => (
        <Geomtry
            key={JSON.stringify(position)}
            position={position.map((p) => p * 2)}
            geometry={geometry}
            materials={materials}
            soundEffects={soundEffects}
            r={r}
        />

    ))

}


function Geomtry({ r, position, geometry, materials, soundEffects }) {
    const meshRef = useRef();
    const [visible, setVisible] = useState(false);
    const startingMaterial = getRandomMaterial();
    function getRandomMaterial() {
        return gsap.utils.random(materials)
    }

    function handleClick(e) {

        const mesh = e.object;


        gsap.utils.random(soundEffects).play();

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 2)}`,
            y: `+=${gsap.utils.random(0, 2)}`,
            z: `+=${gsap.utils.random(0, 2)}`,
            duration: 1.3,
            ease: "elastic.out(1,0.3)",
            yoyo: true
        });

        mesh.material = getRandomMaterial();
    }
    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";

    }
    const handlePointerOut = () => {
        document.body.style.cursor = "default";

    };

    useEffect(() => {

        let ctx = gsap.context(() => {
            setVisible(true)
            gsap.from(meshRef.current.scale,
                {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1,
                    ease: "elastic.out(1,0.3)",
                    delay: 3.1
                });
        });
        return () => ctx.revert()
    }, [])

    return (
        <group position={position} ref={meshRef}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r} >
                <mesh geometry={geometry} onClick={handleClick} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} visible={visible} material={startingMaterial} />
            </Float>
        </group>
    );
}


import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import logo from "../assets/image.png";

type BoxData = {
    position: [number, number, number];
    scale: [number, number, number];
    color: string;
};

const BOX_COLORS = [
    "#1a050e",
    "#1f0812",
    "#15040b",
    "#230a14",
    "#1a0710",
    "#280b18",
];

function Particles() {
    const pointsRef = useRef<THREE.Points>(null);

    const [{ positions, speeds }] = useState(() => {
        const count = 900;
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 60;
            positions[i * 3 + 1] = Math.random() * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
            speeds[i] = Math.random() * 0.04 + 0.01;
        }

        return { positions, speeds };
    });

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const pos = pointsRef.current.geometry.attributes.position
            .array as Float32Array;
        const t = clock.getElapsedTime();

        for (let i = 0; i < speeds.length; i++) {
            pos[i * 3 + 1] += speeds[i];
            pos[i * 3 + 0] += Math.sin(t * speeds[i] * 40 + i) * 0.005;
            if (pos[i * 3 + 1] > 20) {
                pos[i * 3 + 1] = 0.5;
            }
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#fbcfe8"
                size={0.05}
                sizeAttenuation
                transparent
                opacity={0.7}
                depthWrite={false}
            />
        </points>
    );
}

function Boxes() {
    const groupRef = useRef<THREE.Group>(null);

    const [boxes] = useState<BoxData[]>(() => {
        const temp: BoxData[] = [];
        for (let i = 0; i < 200; i++) {
            const size = Math.random() * 4 + 3;
            const h = Math.random() * 10 + 4;
            temp.push({
                position: [
                    (Math.random() - 0.5) * 60,
                    h / 2,
                    (Math.random() - 0.5) * 60,
                ],
                scale: [size, h, size],
                color: BOX_COLORS[Math.floor(Math.random() * BOX_COLORS.length)],
            });
        }
        return temp;
    });

    useFrame(() => {
        if (!groupRef.current) return;
        groupRef.current.rotation.y += 0.003;
    });

    return (
        <group ref={groupRef}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[300, 300]} />
                <meshStandardMaterial color="#150409" roughness={1} />
            </mesh>

            {boxes.map((box, i) => (
                <mesh key={i} position={box.position} scale={box.scale}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color={box.color}
                        roughness={1}
                        metalness={0.0}
                    />
                </mesh>
            ))}
        </group>
    );
}



function CameraRig() {
    const { camera } = useThree();
    const cameraRef = useRef(camera);

    const mouse = useRef({ x: 0, y: 0 });
    const smoothed = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, []);

    useFrame(() => {
        const cam = cameraRef.current;

        smoothed.current.x += (mouse.current.x - smoothed.current.x) * 0.05;
        smoothed.current.y += (mouse.current.y - smoothed.current.y) * 0.05;

        cam.position.x = smoothed.current.x * 3;

        const rawY = 16 + smoothed.current.y * -1;
        cam.position.y = Math.max(16, rawY);

        cam.position.z = 22;
        cam.lookAt(smoothed.current.x * 1.5, 4, 0);
    });

    return null;
}

export function ThreeBackground() {
    return (
        <div className="fixed inset-0 -z-10">

            <div className="absolute top-0 left-0 z-50 flex items-center gap-1 px-6 py-3">
                <img
                    src={logo}
                    alt="Auroryn logo"
                    className="h-13 w-13 object-contain"
                />
                <span
                    className="text-white font-bold tracking-[0.25em] text-lg"
                    style={{ textShadow: "0 0 12px rgba(100, 8, 57, 0.6)" }}
                >
                    AURORYN
                </span>
            </div>

            <Canvas
                camera={{ position: [0, 13, 22], fov: 60 }}
                gl={{ antialias: true }}
            >
                <color attach="background" args={["#be185d"]} />
                <fog attach="fog" args={["#be185d", 8, 45]} />

                <hemisphereLight args={["#ec4899", "#1a0510", 3]} />

                <directionalLight
                    position={[0, 30, 20]}
                    intensity={3}
                    color="#ec4899"
                />

                <directionalLight
                    position={[15, 10, 0]}
                    intensity={0.5}
                    color="#9d174d"
                />

                <CameraRig />
                <Boxes />
                
                <Particles />
            </Canvas>
        </div>
    );
}
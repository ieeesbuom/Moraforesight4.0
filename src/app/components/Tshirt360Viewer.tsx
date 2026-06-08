"use client";

import type { KeyboardEvent, PointerEvent } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as THREE from "three";

type TshirtFrame = {
  label: string;
  src: string;
};

type Tshirt360ViewerProps = {
  frames: TshirtFrame[];
  label: string;
};

type ModelTextures = {
  front: THREE.Texture;
  back: THREE.Texture;
  side?: THREE.Texture;
};

const MODEL_HEIGHT = 4.15;
const MODEL_DEPTH = 0.52;
const ROTATION_STEP = Math.PI / 2;

const findFrame = (frames: TshirtFrame[], key: string) =>
  frames.find((frame) => frame.label.toLowerCase().includes(key));

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const createTextureMaterial = (texture: THREE.Texture) =>
  new THREE.MeshBasicMaterial({
    alphaTest: 0.035,
    depthWrite: true,
    map: texture,
    side: THREE.FrontSide,
    transparent: true,
  });

const createCurvedPanelGeometry = (width: number, height: number) => {
  const geometry = new THREE.PlaneGeometry(width, height, 38, 52);
  const position = geometry.getAttribute("position") as THREE.BufferAttribute;

  for (let index = 0; index < position.count; index += 1) {
    const x = position.getX(index);
    const y = position.getY(index);
    const nx = x / (width / 2);
    const ny = y / (height / 2);
    const horizontalBulge = Math.max(0, 1 - nx * nx);
    const verticalBulge = 0.72 + 0.28 * Math.cos(ny * Math.PI * 0.5);
    const waistTaper = 1 - Math.max(0, -ny) * 0.035;

    position.setX(index, x * waistTaper);
    position.setZ(index, horizontalBulge * verticalBulge * 0.18);
  }

  geometry.computeVertexNormals();

  return geometry;
};

const createShadowTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 180;

  const context = canvas.getContext("2d");

  if (!context) {
    return undefined;
  }

  const gradient = context.createRadialGradient(256, 88, 20, 256, 88, 230);
  gradient.addColorStop(0, "rgba(0,0,0,0.42)");
  gradient.addColorStop(0.48, "rgba(0,0,0,0.18)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
};

const getTextureAspect = (texture: THREE.Texture) => {
  const image = texture.image as { width?: number; height?: number } | undefined;

  if (!image?.width || !image.height) {
    return 0.82;
  }

  return image.width / image.height;
};

export function Tshirt360Viewer({ frames, label }: Tshirt360ViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const targetRotationRef = useRef(0);
  const draggingRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const pausedRef = useRef(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const textureSources = useMemo(() => {
    const frontFrame = findFrame(frames, "front") ?? frames[0];
    const backFrame = findFrame(frames, "back") ?? frames[frames.length - 1];
    const sideFrame = findFrame(frames, "side");

    return {
      back: backFrame?.src,
      front: frontFrame?.src,
      side: sideFrame?.src,
    };
  }, [frames]);

  const angleSteps = useMemo(() => {
    const steps = [0];

    if (textureSources.side) {
      steps.push(1);
    }

    if (textureSources.back) {
      steps.push(2);
    }

    return steps;
  }, [textureSources.back, textureSources.side]);

  const syncStepFromRotation = useCallback((rotation: number) => {
    const rawStep = Math.round(rotation / ROTATION_STEP);
    const normalized =
      angleSteps.length === 4
        ? ((rawStep % 4) + 4) % 4
        : clamp(rawStep, angleSteps[0], angleSteps[angleSteps.length - 1]);
    const nearestStep = angleSteps.reduce((nearest, step) =>
      Math.abs(step - normalized) < Math.abs(nearest - normalized)
        ? step
        : nearest,
    );

    setActiveStep((current) => (current === nearestStep ? current : nearestStep));
  }, [angleSteps]);

  const rotateBy = useCallback((step: number) => {
    const currentIndex = Math.max(0, angleSteps.indexOf(activeStep));
    const nextIndex =
      (currentIndex + step + angleSteps.length) % angleSteps.length;
    const nextStep = angleSteps[nextIndex];

    targetRotationRef.current = nextStep * ROTATION_STEP;
    setActiveStep(nextStep);
  }, [activeStep, angleSteps]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container || !textureSources.front || !textureSources.back) {
      return;
    }

    let frameId = 0;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.1, 7.3);

    const group = new THREE.Group();
    group.rotation.y = targetRotationRef.current;
    groupRef.current = group;
    scene.add(group);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x273453, 1.15));

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1);
    keyLight.position.set(2.4, 3.2, 4.2);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x49d8ff, 1.1);
    rimLight.position.set(-3.2, 1.8, -2.4);
    scene.add(rimLight);

    const loader = new THREE.TextureLoader();
    const loadedTextures: THREE.Texture[] = [];
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    let bodyVolumeMaterial: THREE.MeshPhysicalMaterial | undefined;
    let frontMockupMaterial: THREE.MeshBasicMaterial | undefined;
    let backMockupMaterial: THREE.MeshBasicMaterial | undefined;
    let sideMockupMaterial: THREE.MeshBasicMaterial | undefined;

    const loadTexture = async (src: string) => {
      const texture = await loader.loadAsync(src);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      loadedTextures.push(texture);
      return texture;
    };

    const buildModel = async () => {
      const [frontTexture, backTexture, sideTexture] = await Promise.all([
        loadTexture(textureSources.front),
        loadTexture(textureSources.back),
        textureSources.side ? loadTexture(textureSources.side) : undefined,
      ]) as [THREE.Texture, THREE.Texture, THREE.Texture | undefined];

      if (disposed) {
        return;
      }

      const textures: ModelTextures = {
        back: backTexture,
        front: frontTexture,
        side: sideTexture,
      };
      const frontWidth = MODEL_HEIGHT * getTextureAspect(textures.front);
      const backWidth = MODEL_HEIGHT * getTextureAspect(textures.back);
      const sideWidth = textures.side
        ? MODEL_HEIGHT * getTextureAspect(textures.side)
        : Math.max(frontWidth, backWidth) * 0.52;
      const silhouetteWidth = Math.max(frontWidth, backWidth) * 1.02;

      const bodyMaterial = new THREE.MeshPhysicalMaterial({
        clearcoat: 0.22,
        color: 0x101936,
        depthWrite: false,
        metalness: 0.04,
        opacity: textures.side ? 0.16 : 0.045,
        roughness: 0.72,
        transparent: true,
      });
      bodyVolumeMaterial = bodyMaterial;
      materials.push(bodyMaterial);

      const bodyGeometry = new THREE.BoxGeometry(
        silhouetteWidth * 0.42,
        MODEL_HEIGHT * 0.76,
        MODEL_DEPTH,
        8,
        12,
        4,
      );
      const sleeveGeometry = new THREE.BoxGeometry(
        silhouetteWidth * 0.18,
        MODEL_HEIGHT * 0.23,
        MODEL_DEPTH * 0.74,
        5,
        4,
        3,
      );
      geometries.push(bodyGeometry);
      geometries.push(sleeveGeometry);

      const bodyCore = new THREE.Mesh(bodyGeometry, bodyMaterial);
      bodyCore.position.y = -MODEL_HEIGHT * 0.08;
      bodyCore.renderOrder = -2;
      group.add(bodyCore);

      const leftSleeveCore = new THREE.Mesh(sleeveGeometry, bodyMaterial);
      leftSleeveCore.position.set(-silhouetteWidth * 0.32, MODEL_HEIGHT * 0.18, 0);
      leftSleeveCore.rotation.z = -0.18;
      leftSleeveCore.renderOrder = -2;
      group.add(leftSleeveCore);

      const rightSleeveCore = new THREE.Mesh(sleeveGeometry, bodyMaterial);
      rightSleeveCore.position.set(silhouetteWidth * 0.32, MODEL_HEIGHT * 0.18, 0);
      rightSleeveCore.rotation.z = 0.18;
      rightSleeveCore.renderOrder = -2;
      group.add(rightSleeveCore);

      if (textures.side) {
        const sideGeometry = createCurvedPanelGeometry(sideWidth, MODEL_HEIGHT);
        const sideMaterial = createTextureMaterial(textures.side);
        sideMaterial.depthTest = false;
        sideMaterial.depthWrite = false;
        sideMaterial.opacity = 0;
        sideMaterial.side = THREE.DoubleSide;
        geometries.push(sideGeometry);
        materials.push(sideMaterial);
        sideMockupMaterial = sideMaterial;

        const sideMesh = new THREE.Mesh(sideGeometry, sideMaterial);
        sideMesh.rotation.y = -Math.PI / 2;
        sideMesh.position.x = -MODEL_DEPTH * 0.08;
        sideMesh.renderOrder = 2;
        group.add(sideMesh);
      }

      const frontGeometry = createCurvedPanelGeometry(frontWidth, MODEL_HEIGHT);
      const frontMaterial = createTextureMaterial(textures.front);
      frontMockupMaterial = frontMaterial;
      geometries.push(frontGeometry);
      materials.push(frontMaterial);

      const frontMesh = new THREE.Mesh(frontGeometry, frontMaterial);
      frontMesh.position.z = MODEL_DEPTH * 0.5 + 0.016;
      group.add(frontMesh);

      const backGeometry = createCurvedPanelGeometry(backWidth, MODEL_HEIGHT);
      const backMaterial = createTextureMaterial(textures.back);
      backMockupMaterial = backMaterial;
      geometries.push(backGeometry);
      materials.push(backMaterial);

      const backMesh = new THREE.Mesh(backGeometry, backMaterial);
      backMesh.position.z = -MODEL_DEPTH * 0.5 - 0.016;
      backMesh.rotation.y = Math.PI;
      group.add(backMesh);

      const shadowTexture = createShadowTexture();

      if (shadowTexture) {
        loadedTextures.push(shadowTexture);
        const shadowGeometry = new THREE.PlaneGeometry(silhouetteWidth * 0.86, 0.88);
        const shadowMaterial = new THREE.MeshBasicMaterial({
          depthWrite: false,
          map: shadowTexture,
          transparent: true,
        });
        geometries.push(shadowGeometry);
        materials.push(shadowMaterial);

        const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
        shadow.position.set(0, -MODEL_HEIGHT * 0.54, 0);
        shadow.rotation.x = -Math.PI / 2;
        shadow.renderOrder = -1;
        group.add(shadow);
      }

      const necklineGeometry = new THREE.TorusGeometry(0.35, 0.018, 12, 72, Math.PI);
      const necklineMaterial = new THREE.MeshBasicMaterial({
        color: 0x080d1e,
        transparent: true,
        opacity: 0.72,
      });
      geometries.push(necklineGeometry);
      materials.push(necklineMaterial);

      const neckline = new THREE.Mesh(necklineGeometry, necklineMaterial);
      neckline.position.set(0, MODEL_HEIGHT * 0.46, MODEL_DEPTH * 0.52);
      neckline.rotation.set(0, 0, Math.PI);
      neckline.scale.set(1.35, 0.5, 1);
      group.add(neckline);

      group.position.y = -0.04;
      setIsReady(true);
    };

    const resize = () => {
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let previousTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min(0.05, (time - previousTime) / 1000);
      previousTime = time;

      if (!disposed) {
        if (
          angleSteps.length === 4 &&
          !prefersReducedMotion &&
          !pausedRef.current &&
          !draggingRef.current
        ) {
          targetRotationRef.current += delta * 0.18;
          syncStepFromRotation(targetRotationRef.current);
        }

        group.rotation.y += (targetRotationRef.current - group.rotation.y) * 0.1;
        group.rotation.x = Math.sin(time * 0.00065) * 0.025;

        const sideBlend = Math.max(
          0,
          Math.min(1, (Math.abs(Math.sin(group.rotation.y)) - 0.46) / 0.34),
        );

        if (sideMockupMaterial) {
          sideMockupMaterial.opacity = sideBlend;
          if (frontMockupMaterial) {
            frontMockupMaterial.opacity = 1 - sideBlend * 0.97;
          }
          if (backMockupMaterial) {
            backMockupMaterial.opacity = 1 - sideBlend * 0.97;
          }
        }

        if (bodyVolumeMaterial) {
          bodyVolumeMaterial.opacity = sideMockupMaterial
            ? 0.025 + (1 - sideBlend) * 0.11
            : 0.045;
        }

        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      }
    };

    void buildModel();
    frameId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      groupRef.current = null;
      setIsReady(false);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      loadedTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, [angleSteps.length, syncStepFromRotation, textureSources.back, textureSources.front, textureSources.side]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    draggingRef.current = true;
    pausedRef.current = true;
    lastPointerXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) {
      return;
    }

    event.preventDefault();
    const deltaX = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;
    targetRotationRef.current += deltaX * 0.012;

    if (angleSteps.length < 4) {
      targetRotationRef.current = clamp(
        targetRotationRef.current,
        angleSteps[0] * ROTATION_STEP,
        angleSteps[angleSteps.length - 1] * ROTATION_STEP,
      );
    }

    syncStepFromRotation(targetRotationRef.current);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      pausedRef.current = true;
      rotateBy(-1);
      event.preventDefault();
    }

    if (event.key === "ArrowRight") {
      pausedRef.current = true;
      rotateBy(1);
      event.preventDefault();
    }
  };

  return (
    <div
      aria-label={`${label} interactive 3D T-shirt mockup`}
      className="group relative h-[430px] w-full cursor-grab select-none touch-pan-y outline-none active:cursor-grabbing sm:h-[500px] lg:h-[560px]"
      data-merch-viewer={label}
      data-viewer-ready={isReady}
      onBlur={() => {
        pausedRef.current = false;
      }}
      onFocus={() => {
        pausedRef.current = true;
      }}
      onKeyDown={handleKeyDown}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerEnter={() => {
        pausedRef.current = true;
      }}
      onPointerLeave={() => {
        draggingRef.current = false;
        pausedRef.current = false;
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={containerRef}
      role="img"
      tabIndex={0}
    >
      <canvas
        aria-hidden="true"
        className="h-full w-full"
        data-merch-canvas={label}
        ref={canvasRef}
      />

      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition duration-500 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="h-24 w-24 animate-pulse rounded-full border border-white/10 bg-white/[0.035]" />
      </div>

      <button
        type="button"
        aria-label={`Rotate ${label} left`}
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/12 bg-black/42 text-white opacity-0 backdrop-blur transition hover:border-white/30 hover:bg-black/64 group-hover:opacity-100 group-focus-within:opacity-100"
        onClick={() => {
          pausedRef.current = true;
          rotateBy(-1);
        }}
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        aria-label={`Rotate ${label} right`}
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md border border-white/12 bg-black/42 text-white opacity-0 backdrop-blur transition hover:border-white/30 hover:bg-black/64 group-hover:opacity-100 group-focus-within:opacity-100"
        onClick={() => {
          pausedRef.current = true;
          rotateBy(1);
        }}
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {angleSteps.map((step, index) => (
          <button
            key={step}
            type="button"
            aria-label={`Show ${label} 3D angle ${index + 1}`}
            className={`h-2.5 rounded-full transition ${
              step === activeStep
                ? "w-8 bg-[#F8C312]"
                : "w-2.5 bg-white/28 hover:bg-white/55"
            }`}
            onClick={() => {
              pausedRef.current = true;
              targetRotationRef.current = step * ROTATION_STEP;
              setActiveStep(step);
            }}
          />
        ))}
      </div>
    </div>
  );
}

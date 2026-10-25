"use client";

import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
  type OGLRenderingContext,
} from "ogl";
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";

/* --------------------------------
* Types
----------------------------------- */
export interface GalleryItem {
  image: string;
  text?: string;
}

export interface CircularGalleryRef {
  next: () => void;
  prev: () => void;
}

export interface CircularGalleryProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * An array of image objects for the gallery.
   */
  items?: GalleryItem[];
  /**
   * The amount of curvature.
   * @default 1.8
   */
  bend?: number;
  /**
   * Border radius for the images, as a percentage (0.0 to 0.5).
   * @default 0.06
   */
  borderRadius?: number;
  /**
   * Scroll interaction speed multiplier.
   * @default 2.2
   */
  scrollSpeed?: number;
  /**
   * Easing factor for scroll animation (lower is smoother).
   * @default 0.045
   */
  scrollEase?: number;
  /**
   * Enables continuous subtle auto-play.
   * @default true
   */
  autoplay?: boolean;
  /**
   * Subtle auto-play speed in units per frame.
   * @default 0.05
   */
  autoplaySpeed?: number;
  /**
   * Pause auto-play when user is hovering on desktop.
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Callback fired when a card is tapped/clicked.
   */
  onItemClick?: (item: GalleryItem, index: number) => void;
}

/* --------------------------------
* Helper Utilities
----------------------------------- */
function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: object) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof (instance as any)[key] === "function") {
      (instance as any)[key] = (instance as any)[key].bind(instance);
    }
  });
}

/* --------------------------------
* OGL Media Card Class (Pure Image, No Labels)
----------------------------------- */
class Media {
  gl: OGLRenderingContext;
  geometry: Plane;
  image: string;
  index: number;
  length: number;
  renderer: Renderer;
  scene: Transform;
  screen: { width: number; height: number };
  viewport: { width: number; height: number };
  bend: number;
  borderRadius: number;
  program!: Program;
  plane!: Mesh;
  extra: number = 0;
  widthTotal: number = 0;
  width: number = 0;
  x: number = 0;
  scale: number = 1;
  padding: number = 2;
  speed: number = 0;
  isBefore: boolean = false;
  isAfter: boolean = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    viewport,
    bend,
    borderRadius = 0.06,
  }: {
    geometry: Plane;
    gl: OGLRenderingContext;
    image: string;
    index: number;
    length: number;
    renderer: Renderer;
    scene: Transform;
    screen: { width: number; height: number };
    viewport: { width: number; height: number };
    bend: number;
    borderRadius?: number;
  }) {
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true,
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          // Organic 3D wave flutter that gives subtle depth and life
          p.z = (sin(p.x * 3.5 + uTime) * 1.1 + cos(p.y * 2.2 + uTime) * 1.1) * (0.05 + min(abs(uSpeed) * 0.22, 0.22));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          // Object-fit: cover aspect ratio calculation
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          
          // Antialiased rounded corners via signed distance field
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.0025;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [1, 1] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius },
      },
      transparent: true,
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [
        img.naturalWidth || 1,
        img.naturalHeight || 1,
      ];
    };
    img.onerror = () => {
      // Warm fallback canvas prevents black rectangle
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 500;
      const ctx = canvas.getContext("2d")!;
      const grad = ctx.createLinearGradient(0, 0, 400, 500);
      grad.addColorStop(0, "#2D3830");
      grad.addColorStop(1, "#18231C");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 400, 500);
      texture.image = canvas;
      this.program.uniforms.uImageSizes.value = [400, 500];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.plane.setParent(this.scene);
  }

  update(
    scroll: { current: number; last: number },
    direction: "left" | "right",
  ) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    const isMobile = this.screen.width < 768;
    const effectiveBend = isMobile ? Math.min(this.bend, 1.2) : this.bend;

    // Centered vertical baseline: cards float harmoniously in canvas center
    const verticalOffset = 0;

    if (effectiveBend === 0) {
      this.plane.position.y = verticalOffset;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(effectiveBend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(Math.max(0.0001, R * R - effectiveX * effectiveX));

      if (effectiveBend > 0) {
        this.plane.position.y = -arc + verticalOffset;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(1.0, effectiveX / R));
      } else {
        this.plane.position.y = arc + verticalOffset;
        this.plane.rotation.z = Math.sign(x) * Math.asin(Math.min(1.0, effectiveX / R));
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.035;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize(
    {
      screen,
      viewport,
    }: {
      screen?: { width: number; height: number };
      viewport?: { width: number; height: number };
    } = {},
  ) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if ((this.plane.program.uniforms as any).uViewportSizes) {
        (
          this.plane.program.uniforms as any
        ).uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }

    const isMobile = this.screen.width < 768;
    
    // Sizing: Larger, more impactful cards on mobile with room to breathe
    if (isMobile) {
      // 48% of viewport width ensures cards feel majestic & crowned
      this.plane.scale.x = this.viewport.width * 0.48;
      this.plane.scale.y = this.plane.scale.x * 1.30;
      this.padding = this.viewport.width * 0.065;
    } else {
      // 25% on desktop
      this.plane.scale.x = this.viewport.width * 0.25;
      this.plane.scale.y = this.plane.scale.x * 1.32;
      this.padding = this.viewport.width * 0.035;
    }

    this.program.uniforms.uPlaneSizes.value = [
      this.plane.scale.x,
      this.plane.scale.y,
    ];

    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

/* --------------------------------
* OGL Application Controller
----------------------------------- */
class App {
  container: HTMLElement;
  scrollSpeed: number;
  scroll: { ease: number; current: number; target: number; last: number; position?: number };
  onCheckDebounce: () => void;
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  planeGeometry!: Plane;
  mediasImages!: GalleryItem[];
  medias!: Media[];
  isDown: boolean = false;
  isHovered: boolean = false;
  start: number = 0;
  startY: number = 0;
  lastTouchX: number = 0;
  touchVelocity: number = 0;
  touchStartTime: number = 0;
  touchTotalDistance: number = 0;
  isDraggingHorizontal: boolean = false;
  hasDeterminedSwipeAxis: boolean = false;
  screen!: { width: number; height: number };
  viewport!: { width: number; height: number };
  raf!: number;
  autoplay: boolean;
  autoplaySpeed: number;
  pauseOnHover: boolean;
  userInteracting: boolean = false;
  resumeAutoplayTimeout: ReturnType<typeof setTimeout> | null = null;
  onItemClick?: (item: GalleryItem, index: number) => void;

  boundOnResize: () => void;
  boundOnWheel: (e: WheelEvent) => void;
  boundOnTouchDown: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchMove: (e: MouseEvent | TouchEvent) => void;
  boundOnTouchUp: (e: MouseEvent | TouchEvent) => void;
  boundOnMouseEnter: () => void;
  boundOnMouseLeave: () => void;

  constructor(
    container: HTMLElement,
    {
      items,
      bend,
      borderRadius,
      scrollSpeed,
      scrollEase,
      autoplay = true,
      autoplaySpeed = 0.05,
      pauseOnHover = true,
      onItemClick,
    }: {
      items?: GalleryItem[];
      bend: number;
      borderRadius: number;
      scrollSpeed: number;
      scrollEase: number;
      autoplay?: boolean;
      autoplaySpeed?: number;
      pauseOnHover?: boolean;
      onItemClick?: (item: GalleryItem, index: number) => void;
    },
  ) {
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.autoplay = autoplay;
    this.autoplaySpeed = autoplaySpeed;
    this.pauseOnHover = pauseOnHover;
    this.onItemClick = onItemClick;
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 250);

    autoBind(this);

    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      powerPreference: "high-performance",
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    const isMobile = (this.container.clientWidth || window.innerWidth) < 768;
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: isMobile ? 24 : 45,
      widthSegments: isMobile ? 40 : 80,
    });
  }

  createMedias(
    items: GalleryItem[] | undefined,
    bend: number,
    borderRadius: number,
  ) {
    const galleryItems = items && items.length > 0 ? items : [];
    // Duplicate for seamless infinite wrap
    this.mediasImages = [...galleryItems, ...galleryItems];
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius,
      });
    });
  }

  next() {
    if (!this.medias || !this.medias[0]) return;
    this.userInteracting = true;
    this.scroll.target += this.medias[0].width;
    if (this.resumeAutoplayTimeout) clearTimeout(this.resumeAutoplayTimeout);
    this.resumeAutoplayTimeout = setTimeout(() => {
      this.userInteracting = false;
    }, 1400);
  }

  prev() {
    if (!this.medias || !this.medias[0]) return;
    this.userInteracting = true;
    this.scroll.target -= this.medias[0].width;
    if (this.resumeAutoplayTimeout) clearTimeout(this.resumeAutoplayTimeout);
    this.resumeAutoplayTimeout = setTimeout(() => {
      this.userInteracting = false;
    }, 1400);
  }

  handleTap(screenX: number, screenY: number) {
    if (!this.medias || this.medias.length === 0 || !this.onItemClick) return;

    const rect = this.container.getBoundingClientRect();
    const relX = screenX - rect.left;
    const relY = screenY - rect.top;

    // Convert to camera viewport coordinate space
    const normX = (relX / this.screen.width) * 2 - 1;
    const normY = -(relY / this.screen.height) * 2 + 1;
    const vpX = (normX * this.viewport.width) / 2;
    const vpY = (normY * this.viewport.height) / 2;

    let closestMedia: Media | null = null;
    let minDistance = Infinity;

    for (const media of this.medias) {
      const dx = Math.abs(media.plane.position.x - vpX);
      const dy = Math.abs(media.plane.position.y - vpY);
      const halfW = media.plane.scale.x / 2;
      const halfH = media.plane.scale.y / 2;

      // Check if tap fell inside or near the card bounds
      if (dx <= halfW * 1.05 && dy <= halfH * 1.1) {
        if (dx < minDistance) {
          minDistance = dx;
          closestMedia = media;
        }
      }
    }

    if (closestMedia) {
      const originalCount = this.mediasImages.length / 2;
      const originalIndex = closestMedia.index % originalCount;
      const item = this.mediasImages[closestMedia.index];
      this.onItemClick(item, originalIndex);
    }
  }

  onTouchDown(e: MouseEvent | TouchEvent) {
    this.isDown = true;
    this.userInteracting = true;
    this.touchVelocity = 0;
    this.touchStartTime = Date.now();
    this.touchTotalDistance = 0;

    if (this.resumeAutoplayTimeout) {
      clearTimeout(this.resumeAutoplayTimeout);
      this.resumeAutoplayTimeout = null;
    }
    this.scroll.position = this.scroll.current;
    
    if ("touches" in e) {
      this.start = e.touches[0].clientX;
      this.lastTouchX = e.touches[0].clientX;
      this.startY = e.touches[0].clientY;
      this.hasDeterminedSwipeAxis = false;
      this.isDraggingHorizontal = false;
    } else {
      this.start = e.clientX;
      this.lastTouchX = e.clientX;
      this.startY = e.clientY;
      this.isDraggingHorizontal = true;
      this.hasDeterminedSwipeAxis = true;
    }
  }

  onTouchMove(e: MouseEvent | TouchEvent) {
    if (!this.isDown) return;

    if ("touches" in e) {
      const clientX = e.touches[0].clientX;
      const clientY = e.touches[0].clientY;
      const deltaX = clientX - this.start;
      const deltaY = clientY - this.startY;

      this.touchTotalDistance = Math.hypot(deltaX, deltaY);

      // Smart mobile gesture lock: preserve native vertical page scroll
      if (!this.hasDeterminedSwipeAxis) {
        if (Math.abs(deltaY) > 6 && Math.abs(deltaY) > Math.abs(deltaX)) {
          // User is scrolling the page vertically
          this.isDown = false;
          this.userInteracting = false;
          return;
        } else if (Math.abs(deltaX) > 6) {
          this.isDraggingHorizontal = true;
          this.hasDeterminedSwipeAxis = true;
        }
      }

      if (!this.isDraggingHorizontal) return;

      this.touchVelocity = clientX - this.lastTouchX;
      this.lastTouchX = clientX;

      const distance = (this.start - clientX) * (this.scrollSpeed * 0.024);
      this.scroll.target = (this.scroll.position || this.scroll.current) + distance;
    } else {
      const clientX = e.clientX;
      const clientY = e.clientY;
      this.touchTotalDistance = Math.hypot(clientX - this.start, clientY - this.startY);

      this.touchVelocity = clientX - this.lastTouchX;
      this.lastTouchX = clientX;
      const distance = (this.start - clientX) * (this.scrollSpeed * 0.024);
      this.scroll.target = (this.scroll.position || this.scroll.current) + distance;
    }
  }

  onTouchUp(e: MouseEvent | TouchEvent) {
    const wasDown = this.isDown;
    this.isDown = false;
    this.isDraggingHorizontal = false;
    this.hasDeterminedSwipeAxis = false;

    const timeDiff = Date.now() - this.touchStartTime;

    // Detect clean tap/click to open photo
    if (wasDown && timeDiff < 350 && this.touchTotalDistance < 8) {
      const clientX = "changedTouches" in e && e.changedTouches[0] ? e.changedTouches[0].clientX : this.start;
      const clientY = "changedTouches" in e && e.changedTouches[0] ? e.changedTouches[0].clientY : this.startY;
      this.handleTap(clientX, clientY);
      return;
    }

    // Apply swipe momentum for natural finger flick
    if (Math.abs(this.touchVelocity) > 2) {
      this.scroll.target -= this.touchVelocity * 0.45;
    }

    // Smooth resume of subtle autoplay after touch interaction
    if (this.autoplay) {
      this.resumeAutoplayTimeout = setTimeout(() => {
        this.userInteracting = false;
      }, 1200);
    } else {
      this.userInteracting = false;
      this.onCheck();
    }
  }

  onMouseEnter() {
    if (this.pauseOnHover) {
      this.isHovered = true;
    }
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  onWheel(e: WheelEvent) {
    const delta = e.deltaY || (e as any).wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.userInteracting = true;
    
    if (this.resumeAutoplayTimeout) clearTimeout(this.resumeAutoplayTimeout);
    this.resumeAutoplayTimeout = setTimeout(() => {
      this.userInteracting = false;
    }, 1000);
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth || window.innerWidth,
      height: this.container.clientHeight || 420,
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height,
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };

    if (this.medias) {
      this.medias.forEach((media) =>
        media.onResize({ screen: this.screen, viewport: this.viewport }),
      );
    }
  }

  update() {
    // Ultra-slow continuous autoplay drift when not actively touched/dragged
    if (this.autoplay && !this.isDown && !this.userInteracting && !this.isHovered) {
      this.scroll.target += this.autoplaySpeed;
    }

    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease,
    );
    const direction = this.scroll.current >= this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  }

  addEventListeners() {
    this.boundOnResize = this.onResize;
    this.boundOnWheel = this.onWheel;
    this.boundOnTouchDown = this.onTouchDown;
    this.boundOnTouchMove = this.onTouchMove;
    this.boundOnTouchUp = this.onTouchUp;
    this.boundOnMouseEnter = this.onMouseEnter;
    this.boundOnMouseLeave = this.onMouseLeave;

    window.addEventListener("resize", this.boundOnResize);
    this.container.addEventListener("wheel", this.boundOnWheel, { passive: true });
    this.container.addEventListener("mousedown", this.boundOnTouchDown);
    window.addEventListener("mousemove", this.boundOnTouchMove);
    window.addEventListener("mouseup", this.boundOnTouchUp);
    this.container.addEventListener("touchstart", this.boundOnTouchDown, { passive: true });
    window.addEventListener("touchmove", this.boundOnTouchMove, { passive: true });
    window.addEventListener("touchend", this.boundOnTouchUp);
    this.container.addEventListener("mouseenter", this.boundOnMouseEnter);
    this.container.addEventListener("mouseleave", this.boundOnMouseLeave);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    if (this.resumeAutoplayTimeout) clearTimeout(this.resumeAutoplayTimeout);
    window.removeEventListener("resize", this.boundOnResize);
    this.container.removeEventListener("wheel", this.boundOnWheel);
    this.container.removeEventListener("mousedown", this.boundOnTouchDown);
    window.removeEventListener("mousemove", this.boundOnTouchMove);
    window.removeEventListener("mouseup", this.boundOnTouchUp);
    this.container.removeEventListener("touchstart", this.boundOnTouchDown);
    window.removeEventListener("touchmove", this.boundOnTouchMove);
    window.removeEventListener("touchend", this.boundOnTouchUp);
    this.container.removeEventListener("mouseenter", this.boundOnMouseEnter);
    this.container.removeEventListener("mouseleave", this.boundOnMouseLeave);

    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

/* --------------------------------
* React Component
----------------------------------- */
const CircularGallery = forwardRef<CircularGalleryRef, CircularGalleryProps>(
  (
    {
      items,
      bend = 1.8,
      borderRadius = 0.06,
      scrollSpeed = 2.2,
      scrollEase = 0.045,
      autoplay = true,
      autoplaySpeed = 0.05,
      pauseOnHover = true,
      onItemClick,
      className,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const appRef = useRef<App | null>(null);

    useImperativeHandle(ref, () => ({
      next: () => {
        appRef.current?.next();
      },
      prev: () => {
        appRef.current?.prev();
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      const app = new App(containerRef.current, {
        items,
        bend,
        borderRadius,
        scrollSpeed,
        scrollEase,
        autoplay,
        autoplaySpeed,
        pauseOnHover,
        onItemClick,
      });

      appRef.current = app;

      return () => {
        app.destroy();
        appRef.current = null;
      };
    }, [
      items,
      bend,
      borderRadius,
      scrollSpeed,
      scrollEase,
      autoplay,
      autoplaySpeed,
      pauseOnHover,
      onItemClick,
    ]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none",
          "touch-pan-y",
          className,
        )}
        {...props}
      />
    );
  },
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };

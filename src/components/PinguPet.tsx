"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const PINGU_ANIMATIONS = {
  idle: { row: 0, frames: 6, frameDelay: 180 },
  walkRight: { row: 1, frames: 8, frameDelay: 100 },
  walkLeft: { row: 2, frames: 8, frameDelay: 100 },
  wave: { row: 3, frames: 4, frameDelay: 140 },
  happy: { row: 4, frames: 5, frameDelay: 110 },
  cry: { row: 5, frames: 8, frameDelay: 160 },
  clap: { row: 6, frames: 6, frameDelay: 130 },
  think: { row: 7, frames: 6, frameDelay: 180 },
  scratch: { row: 8, frames: 6, frameDelay: 150 },
} as const;

type PinguAction = keyof typeof PINGU_ANIMATIONS;
type PetState = "walk" | "idle" | "wave" | "react" | "cry" | "rest";
type BehaviorNode = "root" | "wander" | "rest" | "react" | "cry";

interface Direction {
  vx: number;
  vy: number;
  facing: "right" | "left";
}

const DIRECTIONS: Direction[] = [
  { vx: 1.5, vy: 0, facing: "right" },
  { vx: 1.2, vy: -0.8, facing: "right" },
  { vx: 1.2, vy: 0.8, facing: "right" },
  { vx: -1.5, vy: 0, facing: "left" },
  { vx: -1.2, vy: -0.8, facing: "left" },
  { vx: -1.2, vy: 0.8, facing: "left" },
];
const SPRITE_FRAME_WIDTH = 80;
const SPRITE_FRAME_HEIGHT = 96;
const SPRITE_COLUMNS = 8;
let destroyPinguFn: (() => void) | null = null;

export function destroy() {
  destroyPinguFn?.();
}

interface PinguPetProps {
  onDestroyed?: () => void;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function PinguPet({ onDestroyed }: PinguPetProps) {
  const [action, setAction] = useState<PinguAction>("idle");
  const [positionX, setPositionX] = useState(24);
  const [positionY, setPositionY] = useState(24);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [facing, setFacing] = useState<"right" | "left">("right");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const petNodeRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const stateTimerRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const specialTimerRef = useRef<number | null>(null);
  const movementLastFrameTimeRef = useRef(0);
  const animationLastFrameTimeRef = useRef(0);
  const destroyed = useRef(false);
  const positionXRef = useRef(24);
  const positionYRef = useRef(24);
  const directionRef = useRef<Direction>(DIRECTIONS[0]);
  const stateRef = useRef<PetState>("walk");
  const interactionRef = useRef(false);
  const viewportWidthRef = useRef(0);
  const viewportHeightRef = useRef(0);
  const introTimerRef = useRef<number | null>(null);

  const stopMovement = useCallback(() => {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    movementLastFrameTimeRef.current = 0;
  }, []);

  const clearAllTimers = useCallback(() => {
    destroyed.current = true;

    if (stateTimerRef.current !== null) {
      clearTimeout(stateTimerRef.current);
      stateTimerRef.current = null;
    }
    if (inactivityTimerRef.current !== null) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    if (specialTimerRef.current !== null) {
      clearTimeout(specialTimerRef.current);
      specialTimerRef.current = null;
    }
    if (introTimerRef.current !== null) {
      clearTimeout(introTimerRef.current);
      introTimerRef.current = null;
    }

    stopMovement();
  }, [stopMovement]);

  const destroySelf = useCallback(() => {
    clearAllTimers();
    onDestroyed?.();
  }, [clearAllTimers, onDestroyed]);

  useEffect(() => {
    destroyPinguFn = destroySelf;
    return () => {
      if (destroyPinguFn === destroySelf) {
        destroyPinguFn = null;
      }
    };
  }, [destroySelf]);

  const syncPetPosition = useCallback((x: number, y: number) => {
    const safeX = clamp(x, 24, Math.max(24, window.innerWidth - 80));
    const safeY = clamp(y, 24, Math.max(24, Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight) - 120));

    positionXRef.current = safeX;
    positionYRef.current = safeY;
    setPositionX(safeX);
    setPositionY(safeY);

    if (petNodeRef.current) {
      petNodeRef.current.style.left = `${safeX}px`;
      petNodeRef.current.style.top = `${safeY}px`;
    }
  }, []);

  const transitionToState = useCallback(
    (nextState: PetState, nextAction: PinguAction, options: { bubbleVisible?: boolean } = {}) => {
      if (destroyed.current) {
        return;
      }

      stopMovement();

      if (stateTimerRef.current !== null) {
        clearTimeout(stateTimerRef.current);
        stateTimerRef.current = null;
      }

      stateRef.current = nextState;
      setAction(nextAction);
      setBubbleVisible(options.bubbleVisible ?? false);
      setFrameIndex(0);
      animationLastFrameTimeRef.current = 0;
    },
    [stopMovement]
  );

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current !== null) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      if (destroyed.current || interactionRef.current) {
        return;
      }
      transitionToState("cry", "cry", { bubbleVisible: true });
    }, 30000);
  }, [transitionToState]);

  const triggerJump = useCallback(() => {
    if (!petNodeRef.current || destroyed.current) {
      return;
    }

    petNodeRef.current.animate(
      [
        { transform: "translateY(0px) scale(1)" },
        { transform: "translateY(-16px) scale(1.04)" },
        { transform: "translateY(0px) scale(1)" },
      ],
      {
        duration: 320,
        easing: "ease-out",
      }
    );
  }, []);

  const startMovement = useCallback(() => {
    stopMovement();

    const move = (timestamp: number) => {
      if (!movementLastFrameTimeRef.current) {
        movementLastFrameTimeRef.current = timestamp;
      }

      const delta = timestamp - movementLastFrameTimeRef.current;
      movementLastFrameTimeRef.current = timestamp;
      const step = Math.max(1, delta / 16.67) * 0.95;
      const direction = directionRef.current;

      let nextX = positionXRef.current + direction.vx * step;
      let nextY = positionYRef.current + direction.vy * step;
      const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
      const minX = 0;
      const maxX = Math.max(0, window.innerWidth - 80);
      const minY = 0;
      const maxY = Math.max(0, pageHeight - 120);

      let bounced = false;

      if (nextX < minX) {
        nextX = minX;
        directionRef.current = { ...direction, vx: Math.abs(direction.vx), facing: "right" };
        bounced = true;
      } else if (nextX > maxX) {
        nextX = maxX;
        directionRef.current = { ...direction, vx: -Math.abs(direction.vx), facing: "left" };
        bounced = true;
      }

      if (nextY < minY) {
        nextY = minY;
        directionRef.current = { ...directionRef.current, vy: Math.abs(directionRef.current.vy) };
        bounced = true;
      } else if (nextY > maxY) {
        nextY = maxY;
        directionRef.current = { ...directionRef.current, vy: -Math.abs(directionRef.current.vy) };
        bounced = true;
      }

      syncPetPosition(nextX, nextY);
      const nextFacing = directionRef.current.facing;
      setFacing(nextFacing);
      if (bounced || action !== (nextFacing === "right" ? "walkRight" : "walkLeft")) {
        setAction(nextFacing === "right" ? "walkRight" : "walkLeft");
      }

      if (destroyed.current || stateRef.current !== "walk" || interactionRef.current) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(move);
    };

    animationFrameRef.current = window.requestAnimationFrame(move);
  }, [action, stopMovement, syncPetPosition]);

  function enterRestState() {
    if (destroyed.current || interactionRef.current) {
      return;
    }

    const restAnimations: PinguAction[] = ["idle", "wave", "clap", "think", "scratch"];
    const next = restAnimations[Math.floor(Math.random() * restAnimations.length)];
    transitionToState("rest", next);

    const delay = 1400 + Math.round(Math.random() * 1000);
    stateTimerRef.current = window.setTimeout(() => {
      if (destroyed.current || interactionRef.current || stateRef.current === "cry") {
        return;
      }
      runBehaviorTree("root");
    }, delay);
  }

  function enterWanderState() {
    if (destroyed.current || interactionRef.current) {
      return;
    }

    const nextDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
    directionRef.current = nextDirection;
    setFacing(nextDirection.facing);
    const nextAction: PinguAction = nextDirection.facing === "right" ? "walkRight" : "walkLeft";
    transitionToState("walk", nextAction);

    const walkDuration = 900;
    stateTimerRef.current = window.setTimeout(() => {
      if (destroyed.current || interactionRef.current || stateRef.current === "cry") {
        return;
      }
      runBehaviorTree(Math.random() < 0.55 ? "rest" : "root");
    }, walkDuration);

    startMovement();
  }

  function enterReactState() {
    if (destroyed.current) {
      return;
    }

    interactionRef.current = true;
    transitionToState("react", "happy", { bubbleVisible: false });
    triggerJump();

    specialTimerRef.current = window.setTimeout(() => {
      if (destroyed.current) {
        return;
      }

      interactionRef.current = false;
      resetInactivityTimer();
      window.setTimeout(() => {
        if (destroyed.current || interactionRef.current) {
          return;
        }
        runBehaviorTree("root");
      }, 2000);
    }, 900);
  }

  function enterCryState() {
    if (destroyed.current || interactionRef.current) {
      return;
    }

    transitionToState("cry", "cry", { bubbleVisible: true });
  }

  function runBehaviorTree(node: BehaviorNode = "root") {
    if (destroyed.current || interactionRef.current) {
      return;
    }

    switch (node) {
      case "root": {
        runBehaviorTree(Math.random() < 0.7 ? "wander" : "rest");
        break;
      }
      case "wander":
        enterWanderState();
        break;
      case "rest":
        enterRestState();
        break;
      case "react":
        enterReactState();
        break;
      case "cry":
        enterCryState();
        break;
      default:
        break;
    }
  }

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const handlePinguClick = useCallback(() => {
    if (destroyed.current) {
      return;
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // ignore autoplay restrictions
      });
    }

    if (stateTimerRef.current !== null) {
      clearTimeout(stateTimerRef.current);
      stateTimerRef.current = null;
    }
    if (specialTimerRef.current !== null) {
      clearTimeout(specialTimerRef.current);
      specialTimerRef.current = null;
    }

    enterReactState();
  }, [enterReactState]);

  useEffect(() => {
    if (petNodeRef.current) {
      petNodeRef.current.style.left = `${positionX}px`;
      petNodeRef.current.style.top = `${positionY}px`;
    }
  }, [positionX, positionY]);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      viewportWidthRef.current = width;
      viewportHeightRef.current = height;
      setViewportWidth(width);
      setViewportHeight(height);

      const pageHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, height);
      const initialX = 50;
      const initialY = Math.max(24, pageHeight - 180);
      syncPetPosition(initialX, initialY);
      setFacing("right");
    };

    updateViewport();
    const handleResize = () => {
      updateViewport();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [syncPetPosition]);

  useEffect(() => {
    if (viewportWidth === 0 || viewportHeight === 0) {
      return undefined;
    }

    destroyed.current = false;
    interactionRef.current = false;
    resetInactivityTimer();
    transitionToState("rest", "wave");

    introTimerRef.current = window.setTimeout(() => {
      if (destroyed.current || interactionRef.current) {
        return;
      }
      runBehaviorTree("root");
    }, 2000);

    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers, viewportHeight, viewportWidth]);

  useEffect(() => {
    if (action === "cry") {
      setBubbleVisible(true);
      return undefined;
    }

    setBubbleVisible(false);
    return undefined;
  }, [action]);

  const activeAnimation = PINGU_ANIMATIONS[action];
  const currentRow = activeAnimation.row;
  const frameX = frameIndex % activeAnimation.frames;
  const petStyle = {
    backgroundPosition: `${-frameX * SPRITE_FRAME_WIDTH}px ${-currentRow * SPRITE_FRAME_HEIGHT}px`,
  } as const;

  useEffect(() => {
    if (destroyed.current) {
      return undefined;
    }

    setFrameIndex(0);
    animationLastFrameTimeRef.current = 0;

    let frameLoopId = 0;
    const tick = (now: number) => {
      if (!animationLastFrameTimeRef.current) {
        animationLastFrameTimeRef.current = now;
      }

      if (now - animationLastFrameTimeRef.current >= activeAnimation.frameDelay) {
        setFrameIndex((current) => (current + 1) % activeAnimation.frames);
        animationLastFrameTimeRef.current = now;
      }

      frameLoopId = window.requestAnimationFrame(tick);
    };

    frameLoopId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameLoopId);
    };
  }, [action, activeAnimation.frameDelay, activeAnimation.frames]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePinguClick();
    }
  };

  return (
    <div
      className="pingu-root"
      aria-label="Pingu 寵物"
      role="button"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onClick={handlePinguClick}
      onKeyDown={handleKeyDown}
    >
      <div ref={petNodeRef} className="pingu-entity" style={{ left: positionX, top: positionY }}>
        <div className={bubbleVisible ? "pingu-bubble" : "pingu-bubble hidden"}>按我</div>
        <div className="pingu-frame-wrapper" style={{ transform: facing === "left" ? "scaleX(-1)" : "scaleX(1)" }}>
          <div className="pet-element" style={petStyle} />
        </div>
        <div className="pingu-shadow" />
      </div>
      <audio ref={audioRef} src="/music/nootnoot.mp3" preload="auto" />
    </div>
  );
}

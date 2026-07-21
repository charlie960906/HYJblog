"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type PinguAction = "idle" | "walk" | "wave" | "happy" | "cry";
type PetState = "walk" | "idle" | "wave" | "react" | "cry";

interface Direction {
  vx: number;
  vy: number;
  facing: "right" | "left";
}

const ACTION_ROWS: Record<PinguAction, number> = {
  idle: 0,
  walk: 1,
  wave: 3,
  happy: 4,
  cry: 5,
};

const CRY_ROWS = [5, 6];
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
  const [cryRowIndex, setCryRowIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [facing, setFacing] = useState<"right" | "left">("right");

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const stateTimerRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);
  const specialTimerRef = useRef<number | null>(null);
  const cryToggleTimer = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(0);
  const destroyed = useRef(false);
  const positionXRef = useRef(24);
  const positionYRef = useRef(24);
  const directionRef = useRef<Direction>(DIRECTIONS[0]);
  const stateRef = useRef<PetState>("walk");
  const interactionRef = useRef(false);
  const viewportWidthRef = useRef(0);
  const viewportHeightRef = useRef(0);

  const stopMovement = useCallback(() => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    lastFrameTimeRef.current = 0;
  }, []);

  const clearAllTimers = useCallback(() => {
    destroyed.current = true;
    if (stateTimerRef.current) {
      clearTimeout(stateTimerRef.current);
      stateTimerRef.current = null;
    }
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
    if (specialTimerRef.current) {
      clearTimeout(specialTimerRef.current);
      specialTimerRef.current = null;
    }
    stopMovement();
    if (cryToggleTimer.current) {
      clearInterval(cryToggleTimer.current);
      cryToggleTimer.current = null;
    }
  }, [stopMovement]);

  const destroySelf = useCallback(() => {
    clearAllTimers();
    if (onDestroyed) {
      onDestroyed();
    }
  }, [clearAllTimers, onDestroyed]);

  useEffect(() => {
    destroyPinguFn = destroySelf;
    return () => {
      if (destroyPinguFn === destroySelf) {
        destroyPinguFn = null;
      }
    };
  }, [destroySelf]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }

    inactivityTimerRef.current = window.setTimeout(() => {
      if (destroyed.current || interactionRef.current) {
        return;
      }
      stopMovement();
      stateRef.current = "cry";
      setBubbleVisible(true);
      setAction("cry");
      setFrameIndex(0);
    }, 30000);
  }, [stopMovement]);

  const startMovement = useCallback(() => {
    stopMovement();

    const move = (timestamp: number) => {
      if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = timestamp;
      }

      const delta = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;
      const step = Math.max(1, delta / 16.67) * 1.5;
      const direction = directionRef.current;

      let nextX = positionXRef.current + direction.vx * step;
      let nextY = positionYRef.current + direction.vy * step;
      const maxX = Math.max(16, viewportWidthRef.current - 80);
      const maxY = Math.max(16, viewportHeightRef.current - 96);
      const topBound = viewportHeightRef.current * 0.6;
      const bottomBound = viewportHeightRef.current * 0.95;

      if (nextX < 0) {
        nextX = 0;
        directionRef.current = { ...direction, vx: -direction.vx, facing: direction.vx < 0 ? "left" : "right" };
      } else if (nextX > maxX) {
        nextX = maxX;
        directionRef.current = { ...direction, vx: -direction.vx, facing: direction.vx < 0 ? "left" : "right" };
      }

      if (nextY < topBound) {
        nextY = topBound;
        directionRef.current = { ...direction, vy: -direction.vy };
      } else if (nextY > bottomBound) {
        nextY = bottomBound;
        directionRef.current = { ...direction, vy: -direction.vy };
      }

      positionXRef.current = nextX;
      positionYRef.current = nextY;
      setPositionX(clamp(nextX, 24, maxX));
      setPositionY(clamp(nextY, 24, maxY));
      setFacing(directionRef.current.facing);

      if (destroyed.current || stateRef.current !== "walk" || interactionRef.current) {
        return;
      }

      animationFrameRef.current = window.requestAnimationFrame(move);
    };

    animationFrameRef.current = window.requestAnimationFrame(move);
  }, [stopMovement]);

  const enterIdleState = () => {
    if (destroyed.current || interactionRef.current) {
      return;
    }

    stopMovement();
    const next = Math.random() < 0.7 ? "idle" : "wave";
    stateRef.current = next === "idle" ? "idle" : "wave";
    setAction(next);
    setBubbleVisible(false);
    setFrameIndex(0);

    if (stateTimerRef.current) {
      clearTimeout(stateTimerRef.current);
      stateTimerRef.current = null;
    }

    const delay = 2000 + Math.round(Math.random() * 2000);
    stateTimerRef.current = window.setTimeout(() => {
      if (destroyed.current || interactionRef.current || stateRef.current === "cry") {
        return;
      }
      chooseNextBehavior();
    }, delay);
  };

  const chooseNextBehavior = () => {
    if (destroyed.current || interactionRef.current) {
      return;
    }

    const shouldWalk = Math.random() < 0.6;
    if (shouldWalk) {
      const nextDirection = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      directionRef.current = nextDirection;
      setFacing(nextDirection.facing);
      stateRef.current = "walk";
      setAction("walk");
      setBubbleVisible(false);
      setFrameIndex(0);

      if (stateTimerRef.current) {
        clearTimeout(stateTimerRef.current);
        stateTimerRef.current = null;
      }

      const walkDuration = 2000 + Math.round(Math.random() * 3000);
      stateTimerRef.current = window.setTimeout(() => {
        if (destroyed.current || interactionRef.current || stateRef.current === "cry") {
          return;
        }
        enterIdleState();
      }, walkDuration);

      startMovement();
      return;
    }

    enterIdleState();
  };

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

    if (stateTimerRef.current) {
      clearTimeout(stateTimerRef.current);
      stateTimerRef.current = null;
    }
    if (specialTimerRef.current) {
      clearTimeout(specialTimerRef.current);
      specialTimerRef.current = null;
    }

    interactionRef.current = true;
    stateRef.current = "react";
    stopMovement();
    setBubbleVisible(false);

    const nextAction: PinguAction = Math.random() > 0.5 ? "wave" : "happy";
    setAction(nextAction);
    setFrameIndex(0);

    specialTimerRef.current = window.setTimeout(() => {
      if (destroyed.current) {
        return;
      }
      interactionRef.current = false;
      resetInactivityTimer();
      chooseNextBehavior();
    }, 2500);
  }, [chooseNextBehavior, resetInactivityTimer, stopMovement]);

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      viewportWidthRef.current = width;
      viewportHeightRef.current = height;
      setViewportWidth(width);
      setViewportHeight(height);

      const initialX = clamp(width / 2 - 40, 24, Math.max(24, width - 100));
      const initialY = clamp(height - 220, 24, Math.max(24, height - 160));
      positionXRef.current = initialX;
      positionYRef.current = initialY;
      setPositionX(initialX);
      setPositionY(initialY);
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
  }, []);

  useEffect(() => {
    if (viewportWidth === 0 || viewportHeight === 0) {
      return undefined;
    }

    destroyed.current = false;
    interactionRef.current = false;
    resetInactivityTimer();
    chooseNextBehavior();

    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers, chooseNextBehavior, resetInactivityTimer, viewportHeight, viewportWidth]);

  useEffect(() => {
    if (action === "cry") {
      setBubbleVisible(true);
      cryToggleTimer.current = window.setInterval(() => {
        setCryRowIndex((index) => (index === 0 ? 1 : 0));
      }, 2800);

      return () => {
        if (cryToggleTimer.current) {
          clearInterval(cryToggleTimer.current);
          cryToggleTimer.current = null;
        }
      };
    }

    return undefined;
  }, [action]);

  const currentRow = action === "cry" ? CRY_ROWS[cryRowIndex] : ACTION_ROWS[action];
  const frameX = frameIndex % SPRITE_COLUMNS;
  const petStyle = {
    backgroundPosition: `${-frameX * SPRITE_FRAME_WIDTH}px ${-currentRow * SPRITE_FRAME_HEIGHT}px`,
  } as const;

  useEffect(() => {
    if (action === "walk") {
      setFrameIndex(0);
      const intervalId = window.setInterval(() => {
        setFrameIndex((current) => (current + 1) % SPRITE_COLUMNS);
      }, 160);

      return () => {
        window.clearInterval(intervalId);
      };
    }

    setFrameIndex(0);
    return undefined;
  }, [action]);

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
      <div className="pingu-entity" style={{ left: positionX, top: positionY }}>
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

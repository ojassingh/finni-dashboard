"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { statePointData } from "./state-points";
import { useTheme } from "next-themes";

const US_STATES = [
  { name: "New York", location: [25.0, -75.0], id: "ny" },
  { name: "California", location: [20.0, -119.4179], id: "ca" },
  { name: "Texas", location: [18.0, -100.0], id: "tx" },
  { name: "Florida", location: [15.0, -81.6868], id: "fl" },
  { name: "Illinois", location: [22.0, -89.0], id: "il" },
];

const createGlobeConfig = (activeStateId: string | null) => {
  const markers = Object.entries(statePointData).flatMap(([id, locations]) =>
    locations.map((location) => ({
      location: location as [number, number],
      size: 0.04,
      id,
    }))
  );


  return {
    devicePixelRatio: 2,
    dark:  0.8,
    diffuse: 1,
    mapSamples: 32000,
    mapBrightness: 4,
    baseColor: [0.2, 0.2, 0.2] as [number, number, number],
    markerColor: [0.5, 0.5, 0.5] as [number, number, number],
    glowColor: [0, 0, 0] as [number, number, number],
    markers: markers.map((marker) => {
      const isActive = marker.id === activeStateId;
      return {
        ...marker,
        size: 0.03,
        color: isActive
          ? ([0.71, 0.6, 0.3] as [number, number, number])
          : ([0.4, 0.4, 0.4] as [number, number, number]),
      };
    }),
    onRender: () => {},
  };
};

export function Globe({ 
  className, 
  onStateSelect 
}: { 
  className?: string;
  onStateSelect?: (stateId: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStateId, setActiveStateId] = useState<string | null>(null);
  const focusRef = useRef([0, 0]);
  const currentPhiRef = useRef(0);
  const currentThetaRef = useRef(0);
  const globeRef = useRef<{ destroy: () => void } | null>(null);
  const { theme } = useTheme();
  const locationToAngles = (lat: number, long: number) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };

  const selectState = (stateId: string) => {
    const newState = activeStateId === stateId ? null : stateId;
    setActiveStateId(newState);
    onStateSelect?.(newState);

    const state = US_STATES.find((s) => s.id === stateId);
    if (state) {
      focusRef.current = locationToAngles(state.location[0], state.location[1]);
    } else {
      focusRef.current = locationToAngles(15, -80);
    }
  };

  useEffect(() => {
    let width = 0;
    const doublePi = Math.PI * 2;
    if (focusRef.current[0] === 0 && focusRef.current[1] === 0) {
      focusRef.current = locationToAngles(15, -80);
    }

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (globeRef.current) {
      globeRef.current.destroy();
    }

    const globe = createGlobe(canvasRef.current!, {
      ...createGlobeConfig(activeStateId),
      width: width * 2,
      height: width * 2,
      phi: currentPhiRef.current,
      theta: currentThetaRef.current,
      onRender: (state) => {
        state.phi = currentPhiRef.current;
        state.theta = currentThetaRef.current;
        const [focusPhi, focusTheta] = focusRef.current;
        const distPositive =
          (focusPhi - currentPhiRef.current + doublePi) % doublePi;
        const distNegative =
          (currentPhiRef.current - focusPhi + doublePi) % doublePi;

        if (distPositive < distNegative) {
          currentPhiRef.current += distPositive * 0.08;
        } else {
          currentPhiRef.current -= distNegative * 0.08;
        }
        currentThetaRef.current =
          currentThetaRef.current * 0.92 + focusTheta * 0.08;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    globeRef.current = globe;

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [activeStateId, theme]);

  return (
    <div className="flex flex-col md:flex-row overflow-hidden max-h-[20rem] items-start gap-8">
      <div className="px-6">
        <p className="text-sm mt-4 text-muted-foreground">
          Stats in popular states:
        </p>
        <div className="grid gap-2 mt-2">
          {US_STATES.map((state) => (
            <Button
              className="max-w-max text-xs py-1 px-2"
              key={state.id}
              size="sm"
              onClick={() => selectState(state.id)}
              variant={activeStateId === state.id ? "default" : "outline"}
            >
              {state.name}
            </Button>
          ))}
        </div>
      </div>
      <div
        className={cn("w-full max-w-lg relative", className)}
        style={{ aspectRatio: 1 }}
      >
        <canvas
          ref={canvasRef}
          className="w-full scale-125 h-full absolute -bottom-14 -right-14 opacity-0 transition-opacity duration-500"
          style={{ contain: "layout paint size" }}
        />
      </div>
    </div>
  );
}

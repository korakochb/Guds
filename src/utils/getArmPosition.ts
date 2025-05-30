// src/utils/getArmPosition.ts

type Side = "left" | "right";

type ArmStyle = {
  [key: string]: {
    left: React.CSSProperties;
    right: React.CSSProperties;
  };
};

export function getArmPosition(partId: string, side: Side): React.CSSProperties {
  const common = {
    width: "60px",
    height: "auto",
  };

  const configs: ArmStyle = {
    luna: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    spike: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    nox: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    dime: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    rocky: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    worm: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    sunny: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    muff: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    bruno: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    bob: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    willy: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
    pooh: {
      left: { top: "-15px", left: "-30px", ...common },
      right: { top: "-15px", right: "30px", transform: "scaleX(-1)", ...common },
    },
  };

  return configs[partId]?.[side] || {};
}

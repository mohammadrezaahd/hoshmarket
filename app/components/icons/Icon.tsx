import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { useIconLoader } from "./useIconLoader";

export type VariantType =
  | "solid"
  | "regular"
  | "duotone-regular"
  | "jelly-duo-regular";

export interface IconProps {
  name: string;
  variant?: VariantType;
  size?: string | number | 'small' | 'medium' | 'large' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Size mapping to match MUI conventions
const sizeMap: Record<string, number> = {
  xs: 16,
  small: 20,
  sm: 20,
  medium: 24,
  md: 24,
  large: 32,
  lg: 32,
  xl: 40,
};

const Icon: React.FC<IconProps> = ({
  name,
  variant = "solid",
  size = 24,
  color = "currentColor",
  className,
  style,
  onClick,
}) => {
  // Convert size to pixel value
  const getSize = (size: string | number | undefined): number => {
    if (typeof size === 'number') return size;
    if (typeof size === 'string' && sizeMap[size]) return sizeMap[size];
    if (typeof size === 'string' && !isNaN(Number(size))) return Number(size);
    return 24; // default
  };

  const pixelSize = getSize(size);
  const { svgContent, loading, error } = useIconLoader(name, variant);

  const processedSvg = useMemo(() => {
    if (!svgContent) return "";
    if (color !== "currentColor") {
      return svgContent.replace(/fill="currentColor"/g, `fill="${color}"`);
    }
    return svgContent;
  }, [svgContent, color]);

  if (loading) {
    return (
      <Box
        component="span"
        sx={{
          display: "inline-block",
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          backgroundColor: "#f0f0f0",
          borderRadius: "2px",
          ...style,
        }}
        className={className}
      />
    );
  }

  if (error || !svgContent) {
    return (
      <Box
        component="span"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          backgroundColor: "#ffebee",
          color: "#c62828",
          fontSize: "8px",
          borderRadius: "2px",
          ...style,
        }}
        className={className}
        title={`Icon not found: ${name}`}
      >
        ?
      </Box>
    );
  }

  return (
    <Box
      component="span"
      className={className}
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        // cursor: onClick ? "pointer" : "default",
        "& svg": {
          width: "100%",
          height: "100%",
          fill: color,
        },
        ...style,
        cursor: "pointer",
      }}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
};

export default Icon;

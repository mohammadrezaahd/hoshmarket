import React from "react";
import { TransferSource } from "~/types/dtos/transfer.dto";
import { Box, Grid, Chip, ButtonBase, useTheme } from "@mui/material";

export interface TransferSourceOption {
  logo: string;
  status: "active" | "deactive" | "soon";
  name: TransferSource;
}

const tsOptions: TransferSourceOption[] = [
  {
    logo: "/source_logo/amazon.png",
    status: "active",
    name: TransferSource.AMAZON,
  },
  {
    logo: "/source_logo/torob.png",
    status: "soon",
    name: TransferSource.TOROB,
  },
];

interface Props {
  selected?: TransferSource | null;
  onSelect?: (source: TransferSource) => void;
  sx?: any;
}

const TransferSources: React.FC<Props> = ({ selected, onSelect, sx }) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={sx}>
      {tsOptions.map((opt) => (
        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={opt.name}>
          <Box
            component={ButtonBase}
            onClick={() => opt.status === "active" && onSelect?.(opt.name)}
            disabled={opt.status !== "active"}
            sx={{
              position: "relative",
              display: "block",
              width: "100%",
              height: 96,
              borderRadius: `${theme.shape.borderRadius}px`,
              overflow: "hidden",
              border:
                selected === opt.name
                  ? `2px solid ${theme.palette.primary.main}`
                  : "2px solid transparent",
              cursor: opt.status === "active" ? "pointer" : "default",
              transition: "all 200ms ease",
              "&:hover": {
                ...(opt.status === "active" && {
                  borderColor: theme.palette.primary.main,
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}33`,
                }),
              },
              "&:hover .logoBg": {
                transform: opt.status === "active" ? "scale(1.03)" : "none",
              },
            }}
          >
            {/* background image */}
            <Box
              className="logoBg"
              sx={{
                height: "100%",
                width: "100%",
                backgroundImage: `url(${opt.logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition:
                  "transform 180ms ease, opacity 180ms ease, filter 180ms ease",
                ...(opt.status === "soon" && { opacity: 0.48 }),
                ...(opt.status === "deactive" && { filter: "brightness(0.4)" }),
              }}
            />

            {/* Overlays for deactive / soon */}
            {(opt.status === "deactive" || opt.status === "soon") && (
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                }}
              >
                <Chip
                  label={
                    opt.status === "deactive" ? "در دسترس نیست فعلا" : "به زودی"
                  }
                  sx={{
                    fontWeight: 700,
                    bgcolor:
                      opt.status === "deactive"
                        ? "rgba(0,0,0,0.6)"
                        : "rgba(255,255,255,0.85)",
                    color:
                      opt.status === "deactive"
                        ? "#fff"
                        : theme.palette.text.primary,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    pointerEvents: "none",
                  }}
                />
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TransferSources;

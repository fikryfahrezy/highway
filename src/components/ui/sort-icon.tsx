"use client";

import { Box } from "@mui/material";
import { ArrowUpward, ArrowDownward, UnfoldMore } from "@mui/icons-material";
import type { SortDirection } from "@/hooks/use-table-sort";

type SortIconProps = {
  direction: SortDirection;
  size?: "small" | "medium" | "large";
};

export function SortIcon({ direction, size = "small" }: SortIconProps) {
  if (direction === "asc") {
    return <ArrowUpward fontSize={size} />;
  }
  if (direction === "desc") {
    return <ArrowDownward fontSize={size} />;
  }
  return <UnfoldMore fontSize={size} sx={{ opacity: 0.3 }} />;
}

type SortableHeaderProps = {
  children: React.ReactNode;
  active: boolean;
  direction: SortDirection;
  onClick: () => void;
};

export function SortableHeader({
  children,
  active,
  direction,
  onClick,
}: SortableHeaderProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "pointer",
        userSelect: "none",
        "&:hover": {
          color: "primary.main",
        },
        color: active ? "primary.main" : "inherit",
      }}
    >
      {children}
      <SortIcon direction={active ? direction : null} size="small" />
    </Box>
  );
}

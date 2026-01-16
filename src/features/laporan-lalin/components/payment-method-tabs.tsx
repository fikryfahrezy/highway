"use client";

import { useState } from "react";
import { Stack, Button, Tab, Tabs } from "@mui/material";
import { FileDownload as FileDownloadIcon } from "@mui/icons-material";
import { tabs } from "../constants";
import type { PaymentMethod } from "../types";
import { ExportMenu } from "./export-menu";

type PaymentMethodTabsProps = {
  activeTab: PaymentMethod;
  onTabChange: (tab: PaymentMethod) => void;
  onExportExcel: () => void;
  onExportPDF: () => void;
};

export function PaymentMethodTabs({
  activeTab,
  onTabChange,
  onExportExcel,
  onExportPDF,
}: PaymentMethodTabsProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: PaymentMethod,
  ) => {
    onTabChange(newValue);
  };

  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Tabs value={activeTab} onChange={handleTabChange}>
          {tabs.map((tab) => {
            return <Tab key={tab.value} label={tab.label} value={tab.value} />;
          })}
        </Tabs>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportClick}
          size="small"
        >
          Export
        </Button>
      </Stack>
      <ExportMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        onExportExcel={onExportExcel}
        onExportPDF={onExportPDF}
      />
    </>
  );
}

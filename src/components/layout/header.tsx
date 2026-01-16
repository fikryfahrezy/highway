"use client";

import { useState } from "react";
import {
  AppBar,
  Stack,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Logout as LogoutIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { useColorScheme } from "@mui/material/styles";
import { useAuth } from "@/contexts/auth-context";

type HeaderProps = {
  drawerWidth: number;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

export function Header({
  drawerWidth,
  sidebarCollapsed,
  onToggleSidebar,
}: HeaderProps) {
  const { logout } = useAuth();
  const { mode, setMode } = useColorScheme();
  const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  const profileMenuOpen = Boolean(profileAnchorEl);
  const settingsMenuOpen = Boolean(settingsAnchorEl);

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleProfileClose();
  };

  const handleSettingsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleThemeToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
    handleSettingsClose();
  };

  return (
    <AppBar
      component="header"
      position="fixed"
      elevation={0}
      role="banner"
      sx={{
        borderBottom: "1px solid",
        borderColor: "primary.dark",
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        transition: "width 0.2s ease-in-out, margin-left 0.2s ease-in-out",
      }}
    >
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <IconButton
            color="inherit"
            size="small"
            onClick={onToggleSidebar}
            aria-label={
              sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            {sidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>

          <Stack
            component="nav"
            direction="row"
            spacing={0.5}
            alignItems="center"
            aria-label="User actions"
          >
            <IconButton
              color="inherit"
              size="small"
              aria-label="User profile"
              onClick={handleProfileClick}
            >
              <AccountCircleIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              aria-label="Settings"
              onClick={handleSettingsClick}
            >
              <SettingsIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>

      <Menu
        anchorEl={profileAnchorEl}
        open={profileMenuOpen}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={settingsAnchorEl}
        open={settingsMenuOpen}
        onClose={handleSettingsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {mode === "light" ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

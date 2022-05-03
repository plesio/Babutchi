import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useCallback, useState } from "react";
import { ReloadForceDataUrlStatus } from "@/util/RecoilUtil";
import { useRecoilState } from "recoil";

interface HideOnScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

const HideOnScroll = (props: HideOnScrollProps) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

interface BabuTitleProps {
  children: string;
}

const BabuTitle = (props: BabuTitleProps) => {
  return (
    <HideOnScroll {...props}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            variant="h1"
            component="div"
            fontSize="1.25rem"
            sx={{ p: "0.5rem", ml: "0.5rem", flexGrow: 1 }}
          >
            {props.children}
          </Typography>
          <SettingButton />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

const SettingButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setForceFlag] = useRecoilState(ReloadForceDataUrlStatus);

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleReloadFlag = useCallback(() => {
    setForceFlag(true);
    handleClose();
  }, []);

  return (
    <>
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleReloadFlag}>POST用URLのリロード</MenuItem>
      </Menu>
    </>
  );
};

export default BabuTitle;

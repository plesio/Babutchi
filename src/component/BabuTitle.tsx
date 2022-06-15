import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";

import { useRecoilState } from "recoil";
import { CommonSnackBarStatus } from "@/util/RecoilUtil";
import {
  BABUTCHI_IS_LOCAL_MODE,
  BABUTCHI_REQUEST_URL,
  useLocalStorageState,
} from "@/util/LocalStorageUtil";

import GitHubIcon from "@mui/icons-material/GitHub";

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
  //
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  //
  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
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
        <MenuItem disableRipple disableTouchRipple>
          <GithubLink />
        </MenuItem>

        <MenuItem disableRipple disableTouchRipple>
          <IsLocalModeToggle />
        </MenuItem>

        <MenuItem disableRipple disableTouchRipple>
          <SetterUrl />
        </MenuItem>
      </Menu>
    </>
  );
};

const IsLocalModeToggle: React.FC = () => {
  // --
  const [isLocalMode, setLocalMode] = useLocalStorageState(
    BABUTCHI_IS_LOCAL_MODE
  );
  // const [url] = useLocalStorageState(BABUTCHI_REQUEST_URL);
  // -- recoil
  const [, setSnackStatus] = useRecoilState(CommonSnackBarStatus);

  const handleChangeLocalMode = useCallback(
    (_e: React.MouseEvent<HTMLElement>, value: boolean) => {
      // change event
      setLocalMode(`${value}`);
      // open snackbar
      setSnackStatus({
        open: true,
        text: `モードを変更しました`,
      });
    },
    []
  );

  return (
    <Stack direction="column">
      <Typography component={"span"} variant={"body1"}>
        mode
      </Typography>

      <ToggleButtonGroup
        color="primary"
        value={isLocalMode === "true"}
        exclusive
        onChange={handleChangeLocalMode}
        sx={{ height: "2rem" }}
      >
        <ToggleButton value={true}>Local</ToggleButton>
        <ToggleButton value={false}>Online</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

const GithubLink: React.FC = () => {
  return (
    <Stack direction="column">
      <Typography component={"span"} variant={"body1"}>
        help
      </Typography>

      <Link href="https://github.com/plesio/Babutchi" underline="none">
        <Button variant="outlined" startIcon={<GitHubIcon />}>
          GitHub
        </Button>
      </Link>
    </Stack>
  );
};

const SetterUrl: React.FC = () => {
  // --
  const [isLocalMode] = useLocalStorageState(BABUTCHI_IS_LOCAL_MODE);
  const [url, setUrl] = useLocalStorageState(BABUTCHI_REQUEST_URL);
  // --
  const [urlTxt, setUrlTxt] = useState<string>(url);
  const isSaveDisabled = useMemo(() => {
    return isLocalMode === "true" || url === urlTxt;
  }, [url, urlTxt, isLocalMode]);
  //
  const [, setSnackStatus] = useRecoilState(CommonSnackBarStatus);

  const handleChangeTxt = useCallback((e: any) => {
    setUrlTxt(`${e.target.value}`);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(url)
      .then((res) => {
        //
        setSnackStatus({
          open: true,
          text: `URLをクリップボードにコピーしました`,
        });
      })
      .catch((error) => {
        //
      });
  }, []);

  const handleSave = useCallback(() => {
    // change event
    setUrl(urlTxt);
    setSnackStatus({
      open: true,
      text: `URLを更新しました。有効化するためページをリロードしてください。`,
    });
  }, [urlTxt]);

  useEffect(() => {
    setUrlTxt(url);
  }, [url]);

  return (
    <Stack direction="column">
      <Typography component={"span"} variant={"body1"}>
        exec URL
      </Typography>
      <Stack direction="row" spacing={1}>
        <TextField
          value={urlTxt}
          id="post_url"
          size="small"
          onChange={handleChangeTxt}
          inputProps={{ readOnly: isLocalMode === "true" }}
        />
        <IconButton color="secondary" onClick={handleCopy}>
          <ContentCopyIcon />
        </IconButton>
        <IconButton
          disabled={isSaveDisabled}
          color="success"
          onClick={handleSave}
        >
          <SaveIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
export default BabuTitle;

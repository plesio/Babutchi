import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Slide,
  TextField,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useCallback, useMemo, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useCookies } from "react-cookie";
import {
  BABUTCHI_IS_LOCAL_MODE,
  BABUTCHI_LAST_MILK,
  BABUTCHI_REQUEST_URL,
  MAX_AGE_10_YEARS,
} from "@/util/CookieUtil";
import { CookieSetOptions } from "universal-cookie";

import Stack from "@mui/material/Stack";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";

import { useRecoilState } from "recoil";
import { CommonSnackBarStatus } from "@/util/RecoilUtil";

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
  const [cookies, setCookie, _removeCookie] = useCookies<string>([
    BABUTCHI_REQUEST_URL,
    // BABUTCHI_LAST_MILK,
    BABUTCHI_IS_LOCAL_MODE,
  ]);
  // from cookies
  const isLocalMode = useMemo((): boolean => {
    if (!cookies?.BABUTCHI_IS_LOCAL_MODE) {
      return false;
    }
    return cookies.BABUTCHI_IS_LOCAL_MODE === "true";
  }, [cookies, cookies.BABUTCHI_IS_LOCAL_MODE]);
  const url = useMemo((): string => {
    if (!cookies?.BABUTCHI_REQUEST_URL) {
      return "/";
    }
    return cookies.BABUTCHI_REQUEST_URL;
  }, [cookies, cookies.BABUTCHI_REQUEST_URL]);

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
          <IsLocalModeToggle isLocalMode={isLocalMode} setCookie={setCookie} />
        </MenuItem>

        <MenuItem disableRipple disableTouchRipple>
          <SetterUrl
            url={url}
            isLocalMode={isLocalMode}
            setCookie={setCookie}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

interface IsLocalModeToggleProps {
  // cookies: { [p: string]: any };
  isLocalMode: boolean;
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
}

const IsLocalModeToggle: React.FC<IsLocalModeToggleProps> = (props) => {
  // --
  const { isLocalMode, setCookie } = props;
  // -- recoil
  const [, setSnackStatus] = useRecoilState(CommonSnackBarStatus);

  const handleChangeLocalMode = useCallback(
    (_e: React.MouseEvent<HTMLElement>, value: boolean) => {
      // change event
      setCookie(BABUTCHI_IS_LOCAL_MODE, `${value}`, {
        sameSite: "strict",
        maxAge: MAX_AGE_10_YEARS /* 10 years */,
      });
      // open snackbar
      setSnackStatus({
        open: true,
        text: `モードを変更しました`,
      });
    },
    []
  );

  return (
    <ToggleButtonGroup
      color="primary"
      value={isLocalMode}
      exclusive
      onChange={handleChangeLocalMode}
    >
      <ToggleButton value={true}>Local</ToggleButton>
      <ToggleButton value={false}>Online</ToggleButton>
    </ToggleButtonGroup>
  );
};

interface SetterUrlProps {
  url: string;
  isLocalMode: boolean;
  setCookie: (
    name: string,
    value: any,
    options?: CookieSetOptions | undefined
  ) => void;
}

const SetterUrl: React.FC<SetterUrlProps> = (props) => {
  // --
  const { url, isLocalMode, setCookie } = props;
  // --
  const [urlTxt, setUrlTxt] = useState<string>(url);
  const isSaveDisabled = useMemo(() => {
    return isLocalMode || url === urlTxt;
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
    setCookie(BABUTCHI_REQUEST_URL, `${urlTxt}`, {
      sameSite: "strict",
      maxAge: MAX_AGE_10_YEARS /* 10 years */,
      secure: isLocalMode ? undefined : true,
    });
    setSnackStatus({
      open: true,
      text: `URLを更新しました`,
    });
  }, []);

  return (
    <>
      <Stack direction="row" spacing={1}>
        <TextField
          value={urlTxt}
          id="post_url"
          size="small"
          onChange={handleChangeTxt}
          inputProps={{ readOnly: isLocalMode }}
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
    </>
  );
};

export default BabuTitle;

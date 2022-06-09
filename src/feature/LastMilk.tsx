import React, { useCallback, useMemo, useState } from "react";

import { getLastMilk } from "@/network/get";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { useCookies } from "react-cookie";

import CachedIcon from "@mui/icons-material/Cached";
import { BABUTCHI_LAST_MILK, BABUTCHI_REQUEST_URL } from "@/util/CookieUtil";

const LastMilk: React.FC = () => {
  //
  const [isLoading, setLoading] = useState<boolean>(false);
  //
  const [cookies, setCookie, _removeCookie] = useCookies<string>([
    BABUTCHI_REQUEST_URL,
    BABUTCHI_LAST_MILK,
  ]);
  // from cookies
  const url = useMemo((): string => {
    if (!cookies?.BABUTCHI_REQUEST_URL) {
      return "/";
    }
    return cookies.BABUTCHI_REQUEST_URL;
  }, [cookies]);
  const dateStr = useMemo((): string => {
    // console.log("useMemo dateStr ,", cookies);
    if (
      !cookies?.BABUTCHI_LAST_MILK ||
      cookies.BABUTCHI_LAST_MILK === "undefined"
    ) {
      return "undefined";
    }
    return cookies.BABUTCHI_LAST_MILK;
  }, [cookies]);

  const handleReload = useCallback(() => {
    setLoading(true);
    getLastMilk(url, (ret: string) => {
      // console.log("handleReload ret ,", ret);
      if (ret) {
        // const d = dayjs(cookies.name).format("MM/DD HH:mm:ss");
        setCookie(BABUTCHI_LAST_MILK, ret, {
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 2 /* 2 days */,
        });
      }
      setLoading(false);
    });
  }, [url]);

  return (
    <Box
      pt="0.5rem"
      pl="0.25rem"
      display={"flex"}
      flexGrow={1}
      flexDirection={"row"}
      alignItems={"center"}
    >
      <IconButton disabled={isLoading} onClick={handleReload}>
        {isLoading ? <CircularProgress size={"1rem"} /> : <CachedIcon />}
      </IconButton>
      <Typography variant={"h6"} component={"h2"}>
        {`Last Milk : `}
      </Typography>
      <Typography variant={"body1"} component={"span"} pl={"0.5rem"}>
        {dateStr}
      </Typography>
    </Box>
  );
};

export default LastMilk;

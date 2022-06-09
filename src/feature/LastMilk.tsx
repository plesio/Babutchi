import React, { useCallback, useMemo, useState } from "react";

import { getLastMilk } from "@/network/get";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";

import CachedIcon from "@mui/icons-material/Cached";

import {
  BABUTCHI_LAST_MILK,
  BABUTCHI_REQUEST_URL,
  useLocalStorageState,
} from "@/util/LocalStorageUtil";

const LastMilk: React.FC = () => {
  //
  const [isLoading, setLoading] = useState<boolean>(false);
  //
  const [url] = useLocalStorageState(BABUTCHI_REQUEST_URL);
  const [lastMilk, setLastMilk] = useLocalStorageState(
    BABUTCHI_LAST_MILK,
    "undefined"
  );

  const handleReload = useCallback(() => {
    setLoading(true);
    getLastMilk(url, (ret: string) => {
      // console.log("handleReload ret ,", ret);
      if (ret) {
        // const d = dayjs(cookies.name).format("MM/DD HH:mm:ss");
        setLastMilk(ret);
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
        {lastMilk}
      </Typography>
    </Box>
  );
};

export default LastMilk;

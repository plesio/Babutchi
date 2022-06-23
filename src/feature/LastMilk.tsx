import React, { useCallback, useMemo, useState } from "react";

import { getLastMilk } from "@/network/get";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";

import CachedIcon from "@mui/icons-material/Cached";

import {
  BABUTCHI_LAST_MILK_EVENT,
  BABUTCHI_LAST_MILK_TIME,
  BABUTCHI_REQUEST_URL,
  useLocalStorageState,
} from "@/util/LocalStorageUtil";
import customDayJs from "@/util/CustomDayJs";
import { EventTypeArray } from "@/model/BabuModel";

export interface LastMilkEvent {
  event: string;
  time: string;
}

const LastMilk: React.FC = () => {
  //
  const [isLoading, setLoading] = useState<boolean>(false);
  //
  const [url] = useLocalStorageState(BABUTCHI_REQUEST_URL);
  const [lastMilkEvent, setLastMilkEvent] = useLocalStorageState(
    BABUTCHI_LAST_MILK_EVENT,
    "undefined"
  );
  const [lastMilkTime, setLastMilkTime] = useLocalStorageState(
    BABUTCHI_LAST_MILK_TIME,
    "undefined"
  );

  const handleReload = useCallback(() => {
    setLoading(true);
    getLastMilk(url, (ret: LastMilkEvent) => {
      // console.log("handleReload ret ,", ret);
      if (ret) {
        // const d = dayjs(cookies.name).format("MM/DD HH:mm:ss");
        setLastMilkEvent(ret.event);
        setLastMilkTime(ret.time);
      }
      setLoading(false);
    });
  }, [setLastMilkEvent, setLastMilkTime, url]);

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
        {"Last Milk : "}
      </Typography>
      <Typography variant={"body1"} component={"span"} pl={"0.5rem"}>
        {customDayJs(lastMilkTime, "YYYY/MM/DD HH:mm:ss").format(
          "MM/DD HH:mm:ss"
        )}{" "}
        :{" "}
        {EventTypeArray.find((e) => e.id === lastMilkEvent)?.name.replace(
          "　",
          ""
        )}
      </Typography>
    </Box>
  );
};

export default LastMilk;

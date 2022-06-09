import { Babu, EventType } from "@/model/BabuModel";
import { postBabu } from "@/network/post";
import { Button, SxProps, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useRecoilState } from "recoil";

import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import WcIcon from "@mui/icons-material/Wc";

import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import AirlineSeatFlatAngledIcon from "@mui/icons-material/AirlineSeatFlatAngled";

import FlatwareIcon from "@mui/icons-material/Flatware";
import { BabuPostStatus, CommonSnackBarStatus } from "@/util/RecoilUtil";

import CircularProgress from "@mui/material/CircularProgress";
import {BABUTCHI_REQUEST_URL, useLocalStorageState} from "@/util/LocalStorageUtil";


interface BabuButtonProps {
  title: string;
  babu: Babu;
  sx?: SxProps;
}

const BabuButton: React.FC<BabuButtonProps> = (props) => {
  // -- props
  const { title, babu } = props;
  // --
  const [isDisabledBabuPost, setBabuStatus] = useRecoilState(BabuPostStatus);
  const [, setSnackStatus] = useRecoilState(CommonSnackBarStatus);
  // --
  const [url] = useLocalStorageState(BABUTCHI_REQUEST_URL)

  const handleOnClick = useCallback(() => {
    setBabuStatus(true);
    postBabu(babu, url, (res) => {
      console.log(res);
      setSnackStatus({
        open: true,
        text: `${babu.user.name} / ${babu.event.name} イベントを保存しました`,
      });
      setBabuStatus(false);
    });
  }, [babu, url]);

  const buttonIcon = useMemo(() => {
    if (isDisabledBabuPost) {
      return <CircularProgress size="1.5rem" />;
    }
    return <Icon babu={babu} />;
  }, [isDisabledBabuPost]);

  return (
    <Button
      variant="contained"
      disabled={isDisabledBabuPost}
      onClick={handleOnClick}
      sx={props.sx}
      startIcon={buttonIcon}
    >
      <Typography variant="body1" component={"span"} sx={{ p: 0, m: 0 }}>
        {title}
      </Typography>
    </Button>
  );
};

interface IconProps {
  babu: Babu;
}

const Icon: React.FC<IconProps> = (props) => {
  if (props.babu.event.id === EventType.pee.id) {
    return (
      <WcIcon
        style={{
          transform: "scale(1.5)",
          marginLeft: "-0.25rem",
          marginRight: "0.25rem",
        }}
      />
    );
  } else if (props.babu.event.id === EventType.poop.id) {
    return (
      <BabyChangingStationIcon
        style={{
          transform: "scale(1.5)",
          marginLeft: "-0.25rem",
          marginRight: "0.25rem",
        }}
      />
    );
  } else if (props.babu.event.id === EventType.sleep.id) {
    return (
      <AirlineSeatFlatIcon
        style={{
          transform: "scale(1.5)",
          marginLeft: "-0.25rem",
          marginRight: "0.25rem",
        }}
      />
    );
  } else if (props.babu.event.id === EventType.wake_up.id) {
    return (
      <AirlineSeatFlatAngledIcon
        style={{
          transform: "scale(1.5)",
          marginLeft: "-0.25rem",
          marginRight: "0.25rem",
        }}
      />
    );
  } else if (props.babu.event.id === EventType.mother_milk_left.id) {
    return (
      <FlatwareIcon
        style={{
          transform: "scale(1.5)",
          marginLeft: "-0.25rem",
          marginRight: "0.25rem",
        }}
      />
    );
  } else if (props.babu.event.id === EventType.mother_milk_right.id) {
    return (
      <FlatwareIcon
        style={{
          transform: "scale(1.5)",
          marginLeft: "-0.25rem",
          marginRight: "0.25rem",
        }}
      />
    );
  } else if (props.babu.event.id === EventType.milk.id) {
    return (
      <FlatwareIcon
        style={{
          transform: "scale(1.5)",
          marginLeft: "-0.25rem",
          marginRight: "0.25rem",
        }}
      />
    );
  }
  return <></>;
};

export default BabuButton;

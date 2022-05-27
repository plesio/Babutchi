import BabuTitle from "@/component/BabuTitle";
import CommonSnackBar from "@/component/CommonSnackBar";
import { UserType } from "@/model/BabuModel";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import BabuButtonGroup from "./BabuButtonGroup";
import { UrlsJsonStatus } from "@/util/RecoilUtil";
import { getUrls } from "@/network/get";
import {CookiesProvider} from "react-cookie";
import LastMilk from "@/feature/LastMilk";

const MainView: React.FC = () => {

  return (
    <>
      <CookiesProvider>
      <RecoilRoot>
        <CommonSnackBar />
        <BabuTitle>ばぶっち</BabuTitle>
        <Box pt="2rem">
          <LastMilk />
        </Box>
        <Box pt="1rem">
          <Buttons />
        </Box>
      </RecoilRoot>
      </CookiesProvider>
    </>
  );
};

const Buttons: React.FC = () => {

  const [, setUrls] = useRecoilState(UrlsJsonStatus);

  // --
  useEffect(() => {
    getUrls(setUrls);
  }, []);

  return (
    <Box pt="0.5rem" pl="0.25rem">
      {/*  */}
      <BabuButtonGroup user={UserType.father} />
      <BabuButtonGroup user={UserType.mother} />
      <BabuButtonGroup user={UserType.mother_grandma} />
    </Box>
  );
};

export default MainView;

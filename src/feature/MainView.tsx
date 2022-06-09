import BabuTitle from "@/component/BabuTitle";
import CommonSnackBar from "@/component/CommonSnackBar";
import { UserType } from "@/model/BabuModel";
import { Box } from "@mui/material";
import React from "react";
import { RecoilRoot } from "recoil";
import BabuButtonGroup from "./BabuButtonGroup";
import { CookiesProvider } from "react-cookie";
import LastMilk from "@/feature/LastMilk";
import Initials from "@/feature/Initials";

const MainView: React.FC = () => {
  return (
    <>
      <CookiesProvider>
        <RecoilRoot>
          <Initials /* Cookie/Recoil 初期化 */ />
          <CommonSnackBar />
          <BabuTitle>ばぶっち</BabuTitle>
          <Box pt="0rem">
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

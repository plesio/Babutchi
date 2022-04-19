import BabuTitle from "@/component/BabuTitle";
import CommonSnackBar from "@/component/CommonSnackBar";
import { UserType } from "@/model/BabuModel";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import BabuButtonGroup from "./BabuButtonGroup";
import { PostDataUrlStatus } from "@/util/RecoilUtil";
import { getPostUrl } from "@/network/get";

const MainView: React.VFC = () => {

  return (
    <>
      <RecoilRoot>
        <CommonSnackBar />
        <BabuTitle>ばぶっち</BabuTitle>
        <Box pt="2rem">
          <Buttons />
        </Box>
      </RecoilRoot>
    </>
  );
};

const Buttons: React.VFC = () => {

  const [, setPostUrl] = useRecoilState(PostDataUrlStatus);

  // --
  useEffect(() => {
    getPostUrl(setPostUrl);
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

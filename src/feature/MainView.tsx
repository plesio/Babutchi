import BabuTitle from "@/component/BabuTitle";
import CommonSnackBar from "@/component/CommonSnackBar";
import { UserType } from "@/model/BabuModel";
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import BabuButtonGroup from "./BabuButtonGroup";
import { PostDataUrlStatus, ReloadForceDataUrlStatus } from "@/util/RecoilUtil";
import { getPostUrl } from "@/network/get";
import { db } from "@/util/DexieUtil";
import { useLiveQuery } from "dexie-react-hooks";

const MainView: React.FC = () => {
  return (
    <>
      <RecoilRoot>
        <DataInitializer />
        <CommonSnackBar />
        <BabuTitle>ばぶっち</BabuTitle>
        <Box pt="2rem">
          <Buttons />
        </Box>
      </RecoilRoot>
    </>
  );
};

/** データの初期化用の疑似コンポーネント */
const DataInitializer: React.FC = () => {
  //
  const firstRef = useRef();
  //
  const [recoilPostUrl, setPostUrl] = useRecoilState(PostDataUrlStatus);
  const [forceFlag, setForceFlag] = useRecoilState(ReloadForceDataUrlStatus);
  //
  const _dbPostUrl = useLiveQuery(
    async () => {
      const ret = await db.postUrl.limit(1).first();
      console.log(
        `useLiveQuery : ${
          ret?.url
        } , recoilPostUrl : ${recoilPostUrl} , random:${Math.random()}`
      );
      setDbPostUrl(ret?.url);
      return ret;
    },
    [firstRef],
    undefined
  );
  const [dbPostUrl, setDbPostUrl] = useState<string | undefined>("");

  const addUrl = async (url: string) => {
    db.postUrl.clear();
    db.postUrl.add({ url });
  };

  const handleGotPostUrl = useCallback((url: string) => {
    console.log(`handleGotPostUrl : ${url}`);
    setPostUrl(url);
    addUrl(url);
  }, []);

  // --
  useEffect(() => {
    if (forceFlag) {
      setForceFlag(false);
      getPostUrl(handleGotPostUrl);
    } else if (dbPostUrl === undefined) {
      getPostUrl(handleGotPostUrl);
    } else if (dbPostUrl === recoilPostUrl) {
      // nothing to do.
    } else if (recoilPostUrl !== "/") {
      // nothing to do.
    } else {
      setPostUrl(dbPostUrl);
    }
  }, [firstRef, dbPostUrl, forceFlag]);

  return <></>;
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

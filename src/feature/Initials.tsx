import React, { useCallback, useEffect, useMemo } from "react";

import { getUrl } from "@/network/get";
import {
  BABUTCHI_IS_LOCAL_MODE,
  BABUTCHI_REQUEST_URL,
  useLocalStorageState,
} from "@/util/LocalStorageUtil";

// -- クッキーなどから情報を取り出したりetc.
const Initials: React.FC = () => {
  // --
  const [isLocalMode] = useLocalStorageState(BABUTCHI_IS_LOCAL_MODE);
  const [, setUrl] = useLocalStorageState(BABUTCHI_REQUEST_URL);

  // -- on mount
  useEffect(() => {
    // -- MEMO: 自分用ローカル環境で、毎回URLを設定するの面倒だから備えつけのJSONから取ってこさせる古い設計が残っている
    // ---- まぁ、ビルド時にOMITするように設計すりゃいいか。
    if (isLocalMode === "true") {
      getUrl(setUrl);
    }
  }, [isLocalMode]);

  return <div />;
};

export default Initials;

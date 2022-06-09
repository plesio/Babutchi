import React, { useCallback, useEffect, useMemo } from "react";

import { getUrl } from "@/network/get";
import { useCookies } from "react-cookie";
import {
  BABUTCHI_IS_LOCAL_MODE,
  BABUTCHI_LAST_MILK,
  BABUTCHI_REQUEST_URL,
  MAX_AGE_10_YEARS,
} from "@/util/CookieUtil";

// -- クッキーなどから情報を取り出したりetc.
const Initials: React.FC = () => {
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
  }, [cookies]);

  // -- callback
  const handleUrl = useCallback(
    (url: string) => {
      setCookie(BABUTCHI_REQUEST_URL, url, {
        sameSite: "strict",
        maxAge: MAX_AGE_10_YEARS /* 10 years */,
        secure: isLocalMode ? true : undefined,
      });
    },
    [setCookie]
  );

  // -- on mount
  useEffect(() => {
    // -- MEMO: 自分用ローカル環境で、毎回URLを設定するの面倒だから備えつけのJSONから取ってこさせる古い設計が残っている
    // ---- まぁ、ビルド時にOMITするように設計すりゃいいか。
    if (isLocalMode) {
      getUrl(handleUrl);
    }
  }, [isLocalMode]);

  return <div/>
};

export default Initials;

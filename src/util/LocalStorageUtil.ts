import { useEffect, useState } from "react";

/// ---

// -- 最後のミルク情報をLocalStorageで覚える
export const BABUTCHI_LAST_MILK = "BABUTCHI_LAST_MILK";

// -- 自身でデプロイした GAS の接続先をLocalStorageで覚える
export const BABUTCHI_REQUEST_URL = "BABUTCHI_REQUEST_URL";

// -- 従来のローカルで運用するとき用のフラグをLocalStorageで覚える
export const BABUTCHI_IS_LOCAL_MODE = "BABUTCHI_IS_LOCAL_MODE";

/// ---

export const useLocalStorageState = (
  key: string,
  defaultValue?: string
): [string, (value: string) => void] => {
  const [value, setValue] = useState<string>(defaultValue || "");

  useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);
    if (stickyValue) {
      setValue(`${stickyValue}`);
    }
  }, [key]);

  useEffect(() => {
    if (value !== "") {
      // -- defaultUndefinedでなくなったらセーブする
      window.localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];
};

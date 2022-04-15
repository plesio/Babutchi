import { Babu } from "@/model/BabuModel";
import AppConfig from "AppConfig";

export const postBabu = (
  babu: Babu,
  callbackFetch: (txt: string) => void
): void => {
  const postUrl = `${AppConfig.POST_URL}?user=${babu.user.id}&event=${babu.event.id}`;
  // POST送信
  fetch(postUrl, {
    method: "POST",
    mode: "no-cors",
    // mode: AppConfig.REQUEST_INIT_MODE,
    cache: "no-cache",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json; charset=utf-8" },
  }).then(
    function (response) {
      // レスポンス結果
      callbackFetch(`${response.status}`);
    },
    function (error) {
      // エラー内容
      callbackFetch(`${error}`);
    }
  );
};

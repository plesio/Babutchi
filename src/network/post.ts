import { Babu } from "@/model/BabuModel";

export const postBabu = (
  babu: Babu,
  postUrlBase: string,
  callbackFetch: (txt: string) => void
): void => {
  const postUrl = `${postUrlBase}?user=${babu.user.id}&event=${babu.event.id}`;
  // POST送信
  fetch(postUrl, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json; charset=utf-8" }
  }).then(
    function(response) {
      // レスポンス結果
      callbackFetch(`${response.status}`);
    },
    function(error) {
      // エラー内容
      callbackFetch(`${error}`);
    }
  );
};

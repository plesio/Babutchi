import { LastMilkEvent } from "@/feature/LastMilk";

export interface UrlsJson {
  url: string;
}

export const getUrl = (callbackFetch: (urls: string) => void): void => {
  // GET送信
  fetch("/post_url.json", {
    method: "GET",
    mode: "no-cors",
    // cache: "default",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
    .then((res) => res.json())
    .then((json: UrlsJson) => callbackFetch(json.url))
    .catch((e) => {
      console.error(e);
      callbackFetch("/");
    });
};

export interface GotEvent {
  event: string;
  time: string;
}

// memo: https://www.sambaiz.net/article/319/

export const getLastMilk = (
  postUrlBase: string,
  callbackFetch: (result: LastMilkEvent) => void
): void => {
  // GET送信
  fetch(postUrlBase, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    // referrerPolicy: "no-referrer",
    // redirect:"manual",
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
    .then((res) => res.text())
    .then((txt) => JSON.parse(txt))
    .then((json: GotEvent) => callbackFetch(json))
    .catch((e) => {
      console.error(e);
      callbackFetch({ event: "", time: "" });
    });
};

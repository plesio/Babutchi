export interface UrlsJson {
  url: string;
}

export const EMPTY_URLS = {post_record_url: "/", reload_last_milk_url: "/"}

export const getUrl = (
  callbackFetch: (urls: string) => void
): void => {
  // GET送信
  fetch("/post_url.json", {
    method: "GET",
    mode: "no-cors",
    // cache: "default",
    referrerPolicy: "no-referrer",
    headers: {"Content-Type": "application/json; charset=utf-8"}
  }).then(res => res.json())
    .then((json: UrlsJson) => callbackFetch(json.url))
    .catch(e => {
      console.error(e);
      callbackFetch("/");
    });
};

interface LastMilk {
  last_milk: string;
}

// memo: https://www.sambaiz.net/article/319/

export const getLastMilk = (
  postUrlBase: string,
  callbackFetch: (result: string) => void
): void => {
  // GET送信
  fetch(postUrlBase, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    // referrerPolicy: "no-referrer",
    // redirect:"manual",
    headers: {"Content-Type": "text/plain; charset=utf-8"}
  }).then(res => res.text())
    .then(txt => JSON.parse(txt))
    .then((json: LastMilk) => callbackFetch(json.last_milk))
    .catch(e => {
      console.error(e);
      callbackFetch("");
    });
}

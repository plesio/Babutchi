interface PostUrlJson {
  url: string;
}

export const getPostUrl = (
  callbackFetch: (url: string) => void
): void => {
  // POST送信
  fetch("/post_url.json", {
    method: "GET",
    mode: "no-cors",
    // cache: "default",
    referrerPolicy: "no-referrer",
    headers: { "Content-Type": "application/json; charset=utf-8" }
  }).then(res => res.json())
    .then((json: PostUrlJson) => callbackFetch(json.url))
    .catch(e => {
      console.error(e);
      callbackFetch("/");
    });
};

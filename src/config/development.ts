// -- for development server mode.
// noinspection JSUnusedGlobalSymbols

export default {
  IS_DEVELOPMENT_MODE: true,
  REQUEST_INIT_MODE: "no-cors" as RequestMode,
  REQUEST_CREDENTIALS_MODE: "omit" as RequestCredentials,
  // -- 環境に応じて書き換える
  POST_URL:
    "https://script.google.com/macros/s/XXXXXXXXX/exec",
} as const;

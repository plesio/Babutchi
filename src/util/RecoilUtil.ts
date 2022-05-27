import {OpenSnackBarProps} from "@/component/CommonSnackBar";
import {atom} from "recoil";
import {EMPTY_URLS, UrlsJson} from "@/network/get";

export const UrlsJsonStatus = atom<string>({
  key: "url_status",
  default: "/"
});

export const CommonSnackBarStatus = atom<OpenSnackBarProps>({
  key: "open_snackbar",
  default: {text: "", open: false}
});

export const BabuPostStatus = atom<boolean>({
  key: "babu_post_status",
  default: false
});


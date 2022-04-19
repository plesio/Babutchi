import { OpenSnackBarProps } from "@/component/CommonSnackBar";
import { atom } from "recoil";

export const PostDataUrlStatus = atom<string>({
  key: "post_data_status",
  default: "/"
});

export const CommonSnackBarStatus = atom<OpenSnackBarProps>({
  key: "open_snackbar",
  default: { text: "", open: false }
});

export const BabuPostStatus = atom<boolean>({
  key: "babu_post_status",
  default: false
});


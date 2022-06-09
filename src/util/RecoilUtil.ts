import { OpenSnackBarProps } from "@/component/CommonSnackBar";
import { atom } from "recoil";

export const CommonSnackBarStatus = atom<OpenSnackBarProps>({
  key: "open_snackbar",
  default: { text: "", open: false },
});

export const BabuPostStatus = atom<boolean>({
  key: "babu_post_status",
  default: false,
});

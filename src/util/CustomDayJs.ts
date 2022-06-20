import dayjs from "dayjs";
import "dayjs/locale/ja";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

// extend
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

// locale (JST)
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

export default dayjs;

/* eslint-disable */

// -- MEMO:GAS 生成時は .gs ファイルとなる

function doPost(event) {
  // eslint-disable-next-line no-undef
  const sheet = SpreadsheetApp.getActive().getSheetByName(
    ReportConst_.TARGET_SHEET_NAME
  );
  // -- get type from query parameter
  const postType = convertPostType_(`${event?.parameter?.type}`);
  if (postType === PostType.record.id) {
    // -- query parameter
    const userName = convertName_(`${event.parameter.user}`);
    const eventName = convertEvent_(`${event.parameter.event}`);
    const optName = convertOpt_(event.parameter.opt);
    writeRecordFromPost_(sheet, userName, eventName, optName);
  } else {
    // -- summary
    // eslint-disable-next-line no-undef
    omuSummaryFunction();
  }
}

function doGet() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(
    ReportConst_.TARGET_SHEET_NAME
  );
  const lastRow = sheet
    .getRange(sheet.getMaxRows(), 1)
    .getNextDataCell(SpreadsheetApp.Direction.UP)
    .getRow();
  let response = { event: "", time: "" };

  for (let row = lastRow; 10 < row; row = row - 1) {
    let val = sheet.getRange(row, 3).getValue();
    if (
      val === EventType.mother_milk_left.name ||
      val === EventType.mother_milk_right.name ||
      val === EventType.milk.name
    ) {
      response.time = sheet.getRange(row, 1).getValue();
      response.time = response.time?.replace(/\(.*\) /g, "");
      response.event =
        EventTypeArray.find((e) => e.name === sheet.getRange(row, 3).getValue())
          ?.id || "";
      break;
    }
  }
  const payload = JSON.stringify(response);
  let output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.TEXT);
  output.setContent(payload);
  // return response-data
  return output;
}

///

const ReportConst_ = (function () {
  const _a = {
    TARGET_SHEET_NAME: "おむ",
  };
  Object.freeze(_a);
  return _a;
})();

///

const writeRecordFromPost_ = (sheet, userName, eventName, optName) => {
  //
  const newLastRow = sheet.getLastRow() + 1;
  const timeCell = sheet.getRange(newLastRow, 1);
  const reportCell = sheet.getRange(newLastRow, 2);
  const eventCell = sheet.getRange(newLastRow, 3);
  const optCell = sheet.getRange(newLastRow, 4);
  // --
  // eslint-disable-next-line no-undef
  const formatDate = Utilities.formatDate(
    new Date(),
    "JST",
    "yyyy/MM/dd (E) HH:mm:ss"
  );
  // --
  timeCell.setValue(formatDate);
  reportCell.setValue(userName);
  eventCell.setValue(eventName);
  optCell.setValue(optName);
};

/** @param {string} src */
const convertPostType_ = (src) => {
  const ret = PostTypeArray.find((it) => it.id === src)?.id;
  if (ret === undefined) {
    return PostType.record.id;
  }
  return ret;
};

/** @param {string} src */
const convertName_ = (src) => {
  return UserTypeArray.find((it) => it.id === src)?.name;
};

/** @param {string} src */
const convertEvent_ = (src) => {
  return EventTypeArray.find((it) => it.id === src)?.name;
};

/** @param {string} src */
const convertOpt_ = (src) => {
  return src !== "_" ? src : "";
};

const UserType = {
  father: { id: "father", name: "父" },
  mother: { id: "mother", name: "母" },
  mother_grandma: { id: "mother_grandma", name: "祖母" },
};
const UserTypeArray = Object.entries(UserType).map(([_, value]) => ({
  id: value.id,
  name: value.name,
}));

const EventType = {
  pee: { id: "pee", name: "おしっこ" },
  poop: { id: "poop", name: "うんち" },
  sleep: { id: "sleep", name: "おやすみ" },
  wake_up: { id: "wake_up", name: "おはよう" },
  mother_milk_left: { id: "mother_milk_left", name: "おっぱい左" },
  mother_milk_right: { id: "mother_milk_right", name: "おっぱい右" },
  milk: { id: "milk", name: "ミルク" },
};
const EventTypeArray = Object.entries(EventType).map(([_, value]) => ({
  id: value.id,
  name: value.name,
}));

const PostType = {
  record: { id: "record", name: "" },
  summary: { id: "summary", name: "" },
};
const PostTypeArray = Object.entries(PostType).map(([_, value]) => ({
  id: value.id,
  name: value.name,
}));

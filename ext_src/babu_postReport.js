// -- MEMO:GAS 生成時は .gs ファイルとなる

function doPost(event) {
  // -- query parameter
  const userName = convertName(`${event.parameter.user}`);
  const eventName = convertEvent(`${event.parameter.event}`);
  const optName = convertOpt(event.parameter.opt);
  //
  // eslint-disable-next-line no-undef
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
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
}

function doGet() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
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

/** @param {string} src */
const convertName = (src) => {
  return UserTypeArray.find((it) => it.id === src)?.name;
};

/** @param {string} src */
const convertEvent = (src) => {
  return EventTypeArray.find((it) => it.id === src)?.name;
};

/** @param {string} src */
const convertOpt = (src) => {
  return src !== "_" ? src : "";
};

// -- 記録するシート名を記述.
const SHEET_NAME = "おむ";

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

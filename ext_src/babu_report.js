// -- MEMO:GAS 生成時は .gs ファイルとなる

function doPost(event) {
  // -- query parameter
  const userName = convertName(`${event.parameter.user}`);
  const eventName = convertEvent(`${event.parameter.event}`);
  //
  // eslint-disable-next-line no-undef
  const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME);
  const newLastRow = sheet.getLastRow() + 1;
  const timeCell = sheet.getRange(newLastRow, 1);
  const reportCell = sheet.getRange(newLastRow, 2);
  const eventCell = sheet.getRange(newLastRow, 3);
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
}

const convertName = (src) => {
  return UserTypeArray.find(it => it.id === src)?.name;
};

const convertEvent = (src) => {
  return EventTypeArray.find(it => it.id === src)?.name;
};

// -- 記録するシート名を記述.
const SHEET_NAME = "おむ";

const UserType = {
  father: {id: "father", name: "父"},
  mother: {id: "mother", name: "母"},
  mother_grandma: {id: "mother_grandma", name: "祖母"},
};
const UserTypeArray = Object.entries(UserType).map(([_, value]) => ({"id": value.id, "name": value.name}));

const EventType = {
  pee: {id: "pee", name: "おしっこ"},
  poop: {id: "poop", name: "うんち"},
  sleep: {id: "sleep", name: "おやすみ"},
  wake_up: {id: "wake_up", name: "おはよう"},
  mother_milk_left: {id: "mother_milk_left", name: "おっぱい左"},
  mother_milk_right: {id: "mother_milk_right", name: "おっぱい右"},
  milk: {id: "milk", name: "ミルク"}
};
const EventTypeArray = Object.entries(EventType).map(([_, value]) => ({"id": value.id, "name": value.name}));
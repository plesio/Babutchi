/* eslint-disable */
function omuSummaryFunction() {
  // eslint-disable-next-line no-undef
  const omuSheet = SpreadsheetApp.getActive().getSheetByName(
    SummaryConst_.FROM_SHEET_NAME
  );
  const map = buildMap_(omuSheet);

  // eslint-disable-next-line no-undef
  const omuSamSheet = SpreadsheetApp.getActive().getSheetByName(
    SummaryConst_.TARGET_SHEET_NAME
  );
  writeSummary_(omuSamSheet, map);
}

///

const SummaryConst_ = (function () {
  const _a = {
    FROM_SHEET_NAME: "おむ",
    TARGET_SHEET_NAME: "おむさまり",
  };
  Object.freeze(_a);
  return _a;
})();

///

// Rangeオブジェクトの値をチェックして結果をメモに設定する
const buildMap_ = (sheet) => {
  // -- MEMO : getRange(行番号, 列番号, 行数, 列数)
  const recordArray = sheet.getRange(10, 1, sheet.getLastRow(), 4).getValues();
  // ret.
  const map = new Map();

  recordArray.forEach((record) => {
    const dateStr = `${record[0]}`;
    const formatDateKey = convertTime_(dateStr, "yyyy/MM/dd");
    // --
    if (!map.get(formatDateKey)) {
      map.set(formatDateKey, {
        おっぱい: 0,
        おっぱい時刻: [],
        おしっこ: 0,
        うんち: 0,
      });
    }
    const summaryObj = map.get(formatDateKey);
    // --
    const t = `${record[2]}`;
    if (t === E_Type.pee.name) {
      summaryObj["おしっこ"] = summaryObj["おしっこ"] + 1;
    } else if (t === E_Type.poop.name) {
      summaryObj["うんち"] = summaryObj["うんち"] + 1;
    } else if (t === E_Type.fart.name) {
      // nothing to do.
    } else {
      summaryObj["おっぱい"] = summaryObj["おっぱい"] + 1;
      // -- 時間を分に変換した値を配列格納する。
      const minutes = `${convertTime_(dateStr, "hh:mm")}`.split(":");
      summaryObj["おっぱい時刻"] = [
        ...summaryObj["おっぱい時刻"],
        minutes[0] * 60 + minutes[1] * 1,
      ];
    }
  });

  // -- safe
  map.delete("1970/01/01");

  return map;
};

const E_Type = {
  pee: { id: "pee", name: "おしっこ" },
  poop: { id: "poop", name: "うんち" },
  fart: { id: "fart", name: "おなら" },
  mother_milk_left: { id: "mother_milk_left", name: "おっぱい左" },
  mother_milk_right: { id: "mother_milk_right", name: "おっぱい右" },
};

const writeSummary_ = (sheet, map) => {
  let rowNo = 2;
  map.forEach((value, key, map) => {
    const dateCell = sheet.getRange(rowNo, 1);
    dateCell.setValue(key);

    const oshikkoCell = sheet.getRange(rowNo, 2);
    oshikkoCell.setValue(value["おしっこ"]);

    const unchiCell = sheet.getRange(rowNo, 3);
    unchiCell.setValue(value["うんち"]);

    const oppaiCell = sheet.getRange(rowNo, 4);
    oppaiCell.setValue(value["おっぱい"]);

    const oppaiBetCell = sheet.getRange(rowNo, 5);
    oppaiBetCell.setValue(convertAveMinutes_(value["おっぱい時刻"]));
    // const oppaiBetCellDebug = sheet.getRange(rowNo, 6);
    // oppaiBetCellDebug.setValue(arrayToString_(value["おっぱい時刻"]));
    // --
    rowNo++;
  });
};

/**
 * getValue() の String をDateに変換する.
 * @param {string} value
 * @param {string} format
 */
const convertTime_ = (value, format) => {
  // eslint-disable-next-line no-undef
  const formatDate = Utilities.formatDate(new Date(value), "JST", format);
  return formatDate;
};

/**
 * @param {Array<number>} array
 */
const convertAveMinutes_ = (array) => {
  const size = array.length;
  if (size < 2) {
    return 0;
  }
  let ret = 0;
  let count = 0;
  array.sort((a, b) => a - b);
  for (let i = 1; i < size; i++) {
    ret += array[i] - array[i - 1];
    count++;
  }
  const r = (ret / count).toFixed(0);
  return `${(r / 60).toFixed(0)}:${(r % 60).toFixed(0).padStart(2, "0")}`;
};

/**
 * @param {Array<number>} array
 */
const arrayToString_ = (array) => {
  let str = "";
  array.forEach((val) => {
    str += "," + val;
  });
  return ` [${str.substring(1)}] `;
};

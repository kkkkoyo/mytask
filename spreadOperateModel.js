// チェックボックスを作成する
function makeCheckbox(row,col,sheet,ss) {
  var sheetId = sheet.getSheetId();
  var resource = {"requests": [
    {
      "repeatCell": {
        "cell": {"dataValidation": {"condition": {"type": "BOOLEAN"}}},
        "range": {"sheetId": sheetId, "startRowIndex": row, "endRowIndex": row, "startColumnIndex": col, "endColumnIndex": col},
        "fields": "dataValidation",
      },
    },
  ]};
  Sheets.Spreadsheets.batchUpdate(resource, ss.getId());
}

// 複数のチェックボックスを作成する
function makeCheckbox(startRow,endRow,startCol,endCol,sheet,ss) {
  var sheetId = sheet.getSheetId();
  var resource = {"requests": [
    {
      "repeatCell": {
        "cell": {"dataValidation": {"condition": {"type": "BOOLEAN"}}},
        "range": {"sheetId": sheetId, "startRowIndex": startRow, "endRowIndex": endRow, "startColumnIndex": startCol, "endColumnIndex": endCol},
        "fields": "dataValidation",
      },
    },
  ]};
  Sheets.Spreadsheets.batchUpdate(resource, ss.getId());
}
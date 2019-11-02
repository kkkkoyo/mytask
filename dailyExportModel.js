/*
  シートの作成
*/

function createWeeklySheet(newSheetName) {

  // 現在のスプレッドシートの取得
  var ss_active_all = SpreadsheetApp.getActiveSpreadsheet();

  if(ss_active_all.getSheetByName(newSheetName)){
    // すでにシートが存在する。
    return;
  }
  // 書出シートの作成（weekly_tmpのコピー作成）
  var ss_sheet_temp = ss_active_all.getSheetByName("w_tmp");
  var ss_sheet_copy = ss_sheet_temp.copyTo(ss_active_all);
  ss_sheet_copy.activate();

  // コピーしたシートの名前変更
  ss_sheet_copy.setName(newSheetName); // 自由に命名
  // 4番目のindexに追加
  ss_active_all.moveActiveSheet(4);
}

/*
  シートの中身を記述
*/
function writeWeeklySheet(SheetName) {
  // logシートを取得
  // logシートから今日の日付の物を記載
    // 現在のスプレッドシートの取得
    var ss_active_all = SpreadsheetApp.getActiveSpreadsheet();
    var writeSheet = ss_active_all.getSheetByName(SheetName);
    var logSheet = ss_active_all.getSheetByName("log");

    // var arrData = getLogSheet(logSheet);
    // Logger.log(arrData);
    write(ss_active_all,writeSheet,arrayData);
}

function write(ss_active_all,writeSheet,arrData) {
  
    // 書き込む行数を取得
    var insertRows = arrData.length;
    
    if(insertRows == null) {
      insertRows = 0;
    }
    // setInitRow行目に挿入
    if(insertRows == 0) {
      return ;
    }
    writeSheet.insertRows(setWriteSheetInitRow,insertRows);
     // 値をセット
  
    makeCheckbox(setWriteSheetInitRow - 1,setWriteSheetInitRow + insertRows - 1,statusCol-1,statusCol,writeSheet,ss_active_all);   
    writeSheet.getRange(setWriteSheetInitRow,setInitCol,insertRows,8).setValues(arrData);
}

// logシートの中身を取得
// 何行目から挿入するか
let: setWriteSheetInitRow = 4;
// 何行目から挿入するか
let: _setInitRow = 2;
// 日付のcol
let: dateCol = 1;
let: statusCol = 6;
let: setInitCol = 1;

// id	task	detail	status	memo を返す
function getLogSheet(logSheet) {
     
  var array = [];
  // .splice(配列番号, 削除する要素数, 追加する要素1, 追加する要素2, …)
  var getLastRow = logSheet.getLastRow() + 1;
  
  if(getLastRow < _setInitRow + 1) {
    getLastRow = _setInitRow + 1;
  }
  
  var dateRange = logSheet.getRange(_setInitRow,dateCol,getLastRow - _setInitRow);
  var dateCols = dateRange.getValues();

  for(var i=1;i<=dateCols.length;i++) {
      // 今日の日付を取得
      if(dateCols[i-1] == "_"+getDate()) {
        var weekDay = logSheet.getRange(i+1,2,i).getValues();
        var id = logSheet.getRange(i+1,3,i).getValues();
        var task = logSheet.getRange(i+1,4,i).getValues();
        var detail = logSheet.getRange(i+1,5,i).getValues();
        var status = logSheet.getRange(i+1,6,i).getValues();
        var memo = logSheet.getRange(i+1,7,i).getValues();
        var ojtMemo = logSheet.getRange(i+1,8,i).getValues();
        array.push([getDate(),weekDay,id,task,detail,status,memo,ojtMemo]);
      }
  }
  return array;
 }
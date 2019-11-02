function myFunction(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // 全体俯瞰用 (全体を記載)
    exportDaily(ss,'daily',false);
    exportDaily(ss,'log',true);
    // dailyを記録するためのログ (未完了も記載)
    // logは、未完了→完了は記載するようにする
}
  
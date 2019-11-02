function myFunction(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    exportDaily(ss,'daily',false);
    exportDaily(ss,'log',true);
    exportWeekly();
}
  
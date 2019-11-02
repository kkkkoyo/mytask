
// 
/*
月曜日は新しいシートを作成
その後は、そのシートへ書き足していく
基本的に、logからコピーする。
*/
function exportWeekly(){

    var date = new Date();
    var dayOfWeek = date.getDay();
    var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];
    var sheetName = "";

    if(dayOfWeek == 0) {
        sheetName = getAfterDay(-6) + "-" + getAfterDay(-2);
    }else {
        sheetName = getAfterDay(1-dayOfWeek) + "-" + getAfterDay(1-dayOfWeek-2);
    }
    createWeeklySheet(sheetName);

    // シートの中身を作成
    writeWeeklySheet(sheetName);
}
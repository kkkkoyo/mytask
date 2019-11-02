
// 日付を返す
function getDate() {
  var formatDate = Utilities.formatDate(new Date(), "JST","yyyy/MM/dd");
  return formatDate;
}


// 曜日を返す
function getDayOfWeek() {
  var date = new Date();
  var dayOfWeek = date.getDay();
  var dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek];
  Logger.log(dayOfWeekStr);
  return "(" + dayOfWeekStr + ")"
}
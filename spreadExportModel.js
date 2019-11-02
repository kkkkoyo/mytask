// 何行目から挿入するか
let: setInitRow = 2;

// 書き込む列数を取得
let: insertCols = 7;

let: detailIdCol = 3;
let: statusCol = 6;
let: idCol = 3;

var sheetName;
var isWriteLog = false;

// 日報書き出し
function exportDaily(ss,sheetName,isWriteLog){
  
  var arrData = []; 
  var taskList = []; 
  var dailySheet = ss.getSheetByName(sheetName);
  
  this.isWriteLog = isWriteLog;
  this.sheetName = sheetName
  // どこの列からセットするか
  var setInitCol = 1;
  
  var arrData = getTaskList(setInitRow);
  Logger.log(arrData);

  // 書き込む行数を取得
  var insertRows = arrData.length;
  
  if(insertRows == null) {
    insertRows = 0;
  }
  
  // makeCheckbox(insertRows,insertCols,dailySheet,ss);
  
  // setInitRow行目に挿入
  if(insertRows == 0) {
    return ;
  }
  dailySheet.insertRows(setInitRow,insertRows);
   // 値をセット

  makeCheckbox(setInitRow - 1,setInitRow + insertRows - 1,statusCol - 1,statusCol,dailySheet,ss);   
  dailySheet.getRange(setInitRow,setInitCol,insertRows,insertCols).setValues(arrData);
}


// https://www.virment.com/use-google-tasks-from-script/
function getTaskLists() {
  var taskLists = Tasks.Tasklists.list().getItems();
  if (!taskLists) {
    return [];
  }
  return taskLists.map(function(taskList) {
    return {
      id: taskList.getId(),
      name: taskList.getTitle()
    };
  });
}

/*
 タスクリストからタスク一覧を取得する
 指定した１つのタスクリストに含まれる全てのタスクのID、nタイトル、メモ、状態（完了済 or 未完了）を取得します。
 ※ 作成日順に降順で格納される　
 
 notes:タスクのメモ
 comleted:完了済みかどうか
*/
function getTask(tasks) {

  if (!tasks) {
    return [];
  }
  return tasks.map(function(task) {
    return {
      id: task.getId(),
      title: task.getTitle(),
      notes: task.getNotes(),
      completed: Boolean(task.getCompleted())
    };
  }).filter(function(task) {
    return task.title;
  });
}

/*
 タスクリストからタスク一覧を取得する
 指定した１つのタスクリストに含まれる全てのタスクのID、nタイトル、メモ、状態（完了済 or 未完了）を取得します。
 ※ 作成日順に降順で格納される　
 
 notes:タスクのメモ
 comleted:完了済みかどうか
*/
function getTasks(taskListId) {
  var tasks = Tasks.Tasks.list(taskListId).getItems();
  if (!tasks) {
    return [];
  }
  return tasks.map(function(task) {
    return {
      id: task.getId(),
      title: task.getTitle(),
      notes: task.getNotes(),
      completed: Boolean(task.getCompleted())
    };
  }).filter(function(task) {
    return task.title;
  });
}

// id	task	detail	status	memo を返す
function getTaskList(setInitRow) {
   
   var ssDaily = SpreadsheetApp.getActive().getSheetByName(this.sheetName);

   var myTaskLists = getTaskLists();   
   var ary = [];
   
   var getLastRow = ssDaily.getLastRow() + 1;
   
   if(getLastRow < setInitRow + 1) {
     getLastRow = setInitRow + 1;
   }
   
   var statusRange = ssDaily.getRange(setInitRow,statusCol,getLastRow - setInitRow);
   var idColRange = ssDaily.getRange(setInitRow,idCol,getLastRow - setInitRow);
   
   var statusCols = idColRange.getValues();
   var idCols = idColRange.getValues();
      
   for(var i=0;i<myTaskLists.length;i++) {
   
     var taskId = myTaskLists[i].id;
     var tasks = Tasks.Tasks.list(taskId).getItems();
     var task = myTaskLists[i].name;
     
     for(var j = 0;j < getTask(tasks).length; j++) {

       var status = getTask(tasks)[j].completed;
       var id = getTask(tasks)[j].id;

       // 完了していないものは載せない
       // if(!status) {
        //  continue;
       // }
       
       var isBreak = false;
              
       // idが既に記入済みのものだったら、記載しない
       for(var getIdCols = 0;getIdCols < idCols.length; getIdCols++) {
                      
           if(id == idCols[getIdCols]) {
              Logger.log(id+ ":===:" +idCols[getIdCols]);
              isBreak = true;
           }else {
             Logger.log(id+ "::" +idCols[getIdCols]);
           }
       }
       if(isBreak) {
         continue;
       }
       
                
       var detail = getTask(tasks)[j].title;
       var notes = getTask(tasks)[j].notes;
       
       Logger.log(notes);
       
       if(notes == null) {
        notes = "";
       }
        ary.push([getDate(),getDayOfWeek(),id,task,detail,status,notes]);
     }
  }
  
  return ary;
}

// 特定のシートのメモ化を行う関数
function getDailySheet() {

if (getMainSheet.memoSheet) {
    return getMainSheet.memoSheet; 
  }

  getMainSheet.memoSheet = SpreadsheetApp.getActive().getSheetByName(this.sheetName);
  return getMainSheet.memoSheet;
}
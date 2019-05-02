


// function getLogs() {
//     var response = UrlFetchApp.fetch("https://jsonplaceholder.typicode.com/posts");
//     var json = response.getContentText();
//     var data = JSON.parse(json);
//     var sheet = SpreadsheetApp.getActiveSheet();
  
    
//   //  Logger.log(data);
//   //  Logger.log(data[2]["body"]);
    
//     for (var i=0; i < data.length; i++) {
//       //counter for what row we need to add our data to
//       var counter = 1;
      
//       //parsing our object for our data to insert
//       var moderator = data[i]["body"];
//   //    var action = data[i]["action"];
//   //    var user = data[i]["user"];
//   //    var reason = data[i]["reason"];
//   //    var timestamp = data[i]["timestamp"];
      
//       sheet.getRange(sheet.getLastRow() + counter, 1).setValue([moderator]);
//   //    sheet.GetRange(sheet.getLastRow() + counter, 2).setValue([action]);
//   //    sheet.GetRange(sheet.getLastRow() + counter, 3).setValue([user]);
//   //    sheet.GetRange(sheet.getLastRow() + counter, 4).setValue([reason]);
//   //    sheet.GetRange(sheet.getLastRow() + counter, 5).setValue([timestamp]);
  
//       counter++;
      
//     }
      
//   };
  
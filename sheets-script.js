function getLogs() {
    //  initialize variables
    var response = UrlFetchApp.fetch("YOUR API_URL HERE");
    var json = response.getContentText();
    var data = JSON.parse(json);
    var sheet = SpreadsheetApp.getActiveSheet();
    var dataFilteredByDate = [];

    //  filter our data so we don't get duplicates on our spreadsheet
    for (var i = 0; i < data.length; i++) {
        //    iterate thru the all the timestamps
        let itemDate = data[i]["timestamp"]
        //    if we find a timestamp that's greater than the latest entry on our sheet, we push it to an array of data we'll use
        if (itemDate > sheet.GetRange(sheet.getLastRow(), 5)) {
            dataFilteredByDate.push(item)
        }
    }


    for (var i = 0; i < dataFilteredByDate.length; i++) {
        //counter for what row we need to add our filtered data to
        var counter = 1;

        //parsing our object for our data to insert
        var moderator = dataFilteredByDate[i]["moderator"];
        var action = dataFilteredByDate[i]["action"];
        var user = dataFilteredByDate[i]["user"];
        var reason = dataFilteredByDate[i]["reason"];
        var timestamp = dataFilteredByDate[i]["timestamp"];

        sheet.getRange(sheet.getLastRow() + counter, 1).setValue([moderator]);
        sheet.GetRange(sheet.getLastRow() + counter, 2).setValue([action]);
        sheet.GetRange(sheet.getLastRow() + counter, 3).setValue([user]);
        sheet.GetRange(sheet.getLastRow() + counter, 4).setValue([reason]);
        sheet.GetRange(sheet.getLastRow() + counter, 5).setValue([timestamp]);

        counter++;

    }

};

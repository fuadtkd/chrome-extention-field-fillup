$.getJSON("a.json", function(json) {  
 for(var j in json){
  if(document.title=== j) {

    for (var i in json[j]) {


        var myElem = document.getElementById(i);
        if (myElem === null)
            console.log("Element does not exist="+i);
        else {
            if (myElem.type == "text") {
                myElem.value = json[j][i];
            }
            if (myElem.type == "checkbox") {
                myElem.checked = true;
            }
            if (myElem.type == "radio") {
                myElem.checked = true;
            }
            if (myElem.type == "select-one") {
                myElem.selectedIndex = json[j][i];
            }
        }
    }
  }
}
});

$.getJSON("a.json", function(json) {


    var visualDomElts = document.body.getElementsByTagName('*');

    var testObject = ["M", "N"];

    var retrievedObject1 = localStorage.getItem('testObject' + document.title);

    var retrievedObject = JSON.parse(retrievedObject1)

    console.log(retrievedObject);

    for (i in visualDomElts) {
        if (document.getElementById(i) != null) {
            if (document.getElementById(i).type == 'text') {
                //alert(document.getElementById(i).value);

                if (document.getElementById(i).value.length < 1) {
                    /* Since this field is empty we need to
                       fill it up from 1) json file or 2) browser cache 3) Random
                    */

                    var flag = 0;

                    for (var ii = 0; ii < retrievedObject.length; ++ii) {

                        //console.log("F="+retrievedObject[ii]);
                        if (retrievedObject[ii] == i) {
                            document.getElementById(i).value = retrievedObject[ii + 1];
                            flag = 1;
                        }
                    }

                    if (flag == 0) {
                        // Now fill up from configuration file                     
                        for (var jk in json) {
                            if (document.title === jk) {

                                for (var ik in json[jk]) {
                                    //console.log(ik+' ='+json[jk][ik]);
                                    if (ik === i) {
                                        document.getElementById(i).value = json[jk][ik];
                                        flag = 1;
                                    }
                                }
                            }
                        }
                    }
                    if (flag == 0) {
                        document.getElementById(i).value = "Random";
                    }
                } else {
                    //  push this value to browser cache
                    testObject.push(i);
                    testObject.push(document.getElementById(i).value);

                }

            }
            if (document.getElementById(i).type == 'checkbox')
                document.getElementById(i).checked = true;
            if (document.getElementById(i).type == 'radio')
                document.getElementById(i).checked = true;
            if (document.getElementById(i).type == '"select-one"')
                document.getElementById(i).value = 1;
        }
    }


    //for(var ik in testObject)
    //  console.log("M="+ik);

    localStorage.setItem('testObject' + document.title, JSON.stringify(testObject));

});
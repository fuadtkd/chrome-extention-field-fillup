$.getJSON(chrome.extension.getURL("a.json"), function(json) {


    var visualDomElts = document.body.getElementsByTagName('*');

    var testObject = ["M", "N"];

    var radioArray =[];

    var retrievedObject1 = localStorage.getItem('testObject' + document.title);

    var retrievedObject = JSON.parse(retrievedObject1)

var data = document.getElementById("first page");
// JSON.parse does not evaluate the attacker's scripts.
var parsed = JSON.parse(data);

console.log("XXX="+parsed);


   // window.localStorage.clear();
    console.log(retrievedObject);
    var radioSelect =0;

if(retrievedObject!=null){
                    
    for (var ii = 0; ii < retrievedObject.length; ii+=2) {
        var oldPush=1;

       for(var jj=0;jj<testObject.length;jj+=2 )
       {
         if(retrievedObject[ii]==testObject[jj])
         {
           oldPush=0;
         }
       }
       if(oldPush==1)
       {
          testObject.push(retrievedObject[ii]);
          testObject.push(retrievedObject[ii+1]);
       }

    }
} 

    for (i in visualDomElts) {
       // console.log("M="+i);
        if (document.getElementById(i) != null) {
            if (document.getElementById(i).type == 'text'||document.getElementById(i).type == 'search'||document.getElementById(i).type =='tel'||document.getElementById(i).type =='password' || document.getElementById(i).type == 'email' || document.getElementById(i).type == 'search' || document.getElementById(i).type == 'url' || document.getElementById(i).type == 'number') {
                //alert(document.getElementById(i).value);
                
                if (document.getElementById(i).value.length < 1) {
                    /* Since this field is empty we need to
                       fill it up from 1) json file or 2) browser cache 3) Random
                    */

                   // console.log("i="+i+document.getElementById(i).value);

                    var flag = 0;
                    
                    if(retrievedObject!=null){
                    for (var ii = 0; ii < retrievedObject.length; ++ii) {

                        //console.log("F="+retrievedObject[ii]);
                        if (retrievedObject[ii] == i) {
                            document.getElementById(i).value = retrievedObject[ii + 1];
                            flag = 1;
                        }
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
                       
                       console.log("E="+document.getElementById(i).type);

                        if( document.getElementById(i).type =='email'){
                        document.getElementById(i).value = "random@test.com";
                        console.log("ÖK");
                        }
                        else if( document.getElementById(i).type =='url')
                        document.getElementById(i).value = "http://www.test.com";  
                        else if( document.getElementById(i).type =='number' )
                        document.getElementById(i).value = "19";  
                        else if( document.getElementById(i).type =='tel')
                        document.getElementById(i).value = "01900000000";  
                        else if( document.getElementById(i).type =='password')
                        document.getElementById(i).value = "hidden_password";   
                        else
                        document.getElementById(i).value = "Random";
                           
                    }
                } else {
                    //  push this value to browser cache
                    
                   var kk=0;
                 
                 if(retrievedObject!=null){
                   for(var r;r<retrievedObject.length;++r)
                   {
                     if (retrievedObject[r]==i)
                     {
                      kk=1;
                       retrievedObject[r+1]=document.getElementById(i).value;
                     }
                   }
                  }  
                   if (kk==0) {
                    testObject.push(i);
                    testObject.push(document.getElementById(i).value);
                   }
                }

            }
            if (document.getElementById(i).type == 'checkbox')
                document.getElementById(i).checked = true;
            if (document.getElementById(i).type == 'radio')
            {    
                if(document.getElementById(i).checked == true)
                {
                    testObject.push(i);
                    testObject.push(1);
                    radioSelect =1;
                }
                else
                {
                    radioArray.push(i);
                    radioArray.push(0);
                }    
            }
            if (document.getElementById(i).type == "select-one")
                document.getElementById(i).value = 1;
        }
    }

    if(radioSelect == 0)
    {    
       // first fill it up from previous history
        if(retrievedObject!=null){
                    
        for (var ii = 0; ii < retrievedObject.length; ii+=2) {
        
          if (document.getElementById(retrievedObject[ii])!=null && document.getElementById(retrievedObject[ii]).type == "radio")
             
            for (var ri = 0; ri < radioArray.length; ri+=2) {
             // console.log(radioArray[ri]);
               if(retrievedObject[ii] == radioArray[ri])
               {
                document.getElementById(retrievedObject[ii]).checked = true;
                radioSelect =1;
               } 
            }
        }
        }
       // now fill it up with random value
       
          if(radioSelect==0 && radioArray.length>0)
          {
                document.getElementById(radioArray[0]).checked = true; 
          }  
    
    }// end of radio select


    //for(var ik in testObject)
    //  console.log("M="+ik);

   console.log(testObject);
    

console.log(testObject);

    localStorage.setItem('testObject' + document.title, JSON.stringify(testObject));

});
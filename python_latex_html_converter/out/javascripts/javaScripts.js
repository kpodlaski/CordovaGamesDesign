// JavaScript Document
function getMonthNumber(monthName)
{
   var month = -1;
   if(monthName == "January")
   {
      month = 0;
   }
   else if(monthName == "February")
   {
      month = 1;
   }
   else if(monthName == "March")
   {
      month = 2;
   }
   else if(monthName == "April")
   {
      month = 3;
   }
   else if(monthName == "May")
   {
      month = 4;
   }
   else if(monthName == "June")
   {
      month = 5;
   }
   else if(monthName == "July")
   {
      month = 6;
   }
   else if(monthName == "August")
   {
      month = 7;
   }
   else if(monthName == "September")
   {
      month = 8;
   }
   else if(monthName == "October")
   {
      month = 9;
   }
   else if(monthName == "November")
   {
      month = 10;
   }
   else if(monthName == "December")
   {
      month = 11;
   }
   else
   {
      month = -1; // invalid month, so do not display message 
   }
   return month;
}


function Message(message, fromDay, fromMonthName, fromYear, toDay, toMonthName, toYear, url)
{
   // This function allows the user to place a mesage that is date protected for students.
   // The message will only be displayed within the date range passed to this function.
   //
   // Note that passing a value of "" as the url is allowed. In this case no link is activated.
      
   var today = new Date();
   
   var fromDate = new Date();
   fromDate.setDate(fromDay);
   fromDate.setMonth(getMonthNumber(fromMonthName));
   fromDate.setYear(fromYear);
     
   var toDate = new Date();
   toDate.setDate(toDay);
   toDate.setMonth(getMonthNumber(toMonthName));
   toDate.setYear(toYear);
     
   if((today >= fromDate) && (today <= toDate))
   {
      var outputStr = "<div align='center' style='background-color:#eeeedd;border:black thin solid;padding:5px'>" + "<big><strong>NOTE:</strong></big><br><br>";
      if(url.length > 0)
      {
         outputStr += "<a href='" + url + "' target='_top'>";   
      }
      outputStr += "<font size = '+1'>" + message + "</font></strong>";
      if(url.length > 0)
      {
         outputStr += "</a>";
      }
      outputStr += "<br><br>" + "</li>";
      document.write(outputStr);      
   }
}







function Base(message, neonbasecolor)
{
   if (document.all || document.getElementById)
   {
      for (m = 0; m < message.length; m++)
      { 
         document.write('<span id="neonlight' + m + '">' + message.charAt(m) + '</span>')
      }

   }
   else
   {
      document.write(message);
   }
}


function crossref(number)
{
   var crossobj = document.all? eval("document.all.neonlight" + number) : document.getElementById("neonlight" + number)
   return crossobj;
}

var n=0
var numberOfCycles = 0
var maxNumberOfCycles = 1
function neon(message, neonbasecolor, neontextcolor, flashspeed)
{
   //Change all letters to base color
   /*if (n == 0)
   {
      for (m = 0; m < message.length; m++)
      {
         //eval("document.all.neonlight"+m).style.color=neonbasecolor
         crossref(m).style.color = neonbasecolor;
      }
   }
*/
   //cycle through and change individual letters to neon color
   crossref(n).style.color = neontextcolor

   if (n < message.length - 1)
   {
      n++
   }
   else
   {
      numberOfCycles++
      if(numberOfCycles < maxNumberOfCycles)
      {
         n = 0
         clearInterval(flashing)
         setTimeout("beginneon('" + message + "','" + neonbasecolor + "','" + neontextcolor + "'," + flashspeed + ")",2000)
      }
      return
   }
}

function beginneon(message, neonbasecolor, neontextcolor, flashspeed)
{
   if (document.all || document.getElementById)
   flashing = setInterval("neon('" + message + "','" + neonbasecolor + "','" + neontextcolor + "'," + flashspeed + ")",flashspeed)
}

function (message)
{
   // this is used to display a subject  on the top of the contents. The text will flash onto the screen
   var neontextcolor = '#000';//'black';
   if(getUrlParameterValue("animate") == "false") // Just display message (do not scroll it)
   {
      Base(message, neontextcolor);
   }
   else // getUrlParameterValue("animate") == "true") OR 
        // getUrlParameterValue("animate") == "") i.e. not set, as page was called from an external site      
   {
      // scroll  message on the screen
      var flashSpeed = 100 // the higher the number, the slower the flash moves across the screen
      var neonbasecolor = '#ccc'; // starting colour of message
      
      Base(message, neonbasecolor);
      beginneon(message, neonbasecolor, neontextcolor, flashSpeed);
   }   
}

function getUrlParameterValue(searchParameterId)
{
   // get the url value that matches urlParameterId
   // if no parameter matches, then return and empty string
   var urlParameterValue = window.location.search;

   if(urlParameterValue.length > 0)
   {
      // check if searchParameterId exists in the urlParameter string
      if(urlParameterValue.indexOf(searchParameterId + "=") != -1)
      {
         // searchParameterId exists in the urlParameter string,
         // so trim everything to the left of its value
         urlParameterValue = urlParameterValue.substr(urlParameterValue.indexOf(searchParameterId + "=") + searchParameterId.length + 1, urlParameterValue.length);          
          
         // Trim any other parameter that might be to the right of searchParameterId
         if(urlParameterValue.indexOf(";") != -1)
         {
            urlParameterValue = urlParameterValue.substr(0, urlParameterValue.indexOf(";"));          
         }
      }
      else // searchParameterId does not exist in the urlParameter string, so return an empty string as the urlParameterValue
      {
         urlParameterValue = "";
      }
   }
   return(urlParameterValue);
}









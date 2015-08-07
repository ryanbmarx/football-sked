/*
  This script requires jQuery and UnderscoreJS ...
  
  <script type="text/javascript" src ="//code.jquery.com/jquery-2.1.4.min.js"></script>
  <script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>

*/


(function ($) {
  // MODIFY THESE TO TARGET A DIFFERENT SPREADSHEET
  var sheetKey = "1ztdofs5SzPdQW9Gt8orfJvW5vWGJGQZ8XvU0Tfw4pJY", // Google Sheet id
    tab = 2, // The sheets's first tab is No. 1
    activeWeek = 1; // You'll need a way to change this based on the project/week being viewed. I'd use jinja. This is how the border on the right side of the active week is removed

    $.get('https://spreadsheets.google.com/feeds/list/'+ sheetKey +'/'+ tab +'/public/values?alt=json', function(data){
    var schedule = data.feed.entry, // holder for the data
      pastScheduleTemplate = _.template($('#past').html()), //template for played games
      presentFutureTemplate = _.template($("#present-future").html()), // template for upcoming games
      parsedTemplateArray = [];

      for (i=0;i<schedule.length;i++){
        console.log("Now serving " + schedule[i]["gsx$team"]["$t"]);
      // Loop it here.
      if(schedule[i]["gsx$team"]["$t"] == "open"){
        // First check if it's the by week. If if is, then drop the "open" in there and move on
        parsedTemplateArray.push("<li class=\"open\"><h3>Open</h3></li>");
      } else {
        var active = ((i+1) == activeWeek) ? "active":"";
        console.log(i+1 == activeWeek);

        //If it's not the bye week, then first check and see if we 
        //need the past or present/future template
        if((schedule[i]["gsx$bearsscore"]["$t"] + schedule[i]["gsx$opponentscore"]["$t"]) > 0){
          // The game has been played
          parsedTemplateArray.push("<li class=" + active + ">"+pastScheduleTemplate(schedule[i])+"</li>");
        } else {
          // the game has not been played
          parsedTemplateArray.push("<li class=" + active + ">"+presentFutureTemplate(schedule[i])+"</li>");
        }
      }
    }


      // Fate out the loader (use whatever you want),
      // then drop the array of <li> items into the holder.
      // To make the flyin effect more neat, you could write a 
      // function that staggers the placement, one <li> at a time.
      $('#bears-sked .loading').fadeOut("fast", function(){
        $('#bears-sked ul').append(parsedTemplateArray);
      });
    }).error(function(){
      alert("There was an error loading the data. Please refresh.")   ;
    });
})(jQuery);

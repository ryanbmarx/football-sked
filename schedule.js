function viewport() {
  var e = window
  , a = 'inner';
  if ( !( 'innerWidth' in window ) )
  {
    a = 'client';
    e = document.documentElement || document.body;
  }
  return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

// This variable will be the cue whether to trigger mobile JS or not.
var onMobile;
function detectMobile(){
  if(viewport().width>768){
    onMobile = 'false';
    $('#bears-sked:hidden').css('display','block');
    if($(".pre-post-switcher-mobile a[data-target='sked']").hasClass('active')){
      // activate pre content
      $(".pre-post-switcher-mobile a[data-target='sked']").removeClass('active');
      $(".pre-post-switcher-mobile a[data-target='pre']").addClass('active');
      $(".pre-post-switcher a[data-target='pre']").addClass('active');
      $(".pre-post-switcher a[data-target='post']").removeClass('active');
      $(".pre-content").css('display','block');
    }
  } else {
    onMobile = 'true';
    if(!($(".pre-post-switcher-mobile a[data-target='sked']").hasClass('active'))){
      $('#bears-sked').css('display','none');
     }
  }
}


function buildSked(information){

  var activeWeek = {{ week }};

  var schedule_arr = information.schedule;
  var schedule_html= '';
  var schedule_html_arr= new Array();

  
  for(i=0; i<17; i++){
    if(schedule_arr[i].team == "open"){
      // Bye week
      if(onMobile == "false"){
        schedule_html_arr[i] = "<li class='open'><h3>Open</h3></li>"

      } else {
        schedule_html = schedule_html + "<li class='open'><h3>Open</h3></li>"
      }
      
    } else {
      //LOAD THE OPPONENT DISPLAY NAME INTO A VAR
      var opponent = schedule_arr[i].opponent_display;
      
      var gameWeek = i+1;

      if(schedule_arr[i].week == activeWeek){
        var active_state = 'active';
      } else {
        var active_state = "";
      }
      var atIcon;
      if(schedule_arr[i].place == "away"){
        atIcon = "@";
      } else {
        atIcon = "";

      }

      // HAS THE GAME BEEN PLAYED? Or is it the one to focus on? 
      var href_data = "";
      if((schedule_arr[i].bears_score != "") || (active_state == 'active') || (schedule_arr[i].currentweek > 0)){
        var played_state = "played";
        href_data = "href='http://graphics.chicagotribune.com/sports/football/bears/bears-breakdown/week" + gameWeek + "'";
      } else{
        var played_state = "";
      }

      // LETS LOAD THE SCORE (IF THERE IS ONE) OR TIME INTO THAT BOTTOM LINE
      if( schedule_arr[i].bears_score >1 ){
        var kickoff_time = "";
        if(schedule_arr[i].bears_score > schedule_arr[i].opponent_score){
          var score = "W, " + schedule_arr[i].bears_score + "-" + schedule_arr[i].opponent_score; 
        } else if(schedule_arr[i].bears_score < schedule_arr[i].opponent_score){
          var score = "L, " + schedule_arr[i].opponent_score + "-" + schedule_arr[i].bears_score; 
        } else {
          var score = "Tie, " + schedule_arr[i].opponent_score + "-" + schedule_arr[i].bears_score; 
        }
        score = score + " " + schedule_arr[i].overtime;
        score = "<p><strong>" + score + "</strong></p>";
      } else {
        var kickoff_time = schedule_arr[i].kickoff + ", ";
        var score = "<p class=''>" + schedule_arr[i].tv + "</p>";
      }
    // LOAD ALL THE DATA INTO AN ARRAY IF NOT ON PHONE 
    if(onMobile == "false"){
      schedule_html_arr[i] = "<li class=''><a " + href_data + " data-week='"+ gameWeek +"' class='" + active_state + " " + schedule_arr[i].place + " " + played_state + "'><p class='date'>"+ kickoff_time + schedule_arr[i].date_display  +"</p><img alt='NFL "+ opponent +" logo' src='http://graphics.chicagotribune.com/bears-breakdown/bears-schedule-2014/img/logos/team-"+schedule_arr[i].team+".gif' /><h3>"+ atIcon + opponent + "</h3>" + score + "</a></li>";
    } else {
     var schedule_html = schedule_html + "<li class='no-transition-mobile'><a " + href_data + "data-week='"+ gameWeek +"' class='" + active_state + " " + schedule_arr[i].place + " " + played_state + "'><p class='date'>"+  schedule_arr[i].day +", " + schedule_arr[i].date_display  +"</p><img alt='NFL "+ opponent +" logo' src='http://graphics.chicagotribune.com/bears-breakdown/bears-schedule-2014/img/logos/team-"+schedule_arr[i].team+".gif' /><h3>"+ atIcon + opponent + "</h3>" + score + "</a></li>";
   }
 }
}


var i=0;
function skedLoop(){
  setTimeout(function(){
    $('#bears-sked ul').append(schedule_html_arr[i]);
    i++;
    if(i<schedule_html_arr.length){
      skedLoop();
    }
  }, 200);
}
if(onMobile == "false") {  
  skedLoop();  
} else{
  $('#bears-sked ul').append(schedule_html);
}
  // ADD THAT VAR TO THE HOLDER, THEN FADE OUT THE LOADING GIF
  $('.loading').fadeOut(200, function(){
  });
}



$(document).ready(function(){
  
  // Does what it says
  detectMobile();

  // Always know whether we're at mobile width or not
  $(window).resize(function(){
    detectMobile();
  })

    buildSked(data);  


  // ADD TOOLTIPS TO THE CHARTING
  $('.bar div').tooltip({'container':'body'});
  $('.bars-wrapper div').tooltip({'container':'body'});
  
});
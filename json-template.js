// THIS USES A JINJA LOOP FROM THE SCHEDULE SPREADSHEET TO GENERATE JSON (STORED IN THE VARIABLE NAME DATA) WHICH IS LINKED TO EACH WEEK'S PAGE 
var data ={  
   "schedule":[  
	{% for row in schedule %}
	      {  
	         "week":{{ row.week }},
	         "opponent_display":"{{ row.opponent_display }}",
	         "bears_score":"{% if row.bears_score %}{{ row.bears_score|int }}{% endif %}",
	         "tv":"{{ row.tv }}",
	         "opponent_score":"{% if row.opponent_score %}{{ row.opponent_score|int }}{% endif %}",
	         "kickoff":"{{ row.kickoff }}",
	         "date_display":"{{ row.date_display }}",
	         "place":"{{ row.place }}",
	         "team":"{{ row.team }}",
	         "date":{{ row.date }},
	         "day":"{{ row.day }}",
	         "overtime":"{% if row.overtime %}{{ row.overtime }}{% else %} {% endif %}",

	      },
	{% endfor %}
	]
}


This was made before I understood many best practices. Sorry for that. This is a rundown that I hope is helpful. *Don't hesitate to reach out if you need help, even if that help isn't related to my nonsensical programming methods.*

The schedule was it's own tarbell project, as were each of the 16 gameday apps.


# Store the data
The principal behind this whole component is that the data is pulled from a spreadsheet with two sheets:

	- *Sheet 1:* This sheet houses game-specifc data, such as opponent, home/away, kickoff time, radio and tv stations and (eventually) score/overtime.

	- *Sheet 2:* This houses general info about each time. I used to to store things like stadium name, stadium location, team hex colors, and the proper Bears color to use. Normally I used the Bears blue, but switched to the team orange when the opponent used blue. I don't think I referenced this page in the actual schedule. The same sheet appears in each of the weekly projects, and it was very helpful there.


# Retrieve the data
This is the bass-ackwards part. I used a jinja loop (through tabell) to compile the sheet 2 data into a JSON file. I put a `<script>` tag in the header of each week's project. This kept the data current for each week without having to republish each project each week. There probably are much smarter, javascript-based ways to do this. If I were to do it again, I'd probably skip tarbell altogether and just pull directly from the Google sheet using jquery + UnderscoreJS. I've never used TabletopJS, but I hear it does the same thing.


# GATECRASHER

GATECRASHER is an online tool to allow you to get all the facebook events in a given radius. You simply find the area on a map where you want to search for and fire the button for the date you want to search events until. 

It will also cluster all events so the markers on the map don’t overload your screen. It further allows you to ‘spiderify’ on events in the same location. 

## Journey to the app

To get to the current stage of the project we had to pivot a lot of ideas from the initial ask. We initially wanted to plot twitter responses on a map, but due to limitations with the API’s data and geolocation property we had to change out idea. We encountered a lot of issues when dealing with APIs which narrowed down out findings, but we pivoted to get use the code we created for a new purpose. 

## Scope
* The features we have managed to develop are as follows:
* Plot events on a map
* Get facebook event data from the graph API
* Change the viewport of the map to set the radius of the search
* Cluster markers where lots of events are taking place
* Spiderify the results where the location has more than one event
* Crate a splash screen and loading icons to deal with lag of loading maps and API calls
## Testing Feedback:
Pros:
* Clustering worked well
* Good simple date entry
* Easy to find radius of search
* Nice simple interface
* Great colour scheme
* Great to see use out of the facebook public events 


Improvements
* Relying on API is an issue if it is down
* Too much waiting and cant tell when loaded- Have loading functionality
* Include info on how to use the site
* Not getting results on a big radius
* Change button functionality – The change date not intuitive
* Mobile search on map not working 
* Map sometimes hard to use with the scale- maybe full width
* Mobile search on map not working 
* Map sometimes hard to use with the scale- maybe full width

## Improvements later
There were a few improvements we could implement going further:
* The quality of the search depended on the radius of the facebook events api. The closer you are (up to 2.5km), the better the results. We could not see close enough of the code or the API to understand how this worked. So limiting the radius would be a next step.
* Searched depended on places API. Maybe have the search also try and give options otherwise.
* The markers and the info windows needed better styling for better user experience
* Add features to search for events and proper date ranges rather than from this point.
* Add personalisation
* Populate top 10 events in terms of distance and popularity


## Learnings
* Earlier on focus on getting technical spikes out of the way. Focus on actually seeing if the data we need is available.
* Code is very much reusable. 


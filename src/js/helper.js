//helper.js
/*
HTML Data Strings
*/

////Welcome

////Bio
var HTMLheaderName = '<h1 class="full-name">%data%</h1>';
var HTMLheaderRole = '<p class="role">%data%</p>';
var HTMLprofileText = '<p class="bio-desciption">%data%</p>';
var HTMLbioPic = '<img src="%data%" class="bio-pic" alt="Portrait of Applicant">';

var HTMLmobile = '<li class="contact-item"><span>mobile: </span><a href="tel:%url%" class="contact-detail">%data%</a></li>';
var HTMLemail = '<li class="contact-item"><span>email: </span><a href="mailto:%url%" class="contact-detail">%data%</a></li>';
var HTMLgithub = '<li class="contact-item"><span>github: </span><a href="%url%" class="contact-detail">%data%</a></li>';
var HTMLlocation = '<li class="contact-item"><span>location: </span><span class="contact-detail">%data%</span></li>';


var HTMLwelcomeMsg = '<p class="welcome-msg">%data%</p>';
var HTMLskillsStart = '<h3 class="list-header">Skills</h3><ul id="skills"></ul>';
var HTMLskills = '<li class="skills-item">%data%</li>';

////Work
var HTMLworkStart = '<section class="work-entry"></section>';
var HTMLworkEmployer = '<h4 class="article-title">%data%';
var HTMLworkTitle = ' - %data%</h4>';
var HTMLworkDates = '<h5><span class="date">%data%</span>';
var HTMLworkLocation = '%data%</h5>';
var HTMLworkDescription = '<p class="border-bottom description">%data%</p>';

////Projects
var HTMLprojectStart = '<article class="card"><div class="flex-project"></div></article>';
var HTMLprojectTextboxStart = '<div class="flex-project-item-lg"></div>';
var HTMLprojectDates = '<h4 class="project-title"><span class="project-date">%data%</span>';
var HTMLprojectTitle = '%data%</h4>';
var HTMLprojectDescription = '<p class="project-description">%data%</p>';
var HTMLprojectImageStart = '<div class="flex-project-item"></div>';
//var HTMLprojectImage = '<img class="img-project" src="%data%" alt="Project Image">';
var HTMLprojectImage = '<img class="img-project" src="%data%" srcset="%srcsetdata%" alt="Project Image">';
var HTMLprojectURL = '<a class="project-link" href="%data%">View Project</a>';

////Education
var HTMLschoolStart = '<section class="education-entry"></section>';
var HTMLschoolName = '<h5><a href="#" class="school">%data%</a></h5>';
var HTMLschoolDegree = '<h4 class="article-title">%data%</h4>';
var HTMLschoolDates = '<h5><span class="date">%data%</span>';
var HTMLschoolLocation = '%data%</h5>';
var HTMLschoolMajor = '<p class="border-bottom major"><span>Major: </span>%data%</p>';

////Online Classes
var HTMLonlineClasses = '<div class="online-section"><h3 class="sub-section profile-list">Online Education</h3></div>';
var HTMLonlineClassStart = '<section class="class"><ul class="class-list"></ul></section>';
var HTMLonlineTitle = '<li>%data%</li>';
var HTMLonlineSchool = '<li><a class="school" href="#">%data%</a></li>';
var HTMLonlineDates = '<p class="class-date">%data%</p>';

////Map
var googleMap = '<div id="map"></div>';


/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map; // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

    var locations;

    var mapOptions = {
        disableDefaultUI: true,
        styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "263238"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "263238"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#b5c4c5"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "263238"
      }
    ]
  }
]
    };

    /*
    For the map to be displayed, the googleMap var must be
    appended to #mapDiv in resumeBuilder.js.
    */
    map = new google.maps.Map(document.querySelector('#map'), mapOptions);


    /*
    locationFinder() returns an array of every location string from the JSONs
    written for bio, education, and work.
    */
    function locationFinder() {

        // initializes an empty array
        var locations = [];

        // adds the single location property from bio to the locations array
        // changed to suit my resume
        locations.push(app.model.bio.contacts.location);

        // iterates through school locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        app.model.education.schools.forEach(function(school) {
            locations.push(school.location);
        });

        // iterates through work locations and appends each location to
        // the locations array. Note that forEach is used for array iteration
        // as described in the Udacity FEND Style Guide:
        // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
        app.model.work.jobs.forEach(function(job) {
            locations.push(job.location);
        });

        return locations;
    }

    /*
    createMapMarker(placeData) reads Google Places search results to create map pins.
    placeData is the object returned from search results containing information
    about a single location.
    */
    function createMapMarker(placeData) {

        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat(); // latitude from the place service
        var lon = placeData.geometry.location.lng(); // longitude from the place service
        var name = placeData.formatted_address; // name of the place from the place service
        var bounds = window.mapBounds; // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
            map: map,
            position: placeData.geometry.location,
            title: name,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });

        // infoWindows are the little helper windows that open when you click
        // or hover over a pin on a map. They usually contain more information
        // about a location.
        var infoWindow = new google.maps.InfoWindow({
            content: name
        });

        // hmmmm, I wonder what this is about...
        google.maps.event.addListener(marker, 'click', function() {
            // your code goes here!
        });

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        map.fitBounds(bounds);
        // center the map
        map.setCenter(bounds.getCenter());
    }

    /*
    callback(results, status) makes sure the search returned results for a location.
    If so, it creates a new map marker for that location.
    */
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            createMapMarker(results[0]);
        }
    }

    /*
    pinPoster(locations) takes in the array of locations created by locationFinder()
    and fires off Google place searches for each location
    */
    function pinPoster(locations) {

        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(map);

        // Iterates through the array of locations, creates a search object for each location
        locations.forEach(function(place) {
            // the search request object
            var request = {
                query: place
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, callback);
        });
    }

    // Sets the boundaries of the map based on pin locations
    window.mapBounds = new google.maps.LatLngBounds();

    // locations is an array of location strings returned from locationFinder()
    locations = locationFinder();

    // pinPoster(locations) creates pins on the map for each location in
    // the locations array
    pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});

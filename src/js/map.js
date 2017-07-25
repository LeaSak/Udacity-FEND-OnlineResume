/* ======= Model ======= */
var mapModel = {
    mapOptions: {
        disableDefaultUI: true,
        styles: [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        }, {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#bdbdbd"
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "263238"
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dadada"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "263238"
            }]
        }, {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        }, {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#b5c4c5"
            }]
        }, {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "263238"
            }]
        }]
    } // end of mapOptions
};

/* ======= Octopus ======= */

var mapController = {
    init: function() {
        mapModelView.init();
        mapMarkerView.init();
    },
    getMapOptions: function() {
        return mapModel.mapOptions;
    },
    //returns an array of location strings
    setLocations: function() {
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

};

/* ======= Views ======= */

var mapModelView = {
    init: function() {
        this.mapOptions = mapController.getMapOptions();
        this.mapElem = document.querySelector('#map');
        this.render();
    },
    render: function() {
        this.map = new google.maps.Map(this.mapElem, this.mapOptions);
    }
};

var mapMarkerView = {
    init: function() {
        this.locations = mapController.setLocations();
        this.pinPoster(this.locations);
        this.setMapBounds();
    },
    pinPoster: function(location) {
        // creates a Google place search service object. PlacesService does the work of
        // actually searching for location data.
        var service = new google.maps.places.PlacesService(mapModelView.map);
        // Iterates through the array of locations, creates a search object for each location
        this.locations.forEach(function(place) {
            // the search request object
            var request = {
                query: place
            };

            // Actually searches the Google Maps API for location data and runs the callback
            // function with the search results after each search.
            service.textSearch(request, this.callback);
        }, this);
    },
    //renders pins if data is ok
    callback: function(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(status, results[0]);
            this.createMapMarker(results[0]);
        }
    },
    //creates pins
    createMapMarker: function(placeData) {
        // The next lines save location data from the search result object to local variables
        var lat = placeData.geometry.location.lat(); // latitude from the place service
        var lon = placeData.geometry.location.lng(); // longitude from the place service
        var name = placeData.formatted_address; // name of the place from the place service
        var bounds = window.mapBounds; // current boundaries of the map window

        // marker is an object with additional data about the pin for a single location
        var marker = new google.maps.Marker({
            map: mapModelView.map,
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

        // this is where the pin actually gets added to the map.
        // bounds.extend() takes in a map location object
        bounds.extend(new google.maps.LatLng(lat, lon));
        // fit the map to the new marker
        mapModelView.map.fitBounds(bounds);
        // center the map
        mapModelView.map.setCenter(bounds.getCenter());
    },
    setMapBounds: function() {
        // Sets the boundaries of the map based on pin locations
        //TODO: not sure where to put this??
        window.mapBounds = new google.maps.LatLngBounds();
    }
};

// Calls the initializeMap() function when the page loads
window.addEventListener('load', mapController.init());

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
    //Make sure the map bounds get updated on page resize
    map.fitBounds(mapBounds);
});
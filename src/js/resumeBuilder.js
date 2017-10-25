// ResumeBuilder.js

var bio = {
    "name": "Lea-Ann Sakmann",
    "role": "Web Developer",
    "contacts": {
        "email": "leaann.sakmann@gmail.com",
        "github": "@LeaSak",
        "githubUrl": "https://github.com/LeaSak",
        "mobile": "+436607424226",
        "location": "Vienna, Austria",
    },
    "welcomeMessage": "Welcome.",
    "skills": ["HTML5", "CSS3", "JavaScript"],
    "biopic": "images/profile-600.jpg",
    "display": function() {

        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
        var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
        var formattedEmailContact = HTMLemail.replace("%data%", bio.contacts.email).replace('%url%', bio.contacts.email);
        var formattedGithubContact = HTMLgithub.replace("%data%", bio.contacts.github).replace('%url%', bio.contacts.githubUrl);
        var formattedMobileContact = HTMLmobile.replace("%data%", bio.contacts.mobile).replace('%url%', bio.contacts.mobile);
        var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

        $('#biopic-box').append(formattedBioPic);
        $('#header-content').append(formattedName);
        $('#header-content').append(formattedRole);
        $('#header-content').prepend(formattedMessage);
        $('.contact').append(formattedEmailContact);
        $('.contact').append(formattedGithubContact);
        $('.contact').append(formattedMobileContact);
        $('.contact').append(formattedLocation);

        //check for skills
        if (bio.skills.length > 0) {
            $('#skill-box').append(HTMLskillsStart);
            bio.skills.forEach(function(element) {
                var formattedSkills = HTMLskills.replace("%data%", element);
                $('#skills').append(formattedSkills);
            });
        }

    }
};

var work = {
    "jobs": [{
            "employer": "Independent Contractor",
            "title": "Remote Usability Tester",
            "dates": "07/2016 - Present",
            "location": "Vienna, Austria",
            "description": "Analysing websites and web applications from a user's perspective."
        },

        {
            "employer": "University of Heidelberg",
            "title": "Lecturer in English",
            "dates": "09/2007 - 08/2012",
            "location": "Heidelberg, Germany",
            "description": "Designed and delivered learning programs and examinations to over 300 international students."
        },

        {
            "employer": "Independent Contractor",
            "title": "Language Specialist",
            "dates": "05/2006 - 08/2012",
            "location": "Heidelberg, Germany",
            "description": "Translated and edited web and printed content for arts organizations and artists."
        }
    ],
    display: function() {
        work.jobs.forEach(function(job) {
            var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
            var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
            var formattedDates = HTMLworkDates.replace("%data%", job.dates);
            var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
            var formattedDescription = HTMLworkDescription.replace("%data%", job.description);

            $('#workExperience').append(HTMLworkStart);
            $(".work-entry:last").append(formattedEmployer + formattedTitle);
            $(".work-entry:last").append(formattedDates + formattedLocation);
            $(".work-entry:last").append(formattedDescription);
        });
    }

};

var projects = {
    "projects": [{
        "title": "Build a Portfolio Site",
        "dates": "2017",
        "description": "A responsive website built with HTML, CSS, and Bootstrap.",
        // "images": ["images/portfolio-desktop-600.jpg"],
        // create an array of image objects with different sizes instead
        "images": [{
            "src": "images/portfolio-desktop",
            "format": "jpg",
            "width": [600, 1200]
        }],
        "url": "https://github.com/LeaSak/Build-A-Portfolio"
    }],
    display: function() {
        projects.projects.forEach(function(entry) {
            var formattedProjectTitle = HTMLprojectTitle.replace("%data%", entry.title);
            var formattedProjectDates = HTMLprojectDates.replace("%data%", entry.dates);
            var formattedProjectDescription = HTMLprojectDescription.replace("%data%", entry.description);
            var formattedProjectUrl = HTMLprojectURL.replace("%data%", entry.url);

            $('#project-box').append(HTMLprojectStart);
            $('.flex-project:last').append(HTMLprojectTextboxStart);
            $('.flex-project-item-lg:last').append(formattedProjectDates + formattedProjectTitle);
            $('.flex-project-item-lg:last').append(formattedProjectDescription);
            $('.flex-project-item-lg:last').append(formattedProjectUrl);

            // if (entry.images.length > 0) {
            //     entry.images.forEach(function(shot) {
            //         $('.flex-project:last').append(HTMLprojectImageStart);
            //         var formattedProjectImage = HTMLprojectImage.replace("%data%", shot);
            //         $(".flex-project-item:last").append(formattedProjectImage);
            //     });
            // }

            if (entry.images.length > 0) {
                //create strings for image srcset and src attributes.
                entry.images.forEach(function(image) {
                    var srcsetData = [];
                    var imgArray = [];
                    image.width.forEach(function(width) {
                        var imgSrc = image.src + '-' + width + "." + image.format;
                        var srcsetPartial = imgSrc + " " + width + "w";
                        imgArray.push(imgSrc);
                        srcsetData.push(srcsetPartial);
                    });
                    //console.log(imgArray);
                    //console.log(srcsetData);
                    srcsetData = srcsetData.join(", ");
                    srcData = imgArray[0];
                    var formattedProjectImage = HTMLprojectImage.replace(/%data%/, srcData).replace(/%srcsetdata%/, srcsetData);
                    $('.flex-project:last').append(HTMLprojectImageStart);
                    $('.flex-project-item:last').append(formattedProjectImage);
                });
            }

        });
    }

};

var education = {
    "schools": [{
        "name": "University of South Australia",
        "location": "Remote / Adelaide, Australia",
        "degree": "Master of Management (Arts and Cultural Management)",
        "majors": ["Arts and Cultural Management"],
        "dates": "2007 - 2010",
        "url": "https://www.unisa.edu.au/"
    }, {
        "name": "University of New South Wales",
        "location": "Sydney, Australia",
        "degree": "Bachelor of Fine Arts",
        "majors": ["Painting"],
        "dates": "2000 - 2003",
        "url": "https://www.artdesign.unsw.edu.au/"
    }],
    "onlineCourses": [{
        "title": "Front-End Web Development Nanodegree",
        "school": "Udacity",
        "dates": "2017",
        "url": "https://www.udacity.com/"
    }, {
        "title": "Fullstack Web Development",
        "school": "freeCodeCamp",
        "dates": "2016 - Present",
        "url": "https://www.freecodecamp.com/"
    }, {
        "title": "Front-End Web Development",
        "school": "Treehouse",
        "dates": "2016",
        "url": "https://teamtreehouse.com/"
    }],
    display: function() {
        education.schools.forEach(function(school) {
            var formattedSchoolName = HTMLschoolName.replace("#", school.url).replace("%data%", school.name);
            var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
            var formattedSchoolDates = HTMLschoolDates.replace("%data%", school.dates);
            var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", school.location);

            $('#education-box').append(HTMLschoolStart);
            $(".education-entry:last").append(formattedSchoolDegree);
            $(".education-entry:last").append(formattedSchoolName);
            $(".education-entry:last").append(formattedSchoolDates + formattedSchoolLocation);

            school.majors.forEach(function(subject) {
                var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", subject);
                $(".education-entry:last").append(formattedSchoolMajor);
            });
        });

        //display online classes
        $('#education-box').append(HTMLonlineClasses);
        education.onlineCourses.forEach(function(course) {
            $('#education-box').append(HTMLonlineClassStart);
            var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", course.title);
            var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", course.school).replace("#", course.url);
            var formattedOnlineDates = HTMLonlineDates.replace("%data%", course.dates);

            $(".class-list:last").append(formattedOnlineTitle);
            $(".class-list:last").append(formattedOnlineSchool);
            $(".class:last").prepend(formattedOnlineDates);
        });

    }
};

//map
$('#mapDiv').append(googleMap);

bio.display();
work.display();
projects.display();
education.display();

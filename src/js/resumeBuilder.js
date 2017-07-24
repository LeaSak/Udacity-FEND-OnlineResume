var app = app || {};

(function(){
    'use strict';

    /* ======= Model ======= */
    app.model = {
            bio: {
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
            "biopic": "images/profile-600.jpg"
        },
        work: {
            "jobs": [
                {
                    "employer": "UserTesting, TryMyUI, Enroll",
                    "title": "Remote Usability Tester",
                    "dates": "07/2016 - Present",
                    "location": "Vienna, Austria",
                    "description": "Analysing websites and web applications from a user's perspective."
                },
                {
                    "employer": "I-Center, Stanford University",
                    "title": "Cultural Program Associate",
                    "dates": "10/2012 - 06/2013",
                    "location": "Stanford, USA",
                    "description": "Developed and gave art and design workshops to international students on a voluntary basis."
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
                    "title": "Translator",
                    "dates": "05/2006 - 08/2012",
                    "location": "Heidelberg, Germany",
                    "description": "Translated and edited web and printed content for arts organizations and artists."
                }
            ]
        },
        projects: {
            "projects": [
            {
            "title": "Build a Portfolio Site",
            "dates": "2017",
            "description": "A responsive website built with HTML, CSS, and Bootstrap.",
            // create an array of image objects with different sizes instead
            "images": [
                {
                    "src": "images/portfolio-desktop",
                    "format": "jpg",
                    "width": [600, 1200]
                }],
            "url": "https://github.com/LeaSak/Build-A-Portfolio"
            }]
        },
        education: {
            "schools": [
            {
                "name": "University of South Australia",
                "location": "Remote / Adelaide, Australia",
                "degree": "Master of Management (Arts and Cultural Management)",
                "majors": ["Arts and Cultural Management"],
                "dates": "2007 - 2010",
                "url": "https://www.unisa.edu.au/"
            },
            {
                "name": "University of New South Wales",
                "location": "Sydney, Australia",
                "degree": "Bachelor of Fine Art",
                "majors": ["Painting"],
                "dates": "2000 - 2003",
                "url": "https://www.artdesign.unsw.edu.au/"
            }],
            "onlineCourses": [
                {
                    "title": "Front-End Web Development Nanodegree",
                    "school": "Udacity",
                    "dates": "2017 - Present",
                    "url": "https://www.udacity.com/"
                },
                {
                    "title": "Fullstack Web Development",
                    "school": "freeCodeCamp",
                    "dates": "2016 - Present",
                    "url": "https://www.freecodecamp.com/"
                },
                {
                    "title": "Front-End Web Development",
                    "school": "Treehouse",
                    "dates": "2016",
                    "url": "https://teamtreehouse.com/"
                }],
        }
    };

    /* ======= Octopus ======= */

    app.controller = {
        init: function(){
            app.bioView.init();
            app.workView.init();
            app.projectView.init();
            app.educationView.init();
            app.mapView.init();
        },
        getBio: function(){
            return app.model.bio;
        },
        getWorkHistory: function(){
            return app.model.work;
        },
        getProjectData: function(){
            return app.model.projects;
        },
        getEducationHistory: function(){
            return app.model.education;
        }

    };

    /* ======= View ======= */
    app.bioView = {
        init: function(){
            this.$bioPicElem = $('#biopic-box');
            this.$headerElem = $('#header-content');
            this.$contactElem =$('.contact');
            this.$skillsElem = $('#skill-box');
            this.$skillsList = $('#skills');
            this.render();
        },
        render: function(){
            var self = this;
            var bio = app.controller.getBio();
            var formattedName = HTMLheaderName.replace("%data%", bio.name);
            var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
            var formattedMessage = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
            var formattedBioPic = HTMLbioPic.replace("%data%", bio.biopic);
            var formattedEmailContact = HTMLemail.replace("%data%", bio.contacts.email).replace('%url%', bio.contacts.email);
            var formattedGithubContact = HTMLgithub.replace("%data%", bio.contacts.github).replace('%url%', bio.contacts.githubUrl);
            var formattedMobileContact = HTMLmobile.replace("%data%", bio.contacts.mobile).replace('%url%', bio.contacts.mobile);
            var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);

            this.$bioPicElem.append(formattedBioPic);
            this.$headerElem.append(formattedName);
            this.$headerElem.append(formattedRole);
            this.$headerElem.prepend(formattedMessage);
            this.$contactElem.append(formattedEmailContact);
            this.$contactElem.append(formattedGithubContact);
            this.$contactElem.append(formattedMobileContact);
            this.$contactElem.append(formattedLocation);

            //check for skills
            if (bio.skills.length > 0) {
                this.$skillsElem.append(HTMLskillsStart);
                bio.skills.forEach(function(element) {
                    var formattedSkills = HTMLskills.replace("%data%", element);
                    console.log(self);
                    //$('#skills').append(formattedSkills);
                    self.$skillsList.append(formattedSkills);
                });
            }
        }
    };

    app.workView = {
        init: function(){
            this.$workElem = $('#workExperience');
            this.$workEntryElem = $(".work-entry:last");
            this.render();
        },
        render: function(){
            var self = this;
            var work = app.controller.getWorkHistory();
                work.jobs.forEach(function(job) {
                    var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
                    var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
                    var formattedDates = HTMLworkDates.replace("%data%", job.dates);
                    var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
                    var formattedDescription = HTMLworkDescription.replace("%data%", job.description);

                    self.$workElem.append(HTMLworkStart);
                    console.log(self);
                    $(".work-entry:last").append(formattedEmployer + formattedTitle);
                    $(".work-entry:last").append(formattedDates + formattedLocation);
                    $(".work-entry:last").append(formattedDescription);
                });

        }
    };

    app.projectView = {
        init: function(){
            this.render();
        },
        render: function(){
            var projects = app.controller.getProjectData();
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
                //     //create strings for image srcset and src attributes.
                //     entry.images.forEach(function(image) {
                //         var srcsetData = [];
                //         var imgArray = [];
                //         image.width.forEach(function(width) {
                //             var imgSrc = image.src + '-' + width + "." + image.format;
                //             var srcsetPartial = imgSrc + " " + width + "w";
                //             imgArray.push(imgSrc);
                //             srcsetData.push(srcsetPartial);
                //             console.log(srcsetData, srcData);
                //         });
                //         srcsetData = srcsetData.join(", ");
                //         srcData = imgArray[0];
                //         var formattedProjectImage = HTMLprojectImage.replace(/%data%/, srcData).replace(/%srcsetdata%/, srcsetData);
                //         $('.flex-project:last').append(HTMLprojectImageStart);
                //         $('.flex-project-item:last').append(formattedProjectImage);
                //     });
                // }

            });
        }
    };


    app.educationView = {
        init: function(){
            this.render();
        },
        render: function(){
            var education = app.controller.getEducationHistory();
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

    app.mapView = {
        init: function(){
            this.render();
        },
        render: function(){
            $('#mapDiv').append(googleMap);
        }
    };

    app.controller.init();



}());

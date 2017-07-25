var app = app || {};

(function($){
    'use strict';
    /* ======= Model ======= */
    // https://stackoverflow.com/questions/2177548/load-json-into-variable
    app.model = (function(){
        $.ajax({
            'async': false,
            'global': false,
            'url': "js/data.json",
            'dataType': "json",
            'success': function(data){
                app.model = data;
            }
        });
        return app.model;
    })();

    /* ======= Octopus ======= */

    app.controller = {
        init: function(){
            app.bioView.init();
            app.workView.init();
            app.projectView.init();
            app.educationView.init();
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
            this.render();
        },
        render: function(){
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
                    $('#skills').append(formattedSkills);
                });
            }
        }
    };

    app.workView = {
        init: function(){
            this.$workElem = $('#workExperience');
            this.render();
        },
        render: function(){
            var work = app.controller.getWorkHistory();
                work.jobs.forEach(function(job) {
                    var formattedEmployer = HTMLworkEmployer.replace("%data%", job.employer);
                    var formattedTitle = HTMLworkTitle.replace("%data%", job.title);
                    var formattedDates = HTMLworkDates.replace("%data%", job.dates);
                    var formattedLocation = HTMLworkLocation.replace("%data%", job.location);
                    var formattedDescription = HTMLworkDescription.replace("%data%", job.description);

                    this.$workElem.append(HTMLworkStart);
                    $(".work-entry:last").append(formattedEmployer + formattedTitle);
                    $(".work-entry:last").append(formattedDates + formattedLocation);
                    $(".work-entry:last").append(formattedDescription);
                }, this);

        }
    };

    app.projectView = {
        init: function(){
            this.$projectElem = $('#project-box');
            this.render();
        },
        render: function(){
            var projects = app.controller.getProjectData();
            projects.projects.forEach(function(entry) {
                var formattedProjectTitle = HTMLprojectTitle.replace("%data%", entry.title);
                var formattedProjectDates = HTMLprojectDates.replace("%data%", entry.dates);
                var formattedProjectDescription = HTMLprojectDescription.replace("%data%", entry.description);
                var formattedProjectUrl = HTMLprojectURL.replace("%data%", entry.url);

                this.$projectElem.append(HTMLprojectStart);
                $('.flex-project:last').append(HTMLprojectTextboxStart);
                $('.flex-project-item-lg:last').append(formattedProjectDates + formattedProjectTitle);
                $('.flex-project-item-lg:last').append(formattedProjectDescription);
                $('.flex-project-item-lg:last').append(formattedProjectUrl);

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
                        srcsetData = srcsetData.join(", ");
                        var srcData = imgArray[0];
                        var formattedProjectImage = HTMLprojectImage.replace(/%data%/, srcData).replace(/%srcsetdata%/, srcsetData);
                        $('.flex-project:last').append(HTMLprojectImageStart);
                        $('.flex-project-item:last').append(formattedProjectImage);
                    });
                }

            }, this);
        }
    };


    app.educationView = {
        init: function(){
            this.$educationElem = $('#education-box');
            this.render();
        },
        render: function(){
            var education = app.controller.getEducationHistory();
            education.schools.forEach(function(school) {
                var formattedSchoolName = HTMLschoolName.replace("#", school.url).replace("%data%", school.name);
                var formattedSchoolDegree = HTMLschoolDegree.replace("%data%", school.degree);
                var formattedSchoolDates = HTMLschoolDates.replace("%data%", school.dates);
                var formattedSchoolLocation = HTMLschoolLocation.replace("%data%", school.location);

                this.$educationElem.append(HTMLschoolStart);
                $(".education-entry:last").append(formattedSchoolDegree);
                $(".education-entry:last").append(formattedSchoolName);
                $(".education-entry:last").append(formattedSchoolDates + formattedSchoolLocation);

                school.majors.forEach(function(subject) {
                    var formattedSchoolMajor = HTMLschoolMajor.replace("%data%", subject);
                    $(".education-entry:last").append(formattedSchoolMajor);
                });
            }, this);

            //display online classes
            this.$educationElem.append(HTMLonlineClasses);
            education.onlineCourses.forEach(function(course) {
                this.$educationElem.append(HTMLonlineClassStart);
                var formattedOnlineTitle = HTMLonlineTitle.replace("%data%", course.title);
                var formattedOnlineSchool = HTMLonlineSchool.replace("%data%", course.school).replace("#", course.url);
                var formattedOnlineDates = HTMLonlineDates.replace("%data%", course.dates);

                $(".class-list:last").append(formattedOnlineTitle);
                $(".class-list:last").append(formattedOnlineSchool);
                $(".class:last").prepend(formattedOnlineDates);
            }, this);

        }
    };

    app.controller.init();



}(jQuery));

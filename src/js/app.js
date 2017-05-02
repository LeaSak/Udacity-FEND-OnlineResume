//App.js
$(function() {
    //https://www.abeautifulsite.net/a-clean-fade-in-effect-for-webpages
    $('body').removeClass('fade-out');

    //baffle
    var welcomeMsg = baffle('.welcome-msg', {
        // characters: blocks
    }).start().reveal(1500, 2500);

    //https://css-tricks.com/snippets/jquery/smooth-scrolling/
    $('a[href*="#"]:not([href="#"])').click(function() {
        var offset = 0;
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top + offset
                }, 1000);
                return false;
            }
        }
    });

});

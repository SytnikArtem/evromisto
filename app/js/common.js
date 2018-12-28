$(document).ready(function() {
    if ($(window).width() > 1023) {
        $('#fullpage').fullpage({
            scrollBar:true,
            controlArrows: false,
            responsiveWidth: 1024,
            onLeave: function(origin, destination, index){
                if(destination.item.classList.contains('section_white')) {
                    $('.menu, .header').addClass('active');
                }
                else {
                    $('.menu, .header').removeClass('active');
                }
            }
        });
    }
    $('.main-slider').slick({
        infinite: false,
        speed: 300,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
});

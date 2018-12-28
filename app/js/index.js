$(document).ready(function() {
//
// function windowResize() {
//     gallery.windowResize();
// }

    $(document).ready(function () {
        var galleryOptions = {
            cubeSelector: ".main_slider",
            sideSelector: ".slide"
        };

        var gallery = cubeGallery(galleryOptions);

// language=JQuery-CSS


        $.each($(".slide_h1"), function (i, e) {
            var text = $(e).text();

            if (text[0] === '1') {
                $(e).addClass("letter_1");
            }
        });

        // setTimeout(function () {
        //     $({deg: 0}).animate({deg: 90}, {
        //         duration: 300,
        //         step: function (now) {
        //
        //             $(".cube_main").css({transform: "rotateX(" + now + "deg)"});
        //         }
        //     })
        // }, 700);

        // setTimeout(function () {
        //     $({deg: 90}).animate({deg: 180}, {
        //         duration: 300,
        //         step: function (now) {
        //
        //             $(".cube_main").css({transform: "rotateX(" + now + "deg)"});
        //         }
        //     })
        // }, 1500);

        // setTimeout(function () {
        //     $({deg: 180}).animate({deg: 270}, {
        //         duration: 300,
        //         step: function (now) {
        //
        //             $(".cube_main").css({transform: "rotateX(" + now + "deg)"});
        //         }
        //     })
        // }, 2200);

        // setTimeout(function () {
        //
        //     $(".cube_rotator").animate({'right': '0', 'marginRight': '-17px'}, 700);
        //     $(".main_slider, .header_block, footer").animate({"opacity": 1}, 700);
        // }, 3000);
        //
        setTimeout(function () {
            // $(".cube_rotator").addClass("final");

            $(".cube_rotator").hover(
                function () {
                    $(this).addClass("hovered");

                }, function () {
                    $(this).removeClass("hovered");

                }
            );

            $(window).on("mousewheel", function (e) {
                if (!gallery.isAnimating) {
                    $(".side_menu").removeClass("open");
                    $("body").removeClass("body_slide_" + gallery.currentSide);
                    var angle = gallery.currentAngle;
                    $(".mobile_menu").slideUp(300);
                    if (e.originalEvent.wheelDelta !== undefined && e.originalEvent.wheelDelta > 0) {
                        gallery.next();
                    } else {
                        gallery.prev();
                    }
                    $("body").addClass("body_slide_" + gallery.currentSide);
                    if ($(".cube_rotator").hasClass("hovered")) {
                        $({deg: angle}).animate({deg: gallery.currentAngle}, {
                            duration: 1000, step: function (now) {
                                console.log(now);
                                $(".cube_main").css({transform: "rotateX(" + now + "deg)"});
                            }
                        })
                    } else {
                        $(".cube_main").css({transform: "rotateX(" + gallery.currentAngle + "deg)"});
                    }
                }
            })

            $(".cube_rotator_arrow_up").click(function () {
                if (!gallery.isAnimating) {
                    var angle = gallery.currentAngle;
                    $(".side_menu").removeClass("open");
                    $("body").removeClass("menu_open");
                    $(".mobile_menu").slideUp(300);
                    $("body").removeClass("body_slide_" + gallery.currentSide);
                    gallery.prev();
                    $("body").addClass("body_slide_" + gallery.currentSide);
                    $({deg: angle}).animate({deg: angle - 90}, {
                        duration: 1000, step: function (now) {
                            console.log(now);
                            $(".cube_main").css({transform: "rotateX(" + now + "deg)"});
                        }
                    })
                }
            });

            $(".cube_rotator_arrow_down").click(function () {
                if (!gallery.isAnimating) {
                    var angle = gallery.currentAngle;
                    $(".side_menu").removeClass("open");
                    $("body").removeClass("menu_open");
                    $(".mobile_menu").slideUp(300);
                    $("body").removeClass("body_slide_" + gallery.currentSide);
                    gallery.next();
                    $("body").addClass("body_slide_" + gallery.currentSide);
                    $({deg: angle}).animate({deg: angle + 90}, {
                        duration: 1000, step: function (now) {
                            console.log(now);
                            $(".cube_main").css({transform: "rotateX(" + now + "deg)"});
                        }
                    });
                }
            });
        }, 100);

        setTimeout(function () {
            var angle = gallery.currentAngle;
            $(".cube_main").css({transform: "rotateX(" + angle + "deg)"});

            // $(window).resize(windowResize);
        }, 4400)


    });
});


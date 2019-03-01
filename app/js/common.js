'use strict';

$(document).ready(function () {

    $('.apartament-level-btn').click(function(e){
        e.preventDefault();
        var taIndex = $(this).index();
        $('.apartment-img').hide();
        $('.apartment-list').hide();
        $('.apartment-info').hide();
        $('.apartment-list').eq(taIndex).show();
        $('.apartment-img').eq(taIndex).show();
        $('.apartment-info').eq(taIndex).show();
        $(this).addClass('active').siblings().removeClass('active');
    });

    var time = 5,
        // времья перелистывания слайдов главного слайдера
        bar,
        $slick = $('.main-slider'),
        tick,
        isPause,
        wow,
        wow2,
        wow3,
        percentTime;
    if ($(window).width() > 1024) {
        $('#fullpage').fullpage({
            scrollBar: false,
            controlArrows: false,
            navigation: true,
            responsiveWidth: 1025,
            onLeave: function onLeave(origin, destination, direction, index) {
                wow2 = new WOW({
                    boxClass: 'wow2', // default
                    animateClass: 'animated', // default
                    offset: 0, // default
                    mobile: true, // default
                    live: true // default
                });
                wow2.init();
                wow3 = new WOW({
                    boxClass: 'wow3', // default
                    animateClass: 'animated', // default
                    offset: 0, // default
                    mobile: true, // default
                    live: true // default
                });
                wow3.init();
                startProgressbar();
                $('.section.active').find('.wow').removeClass('wow');
                if (destination.item.classList.contains('section_white')) {
                    $('.menu, .header').addClass('active');
                }
                if (destination.item.classList.contains('section_white')) {
                    $('.menu, .header').addClass('active');
                } else {
                    $('.menu, .header').removeClass('active');
                }
                if (destination.item.classList.contains('fp-right_dark')) {
                    $('.fp-right').addClass('active');
                } else {
                    $('.fp-right').removeClass('active');
                }
                if (destination.index > 0){
                    $('.menu-bottom').removeClass('menu-bottom_first')
                }
                else {
                    $('.menu-bottom').addClass('menu-bottom_first')
                }
                $('.section').eq(destination.index).addClass('up');
                $('.section').eq(destination.index + 1).removeClass('up');
            }
        });
        $('#fullpage2').fullpage({
            scrollBar: false,
            controlArrows: false,
            navigation: false,
            scrollOverflow: true,
            responsiveWidth: 1025,
            onLeave: function onLeave(origin, destination, direction, index) {
                wow2 = new WOW({
                    boxClass: 'wow2', // default
                    animateClass: 'animated', // default
                    offset: 0, // default
                    mobile: true, // default
                    live: true // default
                });
                wow2.init();
                wow3 = new WOW({
                    boxClass: 'wow3', // default
                    animateClass: 'animated', // default
                    offset: 0, // default
                    mobile: true, // default
                    live: true // default
                });
                wow3.init();
                startProgressbar();
                $('.section.active').find('.wow').removeClass('wow');
                if (destination.item.classList.contains('section_white')) {
                    $('.menu, .header').addClass('active');
                }
                if (destination.item.classList.contains('section_white')) {
                    $('.menu, .header').addClass('active');
                    $('.header').addClass('white');
                } else {
                    $('.menu, .header').removeClass('active');
                    $('.header').removeClass('white');
                }
                if (destination.item.classList.contains('fp-right_dark')) {
                    $('.fp-right').addClass('active');
                } else {
                    $('.fp-right').removeClass('active');
                }
                $('.section').eq(destination.index).addClass('up');
                $('.section').eq(destination.index + 1).removeClass('up');
            }
        });
    }
    $('.main-slider').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        asNavFor: '.connect-slider',
        dots: false,
        cssEase: 'ease-in-out'
    });
    $('.consist-slider').slick({
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        asNavFor: '.consist-numbers-slider',
        dots: false
    });
    $('.consist-numbers-slider').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        asNavFor: '.consist-slider',
        cssEase: 'cubic-bezier(.36,-0.41,.64,.39)',
        vertical: true
    });
    $('.consist-btn_next').click(function () {
        $('.consist-slider').slick('slickNext');
    });
    $('.consist-btn_back').click(function () {
        $('.consist-slider').slick('slickPrev');
    });
    $('.main-fourth-btn_back').click(function () {
        $('.main-slider').slick('slickPrev');
    });
    $('.main-fourth-btn_next').click(function () {
        $('.main-slider').slick('slickNext');
    });
    $('.main-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.main-fourth-item').eq(nextSlide).addClass('active').siblings().removeClass('active');
        wow3 = new WOW({
            boxClass: 'wow3', // default
            animateClass: 'animated', // default
            offset: 0, // default
            mobile: false, // default
            live: true // default
        });
        wow3.init();
    });
    $('.main-fourth-number').slick({
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.main-slider',
        cssEase: 'cubic-bezier(.36,-0.41,.64,.39)',
        vertical: true
    });
    $('.info-slider').slick({
        infinite: true,
        speed: 500,
        arrows: false,
        fade: true,
        slidesToShow: 1,
        asNavFor: '.main-slider',
        slidesToScroll: 1
    });
    $('.house-floor_vertical').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        asNavFor: '.house-slider',
        cssEase: 'cubic-bezier(.36,-0.41,.64,.39)',
        vertical: true
    });
    $('.house-floor_gorizontal').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        // verticalSwiping: false,
        asNavFor: '.house-slider',
        cssEase: 'cubic-bezier(.36,-0.41,.64,.39)'
        // vertical: false
    });
    $('.house-section').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        asNavFor: '.house-slider2',
        cssEase: 'cubic-bezier(.36,-0.41,.64,.39)',
        vertical: true
    });
    $('.house-slider').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        verticalSwiping: true,
        asNavFor: '.house-floor',
        vertical: true
    });
    $('.house-slider2').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.house-section'
    });
    $('.floor-top').click(function () {
        $('.house-floor').slick('slickNext');
    });
    $('.floor-bottom').click(function () {
        $('.house-floor').slick('slickPrev');
    });
    $('.section-top').click(function () {
        $('.house-section').slick('slickNext');
    });
    $('.section-bottom').click(function () {
        $('.house-section').slick('slickPrev');
    });
    $('.main-fourth-item').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.main-slider').slick('slickGoTo', $(this).index());
    });
    // прогрессбар
    bar = $('.progress_main');
    $('.main-fourth-btn, .main-fourth-item').on({
        mouseenter: function mouseenter() {
            isPause = true;
        },
        mouseleave: function mouseleave() {
            isPause = false;
        }
    });
    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        isPause = false;
        tick = setInterval(interval, 10);
    }
    function interval() {
        if (isPause === false) {
            percentTime += 1 / (time + 0.1);
            bar.css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $slick.slick('slickNext');
                $('.consist-slider').slick('slickNext');
                startProgressbar();
            }
        }
    }
    function resetProgressbar() {
        bar.css({
            width: 0 + '%'
        });
        clearTimeout(tick);
    }
    if ($(window).width() > 768) {
        $('.main-fourth-btn, .main-fourth-item').click(function () {
            startProgressbar();
        });
        startProgressbar();
    }
    $('#options').ddslick();
    $('.header-right-btn, .header-menu-btn').click(function (e) {
        e.preventDefault();
        $('.popup').addClass('active');
        if ($(window).width() < 1024) {
            bodyFreezeScroll();
        }
    });
    $('.popup-close').click(function (e) {
        $('.popup').removeClass('active');
        if ($(window).width() < 1024) {
            bodyUnfreezeScroll();
        }
    });
    wow = new WOW({
        boxClass: 'wow', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: false, // default
        live: true // default
    });
    wow.init();
    wow2 = new WOW({
        boxClass: 'wow2', // default
        animateClass: 'animated', // default
        offset: 0, // default
        mobile: false, // default
        live: true // default
    });
    wow2.init();
    $(document).mouseup(function (e) {
        var container = $(".popup-container");
        if (container.has(e.target).length === 0) {
            $('.popup').removeClass('active');
            if ($(window).width() < 1024) {
                bodyUnfreezeScroll();
            }
        }
    });
    $(".range-line").slider({
        min: 35,
        max: 140,
        values: [35, 140],
        step: 1,
        range: true,
        stop: function stop(event, ui) {
            $(".minCost").val($(".range-line").slider("values", 0));
            $(".maxCost").val($(".range-line").slider("values", 1));
        },
        slide: function slide(event, ui) {
            $(".minCost").val($(".range-line").slider("values", 0));
            $(".maxCost").val($(".range-line").slider("values", 1));
            $('.ui-slider-handle').eq(0).text($(".range-line").slider("values", 0));
            $('.ui-slider-handle').eq(1).text($(".range-line").slider("values", 1));
        }

    });
    $('.ui-slider-handle').eq(0).text('35');
    $('.ui-slider-handle').eq(1).text('140');
    $(".minCost").change(function () {
        var value1 = $(".minCost").val();
        var value2 = $(".maxCost").val();

        if (parseInt(value1) > parseInt(value2)) {
            value1 = value2;
            $(".minCost").val(value1);
        }
        $(".range-line").slider("values", 0, value1);
    });
    $(".maxCost").change(function () {
        var value1 = $(".minCost").val();
        var value2 = $(".maxCost").val();

        if (value2 > 140) {
            value2 = 140;
            ".maxCost".val(140);
        }

        if (parseInt(value1) > parseInt(value2)) {
            value2 = value1;
            $(".maxCost").val(value2);
        }
        $(".range-line").slider("values", 1, value2);
    });
    setTimeout(function () {
        if ($('.list-right').length > 0 && $(window).width() > 1024) {
            var heightDuration = $('.list-right').height() - $('.list-filter').height();
            var controller = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: "0", offset: "-120" } });
            var scene1 = new ScrollMagic.Scene({
                triggerElement: ".list-right", // point of execution
                duration: heightDuration, // pin element for the window height - 1
                reverse: true // allows the effect to trigger when scrolled in the reverse direction
            }).setPin(".list-filter") // the element we want to pin
                .addTo(controller);
        }
    }, 500);
    var itemIndex = 1,
        currentItem,
        currentPercent,
        maxIndex = 3;
    $('.list-btn_next').click(function () {
        itemIndex = itemIndex + 1;
        if (itemIndex > maxIndex) {
            itemIndex = maxIndex;
        }

        currentItem = '.step' + itemIndex;
        $('.list-content-item').css('display', 'none');
        $(currentItem).css({ 'display': 'block', 'opacity': '1', 'pointer-events': 'auto' });
        currentPercent = 50 * (itemIndex - 1) + '%';
        $('.list-page-item').eq(itemIndex - 1).addClass('active').siblings().removeClass('active');
        $('.progress_list').css('width', currentPercent);
        $('html, body').animate({ scrollTop: 0 }, 300);
    });
    $('.list-btn_back').click(function () {
        itemIndex = itemIndex - 1;
        if (itemIndex < 1) {
            itemIndex = 1;
        }
        currentItem = '.step' + itemIndex;
        currentPercent = 50 * (itemIndex - 1) + '%';
        $('.progress_list').css('width', currentPercent);
        $('.list-content-item').css('display', 'none');
        $(currentItem).css('display', 'block');
        $('.list-page-item').eq(itemIndex - 1).addClass('active').siblings().removeClass('active');
        $('html, body').animate({ scrollTop: 0 }, 300);
    });
    $('.list-page-item').click(function (e) {
        e.preventDefault();
        itemIndex = $(this).index() + 1;
        currentItem = '.step' + itemIndex;
        $('.list-content-item').css('display', 'none');
        $(currentItem).css('display', 'block');
        currentPercent = 50 * (itemIndex - 1) + '%';
        $('.progress_list').css('width', currentPercent);
        $(this).addClass('active').siblings().removeClass('active');
        $('html, body').animate({ scrollTop: 0 }, 300);
    });
    $('.equipment-pointer').hover(function () {
        var hoverIndex = $(this).index();
        $('.equipment-item').eq(hoverIndex).addClass('active').siblings().removeClass('active');
    }, function () {
        $('.equipment-item').removeClass('active');
    });
    $('.house-top-section').hover(function () {
        var sectionIndex = $(this).index();

        $(this).parent().find('.house-top-section').eq(sectionIndex).addClass('hover').siblings().removeClass('hover');
        $(this).parent().parent().find('.house-top-item').eq(sectionIndex).addClass('hover').siblings().removeClass('hover');
    }, function () {
        $('.house-top-section').removeClass('hover');
        $('.house-top-item').removeClass('hover');
    });
    $('.house-top-section').click(function () {
        var sliderItem = $(this).index();
        console.log($(this));
        $(this).addClass('active').siblings().removeClass('active');
        // $(this).parent().parent().find('.house-top-item').eq(sliderItem).addClass('active').siblings().removeClass('active');
        $('.house-slider2').slick('slickGoTo', sliderItem);
    });
    $('.house-slider2').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('.house-top-item').eq(nextSlide).addClass('active').siblings().removeClass('active');
        $('.house-top-section').eq(nextSlide).addClass('active').siblings().removeClass('active');
    });
    $('.apartment-plan').click(function () {
        $('.apartment-popup').addClass('active');
    });
    $('.apartment-close').click(function () {
        $('.apartment-popup').removeClass('active');
    });
    $('.burger').click(function () {
        $(this).toggleClass('active');
        $(this).removeClass('white');
        bodyFreezeScroll();
        $('.header_mob').toggleClass('custom');
        $('.header-menu').toggleClass('active');

        if ($(this).hasClass('active')) {
            bodyFreezeScroll();
        } else {
            bodyUnfreezeScroll();
            $(this).addClass('white');
        }
    });
    var $body = $(window.document.body);
    function bodyFreezeScroll() {
        var bodyWidth = $body.innerWidth();
        $body.css('overflow', 'hidden');
        $body.css('marginRight', ($body.css('marginRight') ? '+=' : '') + ($body.innerWidth() - bodyWidth));
    }

    function bodyUnfreezeScroll() {
        var bodyWidth = $body.innerWidth();
        $body.css('marginRight', '0');
        $body.css('overflow', 'auto');
    }
    function house() {
        $('.house').hover(function () {
            var numberStreet = $(this).data("number");
            var streetName = $(this).data("street");
            var houseStatus = $(this).data("info");
            var saleRoom = $(this).data("sale");
            var nowRoom = $(this).data("now");
            var special = $(this).data("spec");
            var positionCart = $(this).data("position");
            var scrollBlock = $('.main-second-build').scrollLeft();
            var leftPosition = this.querySelector('.house__number').getBoundingClientRect().left - document.querySelector('.main-second-build').getBoundingClientRect().left + scrollBlock;
            var topPosition = this.querySelector('.house__number').getBoundingClientRect().top - document.querySelector('.main-second-build').getBoundingClientRect().top;

            $('.cart').addClass('active');
            if (special !== undefined) {
                $('.cart-special').text(special);
                $('.cart-top').css('display', 'none');
            }
            if (saleRoom == undefined) {
                $('.cart-bottom').css('display', 'none');
                $('.cart-info').css('color', '#b0b4b9');
                // $('.cart-special').text('');
            } else {
                $('.cart-bottom').css('display', "flex");
                $('.cart-info').css('color', '#ec6400');
                $('.cart-top').css('display', 'flex');
                $('.cart-special').text('');
            }
            $('.cart-top-right').text(numberStreet);
            $('.cart-info').text(houseStatus);
            $('.cart-bottom-number_sale').text(saleRoom);
            $('.cart-bottom-number_now').text(nowRoom);
            $('.cart-street').text(streetName);
            var cartWidth = $('.cart').width();
            var cartHeight = $('.cart').height();

            if (positionCart == "top") {
                $('.cart').css({ left: leftPosition - cartWidth, top: topPosition - cartHeight * 3 });
                console.log('sss');
                console.log(cartHeight);
                console.log(cartWidth);
            } else if (positionCart == "top2") {
                $('.cart').css({ left: leftPosition - cartWidth, top: topPosition - cartHeight });
            } else {
                $('.cart').css({ left: leftPosition, top: topPosition });
                // console.log(2);
            }
        }, function () {
            $('.cart').removeClass('active');
        });
    }
    house();
    $(".popup-input").mask("999 999 99 99");
    $('.left-list-btn').click(function () {
        $('.list-right').addClass('active');
        bodyFreezeScroll();
    });
    $('.filter-close').click(function () {
        $('.list-right').removeClass('active');
        bodyUnfreezeScroll();
    });
    // $('.gallery-main').masonry({
    //     // options
    //     itemSelector: '.gallery-item',
    //     percentPosition: true,
    //     gutter: 10
    // });
    $('[data-fancybox="gallery"]').fancybox({
        buttons: [
            // "zoom",
            //"share",
            // "slideShow",
            //"fullScreen",
            //"download",
            // "thumbs",
            "close"],
        infobar: false
    });
});
$(window).scroll(function () {
    var scrollTop;
    scrollTop = $(this).scrollTop();
    if (scrollTop > 50) {
        $('.burger').addClass('white');
        $('.header').addClass('white');
        // $('.header_mob').addClass('custom');
    } else {
        $('.burger').removeClass('white');
        $('.header').removeClass('white');
        // $('.header_mob').removeClass('custom');
    }
});
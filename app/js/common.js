$(document).ready(function() {
    var time = 5, // времья перелистывания слайдов главного слайдера
        bar,
        $slick = $('.main-slider'),
        tick,
        isPause,
        percentTime;
    if ($(window).width() > 1023) {
        $('#fullpage').fullpage({
            scrollBar:false,
            controlArrows: false,
            navigation: true,
            responsiveWidth: 1024,
            onLeave: function(origin, destination, direction, index){
                wow2 = new WOW(
                    {
                        boxClass:     'wow2',      // default
                        animateClass: 'animated', // default
                        offset:       0,          // default
                        mobile:       true,       // default
                        live:         true        // default
                    }
                )
                wow2.init();
                wow3 = new WOW(
                    {
                        boxClass:     'wow3',      // default
                        animateClass: 'animated', // default
                        offset:       0,          // default
                        mobile:       true,       // default
                        live:         true        // default
                    }
                )
                wow3.init();
                startProgressbar();
                $('.section.active').find('.wow').removeClass('wow');
                if(destination.item.classList.contains('section_white')) {
                    $('.menu, .header').addClass('active');
                }
                if(destination.item.classList.contains('section_white')) {
                    $('.menu, .header').addClass('active');
                }
                else {
                    $('.menu, .header').removeClass('active');
                }
                if(destination.item.classList.contains('fp-right_dark')) {
                    $('.fp-right').addClass('active');
                }
                else {
                    $('.fp-right').removeClass('active');
                }
                $('.section').eq(destination.index).addClass('up');
                $('.section').eq(destination.index+1).removeClass('up');
                // if (direction == 'down') {
                //     $('.section').eq(destination.index).addClass('index');
                //     $('.section').removeClass('up');
                //     setTimeout(function () {
                //         $('.section').eq(destination.index).siblings().removeClass('index');
                //     }, 500);
                // }
                // if (direction == 'up') {
                //     $('.section').eq(destination.index).addClass('index');
                //     $('.section').eq(destination.index).next().addClass('up');
                //     setTimeout(function () {
                //         $('.section').eq(destination.index).siblings().removeClass('index');
                //     }, 500);
                // }
            }
        });
    }
    $('.main-slider').slick({
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        asNavFor: '.connect-slider',
        cssEase: 'ease-in-out',
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
    $('.main-fourth-btn_back').click(function () {
        $('.main-slider').slick('slickPrev');
    });
    $('.main-fourth-btn_next').click(function () {
        $('.main-slider').slick('slickNext');
    });
    $('.main-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.main-fourth-item').eq(nextSlide).addClass('active').siblings().removeClass('active');
        wow3 = new WOW(
            {
                boxClass:     'wow3',      // default
                animateClass: 'animated', // default
                offset:       0,          // default
                mobile:       true,       // default
                live:         true        // default
            }
        )
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
        vertical: true,
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
    $('.info-slider').slick({
        infinite: true,
        speed: 500,
        arrows: false,
        fade: true,
        slidesToShow: 1,
        asNavFor: '.main-slider',
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
    $('.house-floor').slick({
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
        asNavFor: '.house-section',
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
    $('.main-fourth-item').click(function(){
       $(this).addClass('active').siblings().removeClass('active');
       $('.main-slider').slick('slickGoTo', $(this).index())
    });
    // прогрессбар
    bar = $('.progress_main');
    $('.main-fourth-btn, .main-fourth-item').on({
        mouseenter: function() {
            isPause = true;
        },
        mouseleave: function() {
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
        if(isPause === false) {
            percentTime += 1 / (time+0.1);
            bar.css({
                width: percentTime+"%"
            });
            if(percentTime >= 100)
            {
                $slick.slick('slickNext');
                startProgressbar();
            }
        }
    }
    function resetProgressbar() {
        bar.css({
            width: 0+'%'
        });
        clearTimeout(tick);
    }
    if($(window).width() > 768) {
        $('.main-fourth-btn, .main-fourth-item').click(function() {
            startProgressbar();
        });
        startProgressbar();
    }
    $('#options').ddslick();
    $('.header-right-btn').click(function(e){
        e.preventDefault();
        $('.popup').addClass('active');
    });
    $('.popup-close').click(function(e){
        $('.popup').removeClass('active');
    });
    wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
        }
    )
    wow.init();
    wow2 = new WOW(
        {
            boxClass:     'wow2',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
        }
    );
    wow2.init();
    $(document).mouseup(function (e) {
        var container = $(".popup-container");
        if (container.has(e.target).length === 0){
            $('.popup').removeClass('active')
        }
    });
    $(".range-line").slider({
        min: 35,
        max: 140,
        values: [35,140],
        step: 1,
        range: true,
        stop: function(event, ui) {
            $(".minCost").val($(".range-line").slider("values",0));
            $(".maxCost").val($(".range-line").slider("values",1));
        },
        slide: function(event, ui){
            $(".minCost").val($(".range-line").slider("values",0));
            $(".maxCost").val($(".range-line").slider("values",1));
            $('.ui-slider-handle').eq(0).text($(".range-line").slider("values",0));
            $('.ui-slider-handle').eq(1).text($(".range-line").slider("values",1))
        },

    });
    $('.ui-slider-handle').eq(0).text('35');
    $('.ui-slider-handle').eq(1).text('140');
    $(".minCost").change(function(){
        let value1 = $(".minCost").val();
        let value2 = $(".maxCost").val();
        console.log('ww')

        if(parseInt(value1) > parseInt(value2)){
            value1 = value2;
            $(".minCost").val(value1);

        }
        $(".range-line").slider("values",0,value1);
    });
    $(".maxCost").change(function(){
        let value1 = $(".minCost").val();
        let value2 = $(".maxCost").val();

        if (value2 > 140) { value2 = 140;
            (".maxCost").val(140)
        }

        if(parseInt(value1) > parseInt(value2)){
            value2 = value1;
            $(".maxCost").val(value2);
        }
        $(".range-line").slider("values",1,value2);
    });
    setTimeout(function () {
        if($('.list-right').length > 0) {
            var heightDuration = $('.list-right').height() - $('.list-filter').height();
            var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "0", offset: "-120"}});
            var scene1 = new ScrollMagic.Scene({
                triggerElement: ".list-right", // point of execution
                duration: heightDuration, // pin element for the window height - 1
                reverse: true // allows the effect to trigger when scrolled in the reverse direction
            })
                .setPin(".list-filter") // the element we want to pin
                .addTo(controller);
        }
    }, 500);
    var itemIndex = 1,
        currentItem,
        currentPercent,
        maxIndex = 3;
    $('.list-btn_next').click(function(){
        itemIndex = itemIndex + 1;
        if(itemIndex > maxIndex) {
            itemIndex = maxIndex
        }
        currentItem = '.step' + itemIndex;
        $('.list-content-item').css('display', 'none');
        $(currentItem).css('display', 'block');
        currentPercent = 50 * (itemIndex - 1) + '%';
        $('.list-page-item').eq(itemIndex - 1).addClass('active').siblings().removeClass('active');
        $('.progress_list').css('width', currentPercent);
        $('html, body').animate({scrollTop: 0},300)
    });
    $('.list-btn_back').click(function(){
        itemIndex = itemIndex - 1;
        if(itemIndex < 1) {
            itemIndex = 1
        }
        currentItem = '.step' + itemIndex;
        currentPercent = 50 * (itemIndex - 1) + '%';
        $('.progress_list').css('width', currentPercent);
        $('.list-content-item').css('display', 'none');
        $(currentItem).css('display', 'block');
        $('.list-page-item').eq(itemIndex - 1).addClass('active').siblings().removeClass('active');
        $('html, body').animate({scrollTop: 0},300)
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
        $('html, body').animate({scrollTop: 0},300)
    });
    $('.equipment-pointer').hover(function () {
       var hoverIndex = $(this).index();
       $('.equipment-item').eq(hoverIndex).addClass('active').siblings().removeClass('active')
    },function () {
        $('.equipment-item').removeClass('active')
    });
    $('.house-top-section').hover(function () {
        var sectionIndex = $(this).index();
        $('.house-top-section').eq(sectionIndex).addClass('hover').siblings().removeClass('hover');
        $('.house-top-item').eq(sectionIndex).addClass('hover').siblings().removeClass('hover')
    },function () {
        $('.house-top-section').removeClass('hover');
        $('.house-top-item').removeClass('hover');
    });
    $('.house-top-section').click(function () {
        var sliderItem = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.house-top-item').eq(sliderItem).addClass('active').siblings().removeClass('active');
        $('.house-slider2').slick('slickGoTo', sliderItem)
    });
    $('.house-slider2').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        $('.house-top-item').eq(nextSlide).addClass('active').siblings().removeClass('active');
        $('.house-top-section').eq(nextSlide).addClass('active').siblings().removeClass('active');
    });
});
$(window).scroll(function() {
    var scrollTop;
    scrollTop = $(this).scrollTop();
    if (scrollTop > 50) {
        $('.header').addClass('white');
    }
    else {
        $('.header').removeClass('white');
    }
});
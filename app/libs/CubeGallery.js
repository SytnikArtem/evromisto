var cubeGallery = function (config) {

    var animEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    };

    /**
     * Settings for cube gallery
     *
     * @type {{cubeSelector: string, sideSelector: string, cubeElement: null, sideElements: *[], currentSide: number}}
     */
    var self = {
        cubeSelector: "#cubeGallery",
        sideSelector: ".cubeSide",
        cubeElement: null,
        sideElements: [null, null, null, null],
        currentSide: 0,
        classCurrent: "cubeGalleryCurrent",
        inClass: "cubeGalleryCurrent",
        outClass: "cubeGalleryCurrent",
        currentAngle: 0,
        perspective: "3360px",
        distance: 420,
        wrapSelector: "",
        mainSelector: ""
    };

    /**
     *
     * @param config
     * @returns {{cubeSelector: string, sideSelector: string, cubeElement: null, sideElements: *[], currentSide: number}}
     */
    self.init = function (config) {
        if (config !== undefined) {
            if (!self.validateConfig(config)) {
                throw "Invalid config";
            }
        }

        for (var index in config) self[index] = config[index];

        self.cubeElement = $(self.cubeSelector);

        if (self.cubeElement.length === 0) {
            throw "No cube element";
        }

        var sides = self.cubeElement.find(config.sideSelector);
        if (sides.length !== 4) {
            throw "There is not 4 sides";
        }

        for (var i = 0; i < 4; i++) {
            self.sideElements[i] = sides[i];
        }

        $(self.sideElements[self.currentSide]).addClass(self.classCurrent);

        var height = $(window).height() / 2;

        $(".main_slider__wrap").css("transform", "translateZ(-" + height + "px");

        $(self.sideElements[0]).css("transform", "translateZ(" + height + "px)");
        $(self.sideElements[1]).css("transform", "rotateX(-90deg) translateY(" + height + "px)");
        $(self.sideElements[1]).css("transform-origin", "center bottom 0px");

        $(self.sideElements[2]).css("transform", "translateZ(-" + height + "px) rotateX(180deg) ");
        $(self.sideElements[3]).css("transform-origin", "center top 0px");
        $(self.sideElements[3]).css("transform", "rotateX(-270deg) translateY(-" + height + "px)");

        $(window).resize(function () {
            var height = $(window).height() / 2;
            $(".main_slider__wrap").css("transform", "translateZ(-" + height + "px");

            $(self.sideElements[0]).css("transform", "translateZ(" + height + "px)");
            $(self.sideElements[1]).css("transform", "rotateX(-90deg) translateY(" + height + "px)");
            $(self.sideElements[1]).css("transform-origin", "center bottom 0px");

            $(self.sideElements[2]).css("transform", "translateZ(-" + height + "px) rotateX(180deg) ");
            $(self.sideElements[3]).css("transform-origin", "center top 0px");
            $(self.sideElements[3]).css("transform", "rotateX(-270deg) translateY(-" + height + "px)");
        });

        return self;
    };

    self.validateConfig = function (config) {
        if (config === undefined) {
            return false;
        }
        if (config.cubeSelector === undefined || config.cubeSelector === "") {
            return false;
        }

        if (config.sideSelector === undefined || config.sideSelector === "") {
            return false;
        }

        return true;
    };

    /**
     * Поворот куба вперед
     */
    self.next = function () {
        // var $prevPage = $(self.sideElements[self.currentSide]);

        if (!self.isAnimating) {
            self.isAnimating = true;

            if (self.currentSide === 3) {
                self.currentSide = 0;
            } else {
                self.currentSide++;
            }
            var oldAngle = self.currentAngle;
            self.currentAngle += 90;
            $({deg: oldAngle}).animate({deg: self.currentAngle}, {
                duration: 1000,
                step: function (now) {
                    $(".main_slider__main").css({
                        transform: 'rotateX(' + now + 'deg)'
                    });
                }
            });

            setTimeout(function (gallery) {
                gallery.isAnimating = false;
            }, 1000, self);

            self.cubeElement.find(self.sideSelector).removeClass(self.classCurrent);
            $(self.sideElements[self.currentSide]).addClass(self.classCurrent);
        }
    };

    /**
     * Поворот куба назад
     */
    self.prev = function () {
        if (!self.isAnimating) {
            self.isAnimating = true;

            if (self.currentSide === 0) {
                self.currentSide = 3;
            } else {
                self.currentSide--;
            }

            var oldAngle = self.currentAngle;
            self.currentAngle -= 90;
            $({deg: oldAngle}).animate({deg: self.currentAngle}, {
                duration: 1000,
                step: function (now) {
                    $(".main_slider__main").css({
                        transform: 'rotateX(' + now + 'deg)'
                    });
                }
            });
            setTimeout(function (gallery) {
                gallery.isAnimating = false;
            }, 1000, self);

            self.cubeElement.find(self.sideSelector).removeClass(self.classCurrent);
            $(self.sideElements[self.currentSide]).addClass(self.classCurrent);
        }
    };

    return self.init(config);
};
function inherits(childCtor, parentCtor) {
    function tempCtor() {}
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;
}

function MarkerLabel_(marker, crossURL, handCursorURL) {
    this.marker_ = marker;
    this.handCursorURL_ = marker.handCursorURL;
    this.labelDiv_ = document.createElement("div");
    this.labelDiv_.style.cssText = "position: absolute; overflow: hidden;";
    this.crossDiv_ = MarkerLabel_.getSharedCross(crossURL);
}
inherits(MarkerLabel_, google.maps.OverlayView);
MarkerLabel_.getSharedCross = function(crossURL) {
    var div;
    if (typeof MarkerLabel_.getSharedCross.crossDiv === "undefined") {
        div = document.createElement("img");
        div.style.cssText = "position: absolute; z-index: 1000002; display: none;";
        div.style.marginLeft = "-8px";
        div.style.marginTop = "-9px";
        div.src = crossURL;
        MarkerLabel_.getSharedCross.crossDiv = div;
    }
    return MarkerLabel_.getSharedCross.crossDiv;
};
MarkerLabel_.prototype.onAdd = function() {
    var me = this;
    var cMouseIsDown = false;
    var cDraggingLabel = false;
    var cSavedZIndex;
    var cLatOffset, cLngOffset;
    var cIgnoreClick;
    var cRaiseEnabled;
    var cStartPosition;
    var cStartCenter;
    var cRaiseOffset = 20;
    var cDraggingCursor = "url(" + this.handCursorURL_ + ")";
    var cAbortEvent = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    };
    var cStopBounce = function() {
        me.marker_.setAnimation(null);
    };
    this.getPanes().overlayMouseTarget.appendChild(this.labelDiv_);
    if (typeof MarkerLabel_.getSharedCross.processed === "undefined") {
        this.getPanes().overlayMouseTarget.appendChild(this.crossDiv_);
        MarkerLabel_.getSharedCross.processed = true;
    }
    this.listeners_ = [google.maps.event.addDomListener(this.labelDiv_, "mouseover", function(e) {
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            this.style.cursor = "pointer";
            google.maps.event.trigger(me.marker_, "mouseover", e);
        }
    }), google.maps.event.addDomListener(this.labelDiv_, "mouseout", function(e) {
        if ((me.marker_.getDraggable() || me.marker_.getClickable()) && !cDraggingLabel) {
            this.style.cursor = me.marker_.getCursor();
            google.maps.event.trigger(me.marker_, "mouseout", e);
        }
    }), google.maps.event.addDomListener(this.labelDiv_, "mousedown", function(e) {
        cDraggingLabel = false;
        if (me.marker_.getDraggable()) {
            cMouseIsDown = true;
            this.style.cursor = cDraggingCursor;
        }
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            google.maps.event.trigger(me.marker_, "mousedown", e);
            cAbortEvent(e);
        }
    }), google.maps.event.addDomListener(document, "mouseup", function(mEvent) {
        var position;
        if (cMouseIsDown) {
            cMouseIsDown = false;
            me.eventDiv_.style.cursor = "pointer";
            google.maps.event.trigger(me.marker_, "mouseup", mEvent);
        }
        if (cDraggingLabel) {
            if (cRaiseEnabled) {
                position = me.getProjection().fromLatLngToDivPixel(me.marker_.getPosition());
                position.y += cRaiseOffset;
                me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
                try {
                    me.marker_.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(cStopBounce, 1406);
                } catch (e) {}
            }
            me.crossDiv_.style.display = "none";
            me.marker_.setZIndex(cSavedZIndex);
            cIgnoreClick = true;
            cDraggingLabel = false;
            mEvent.latLng = me.marker_.getPosition();
            google.maps.event.trigger(me.marker_, "dragend", mEvent);
        }
    }), google.maps.event.addListener(me.marker_.getMap(), "mousemove", function(mEvent) {
        var position;
        if (cMouseIsDown) {
            if (cDraggingLabel) {
                mEvent.latLng = new google.maps.LatLng(mEvent.latLng.lat() - cLatOffset, mEvent.latLng.lng() - cLngOffset);
                position = me.getProjection().fromLatLngToDivPixel(mEvent.latLng);
                if (cRaiseEnabled) {
                    me.crossDiv_.style.left = position.x + "px";
                    me.crossDiv_.style.top = position.y + "px";
                    me.crossDiv_.style.display = "";
                    position.y -= cRaiseOffset;
                }
                me.marker_.setPosition(me.getProjection().fromDivPixelToLatLng(position));
                if (cRaiseEnabled) {
                    me.eventDiv_.style.top = (position.y + cRaiseOffset) + "px";
                }
                google.maps.event.trigger(me.marker_, "drag", mEvent);
            } else {
                cLatOffset = mEvent.latLng.lat() - me.marker_.getPosition().lat();
                cLngOffset = mEvent.latLng.lng() - me.marker_.getPosition().lng();
                cSavedZIndex = me.marker_.getZIndex();
                cStartPosition = me.marker_.getPosition();
                cStartCenter = me.marker_.getMap().getCenter();
                cRaiseEnabled = me.marker_.get("raiseOnDrag");
                cDraggingLabel = true;
                me.marker_.setZIndex(1000000);
                mEvent.latLng = me.marker_.getPosition();
                google.maps.event.trigger(me.marker_, "dragstart", mEvent);
            }
        }
    }), google.maps.event.addDomListener(document, "keydown", function(e) {
        if (cDraggingLabel) {
            if (e.keyCode === 27) {
                cRaiseEnabled = false;
                me.marker_.setPosition(cStartPosition);
                me.marker_.getMap().setCenter(cStartCenter);
                google.maps.event.trigger(document, "mouseup", e);
            }
        }
    }), google.maps.event.addDomListener(this.labelDiv_, "click", function(e) {
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            if (cIgnoreClick) {
                cIgnoreClick = false;
            } else {
                google.maps.event.trigger(me.marker_, "click", e);
                cAbortEvent(e);
            }
        }
    }), google.maps.event.addDomListener(this.labelDiv_, "dblclick", function(e) {
        if (me.marker_.getDraggable() || me.marker_.getClickable()) {
            google.maps.event.trigger(me.marker_, "dblclick", e);
            cAbortEvent(e);
        }
    }), google.maps.event.addListener(this.marker_, "dragstart", function(mEvent) {
        if (!cDraggingLabel) {
            cRaiseEnabled = this.get("raiseOnDrag");
        }
    }), google.maps.event.addListener(this.marker_, "drag", function(mEvent) {
        if (!cDraggingLabel) {
            if (cRaiseEnabled) {
                me.setPosition(cRaiseOffset);
                me.labelDiv_.style.zIndex = 1000000 + (this.get("labelInBackground") ? -1 : +1);
            }
        }
    }), google.maps.event.addListener(this.marker_, "dragend", function(mEvent) {
        if (!cDraggingLabel) {
            if (cRaiseEnabled) {
                me.setPosition(0);
            }
        }
    }), google.maps.event.addListener(this.marker_, "position_changed", function() {
        me.setPosition();
    }), google.maps.event.addListener(this.marker_, "zindex_changed", function() {
        me.setZIndex();
    }), google.maps.event.addListener(this.marker_, "visible_changed", function() {
        me.setVisible();
    }), google.maps.event.addListener(this.marker_, "labelvisible_changed", function() {
        me.setVisible();
    }), google.maps.event.addListener(this.marker_, "title_changed", function() {
        me.setTitle();
    }), google.maps.event.addListener(this.marker_, "labelcontent_changed", function() {
        me.setContent();
    }), google.maps.event.addListener(this.marker_, "labelanchor_changed", function() {
        me.setAnchor();
    }), google.maps.event.addListener(this.marker_, "labelclass_changed", function() {
        me.setStyles();
    }), google.maps.event.addListener(this.marker_, "labelstyle_changed", function() {
        me.setStyles();
    })];
};
MarkerLabel_.prototype.onRemove = function() {
    var i;
    this.labelDiv_.parentNode.removeChild(this.labelDiv_);
    for (i = 0; i < this.listeners_.length; i++) {
        google.maps.event.removeListener(this.listeners_[i]);
    }
};
MarkerLabel_.prototype.draw = function() {
    this.setContent();
    this.setTitle();
    this.setStyles();
};
MarkerLabel_.prototype.setContent = function() {
    var content = this.marker_.get("labelContent");
    if (typeof content.nodeType === "undefined") {
        this.labelDiv_.innerHTML = content;
    } else {
        this.labelDiv_.innerHTML = "";
        this.labelDiv_.appendChild(content);
    }
};
MarkerLabel_.prototype.setTitle = function() {
    this.labelDiv_.title = this.marker_.getTitle() || "";
};
MarkerLabel_.prototype.setStyles = function() {
    var i, labelStyle;
    this.labelDiv_.className = this.marker_.get("labelClass");
    this.labelDiv_.style.cssText = "";
    labelStyle = this.marker_.get("labelStyle");
    for (i in labelStyle) {
        if (labelStyle.hasOwnProperty(i)) {
            this.labelDiv_.style[i] = labelStyle[i];
        }
    }
    this.setMandatoryStyles();
};
MarkerLabel_.prototype.setMandatoryStyles = function() {
    this.labelDiv_.style.position = "absolute";
    this.labelDiv_.style.overflow = "hidden";
    if (typeof this.labelDiv_.style.opacity !== "undefined" && this.labelDiv_.style.opacity !== "") {
        this.labelDiv_.style.MsFilter = "\"progid:DXImageTransform.Microsoft.Alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")\"";
        this.labelDiv_.style.filter = "alpha(opacity=" + (this.labelDiv_.style.opacity * 100) + ")";
    }
    this.setAnchor();
    this.setPosition();
    this.setVisible();
};
MarkerLabel_.prototype.setAnchor = function() {
    var anchor = this.marker_.get("labelAnchor");
    this.labelDiv_.style.marginLeft = -anchor.x + "px";
    this.labelDiv_.style.marginTop = -anchor.y + "px";
};
MarkerLabel_.prototype.setPosition = function(yOffset) {
    var position = this.getProjection().fromLatLngToDivPixel(this.marker_.getPosition());
    if (typeof yOffset === "undefined") {
        yOffset = 0;
    }
    this.labelDiv_.style.left = Math.round(position.x) + "px";
    this.labelDiv_.style.top = Math.round(position.y - yOffset) + "px";
    this.setZIndex();
};
MarkerLabel_.prototype.setZIndex = function() {
    var zAdjust = (this.marker_.get("labelInBackground") ? -1 : +1);
    if (typeof this.marker_.getZIndex() === "undefined") {
        this.labelDiv_.style.zIndex = parseInt(this.labelDiv_.style.top, 10) + zAdjust;
    } else {
        this.labelDiv_.style.zIndex = this.marker_.getZIndex() + zAdjust;
    }
};
MarkerLabel_.prototype.setVisible = function() {
    if (this.marker_.get("labelVisible")) {
        this.labelDiv_.style.display = this.marker_.getVisible() ? "block" : "none";
    } else {
        this.labelDiv_.style.display = "none";
    }
};

function MarkerWithLabel(opt_options) {
    opt_options = opt_options || {};
    opt_options.labelContent = opt_options.labelContent || "";
    opt_options.labelAnchor = opt_options.labelAnchor || new google.maps.Point(0, 0);
    opt_options.labelClass = opt_options.labelClass || "markerLabels";
    opt_options.labelStyle = opt_options.labelStyle || {};
    opt_options.labelInBackground = opt_options.labelInBackground || false;
    if (typeof opt_options.labelVisible === "undefined") {
        opt_options.labelVisible = true;
    }
    if (typeof opt_options.raiseOnDrag === "undefined") {
        opt_options.raiseOnDrag = true;
    }
    if (typeof opt_options.clickable === "undefined") {
        opt_options.clickable = true;
    }
    if (typeof opt_options.draggable === "undefined") {
        opt_options.draggable = false;
    }
    if (typeof opt_options.optimized === "undefined") {
        opt_options.optimized = false;
    }
    opt_options.crossImage = opt_options.crossImage || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/drag_cross_67_16.png";
    opt_options.handCursor = opt_options.handCursor || "http" + (document.location.protocol === "https:" ? "s" : "") + "://maps.gstatic.com/intl/en_us/mapfiles/closedhand_8_8.cur";
    opt_options.optimized = false;
    this.label = new MarkerLabel_(this, opt_options.crossImage, opt_options.handCursor);
    google.maps.Marker.apply(this, arguments);
}
inherits(MarkerWithLabel, google.maps.Marker);
MarkerWithLabel.prototype.setMap = function(theMap) {
    google.maps.Marker.prototype.setMap.apply(this, arguments);
    this.label.setMap(theMap);
};
$(document).ready(function() {
    function initMap() {
        var evromisto = {
            lat: 50.377244,
            lng: 30.379595
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            center: evromisto,
            zoom: 12,
            scrollwheel: false
        });
        var icon = {
            url: 'img/pin.png',
            size: new google.maps.Size(82, 131)
        };
        var DirectionsRendererOptions = {
            preserveViewport: true,
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: '#702324'
            }
        };
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer(DirectionsRendererOptions);
        var marker = new MarkerWithLabel({
            position: evromisto,
            map: map,
            labelContent: translation.iconCaption,
            labelClass: "marker-label",
            labelInBackground: false,
            icon: icon
        });
        directionsDisplay.setMap(map);
        var markersToRemove = [];
        var onChangeHandler = function() {
            removeMarkers();
            var destination = {
                lat: parseFloat($(this).attr('data-lat'), 10),
                lng: parseFloat($(this).attr('data-lng'), 10)
            };
            var location = $(this).attr('data-loc');
            calculateAndDisplayRoute(directionsService, directionsDisplay, destination, location);
        };
        document.getElementById('route-427').addEventListener('click', onChangeHandler);
        document.getElementById('route-368').addEventListener('click', onChangeHandler);
        document.getElementById('route-812').addEventListener('click', onChangeHandler);
        $('#makeroute').click(function() {
            if (navigator.geolocation) {
                removeMarkers();
                navigator.geolocation.getCurrentPosition(getPosition);
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        });

        function getPosition(position) {
            var destination = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            calculateAndDisplayOwnRoute(directionsService, directionsDisplay, destination, location);
        }

        function calculateAndDisplayOwnRoute(directionsService, directionsDisplay, destination, location) {
            directionsService.route({
                origin: {
                    lat: 50.377244,
                    lng: 30.378819
                },
                destination: destination,
                travelMode: 'DRIVING',
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    var leg = response.routes[0].legs[0];
                    makeOwnMarker(leg.end_location);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        function calculateAndDisplayRoute(directionsService, directionsDisplay, destination, location) {
            directionsService.route({
                origin: {
                    lat: 50.377244,
                    lng: 30.378819
                },
                destination: destination,
                travelMode: 'TRANSIT',
                transitOptions: {
                    modes: ['BUS'],
                    routingPreference: 'FEWER_TRANSFERS',
                },
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    var leg = response.routes[0].legs[0];
                    makeMarker(leg.end_location, location);
                    setTimeout(function() {
                        $('img[src*="bus2.png"]').parent('div').fadeOut('slow');
                    }, 200);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }

        function makeOwnMarker(position) {
            var destOwnMarker = new MarkerWithLabel({
                position: position,
                map: map,
                labelContent: translation.iconCaptionYou,
                labelClass: "start-marker-label",
                labelInBackground: false,
                icon: ' '
            });
            markersToRemove.push(destOwnMarker);
        }

        function makeMarker(position, location) {
            var destMarker = new MarkerWithLabel({
                position: position,
                map: map,
                labelContent: location,
                labelClass: "start-marker-label",
                labelInBackground: false,
                icon: ' '
            });
            markersToRemove.push(destMarker);
        }

        function removeMarkers() {
            for (var i = 0; i < markersToRemove.length; i++) {
                markersToRemove[i].setMap(null);
            }
        }
    }
    if ($('#map').length > 0) {
        initMap();
    }
});
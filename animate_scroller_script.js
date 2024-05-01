window.devicePixelRatio = 1;

function addMousewheelHandlers(element, up, down, preventDefault) {
    element.addEventListener('mouseenter', () => giveFocus(element, up, down, preventDefault));
    element.addEventListener('mouseleave', () => removeFocus(element));
}

function addMousewheelDownHandler(element, fn, preventDefault) {
    addMousewheelHandlers(element, function() {}, fn, preventDefault);
}

function addMousewheelUpHandler(element, fn, preventDefault) {
    addMousewheelHandlers(element, fn, function() {}, preventDefault);
}

function removeMousewheelHandlers(element) {
    element.removeEventListener('mouseenter', giveFocus);
    element.removeEventListener('mouseleave', removeFocus);
    removeFocus(element);
}

function giveFocus(el, up, down, preventDefault) {
    if (el._handleMousewheel) removeFocus(el);
    
    el._handleMousewheel = function(event) {
        event = event || window.event;
        if (preventDefault) {
            if (event.preventDefault) event.preventDefault();
            else event.returnValue = false;
        }
        let delta = 0;
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            delta = -event.detail / 3;
        }
        if (up && (delta > 0 || !down))
            up.call(el, event, delta);
        else if (down && delta < 0)
            down.call(el, event, delta);
    };

    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', el._handleMousewheel, false);
    }
    window.onmousewheel = document.onmousewheel = el._handleMousewheel;
}

function removeFocus(el) {
    if (!el._handleMousewheel) return;
    
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', el._handleMousewheel, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    el._handleMousewheel = null;
}

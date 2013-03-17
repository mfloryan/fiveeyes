function Draw(canvasContext) {

    var context = canvasContext;

    function circlePath(x, y, radius) {
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.closePath();
    }

    return {
        circle: function(x, y, radius) {
            circlePath(x, y, radius);
            context.strokeStyle = "#eee";
            context.stroke();
        },

        filledCircle: function (x, y, radius) {
            circlePath(x, y, radius);
            context.fillStyle = "#eee";
            context.fill();
        },

        clearRectangle: function(x, y, dx, dy) {
            context.clearRect(x,y,dx,dy);
        }
    };
}

function drawEyesHandler(context, canvasLocation, width, height) {

    var eyeSize = 20;
    var pupilSize = 6;
    var draw = new Draw(context);

    function getMouseEyeOffsetLambda(canvasLocation) {
        return function(offset, mouseCoordinates, eyeXoffset, eyeYoffset) {

            var mouse_dx = mouseCoordinates.x - (canvasLocation.left + eyeXoffset);
            var mouse_dy = canvasLocation.top - mouseCoordinates.y + eyeYoffset;

            var theta = Math.atan2(mouse_dy, mouse_dx);

            var dx = offset * Math.cos(theta);
            var dy = offset * Math.sin(theta);

            return {dx: dx, dy: dy};
        }
    }

    var getMouseEyeOffsets = getMouseEyeOffsetLambda(canvasLocation);

    function drawEye(dx, ddx, ddy) {
        draw.circle(eyeSize + dx, eyeSize, eyeSize);
        draw.filledCircle(eyeSize + dx + ddx, eyeSize - ddy, pupilSize);
    }

    function drawEyes(mouseCoordinates, offset) {

        var offsets1 = getMouseEyeOffsets(offset, mouseCoordinates, eyeSize / 2, eyeSize / 2);
        var offsets2 = getMouseEyeOffsets(offset, mouseCoordinates, eyeSize, eyeSize / 2);

        drawEye(0, offsets1.dx, offsets1.dy);
        drawEye(2 * eyeSize, offsets2.dx, offsets2.dy);
    }

    return function(event) {
        draw.clearRectangle(0,0, 80, 80);
        drawEyes({x:event.pageX, y:event.pageY}, 10);
    }
}

$(function() {
    var eyeCanvas = document.getElementById("eyecanvas");
    var eyeDiv = $('#eyes');
    var context = eyeCanvas.getContext("2d");
    $('html').on('mousemove',drawEyesHandler(
        context,
        $(eyeCanvas).offset(),
        eyeDiv.width(),
        eyeDiv.height()));
});
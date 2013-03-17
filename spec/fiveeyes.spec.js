var layoutBuilder = function() {

    var self = this;
    var canvasOffset;

    self.withCanvasOffset = function(x, y) {
        canvasOffset = new Point(x,y);
    }

    self.build = function() {
        return new EyesLayout(canvasOffset);
    }

}

describe("fiveeyes - maths", function() {
    it("calculates eyes coordinates for default size", function() {
        var layout = new layoutBuilder().build();

        var left = layout.leftEye.position;
        var right = layout.rightEye.position;

        expect(left.x).toBe(0);
        expect(left.y).toBe(0);

        expect(right.x).toBe(10);
        expect(right.y).toBe(0);
    });
});
import * as p5 from "../lib/p5";

export default function splatter1( p: any ) {
    let debounce = false;

    p.setup = function() {
        const cvs = p.createCanvas(1024, 768);
        cvs.elt.id = "mainCanvas";
    }

    p.draw = function() {
        if (p.mouseIsPressed && !debounce) {
            debounce = true;
            const numRays = p.random(3, 6);
            for (let i = 0; i < numRays; i++) {
                const angle = p.random(0, 360);
                const vec = p5.Vector.fromAngle(p.radians(angle));
                const slope = vec.y / vec.x;
                const numCircles = p.random(3, 8);
                for (let i = 0; i < numCircles; i++) {
                    const size = p.random(5, 15);
                    const y = p.mouseY + p.randomGaussian(0, 25);
                    const x = slope * (y - p.mouseY) + p.mouseX;
                    p.ellipse(x, y, size, size);
                }
            }
            setTimeout(() => debounce = false, 100);
        }
    }
}

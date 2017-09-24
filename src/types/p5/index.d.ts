// Type definitions for p5js
// Project: https://p5js.org
// Definitions by: Jeremy Dormitzer <jeremy.dormitzer@gmail.com>

// p5 exposes its functions globally, but also has an 'instance mode'
// that allows users to instantiate p5 instances

declare namespace p5 {
    type P2D = "p2d";
    type WEBGL = "webgl";

    class P5 {
        // TODO make all chainable methods return P5
        constructor(sketch: Sketch, node?: HTMLElement, sync?: boolean);
        constructor(sketch: Sketch, sync?: boolean);

        // Instance methods
        background(color: Color, opacity?: number): void;
        background(colorstring: string, opacity?: number): void;
        background(gray: number, opacity?: number): void;
        background(
            redOrHue: number,
            greenOrSat: number,
            blueOrBright: number,
            opacity?: number
        ): void;
        // TODO add p5.image and the last background overload
        color(gray: number, alpha?: number): Color;
        color(
            redOrHue: number,
            greenOrSat: number,
            blueOrBright: number,
            alpha?: number
        ): Color;
        color(value: string, alpha?: number): Color;
        color(
            values: [number, number, number, number] | [number, number, number]
        ): Color;
        color(color: Color): Color;
        createCanvas(
            width: number,
            height: number,
            renderer?: P2D | WEBGL
        ): any; // TODO declare canvas type
        draw(): void;
        ellipse(x: number, y: number, width: number, height?: number): void;
        fill(
            redOrHue: number,
            greenOrSat: number,
            blueOrBright: number,
            alpha?: number
        ): void;
        fill(value: string, alpha?: number): void;
        fill(
            values: [number, number, number, number] | [number, number, number]
        ): void;
        fill(color: Color, alpha?: number): void;
        noLoop(): void;
        radians(degrees: number): number;
        random(): number;
        random(max: number): number;
        random(min: number, max: number): number;
        random<T>(choices: T[]): T;
        randomGaussian(): number;
        randomGaussian(mean: number): number;
        randomGaussian(mean: number, standardDeviation: number): number;
        randomSeed(seed: number): void;
        rect(
            x: number,
            y: number,
            width: number,
            height: number,
            tl?: number,
            tr?: number,
            br?: number,
            bl?: number
        ): void;
        resizeCanvas(width: number, height: number, noRedraw?: boolean): void;
        save(filename: string): void;
        // TODO add other save versions
        setup(): void;
        stroke(
            redOrHue: number,
            greenOrSat: number,
            blueOrBright: number,
            alpha?: number
        ): void;
        stroke(value: string, alpha?: number): void;
        stroke(
            values: [number, number, number, number] | [number, number, number]
        ): void;
        stroke(color: Color, alpha?: number): void;
        windowResized(): void;

        // Instance variables
        mouseIsPressed: boolean;
        mouseX: number;
        mouseY: number;
        width: number;
        height: number;
    }

    class Color {
        constructor();
    }

    class Vector {
        x: number;
        y: number;
        z: number;

        constructor(x?: number, y?: number, z?: number);

        add(x: number, y?: number, z?: number): Vector;
        add(other: Vector): Vector;
        add(
            values: [number, number, number] | [number, number] | [number]
        ): Vector;
        angleBetween(other: Vector): number;
        array(): [number, number, number];
        copy(): Vector;
        cross(other: Vector): Vector;
        dist(other: Vector): number;
        div(scalar: number): Vector;
        dot(x: number, y?: number, z?: number): Vector;
        dot(other: Vector): Vector;
        equals(x?: number, y?: number, z?: number): boolean;
        equals(
            values: [number, number, number] | [number, number] | [number]
        ): boolean;
        equals(other: Vector): boolean;
        heading(): number;
        lerp(x: number, y: number, z: number, amt: number): Vector;
        lerp(other: Vector, amt: number): Vector;
        limit(max: number): Vector;
        mag(): number;
        magSq(): number;
        mult(scalar: number): Vector;
        normalize(): Vector;
        rotate(angle: number): Vector;
        set(x?: number, y?: number, z?: number): Vector;
        set(vector: Vector): Vector;
        set(
            values: [number, number, number] | [number, number] | [number]
        ): Vector;
        setMag(len: number): Vector;
        sub(x: number, y?: number, z?: number): Vector;
        sub(other: Vector): Vector;
        sub(
            values: [number, number, number] | [number, number] | [number]
        ): Vector;
        toString(): string;

        static add(v1: Vector, v2: Vector, target?: Vector): Vector;
        static cross(v1: Vector, v2: Vector): Vector;
        static dist(v1: Vector, v2: Vector): number;
        static div(vector: Vector, scalar: number, target?: Vector): Vector;
        static dot(v1: Vector, v2: Vector): Vector;
        static fromAngle(angle: number): Vector;
        static lerp(
            v1: Vector,
            v2: Vector,
            amt: number,
            target?: Vector
        ): Vector;
        static mag(vector: Vector): number;
        static magSq(vector: Vector): number;
        static mult(vector: Vector, scalar: number, target?: Vector): Vector;
        static random2D(): Vector;
        static random3D(): Vector;
        static sub(v1: Vector, v2: Vector, target?: Vector): Vector;
    }

    interface Sketch {
        (p5: P5): void;
    }
}

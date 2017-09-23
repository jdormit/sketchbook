const calculateAdjSize = (
    width: number,
    height: number,
    p: any
): [number, number] => {
    const adjWidth =
        window.innerWidth - 20 < width ? window.innerWidth - 20 : width;
    const adjHeight =
        window.innerWidth - 20 < width
            ? Math.floor(height / width * adjWidth)
            : height;
    return [adjWidth, adjHeight];
};
export default function createMainCanvas(
    p: any,
    width = 1024,
    height = 768
): any {
    const maybeCvs = document.getElementById("mainCanvas");
    if (maybeCvs && maybeCvs.parentElement) {
        maybeCvs.parentElement.removeChild(maybeCvs);
    }
    const [adjWidth, adjHeight] = calculateAdjSize(width, height, p);
    const cvs = p.createCanvas(adjWidth, adjHeight);
    cvs.elt.id = "mainCanvas";

    p.windowResized = () => {
        const [adjWidth, adjHeight] = calculateAdjSize(width, height, p);
        if (adjWidth !== p.width || adjHeight !== p.height) {
            p.resizeCanvas(adjWidth, adjHeight);
        }
    };

    return cvs;
}

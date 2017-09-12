export default function createMainCanvas(p: any, width = 1024, height = 768): any {
    const maybeCvs = document.getElementById('mainCanvas');
    if (maybeCvs && maybeCvs.parentElement) {
        maybeCvs.parentElement.removeChild(maybeCvs);
    }
    const cvs = p.createCanvas(width, height);
    cvs.elt.id = 'mainCanvas';
    return cvs;
}

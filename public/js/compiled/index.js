function createCanvasWithId(w, h, id) {
    var cvs = createCanvas(w, h);
    cvs.elt.id = id;
    return cvs;
}

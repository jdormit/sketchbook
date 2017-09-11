function createCanvasWithId(w: number, h: number, id: string) : any {
    const cvs = createCanvas(w, h);
    cvs.elt.id = id;
    return cvs;
}

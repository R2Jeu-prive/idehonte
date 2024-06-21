function shopFiller() {
    let section1 = document.getElementById("section-assignments");
    let section2 = document.getElementById("section-control-flow");
    let section3 = document.getElementById("section-operators");
    let section4 = document.getElementById("section-list");
    let section5 = document.getElementById("section-array");
    for(let i = 0; i < 3; i++){
        let block = new PrintIntEB();
        block.SetShopCategory(section1);
    }
    for(let i = 0; i < 4; i++){
        let block = new PlusEB();
        block.SetShopCategory(section2);
    }
    for(let i = 0; i < 3; i++){
        let block = new IntConstantEB(i);
        block.SetShopCategory(section3);
    }
}
shopFiller();

function shopFiller() {
    // Assignments
    const sectionAssignments = document.getElementById("section-assignments");
    (new PrintIntEB()).SetShopCategory(sectionAssignments);

    // Control Flow
    const sectionControlFlow = document.getElementById("section-control-flow");
    for (let i = 0; i < 6; i++) {
        let block = new IntConstantEB(i);
        block.SetShopCategory(sectionControlFlow);
    }

    // Operators
    const sectionOperators = document.getElementById("section-operators");

    (new PlusEB()).SetShopCategory(sectionOperators);


    // List
    const sectionList = document.getElementById("section-list");

    // Array
    const sectionArray = document.getElementById("section-array");
}
shopFiller();

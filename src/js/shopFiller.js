function shopFiller() {
    // Assignments
    const sectionAssignments = document.getElementById("section-assignments");
    (new PrintIntEB()).SetShopCategory(sectionAssignments);
    (new IfEB()).SetShopCategory(sectionAssignments);
    (new IfElseEB()).SetShopCategory(sectionAssignments);

    // Control Flow
    const sectionControlFlow = document.getElementById("section-control-flow");
    for (let i = 15; i > 0; i--) {
        const block = new IntConstantEB(i);
        block.SetShopCategory(sectionControlFlow);
    }

    // Operators
    const sectionOperators = document.getElementById("section-operators");

    (new PlusEB()).SetShopCategory(sectionOperators);


    // List
    const sectionList = document.getElementById("section-list");
    (new IntConstantEB(123456)).SetShopCategory(sectionList);

    // Array
    const sectionArray = document.getElementById("section-array");
    (new IntConstantEB(123789)).SetShopCategory(sectionArray);
}
shopFiller();

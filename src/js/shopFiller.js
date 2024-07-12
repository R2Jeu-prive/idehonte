function shopFiller() {
    // Assignments
    const sectionAssignments = document.getElementById("section-assignments");
    (new PrintIntEB()).SetShopCategory(sectionAssignments);
    (new IfEB()).SetShopCategory(sectionAssignments);
    (new IfElseEB()).SetShopCategory(sectionAssignments);

    // Control Flow
    const sectionControlFlow = document.getElementById("section-control-flow");
    /*for (let i = 15; i > 0; i--) {
        const block = new IntConstantEB(i);
        block.SetShopCategory(sectionControlFlow);
    }*/
    const trueBlock = new BoolConstantEB(true);
    trueBlock.SetShopCategory(sectionControlFlow);
    const falseBlock = new BoolConstantEB(false);
    falseBlock.SetShopCategory(sectionControlFlow);
    (new MinMaxIntFloatEB(true,true)).SetShopCategory(sectionControlFlow);
    (new MinMaxIntFloatEB(false,true)).SetShopCategory(sectionControlFlow);
    (new MinMaxIntFloatEB(true,false)).SetShopCategory(sectionControlFlow);
    (new MinMaxIntFloatEB(false,false)).SetShopCategory(sectionControlFlow);

    // Operators
    const sectionOperators = document.getElementById("section-operators");

    (new IntOperatorEB("+")).SetShopCategory(sectionOperators);
    (new IntOperatorEB("-")).SetShopCategory(sectionOperators);
    (new IntOperatorEB("*")).SetShopCategory(sectionOperators);
    (new IntOperatorEB("/")).SetShopCategory(sectionOperators);
    (new IntOperatorEB("mod")).SetShopCategory(sectionOperators);
    (new FloatOperatorEB("+.")).SetShopCategory(sectionOperators);
    (new FloatOperatorEB("-.")).SetShopCategory(sectionOperators);
    (new FloatOperatorEB("*.")).SetShopCategory(sectionOperators);
    (new FloatOperatorEB("/.")).SetShopCategory(sectionOperators);
    (new BoolOperatorEB("&&")).SetShopCategory(sectionOperators);
    (new BoolOperatorEB("||")).SetShopCategory(sectionOperators);
    (new NotEB()).SetShopCategory(sectionOperators);
    (new CompareOperatorEB("<")).SetShopCategory(sectionOperators);
    (new CompareOperatorEB(">")).SetShopCategory(sectionOperators);
    (new CompareOperatorEB("<=")).SetShopCategory(sectionOperators);
    (new CompareOperatorEB(">=")).SetShopCategory(sectionOperators);
    (new CompareOperatorEB("<>")).SetShopCategory(sectionOperators);
    (new CompareOperatorEB("=")).SetShopCategory(sectionOperators);


    // List
    const sectionList = document.getElementById("section-list");
    (new IntConstantEB(0)).SetShopCategory(sectionList);
    (new StringConstantEB("", true)).SetShopCategory(sectionList);
    (new CharConstantEB("", true)).SetShopCategory(sectionList);
    (new ListConstantEB(0, true)).SetShopCategory(sectionList);
    (new ArrayConstantEB(3, true)).SetShopCategory(sectionList);
    (new TupleConstantEB(2, true)).SetShopCategory(sectionList);
    (new SemiColonEB(2, true)).SetShopCategory(sectionList);

    // Array
    const sectionArray = document.getElementById("section-array");
    (new IdentETB("a")).SetShopCategory(sectionArray);
    (new IdentETB("b")).SetShopCategory(sectionArray);
    (new ArrowETB()).SetShopCategory(sectionArray);
    (new StarETB()).SetShopCategory(sectionArray);
}
shopFiller();

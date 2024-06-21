class IntConstantEB extends ExpressionBlock {
    /**
     * @param {number} n the value of this constant
     */
    constructor(n) {
        super(ExpressionBlock.text(n.toString(10)));
        this.constant = n;
        this.childrenBlocks = [];
        this.constant = n;
    }

    GetEvalType() {
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate() {
        let copy = new IntConstantEB(this.constant);
        copy.DuplicateClassList(this);
        return copy;
    }

    CheckValid() {
        return true;
    }
}

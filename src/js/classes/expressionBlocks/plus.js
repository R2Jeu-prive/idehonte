class PlusEB extends ExpressionBlock {
    constructor() {
        super(ExpressionBlock.emptySlot + ExpressionBlock.text("+") + ExpressionBlock.emptySlot);
        this.childrenBlocks = [null, null];
    }

    GetEvalType() {
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate() {
        let copy = new PlusEB();
        copy.DuplicateClassList(this);
        return copy;
    }

    CheckValid() {
        if (this.childrenBlocks[0] != null) {
            if (!(this.childrenBlocks[0] instanceof ExpressionBlock)) {
                return false;
            } // not an expression
            if (!this.childrenBlocks[0].CheckValid()) {
                return false;
            } // children not valid
            let [typeValid, _1, _2] = this.childrenBlocks[0]
                .GetEvalType()
                .CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("int")));
            if (!typeValid) {
                return false;
            } // invalid type
        }
        if (this.childrenBlocks[1] != null) {
            if (!(this.childrenBlocks[1] instanceof ExpressionBlock)) {
                return false;
            } // not an expression
            if (!this.childrenBlocks[1].CheckValid()) {
                return false;
            } // children not valid
            let [typeValid, _1, _2] = this.childrenBlocks[1]
                .GetEvalType()
                .CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("int")));
            if (!typeValid) {
                return false;
            } // invalid type
        }
        return true;
    }
}

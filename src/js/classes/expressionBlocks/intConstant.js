class IntConstantEB extends ExpressionBlock{
    /**
     * @param {number} n the value of this constant
     */
    constructor(n_){
        super(ExpressionBlock.text(n_.toString(10)))
        this.n = n_;
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate(){
        let copy = new IntConstantEB(this.n);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        return true;
    }
}

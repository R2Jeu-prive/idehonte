class IntConstantEB extends ExpressionBlock{
    /**
     * @param {number} n the value of this constant
     */
    constructor(n){
        super(ExpressionBlock.text(n.toString(10)))
        this.constant = n;
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate(){
        return new IntConstantEB(this.constant);
    }

    CheckValid(){
        return true;
    }
}

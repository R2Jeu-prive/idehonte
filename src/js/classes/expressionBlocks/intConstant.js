class IntConstantEB extends ExpressionBlock{
    /**
     * @param {number} n the value of this constant
     */
    constructor(n){
        super(ExpressionBlock.text(n.toString(10)))
        this.childrenBlocks = [];
        this.constant = n;
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate(){
        return super.Duplicate(new IntConstantEB(this.constant));
    }
}

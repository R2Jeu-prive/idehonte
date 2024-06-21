class IntConstantEB extends ExpressionBlock{
    /**
     * @param {number} n the value of this constant
     */
    constructor(n){
        super(n.toString(10))
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }
}
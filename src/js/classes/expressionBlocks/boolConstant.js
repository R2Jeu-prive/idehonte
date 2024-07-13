class BoolConstantEB extends ExpressionBlock{
    /**
     * @param {boolean} val the value of this constant
     */
    constructor(val_){
        super(ExpressionBlock.text(val_ ? "true" : "false"))
        this.val = val_;
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("bool"));
    }

    Duplicate(){
        let copy = new BoolConstantEB(this.val);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        return true;
    }
}

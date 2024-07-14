class BoolConstantEB extends ExpressionBlock{
    /**
     * @param {boolean} val_ the value of this constant
     */
    constructor(val_){
        super();
        this.val = val_;
        this.code = (val_ ? "true" : "false");
        this.domEl.appendChild(BlockFront.text(val_ ? "true" : "false"));
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

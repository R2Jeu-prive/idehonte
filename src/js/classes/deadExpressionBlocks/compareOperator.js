class CompareOperatorEB extends ExpressionBlock{
    /**
     * @param {string} symbol can be = < > <= >= <>
     */
    constructor(symbol_){
        super(ExpressionBlock.emptySlot + ExpressionBlock.text(symbol_) + ExpressionBlock.emptySlot)
        this.symbol = symbol_
        this.childrenBlocks = [null, null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("bool"));
    }

    Duplicate(){
        let copy = new CompareOperatorEB(this.symbol);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        if(this.childrenBlocks[0] != null){
            if(!(this.childrenBlocks[0] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[0].CheckValid()){return false;} // children not valid
        }
        if(this.childrenBlocks[1] != null){
            if(!(this.childrenBlocks[1] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[1].CheckValid()){return false;} // children not valid
        }
        if(this.childrenBlocks[0] != null && this.childrenBlocks[1] != null){
            let type0 = this.childrenBlocks[0].GetEvalType();
            let type1 = this.childrenBlocks[1].GetEvalType();
            type1 = type0.DistinguishIdentsWith(type1);
            let [typeValid, _0, _1] = type0.CheckCompatibilityWith(type1);
            if(!typeValid){return false;} // incompatible types
        }
        return true;
    }
}

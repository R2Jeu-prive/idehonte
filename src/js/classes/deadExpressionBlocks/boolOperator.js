class BoolOperatorEB extends ExpressionBlock{
    /**
     * @param {string} symbol can be &&, ||
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
        let copy = new BoolOperatorEB(this.symbol);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        if(this.childrenBlocks[0] != null){
            if(!(this.childrenBlocks[0] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[0].CheckValid()){return false;} // children not valid
            let [typeValid, _1, _2] = this.childrenBlocks[0].GetEvalType().CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("bool")));
            if(!typeValid){return false;} // invalid type
        }
        if(this.childrenBlocks[1] != null){
            if(!(this.childrenBlocks[1] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[1].CheckValid()){return false;} // children not valid
            let [typeValid, _1, _2] = this.childrenBlocks[1].GetEvalType().CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("bool")));
            if(!typeValid){return false;} // invalid type
        }
        return true;
    }
}

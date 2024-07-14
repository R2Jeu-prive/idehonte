class NotEB extends ExpressionBlock{
    constructor(){
        super(ExpressionBlock.text("not") + ExpressionBlock.emptySlot)
        this.childrenBlocks = [null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("bool"));
    }

    Duplicate(){
        let copy = new NotEB();
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
        return true;
    }
}

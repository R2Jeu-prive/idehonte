class IfElseEB extends ExpressionBlock{
    constructor(){
        super(ExpressionBlock.text("if") + ExpressionBlock.emptySlot + ExpressionBlock.text("then") + ExpressionBlock.emptySlot + ExpressionBlock.text("else") + ExpressionBlock.emptySlot)
        this.childrenBlocks = [null, null, null];
    }

    GetEvalType(){
        let type1 = this.childrenBlocks[1].GetEvalType();
        let type2 = this.childrenBlocks[2].GetEvalType().DistinguishIdentsWith(type1);
        let [typeValid, finalType, _2] = type1.CheckCompatibilityWith(type2);
        if(!typeValid){console.error("GetEvalType on if else where both case are incompatible (this should never happen)");}
        return finalType;
    }

    Duplicate(){
        let copy = new IfElseEB();
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
        }
        if(this.childrenBlocks[2] != null){
            if(!(this.childrenBlocks[2] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[2].CheckValid()){return false;} // children not valid
        }
        if(this.childrenBlocks[1] != null && this.childrenBlocks[2] != null){
            let type1 = this.childrenBlocks[1].GetEvalType();
            let type2 = this.childrenBlocks[2].GetEvalType();
            type2 = type1.DistinguishIdentsWith(type2);
            let [typeValid, _1, _2] = type1.CheckCompatibilityWith(type2);
            if(!typeValid){return false;} // incompatible types
        }
        return true;
    }
}

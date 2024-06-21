class PlusEB extends ExpressionBlock{
    constructor(){
        super(ExpressionBlock.emptySlot + ExpressionBlock.text("+") + ExpressionBlock.emptySlot)
        this.childrenBlocks = [null, null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate(){
        return super.Duplicate(new PlusEB());
    }
}

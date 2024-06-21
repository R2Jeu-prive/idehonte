class PrintIntEB extends ExpressionBlock{
    constructor(){
        super(ExpressionBlock.text("print_int") + ExpressionBlock.emptySlot)
        this.childrenBlocks = [null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("unit"));
    }
}

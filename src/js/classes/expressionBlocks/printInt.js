class PrintIntEB extends ExpressionBlock{
    constructor(){
        super("print_int %e")
        this.childrenBlocks = [null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("unit"));
    }
    
    Duplicate(){
        return new PrintIntEB();
    }
}
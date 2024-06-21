class PrintIntEB extends ExpressionBlock{
    constructor(){
        super("%e + %e")
        this.childrenBlocks = [null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("unit"));
    }
}
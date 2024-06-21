class PlusEB extends ExpressionBlock{
    constructor(){
        super("print_int %e")
        this.childrenBlocks = [null, null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }
}
class PlusEB extends ExpressionBlock{
    constructor(){
        super("%e + %e")
        this.childrenBlocks = [null, null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate(){
        return new PlusEB();
    }
}
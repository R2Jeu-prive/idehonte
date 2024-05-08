class ExpressionBlock extends Block{
    constructor(){
        super()
        this.evalType = null;
    }

    GetExpressionType(){
        console.error("cannot give expression type for any expression block");
    }
}
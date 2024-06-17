class ExpressionBlock extends Block{
    constructor(){
        super()
    }

    GetEvalType(){
        console.error("cannot give expression type for any expression block");
    }
}
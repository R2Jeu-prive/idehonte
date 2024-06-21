class ExpressionBlock extends Block{
    constructor(text_){
        super(text_)
    }

    /** @returns {ExpressionType} */
    GetEvalType(){
        console.error("cannot give expression type for any expression block");
    }
}
class ExpressionBlock extends Block{
    constructor(text_){
        super(text_)
    }

    GetEvalType(){
        console.error("cannot give expression type for any expression block");
    }
}
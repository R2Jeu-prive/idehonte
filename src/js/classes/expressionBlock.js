class ExpressionBlock extends Block{

    constructor(){
        super();
    }

    /** @returns {ExpressionType} */
    GetEvalType(){
        throw Error("This expression block doesn't have GetEvalType function");
    }
}

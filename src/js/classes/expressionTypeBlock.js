class ExpressionTypeBlock extends Block{

    constructor(){
        super();
        this.domEl.classList.add("expressionType")
    }

    /** @returns {ExpressionType} */
    GetType(){
        throw Error("This expression type block doesn't have GetType function");
    }
}

class ExpressionTypeBlock extends Block{
    /**
     * @param {string} text_ 
     * @param {ExpressionType} expressionType_
     */
    constructor(text_, expressionType_){
        super(text_);
        /** @type {ExpressionType} */
        this.expressionType = expressionType_;
    }
}
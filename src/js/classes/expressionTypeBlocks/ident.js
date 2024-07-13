class IdentETB extends ExpressionTypeBlock{
    /**
     * @param {string} letter_
     */
    constructor(letter_){
        super("'" + letter_);
        this.letter = letter_;
        this.childrenBlocks = [];
    }

    Duplicate(){
        return new IdentETB(this.letter);
    }

    /** @returns {ExpressionType} */
    GetEvalType(){
        return new ExpressionTypeIdent(this.letter)
    }

    CheckValid(){
        return true;
    }
}

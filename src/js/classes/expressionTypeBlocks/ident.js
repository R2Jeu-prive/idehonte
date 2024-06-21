class ExpressionTypeBlockIdent extends ExpressionTypeBlock {
    /**
     * @param {string} letter_
     */
    constructor(letter_) {
        super("'" + letter_, new ExpressionTypeIdent(letter_));
    }

    Duplicate() {
        return new ExpressionTypeBlockIdent(this.expressionType.letter);
    }
}

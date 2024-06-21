class ExpressionBlock extends Block {
    static emptySlot = "<div class='empty'></div>";
    static text(txt) {
        return `<p>${txt}</p>`;
    }
    static lineBreak = "<span>¶</span>";

    constructor(text_) {
        super(text_);
    }

    /** @returns {ExpressionType} */
    GetEvalType() {
        console.error("cannot give expression type for any expression block");
    }
}

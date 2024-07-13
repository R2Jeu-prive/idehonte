class ExpressionBlock extends Block{

    static emptySlot = "<div class='empty'></div>";
    static text(txt) {
        return `<p>${txt}</p>`
    };

    /**
     * creates a button with a on click callback
     * @param {string} innerText 
     * @param {string} f
     */
    static button(innerText, f){
        return `<button onclick="Block.all['__UNSET__ID'].` + f + `()">` + innerText + `</button>`
    }

    constructor(text_){
        super(text_)
    }

    /** @returns {ExpressionType} */
    GetEvalType(){
        console.error("cannot give expression type for any expression block");
    }
}

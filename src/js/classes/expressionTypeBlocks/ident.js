class IdentETB extends ExpressionTypeBlock{
    /**
     * @param {string} letter_
     */
    constructor(letter_ = "a", editable_ = true){
        super();

        this.letter = letter_;
        this.childrenBlocks = [];
        this.code = ["'" + this.letter];

        
        if(editable_){
            this.domEl.appendChild(BlockFront.text("'"));
            this.domEl.appendChild(BlockFront.input("text", "Change", ["this"] , "a"));
        }else{
            this.domEl.appendChild(BlockFront.text("'" + this.letter));
        }
    }

    Duplicate(){
        let res = new IdentETB(this.letter, false);
        res.DuplicateClassList(this);
        return res;
    }

    /** @returns {ExpressionType} */
    GetType(){
        return new ExpressionTypeIdent(this.letter)
    }

    CheckValid(){
        return true;
    }

    /**
     * @param {HTMLInputElement} inputEl 
     */
    Change(inputEl){
        if(inputEl.value.length > 1){
            inputEl.value = inputEl.value.charAt(0);
        }
        this.letter = inputEl.value;
        if(inputEl.value.length == 0){
            this.letter = "a";
        }
    }
}

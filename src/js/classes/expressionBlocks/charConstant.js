class CharConstantEB extends ExpressionBlock{
    /**
     * @param {string} c the value of this constant
     * @param {boolean} editable
     */
    constructor(c_, editable){
        if(editable){
            let text_ = ExpressionBlock.text("'");
            text_ += `<input type="text" placeholder="c" oninput="Block.all['__UNSET__ID'].ChangeValue(this);"/>`
            text_ += ExpressionBlock.text("'");
            super(text_);
            this.SetCallbackId();
        }else{
            super(ExpressionBlock.text("'" + c_ + "'"));
        }
        this.c = c_;
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("char"));
    }

    Duplicate(){
        let copy = new CharConstantEB(this.c, false); //[TODO] check this.c is not wtf like empty string
        copy.DuplicateClassList(this);
        return copy;
    }

    CheckValid(){
        return true;
    }

    /**
     * @param {HTMLInputElement} el 
     */
    ChangeValue(el){
        if(el.value.length > 1){ //[TODO] also check that char is unique ascii and not ä for exemple
            el.value = this.c;
        }else{
            this.c = el.value;
        }
    }
}

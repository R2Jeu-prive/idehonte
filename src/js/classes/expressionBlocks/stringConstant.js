class StringConstantEB extends ExpressionBlock{
    /**
     * @param {string} s the value of this constant
     * @param {boolean} editable
     */
    constructor(s_, editable){
        if(editable){
            let text_ = ExpressionBlock.text("\"");
            text_ += `<input type="text" placeholder="texte" oninput="Block.all['__UNSET__ID'].ChangeValue(this);"/>`
            text_ += ExpressionBlock.text("\"");
            super(text_);
            this.SetCallbackId();
        }else{
            super(ExpressionBlock.text("\"" + s_ + "\""));
        }
        this.s = s_;
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("string"));
    }

    Duplicate(){
        let copy = new StringConstantEB(this.s, false);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        return true;
    }

    /**
     * @param {HTMLInputElement} el 
     */
    ChangeValue(el){
        if(el.value.match())
        this.s = el.value;
    }
}

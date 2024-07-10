class IntConstantEB extends ExpressionBlock{
    /**
     * @param {number} n the value of this constant
     * @param {boolean} editable
     */
    constructor(n_, editable = true){
        if(editable){
            let text_ = `<input type="number" value="0" oninput="Block.all['__UNSET__ID'].ChangeValue(this);"/>`;
            super(text_);
            this.SetCallbackId();
        }else{
            super(ExpressionBlock.text(n_.toString(10)));
        }
        this.n = n_;
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("int"));
    }

    Duplicate(){
        let copy = new IntConstantEB(this.n, false); //[TODO] check this.n is valid as int for ocaml
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
        this.n = el.value;
    }
}

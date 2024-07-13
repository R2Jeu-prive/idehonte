class ForEB extends ExpressionBlock{
    constructor(down_ = false, editable_ = true, index_ = null){
        let text_ = "";
        text_ += ExpressionBlock.text("for");
        if(editable_){
            if(index_ == null){
                text_ += `<input type="text" placeholder="index" oninput="Block.all['__UNSET__ID'].ChangeIndex(this);"/>`
            }else{
                text_ += `<input type="text" placeholder="index" value="` + index_ + `" oninput="Block.all['__UNSET__ID'].ChangeIndex(this);"/>`
            }
        }else{
            text_ += index_;
        }
        text_ += ExpressionBlock.text("=");
        text_ += ExpressionBlock.emptySlot;
        text_ += ExpressionBlock.text("to");
        text_ += ExpressionBlock.emptySlot;
        text_ += ExpressionBlock.text(down_ ? "downto" : "do");
        if(editable_){
            text_ += ExpressionBlock.button("switch", "SwitchDirection")
        }
        text_ += ExpressionBlock.emptySlot;
        text_ += ExpressionBlock.text("done");
        super(text_);
        this.SetCallbackId();
        this.down = down_;
        this.index = index_;
        this.childrenBlocks = [null, null, null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("unit"));
    }

    Duplicate(){
        let copy = new ForEB(this.down, false, this.index); // [TODO] check index valid and replace by a default if not
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        if(this.childrenBlocks[0] != null){
            if(!(this.childrenBlocks[0] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[0].CheckValid()){return false;} // children not valid
            let [typeValid, _1, _2] = this.childrenBlocks[0].GetEvalType().CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("int")));
            if(!typeValid){return false;} // invalid type
        }
        if(this.childrenBlocks[1] != null){
            if(!(this.childrenBlocks[1] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[1].CheckValid()){return false;} // children not valid
            let [typeValid, _1, _2] = this.childrenBlocks[1].GetEvalType().CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("int")));
            if(!typeValid){return false;} // invalid type
        }
        if(this.childrenBlocks[2] != null){
            if(!(this.childrenBlocks[2] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[2].CheckValid()){return false;} // children not valid
            let [typeValid, _1, _2] = this.childrenBlocks[2].GetEvalType().CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("unit")));
            if(!typeValid){return false;} // invalid type
        }
        return true;
    }

    SwitchDirection(){
        let copy = new ForEB(!this.down, true, this.index);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.down = !this.down;
        copy.Delete();
    }

    ChangeIndex(el){
        this.index = el.value; //[TODO] check validity
    }
}

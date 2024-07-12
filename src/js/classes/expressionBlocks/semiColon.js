class SemiColonEB extends ExpressionBlock{

    constructor(n_ = 2, hasButtons = true){
        let text_ = "";
        let childrenBlocks_ = [];
        for(let i = 0; i < n_; i++){
            if(i != 0){
                text_ += ExpressionBlock.text(";")
            }
            text_ += ExpressionBlock.emptySlot;
            childrenBlocks_.push(null);
        }

        if(hasButtons){
            text_ += ExpressionTypeBlock.button("+", "AddSlot");
            if(n_ > 2){
                text_ += ExpressionTypeBlock.button("-", "RemoveSlot");
            }
        }
        
        super(text_);
        this.SetCallbackId();
        this.childrenBlocks = childrenBlocks_;
        this.n = n_;
    }

    GetEvalType(){
        return this.childrenBlocks[this.n - 1].GetEvalType();
    }

    Duplicate(){
        let copy = new SemiColonEB(this.n, false);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        for(let i = 0; i < this.n; i++){
            if(this.childrenBlocks[i] == null){continue;}
            if(!(this.childrenBlocks[i] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[i].CheckValid()){return false;} // children not valid
            if(i != this.n - 1){
                let [typeValid, _1, _2] = this.childrenBlocks[i].GetEvalType().CheckCompatibilityWith(new ExpressionTypeConstr([], ConstrType.Get("unit")));
                if(!typeValid){return false;} // invalid type
            }
        }
        return true;
    }

    AddSlot(){
        let copy = new SemiColonEB(this.n + 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.push(null);
        this.n += 1;
        copy.Delete();
    }

    RemoveSlot(){
        let copy = new SemiColonEB(this.n - 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.pop();
        this.n -= 1;
        copy.Delete();
    }
}

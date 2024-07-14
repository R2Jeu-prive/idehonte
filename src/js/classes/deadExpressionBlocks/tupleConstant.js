class TupleConstantEB extends ExpressionBlock{

    constructor(n_ = 2, hasButtons = true){
        let text_ = ExpressionBlock.text("(");
        let childrenBlocks_ = [];
        for(let i = 0; i < n_; i++){
            if(i != 0){
                text_ += ExpressionBlock.text(",")
            }
            text_ += ExpressionBlock.emptySlot;
            childrenBlocks_.push(null);
        }
        text_ += ExpressionBlock.text(")");

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
        let types = [];
        for(let i = 0; i < this.n; i++){
            let newType = null;
            if(this.childrenBlocks[i] == null){
                newType = new ExpressionTypeIdent('a');
            }else{
                newType = this.childrenBlocks[i].GetEvalType();
            }
            newType = (new ExpressionTypeStar(types)).DistinguishIdentsWith(newType);
            types.push(newType);
        }
        return new ExpressionTypeStar(types);
    }

    Duplicate(){
        let copy = new TupleConstantEB(this.n, false);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        for(let i = 0; i < this.n; i++){
            if(this.childrenBlocks[i] == null){continue;}
            if(!(this.childrenBlocks[i] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[i].CheckValid()){return false;} // children not valid
        }
        return true;
    }

    AddSlot(){
        let copy = new TupleConstantEB(this.n + 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.push(null);
        this.n += 1;
        copy.Delete();
    }

    RemoveSlot(){
        let copy = new TupleConstantEB(this.n - 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.pop();
        this.n -= 1;
        copy.Delete();
    }
}

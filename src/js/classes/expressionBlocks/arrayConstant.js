class ArrayConstantEB extends ExpressionBlock{

    constructor(n_ = 0, hasButtons = true){
        let text_ = ExpressionBlock.text("[|");
        let childrenBlocks_ = [];
        for(let i = 0; i < n_; i++){
            if(i != 0){
                text_ += ExpressionBlock.text(";")
            }
            text_ += ExpressionBlock.emptySlot;
            childrenBlocks_.push(null);
        }
        text_ += ExpressionBlock.text("|]");

        if(hasButtons){
            text_ += ExpressionTypeBlock.button("+", "AddSlot");
            if(n_ > 0){
                text_ += ExpressionTypeBlock.button("-", "RemoveSlot");
            }
        }
        
        super(text_);
        this.SetCallbackId();
        this.childrenBlocks = childrenBlocks_;
        this.n = n_;
    }

    GetEvalType(){
        let elType;
        if(this.n == 0){
            elType = new ExpressionTypeIdent("a");
        }else{
            elType = this.childrenBlocks[0].GetEvalType();
        }
        return new ExpressionTypeConstr([elType], ConstrType.Get("array"));
    }

    Duplicate(){
        let copy = new ArrayConstantEB(this.n, false);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        let otherType = null;
        for(let i = 0; i < this.n; i++){
            if(this.childrenBlocks[i] == null){continue;}
            if(!(this.childrenBlocks[i] instanceof ExpressionBlock)){return false;} // not an expression
            if(!this.childrenBlocks[i].CheckValid()){return false;} // children not valid
            if(otherType == null){
                otherType = this.childrenBlocks[i].GetEvalType();
            }else{
                let currentType = this.childrenBlocks[i].GetEvalType();
                currentType = otherType.DistinguishIdentsWith(currentType);
                let [typeValid, resultingType, _] = currentType.CheckCompatibilityWith(otherType);
                if(typeValid){
                    otherType = resultingType;
                }else{
                    return false; // invalid types
                }
            }
        }
        return true;
    }

    AddSlot(){
        let copy = new ArrayConstantEB(this.n + 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.push(null);
        this.n += 1;
        copy.Delete();
    }

    RemoveSlot(){
        let copy = new ArrayConstantEB(this.n - 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.pop();
        this.n -= 1;
        copy.Delete();
    }
}

class ArrowETB extends ExpressionTypeBlock{
    /**
     * @param {number} length_ 
     * @param {boolean} hasButtons
     */
    constructor(length_ = 2, hasButtons = true){
        let text_ = ExpressionTypeBlock.emptySlot;
        let childrenBlocks_ = [null];
        for(let i = 1; i < length_; i++){
            text_ += (ExpressionTypeBlock.text("->") + ExpressionTypeBlock.emptySlot);
            childrenBlocks_.push(null);
        }
        if(hasButtons){
            text_ += ExpressionTypeBlock.button("+", "AddSlot");
            if(length_ > 2){
                text_ += ExpressionTypeBlock.button("-", "RemoveSlot");
            }
        }
        super(text_);
        this.SetCallbackId();
        this.length = length_;
        this.childrenBlocks = childrenBlocks_;
    }

    Duplicate(){
        return new ArrowETB(this.length, false);
    }

    /** @returns {ExpressionType} */
    GetEvalType(){
        let childrenExpressionTypes = [];
        
        for(let i = 0; i < this.childrenBlocks.length; i++){
            if(this.childrenBlocks[i] != null){
                childrenExpressionTypes.push(this.childrenBlocks[i].GetEvalType());
            }else{
                childrenExpressionTypes.push(null);
            }
        }
        return new ExpressionTypeArrow(childrenExpressionTypes);
    }

    CheckValid(){
        for(let i = 0; i < this.childrenBlocks.length; i++){
            if(this.childrenBlocks[i] != null && !(this.childrenBlocks[i] instanceof ExpressionTypeBlock)){
                return false;
            }
        }
        return true;
    }

    AddSlot(){
        let copy = new ArrowETB(this.length + 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.push(null);
        this.length += 1;
        copy.Delete();
    }

    RemoveSlot(){
        let copy = new ArrowETB(this.length - 1, true);
        this.domEl.innerHTML = copy.domEl.innerHTML;
        this.domEl.innerHTML = this.domEl.innerHTML.replaceAll(copy.id, this.id);
        this.childrenBlocks.pop();
        this.length -= 1;
        copy.Delete();
    }
}

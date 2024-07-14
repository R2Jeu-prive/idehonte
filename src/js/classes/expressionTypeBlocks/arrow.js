class ArrowETB extends ExpressionTypeBlock{
    /**
     * @param {number} n_ 
     * @param {boolean} hasButtons_
     */
    constructor(n_ = 2, hasButtons_ = true){
        super();

        /** @type {number} */
        this.n = 0;

        /** @type {boolean} */
        this.hasButtons = hasButtons_;

        /** @type {ExpressionTypeBlock[]} */
        this.childrenBlocks = new Array(this.n).fill(null);
        
        this.code = new Array(this.n + 1).fill(" -> ");
        this.code[0] = "";
        this.code[this.n] = "";
        
        this.domEl.appendChild(BlockFront.button("+", "AddSlot"));
        this.domEl.appendChild(BlockFront.button("x", "RemoveSlot"));

        for(let i = 0; i < n_; i++){this.AddSlot();}
    }

    Duplicate(){
        let res = new ArrowETB(this.n, false);
        res.Refresh();
        res.DuplicateClassList(this);
        return res;
    }

    /** @returns {ExpressionType} */
    GetType(){
        let childrenExpressionTypes = [];
        
        for(let i = 0; i < this.n; i++){
            if(this.childrenBlocks[i] != null){
                childrenExpressionTypes.push(this.childrenBlocks[i].GetType());
            }else{
                childrenExpressionTypes.push(null);
            }
        }
        return new ExpressionTypeArrow(childrenExpressionTypes);
    }

    CheckValid(){
        for(let i = 0; i < this.childrenBlocks.length; i++){
            if(this.childrenBlocks[i] != null && !(this.childrenBlocks[i] instanceof ExpressionTypeBlock)){
                throw CheckValidError.expressionTypeBlockExpected;
            }
        }
        return true;
    }

    /**
     * adds a slot at the end of this block
     */
    AddSlot(){
        if(this.n != 0){this.domEl.prepend(BlockFront.text("->"));}
        this.domEl.prepend(BlockFront.emptySlot("expressionType"));

        this.childrenBlocks.push(null);
        this.n += 1;
        
        this.code.splice(1, 0, " -> ");

        this.Refresh();
    }

    /**
     * removes a slot
     */
    RemoveSlot(){
        this.domEl.firstElementChild.remove();
        this.domEl.firstElementChild.remove();

        this.code.splice(1, 1);

        this.childrenBlocks.pop();

        this.n -= 1;

        this.Refresh();
    }

    Refresh(){
        if(this.hasButtons){
            this.domEl.lastElementChild.previousElementSibling.disabled = false;
            if(this.n > 2){
                this.domEl.lastElementChild.disabled = false;
            }else{
                this.domEl.lastElementChild.disabled = true;
            }
        }else{
            this.domEl.lastElementChild.disabled = true;
            this.domEl.lastElementChild.previousElementSibling.disabled = true;
        }
    }
}

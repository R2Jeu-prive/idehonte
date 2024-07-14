class ArrayConstantEB extends ExpressionBlock{

    /**
     * @param {number} n_ length of array 
     */
    constructor(n_ = 0){
        super();

        /** @type {number} */
        this.n = 0;

        /** @type {Block[]} */
        this.childrenBlocks = new Array(this.n).fill(null);
        
        this.SetCode();

        this.domEl.appendChild(BlockFront.text("[|"));
        this.domEl.appendChild(BlockFront.text("|]"));
        this.domEl.appendChild(BlockFront.button("+", "AddSlot"));

        for(let i = 0; i < n_; i++){this.AddSlot();}
    }

    GetEvalType(){
        let elType;
        if(this.n == 0 || this.childrenBlocks[0] == null){
            elType = new ExpressionTypeIdent("a");
        }else{
            elType = this.childrenBlocks[0].GetEvalType();
        }
        return new ExpressionTypeConstr([elType], ConstrType.Get("array"));
    }

    Duplicate(){
        let copy = new ArrayConstantEB(this.n);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        let otherType = null;
        for(let i = 0; i < this.n; i++){
            if(this.childrenBlocks[i] == null){continue;}
            if(!(this.childrenBlocks[i] instanceof ExpressionBlock)){throw CheckValidError.expressionBlockExpected;}
            this.childrenBlocks[i].CheckValid();
            if(otherType == null){
                otherType = this.childrenBlocks[i].GetEvalType();
            }else{
                let currentType = this.childrenBlocks[i].GetEvalType();
                currentType = otherType.DistinguishIdentsWith(currentType);
                let [typeValid, resultingType, _] = currentType.CheckCompatibilityWith(otherType);
                if(typeValid){
                    otherType = resultingType;
                }else{
                    throw new CheckValidError("Un tableau ne peut contenir que des expressions de même type"); // invalid types
                }
            }
        }
        return true;
    }

    /**
     * adds a slot at the end of this block
     */
    AddSlot(){
        this.domEl.lastElementChild.remove(); // removes + button
        this.domEl.lastElementChild.remove(); // remove |] text

        if(this.n != 0){
            this.domEl.appendChild(BlockFront.text(";"));
        }
        this.domEl.appendChild(BlockFront.emptySlot());
        this.domEl.appendChild(BlockFront.button("x", "RemoveSlot", ["this"], ["refresh-target"]));

        this.domEl.appendChild(BlockFront.text("|]"));
        this.domEl.appendChild(BlockFront.button("+", "AddSlot"));

        this.childrenBlocks.push(null);
        this.n += 1;
        this.SetCode();
    }

    Refresh(){
        let cursor = this.domEl.firstElementChild;
        let i = 0
        while(cursor != null){
            if(cursor.classList.contains("refresh-target")){
                if(this.childrenBlocks[i] == null){
                    cursor.disabled = false;
                }else{
                    cursor.disabled = true;
                }
                i++;
            }
            cursor = cursor.nextElementSibling;
        }
    }

    /**
     * removes a slot (if empty)
     * @param {HTMLElement} crossButtonElement 
     */
    RemoveSlot(crossButtonElement){
        let i = 0;
        let cursor = crossButtonElement;
        while(cursor.previousElementSibling != null){
            i++;
            cursor = cursor.previousElementSibling;
        }
        i = (i-1)/3; // gets index of deleted slot;
        if(this.childrenBlocks[i] != null){return;}
        let spotIsEmpty = crossButtonElement.previousElementSibling.firstChild == null;
        if(!spotIsEmpty){return;}

        if(this.n > 1){ // remove the ; separator
            if(crossButtonElement.previousElementSibling.previousElementSibling != null){
                crossButtonElement.previousElementSibling.previousElementSibling.remove();
            }else{
                crossButtonElement.nextElementSibling.remove();
            }
        }
        crossButtonElement.previousElementSibling.remove(); // remove the slot
        crossButtonElement.remove(); // remove the x button

        this.n -= 1;
        this.SetCode();
        this.childrenBlocks.splice(this.childrenBlocks.indexOf(null), 1); //[TODO] fix bug we need to remove the correct null not just any
    }

    /**
     * sets this.code
     */
    SetCode(){
        if(this.n == 0){this.code = ["[||]"];}
        else{
            this.code = new Array(this.n + 1).fill(";");
            this.code[0] = "[|";
            this.code[this.n] = "|]";
        }
    }
}

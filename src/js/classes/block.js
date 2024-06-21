class Block{
    static all = {}; //all blocks are stored here and acceccible via there id
    static playground = document.getElementById("ide-playground");
    static shop = document.getElementById("shop-stall");

    static categoryAssignments = document.getElementById("section-assignments");
    static categoryControlFlow = document.getElementById("section-control-flow");
    static categoryOperators = document.getElementById("section-operators");
    static categoryList = document.getElementById("section-list");
    static categoryArray = document.getElementById("section-array");

    /**
     * @returns {object[]} an array of {'id':id, 'spot':spot} of all empty spots in all blocks
     */
    static GetAllEmptySpots(){
        let res = [];
        for(let id in Block.all){
            if(Block.all[id].isInShop){continue;}
            for(let spot = 0; spot < Block.all[id].childrenBlocks.length; spot++){
                if(Block.all[id].childrenBlocks[spot] == null){
                    res.push({'id':id, 'spot':spot});
                }
            }
        }
        return res;
    }

    /**
     * @param {string} text_ 
     */
    constructor(text_){
        this.id = Date.now();
        while(Block.all[this.id] != undefined){this.id ++;}
        Block.all[this.id] = this;

        /** @type {string}*/
        this.text = text_;
        /** @type {Block}*/
        this.parentBlock = null;
        /** @type {HTMLElement}*/
        this.domEl = document.createElement("div");
        Block.shop.appendChild(this.domEl);
        this.domEl.classList.add("block");
        this.domEl.classList.add("selection-disabled");
        this.domEl.id = this.id;
        // this.domEl.innerHTML = this.id.toString() + this.text;
        this.domEl.innerHTML = this.text;
        /** @type {Block[]}*/
        this.childrenBlocks;
        /** @type {boolean}*/
        this.isInShop = true;
        /** @type {boolean}*/
        this.dragging = false;
        /** @type {number[]}*/
        this.draggingOffset = [0,0];

        this.domEl.addEventListener("mousedown", (e) => {
            if(e.button != 0){return;}
            if(!this.isInShop){
                this.UnFit();
                this.dragging = true;
                let offsetX = e.screenX - this.domEl.getBoundingClientRect().left;
                let offsetY = e.screenY - this.domEl.getBoundingClientRect().top;
                this.draggingOffset = [offsetX, offsetY];
            }else{
                let dupe = this.Duplicate();
                dupe.isInShop = false;
                Block.playground.appendChild(dupe.domEl);
                dupe.dragging = true;
                let offsetX = e.screenX - this.domEl.getBoundingClientRect().left;
                let offsetY = e.screenY - this.domEl.getBoundingClientRect().top;
                dupe.draggingOffset = [offsetX, offsetY];
                let fakeMouseMoveEvent = new Event('mousemove');
                fakeMouseMoveEvent.screenX = e.screenX;
                fakeMouseMoveEvent.screenY = e.screenY;
                document.dispatchEvent(fakeMouseMoveEvent);
            }
        })

        document.addEventListener("mousemove", (e) => {
            if(this.dragging){
                this.domEl.style.left = (e.screenX - this.draggingOffset[0]) + "px";
                this.domEl.style.top = (e.screenY - this.draggingOffset[1]) + "px";
            }

            if (this.dragging) {
                for (const data of this.GetPossibleSpots()) {
                    const blockId = data.id;
                    const spotIndex = data.spot;
    
                    const block = Block.all[blockId];
    
                    if (block.isInShop) { continue; }

                    if (collide(this.domEl, block.domEl)) {
                        let spot = block.domEl.querySelectorAll("div")[spotIndex];
    
                        if (collide(this.domEl, spot)) {
                            spot.classList.add("highlight");
                        } else {
                            spot.classList.remove("highlight");
                        }
                    } else {
                        block.domEl.querySelectorAll("div").forEach(emptySpot => {
                            emptySpot.classList.remove("highlight");
                        })
                    };
                }
            }
            
        })

        document.addEventListener("mouseup", (e) => {
            if (!this.isInShop && collide(this.domEl, Block.shop)) {
                this.Delete()
                return;
            }

            if (this.dragging) {
                for (const data of this.GetPossibleSpots()) {
                    const blockId = data.id;
                    const spotIndex = data.spot;
    
                    const block = Block.all[blockId];
    
                    if (block.isInShop) { continue; }

                    if (collide(this.domEl, block.domEl)) {
                        let spot = block.domEl.querySelectorAll("div")[spotIndex];
    
                        if (collide(this.domEl, spot)) {
                            console.log("fit");
                            spot.classList.remove("empty");
                            spot.classList.remove("highlight");
                            this.FitInParent(block, spotIndex);
                            break;
                        }
                    }
                }
            }

            this.dragging = false;

            //[TODO] use FitInParent if block is let go in a hole
        })
    }

    /**
     * @param {HTMLElement} category 
     */
    SetShopCategory(category){
        if(!this.isInShop){console.error("can't assign shop category to a block that is not in shop");return;}
        
        switch (category) {
            case Block.categoryAssignments:
                this.domEl.classList.add("assignment")
                break;
            case Block.categoryControlFlow:
                this.domEl.classList.add("control-flow")
                break;
            case Block.categoryOperators:
                this.domEl.classList.add("operator")
                break;
            case Block.categoryList:
            case Block.categoryArray:
                this.domEl.classList.add("module")
                break;
        }
        
        category.insertAdjacentElement("afterend", this.domEl);
    }

    DuplicateClassList(fromBlock) {
        fromBlock.domEl.classList.forEach(token => 
            this.domEl.classList.add(token)
        );
    }

    Delete(){
        for(let i = 0; i < this.childrenBlocks.length; i++){
            if(this.childrenBlocks[i] != null){
                this.childrenBlocks[i].Delete();
            }
        }
        this.domEl.remove();
        delete Block.all[this.id];
    }

    /**
     * @param {Block} parentBlock 
     * @param {number} spot
     */
    FitInParent(parentBlock, spot, affectDOM = true){
        this.parentBlock = parentBlock;
        parentBlock.childrenBlocks[spot] = this;
        if(affectDOM){parentBlock.domEl.appendChild(this.domEl);}
    }

    UnFit(affectDOM = true){
        if(this.parentBlock == null){return;}
        let spot = this.parentBlock.childrenBlocks.indexOf(this);
        this.parentBlock.childrenBlocks[spot] = null;
        this.parentBlock = null;
        if(affectDOM){Block.playground.appendChild(this.domEl);}
    }

    
    /**
     * @returns {boolean} returns true if no conflict is found with children
     */
    CheckValid(){
        console.error("cannot CheckValid any block");
    }

    /**
     * @returns {object[]} an array of {'id':id, 'spot':spot} of all spots in which this Block can be Fit
     */
    GetPossibleSpots(){
        let allEmpty = Block.GetAllEmptySpots();//[TODO] filter possible spots
        let valid = [];
        allEmpty.forEach(el => {
            let blockId = el.id;
            let spot = el.spot;
            if(Block.all[blockId].isInShop)
            this.FitInParent(Block.all[blockId], spot, false);
            let root = this;
            while(root.parentBlock != null){root = root.parentBlock;}
            let thisValid = root.CheckValid();
            this.UnFit(false);
            if(thisValid && !Block.all[blockId].isInShop && blockId != this.id){
                valid.push(el);
            }
        });
        return valid;
    }
}

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
        this._possibleSpots = null;

        this.x = 0;
        this.y = 0;

        this.onMouseDown = (e) => {
            if (this.domEl != e.target) { return; }
            if(e.button != 0){return;}

            if (!this.isInShop) {
                this.UnFit();
                this.setDragging(true);
                this._possibleSpots = this.GetPossibleSpots();
                let offsetX = e.screenX - this.domEl.getBoundingClientRect().left;
                let offsetY = e.screenY - this.domEl.getBoundingClientRect().top;
                this.draggingOffset = [offsetX, offsetY];
            } else {
                let dupe = this.Duplicate();
                dupe.isInShop = false;
                Block.playground.appendChild(dupe.domEl);
                dupe.setDragging(true);
                dupe._possibleSpots = this.GetPossibleSpots();
                let offsetX = e.screenX - this.domEl.getBoundingClientRect().left;
                let offsetY = e.screenY - this.domEl.getBoundingClientRect().top;
                dupe.draggingOffset = [offsetX, offsetY];
                let fakeMouseMoveEvent = new Event('mousemove');
                fakeMouseMoveEvent.screenX = e.screenX;
                fakeMouseMoveEvent.screenY = e.screenY;
                document.dispatchEvent(fakeMouseMoveEvent);
            }
        }
        document.addEventListener("mousedown", this.onMouseDown);

        this.onMouseMove = (e) => {
            if (!this.dragging) { return; }

            this.moveTo(e.screenX - this.draggingOffset[0], e.screenY - this.draggingOffset[1]);

            for (const data of this._possibleSpots) {
                const block = Block.all[data.id];

                if (block.isInShop) { continue; }

                if (collide(this.domEl, block.domEl)) {
                    let spot = block.domEl.querySelectorAll("div")[data.spot];

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
        document.addEventListener("mousemove", this.onMouseMove);

        this.onMouseUp = (e) => {
            if (this.domEl != e.target) { return; }
            if (!this.dragging) { return; }
        
            if (!this.isInShop && collide(this.domEl, Block.shop)) {
                this.Delete();
                return;
            }

            for (const data of this._possibleSpots) {
                const blockId = data.id;
                const spotIndex = data.spot;

                const block = Block.all[blockId];

                if (block.isInShop) { continue; }

                if (collide(this.domEl, block.domEl)) {
                    let spot = block.domEl.querySelectorAll("div")[spotIndex];

                    if (collide(this.domEl, spot)) {
                        spot.classList.remove("highlight");
                        this.FitInParent(block, spotIndex);
                        break
                    }
                    spot.classList.remove("highlight");
                }
            }

            this.setDragging(false);
        }
        document.addEventListener("mouseup", this.onMouseUp);
    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;

        this.domEl.style.left = this.x + "px";
        this.domEl.style.top  = this.y + "px";
    }

    moveBy(x, y) {
        this.moveTo(this.x + x, this.y + y);
    }

    setDragging(dragging) {
        this.dragging = dragging;

        if (this.dragging) {
            this.domEl.classList.add("dragging");
        } else {
            this.domEl.classList.remove("dragging");
        }
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
        fromBlock.domEl.classList.forEach(token => {
            this.domEl.classList.add(token);
        });
    }

    Delete() {
        document.removeEventListener("mousedown", this.onMouseDown);
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("mouseup", this.onMouseUp);

        for (let i = 0; i < this.childrenBlocks.length; i++){
            if (this.childrenBlocks[i] != null) {
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
        if (affectDOM) {
            this.domEl.classList.add("inside");
            parentBlock.domEl.querySelectorAll("div")[spot].appendChild(this.domEl);
            parentBlock.domEl.querySelectorAll("div")[spot].classList.remove("empty");
        }
    }

    UnFit(affectDOM = true){
        if (this.parentBlock == null) { return; }
        const spot = this.parentBlock.childrenBlocks.indexOf(this);
        this.parentBlock.childrenBlocks[spot] = null;
        
        if (affectDOM) {
            this.domEl.classList.remove("inside");
            this.parentBlock.domEl.querySelectorAll("div")[spot].removeChild(this.domEl);
            this.parentBlock.domEl.querySelectorAll("div")[spot].classList.add("empty");
            Block.playground.appendChild(this.domEl);     

            this.domEl.style.left = (mouseX - this.draggingOffset[0]) + "px";
            this.domEl.style.top  = (mouseY - this.draggingOffset[1]) + "px";
        }

        this.parentBlock = null;
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
    GetPossibleSpots() {
        let allEmpty = Block.GetAllEmptySpots(); //[TODO] filter possible spots
        let valid = [];
        allEmpty.forEach(el => {
            let blockId = el.id;
            let spot = el.spot;
            if(!Block.all[blockId].isInShop && blockId != this.id){
                this.FitInParent(Block.all[blockId], spot, false);
                let root = this;
                while(root.parentBlock != null){root = root.parentBlock;}
                let thisValid = root.CheckValid();
                this.UnFit(false);
                if(thisValid){
                    valid.push(el);
                }
            }
        });
        return valid;
    }
}

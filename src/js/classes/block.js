class Block{
    static all = {}; //all blocks are stored here and acceccible via there id
    static playground = document.getElementById("ide-playground");
    static shop = document.getElementById("shop-stall");

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
        let id = Date.now();
        while(Block.all[this.id] != undefined){this.id ++;}
        Block.all[id] = this;

        /** @type {string}*/
        this.text = text_;
        /** @type {Block}*/
        this.parentBlock = null;
        /** @type {HTMLElement}*/
        this.domEl = document.createElement("div");
        Block.shop.appendChild(this.domEl);
        this.domEl.classList.add("block");
        this.domEl.classList.add("selection-disabled");
        this.domEl.id = id;
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
        })

        document.addEventListener("mouseup", (e) => {
            this.dragging = false;
            //[TODO] use FitInParent if block is let go in a hole
        })
    }

    /**
     * @param {HTMLElement} category 
     */
    SetShopCategory(category){
        if(!this.isInShop){console.error("can't assign shop category to a block that is not in shop");return;}
        category.insertAdjacentElement("afterend", this.domEl);
    }

    /** 
     * @returns {Block}
    */
    Duplicate(){
        console.error("can't duplicate block that is instance of nothing");
    }

    Delete(){
        for(let i = 0; i < this.childrenBlocks.length; i++){
            if(this.childrenBlocks[i] != null){
                this.childrenBlocks[i].Delete();
            }
        }
        this.domEl.remove();
        Block.all[this.id] = undefined;
    }

    /**
     * @param {Block} parentBlock 
     * @param {number} spot
     */
    FitInParent(parentBlock, spot){
        this.parentBlock = parentBlock;
        parentBlock.childrenBlocks[spot] = this;
        parentBlock.domEl.appendChild(this.domEl);
    }

    UnFit(){
        if(this.parentBlock == null){return;}
        let spot = this.parentBlock.childrenBlocks.indexOf(this);
        this.parentBlock.childrenBlocks[spot] = null;
        this.parentBlock = null;
        Block.playground.appendChild(this.domEl);
    }

    
    CheckFit(childBlock, spot){
        console.error("cannot CheckFit any block");
    }

    /**
     * @returns {object[]} an array of {'id':id, 'spot':spot} of all spots in which this Block can be Fit
     */
    GetPossibleSpots(){
        let allEmpty = Block.GetAllEmptySpots();//[TODO] filter possible slots
        let valid = [];
        allEmpty.forEach(el => {
            let blockId = el.id;
            let spot = el.spot;
            //if(Block.all[blockId].CheckFit(this, spot)){
                valid.push(el);
            //}
        });
        return valid;
    }
}
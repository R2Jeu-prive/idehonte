class Block{
    constructor(domEl_, isInShop_, text_){
        /** @type {string}*/
        this.text = "";
        /** @type {Block}*/
        this.parent = null;
        /** @type {HTMLElement}*/
        this.domEl = domEl_;
        /** @type {Block[]}*/
        this.children = [];
        this.isInShop = isInShop_;
        this.dragging = false;
        this.draggingOffset = [0,0];

        this.domEl.addEventListener("mousedown", (e) => {
            if(!this.isInShop){
                this.dragging = true;
                let offsetX = e.screenX - this.domEl.getBoundingClientRect().left;
                let offsetY = e.screenY - this.domEl.getBoundingClientRect().top;
                this.draggingOffset = [offsetX, offsetY];
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
        })
    }

    static CreateTestBlockInPlayground(){
        let playground = document.getElementById("ide-playground");
        let testDiv = playground.appendChild(document.createElement("div"));
        testDiv.classList.add("test-block");
        new Block(testDiv, false);
    }

    static CheckFit(parentBlock, childBlock, holeId){
        /*
        This function returns true if childBlock can go in parentBlock in specific hole
        This function doesn't take into account what was in hole and is trying to be replaced
        */
        
    }
}

Block.CreateTestBlockInPlayground();

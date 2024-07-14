class BlockFront{

    
    static emptySlot(type = "expression"){
        let res = document.createElement("div");
        res.classList.add("empty", type);
        return res;
    }

    /**
     * creates a button element with a onclick function and classes
     * @param {string} innerText text displayed in button
     * @param {string} onclickFunction function to be executed onclick
     * @param {string[]} params params given to onclickFunction
     * @param {string[]} classes classes added to the button DOM element
     */
    static button(innerText, onclickFunction, params = [], classes = []){
        let res = document.createElement("button");
        classes.forEach(c => res.classList.add(c));
        res.innerHTML = innerText;
        res.setAttribute("onclick", `BlockFront.getBlock(this).${onclickFunction}(${params.join(",")})`);
        return res;
    }

    /**
     * creates a text element
     * @param {string} innerText 
     * @param {string[]} classes
     */
    static text(innerText, classes = []) {
        let res = document.createElement("p");
        classes.forEach(c => res.classList.add(c));
        res.innerHTML = innerText;
        return res;
    };

    /**
     * creates a input element of specified type with a oninput function, a placeholder and classes 
     * @param {string} type the type of input
     * @param {string} oninputFunction the function executed oninput
     * @param {string[]} params the params given to oninputFunction
     * @param {string} placeholder the placeholder of the DOM element
     * @param {string[]} classes the classes of the DOM element
     */
    static input(type, oninputFunction, placeholder, classes){
        let res = document.createElement("input");
        classes.forEach(c => res.classList.add(c));
        res.setAttribute("type", type);
        res.setAttribute("placeholder", placeholder);
        res.setAttribute("oninput", `BlockFront.getBlock(this).${oninputFunction}(${params.join(",")})`)
        return res;
    }

    /**
     * @param {HTMLElement} eventEl
     * @returns the block instance attached to this event DOM element
     */
    static getBlock(eventEl){
        let cursor = eventEl;
        while(!cursor.className.split(" ").includes("block")){
            cursor = cursor.parentElement;
        }
        return Block.all[cursor.id];
    }
}
class ExpressionTypeBlockArrow extends ExpressionTypeBlock{
    /**
     * @param {number} nbOfChildren_
     */
    constructor(nbOfChildren_){
        if(nbOfChildren_ < 2){console.error("weird ExpressionTypeBlockArrow created with less than 2 children !")}
        let text = "%t";
        let childrenBlocks = [null]
        let childrenExpressionTypes = [null];
        for(let i = 1; i < nbOfChildren_; i++){
            text += " -> %t";
            childrenBlocks.push(null);
            childrenExpressionTypes.push(null)
        }

        super("(" + text + ")", new ExpressionTypeArrow(childrenExpressionTypes));
        this.childrenBlocks = childrenBlocks;
    }

    Duplicate(){
        return new ExpressionTypeBlockArrow(this.childrenBlocks.length);
    }
}

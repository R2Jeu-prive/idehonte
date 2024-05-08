class ExpressionType{
    constructor(){}

    ToText(){
        if(this instanceof ExpressionTypeIdent){
            return "\'" + this.letter;
        }else if(this instanceof ExpressionTypeUnderscore){
            return "_";
        }else if(this instanceof ExpressionTypeArrow){
            let text = this.childrenExpressionTypes[0].ToText();
            for(let i = 1; i < this.childrenExpressionTypes.length; i++){
                text = text + " -> " + this.childrenExpressionTypes[i].ToText();
            }
            return text;
        }else if(this instanceof ExpressionTypeStar){
            let text = this.childrenExpressionTypes[0].ToText();
            for(let i = 1; i < this.childrenExpressionTypes.length; i++){
                text = text + " * " + this.childrenExpressionTypes[i].ToText();
            }
            return text;
        }else if(this instanceof ExpressionTypeConstr){
            let text = "";
            for(let i = 0; i < this.childConstrType.nbOfArgs; i++){
                if(i != 0){
                    text += ", ";
                }
                text += this.childrenExpressionTypes[i].ToText();
            }
            if(this.childConstrType.nbOfArgs > 1){
                text = "(" + text + ")";
            }
            text += this.childConstrType.name;
            return text;
        }else{
            console.error("Can't convert ExpressionType ToText because no instance matched");
        }
    }

    /**
     * @returns {string[]} list of all idents found recursivly in this ExpressionType
     */
    GetIdentChars(){
        if(this instanceof ExpressionTypeIdent){
            return [this.letter];
        }else if(this instanceof ExpressionTypeUnderscore){
            return [];
        }else if(this instanceof ExpressionTypeArrow || this instanceof ExpressionTypeStar || this instanceof ExpressionTypeConstr){
            let res = [];
            for(let i = 0; i < this.childrenExpressionTypes.length; i++){
                res = res.concat(this.childrenExpressionTypes[i].GetIdentChars());
            }
            return res;
        }else{
            console.error("Can't GetIdentChars in ExpressionType because no instance matched");
        }
    }

    /**
     * 
     * @param {string} searchIdent 
     * @param {string} newIdent
     */
    ReplaceIdent(searchIdent, newIdent){
        if(this instanceof ExpressionTypeIdent && this.letter == searchIdent){
            this.letter = newIdent;
        }else if(this instanceof ExpressionTypeArrow || this instanceof ExpressionTypeStar || this instanceof ExpressionTypeConstr){
            for(let i = 0; i < this.childrenExpressionTypes.length; i++){
                this.childrenExpressionTypes[i].ReplaceIdent(searchIdent, newIdent);
            }
        }
    }

    /** renames other expression's idents so none are in common with this ExpressionType
     * @param {ExpressionType} otherExpressionType 
     */
    DistinguishIdentsWith(otherExpressionType){
        let myIdents = this.GetIdentChars();
        let otherIdents = otherExpressionType.GetIdentChars();
        let commonIdents = myIdents.filter(el => otherIdents.includes(el));
        while(commonIdents != []){
            let oldIdent = commonIdents.shift();
            let newIdent = GetNewIdent(myIdents.concat(otherIdents));
            otherIdents.splice(otherIdents.indexOf(oldIdent), 1);
            otherIdents.push(newIdent);
            otherExpressionType.ReplaceIdent(oldIdent, newIdent);
        }
    }
}

class ExpressionTypeIdent extends ExpressionType{ //ex: 'a
    constructor(letter_){
        super();
        /** @type {string}*/
        this.letter = letter_;
    }
}

class ExpressionTypeUnderscore extends ExpressionType{ //ex: _
    constructor(){
        super();
    }
}

class ExpressionTypeArrow extends ExpressionType{ //ex: int -> float -> string
    constructor(childrenExpressionTypes_){
        super();
        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = childrenExpressionTypes_;
    }
}

class ExpressionTypeStar extends ExpressionType{ //ex: int * float * string
    constructor(childrenExpressionTypes_){
        super();
        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = childrenExpressionTypes_;
    }
}

class ExpressionTypeConstr extends ExpressionType{ //ex: ('a, 'b) graph
    constructor(childrenExpressionTypes_, childConstrType_){
        super();
        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = childrenExpressionTypes_;
        /** @type {ConstrType}*/
        this.childConstrType = childConstrType_;
    }
}

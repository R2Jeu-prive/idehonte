const alphabet = "abcdefghijklmnopqrstuvwxyz";

/**
 * @param {string[]} usedIdents 
 * @returns {string} a new ident that is not in usedIdents
 */
function GetNewIdent(usedIdents){ //[TODO] check this looks very weird ???
    let start = "";
    while(true){
        for(let i = 0; i < 26; i++){
            if(!usedIdents.includes(alphabet[i])){
                return start + alphabet[i];
            }
        }
        start = start + "a";
    }
}

class ExpressionType{
    constructor(){}

    /** @returns {ExpressionType} */
    DeepCopy(){
        console.error("Cannot copy any expression type");
    }

    ToText(){
        if(this instanceof ExpressionTypeIdent){
            return "\'" + this.letter;
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
     * @param {string} searchIdent the ident to search and replace
     * @param {ExpressionType} expressionType the expression used to replace the ident (everything is deepcopied)
     */
    ReplaceIdent(searchIdent, expressionType){
        if(this instanceof ExpressionTypeIdent){
            if(this.letter == searchIdent){
                return expressionType.DeepCopy();
            }else{
                return this.DeepCopy();
            }
        }else if(this instanceof ExpressionTypeArrow || this instanceof ExpressionTypeStar || this instanceof ExpressionTypeConstr){
            let copy = this.DeepCopy();
            copy.childrenExpressionTypes = copy.childrenExpressionTypes.map(el => el.ReplaceIdent(searchIdent, expressionType));
            return copy;
        }
    }

    /** renames other expression's idents so none are in common with this ExpressionType
     * @param {ExpressionType} otherExpressionType 
     * @returns {ExpressionType} a copy of otherExpressionType with the distinguished idents
     */
    DistinguishIdentsWith(otherExpressionType){
        let copy = otherExpressionType.DeepCopy();
        let myIdents = this.GetIdentChars();
        let otherIdents = copy.GetIdentChars();
        let commonIdents = myIdents.filter(el => otherIdents.includes(el));
        while(commonIdents.length > 0){
            let oldIdent = commonIdents.shift();
            let newIdent = GetNewIdent(myIdents.concat(otherIdents));
            otherIdents.splice(otherIdents.indexOf(oldIdent), 1);
            otherIdents.push(newIdent);
            copy = copy.ReplaceIdent(oldIdent, new ExpressionTypeIdent(newIdent));
        }
        return copy;
    }
    
    /**
     * @param {ExpressionType} otherExpressionType assumed to have no common idents with this ExpressionType that have no reason to be the same and no alias constructor
     * @returns {[boolean,ExpressionType,[string,ExpressionType][]]} true if both ExpressionTypes are "compatible" and the resulting ExpressionType
     */
    CheckCompatibilityWith(otherExpressionType){
        if(otherExpressionType instanceof ExpressionTypeIdent){
            if(this instanceof ExpressionTypeIdent && this.letter == otherExpressionType.letter){
                return [true, otherExpressionType.DeepCopy(), []]; // exemple 'a = 'a
            }

            if(this.GetIdentChars().some(el => el == otherExpressionType.letter)){
                return [false, null, null]; // exemple 'a != 'a * 'a
            }else{
                return [true, this.DeepCopy(), [[otherExpressionType.letter, this.DeepCopy()]]]; // exemple 'a = 'b * int
            }
        }
        if(this instanceof ExpressionTypeIdent){
            return otherExpressionType.CheckCompatibilityWith(this);
        }

        if(otherExpressionType instanceof ExpressionTypeConstr){
            if(this instanceof ExpressionTypeConstr){
                if(this.childConstrType.name != otherExpressionType.childConstrType.name){
                    return [false, null, null]; // exemple int != float
                }else{
                    let thisStar = new ExpressionTypeStar(this.childrenExpressionTypes.map(el => el.DeepCopy()));
                    let otherStar = new ExpressionTypeStar(otherExpressionType.childrenExpressionTypes.map(el => el.DeepCopy()));
                    let [valid, resultingExpressionType, identReplacements] = thisStar.CheckCompatibilityWith(otherStar);
                    if(!valid){
                        return [false, null, null]; // exemple (int*float) list != (float*int) list
                    }else{
                        return [true, new ExpressionTypeConstr(resultingExpressionType.childrenExpressionTypes.map(el => el.DeepCopy()), this.childConstrType), identReplacements] // exemple ('a, 'b) graph = ('c, 'c) graph
                    }
                }
            }else{
                return [false, null, null]; // exemple 'a list != int * int
            }
        }
        if(this instanceof ExpressionTypeConstr){
            return otherExpressionType.CheckCompatibilityWith(this);
        }

        if(otherExpressionType instanceof ExpressionTypeStar){
            if(this instanceof ExpressionTypeStar){
                if(this.childrenExpressionTypes.length != this.childrenExpressionTypes.length){
                    return [false, null, null]; // exemple int * int != int * int * int
                }else{
                    let thisCopy = this.DeepCopy();
                    let otherCopy = otherExpressionType.DeepCopy();
                    let globalResultingExpressionType = new ExpressionTypeStar(new Array(thisCopy.childrenExpressionTypes.length));
                    let globalIdentReplacements = [];
                    for(let i = 0; i < thisCopy.childrenExpressionTypes.length; i++){
                        let [valid, resultingExpressionType, identReplacements] = thisCopy.childrenExpressionTypes[i].CheckCompatibilityWith(otherCopy.childrenExpressionTypes[i]);
                        if(!valid){
                            return [false, null, null]; // exemple int * float != float * int
                        }else{
                            for(let r = 0; r < identReplacements.length; r++){
                                thisCopy = thisCopy.ReplaceIdent(identReplacements[r][0], identReplacements[r][1]);
                                otherCopy = otherCopy.ReplaceIdent(identReplacements[r][0], identReplacements[r][1]);
                                for(let j = 0; j < globalIdentReplacements; j++){
                                    globalIdentReplacements[j][1] = globalIdentReplacements[j][1].ReplaceIdent(identReplacements[r][0], identReplacements[r][1]);
                                }
                                for(let j = 0; j < i; j++){
                                    globalResultingExpressionType.childrenExpressionTypes[j] = globalResultingExpressionType.childrenExpressionTypes[j].ReplaceIdent(identReplacements[r][0], identReplacements[r][1])
                                }
                                globalIdentReplacements.push(identReplacements[r]);
                            }
                        }
                        globalResultingExpressionType.childrenExpressionTypes[i] = resultingExpressionType;
                    }
                    return [true, globalResultingExpressionType, globalIdentReplacements];
                }
            }else{
                return [false, null, null]; // exemple int * int != int -> int
            }
        }
        if(this instanceof ExpressionTypeStar){
            return otherExpressionType.CheckCompatibilityWith(this);
        }

        //[TODO] ExpressionTypeArrow /////////////////////////////////////////////////////////////////
        if(otherExpressionType instanceof ExpressionTypeArrow){
            if(this instanceof ExpressionTypeArrow){
                if(this.childrenExpressionTypes.length != this.childrenExpressionTypes.length){
                    return [false, null, null]; // exemple int -> int != int -> int -> int
                }else{
                    let thisCopy = this.DeepCopy();
                    let otherCopy = otherExpressionType.DeepCopy();
                    let globalResultingExpressionType = new ExpressionTypeArrow(new Array(thisCopy.childrenExpressionTypes.length));
                    let globalIdentReplacements = [];
                    for(let i = 0; i < thisCopy.childrenExpressionTypes.length; i++){
                        let [valid, resultingExpressionType, identReplacements] = thisCopy.childrenExpressionTypes[i].CheckCompatibilityWith(otherCopy.childrenExpressionTypes[i]);
                        if(!valid){
                            return [false, null, null]; // exemple int -> float != float -> int
                        }else{
                            for(let r = 0; r < identReplacements.length; r++){
                                thisCopy = thisCopy.ReplaceIdent(identReplacements[r][0], identReplacements[r][1]);
                                otherCopy = otherCopy.ReplaceIdent(identReplacements[r][0], identReplacements[r][1]);
                                for(let j = 0; j < globalIdentReplacements; j++){
                                    globalIdentReplacements[j][1] = globalIdentReplacements[j][1].ReplaceIdent(identReplacements[r][0], identReplacements[r][1]);
                                }
                                for(let j = 0; j < i; j++){
                                    globalResultingExpressionType.childrenExpressionTypes[j] = globalResultingExpressionType.childrenExpressionTypes[j].ReplaceIdent(identReplacements[r][0], identReplacements[r][1])
                                }
                                globalIdentReplacements.push(identReplacements[r]);
                            }
                        }
                        globalResultingExpressionType.childrenExpressionTypes[i] = resultingExpressionType;
                    }
                    return [true, globalResultingExpressionType, globalIdentReplacements];
                }
            }else{
                return [false, null, null]; // exemple int * int != int -> int
            }
        }
        if(this instanceof ExpressionTypeArrow){
            return otherExpressionType.CheckCompatibilityWith(this);
        }

        console.error("wtf ? how did we get here !");
    }
}

class ExpressionTypeIdent extends ExpressionType{ //ex: 'a
    /** @param {string} letter_*/
    constructor(letter_){
        super();
        /** @type {string}*/
        this.letter = letter_;
    }
    
    /** @returns {ExpressionTypeIdent} */
    DeepCopy(){
        return new ExpressionTypeIdent(this.letter);
    }
}

class ExpressionTypeArrow extends ExpressionType{ //ex: int -> float -> string
    /** @param {ExpressionType[]} childrenExpressionTypes_*/
    constructor(childrenExpressionTypes_){
        super();

        let length = childrenExpressionTypes_.length;

        if(childrenExpressionTypes_[childrenExpressionTypes_.length - 1] instanceof ExpressionTypeArrow){
            // we are simplifying with right associativity 'a -> ('b -> 'c) into 'a -> 'b -> 'c
            length = length + childrenExpressionTypes_[childrenExpressionTypes_.length - 1].childrenExpressionTypes.length - 1
        }

        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = new Array(length);

        for(let i = 0; i < childrenExpressionTypes_.length - 1; i++){
            this.childrenExpressionTypes[i] = childrenExpressionTypes_[i]
        }

        if(childrenExpressionTypes_[childrenExpressionTypes_.length - 1] instanceof ExpressionTypeArrow){
            for(let i = childrenExpressionTypes_.length - 1; i < length; i++){
                this.childrenExpressionTypes[i] = childrenExpressionTypes_[childrenExpressionTypes_.length - 1].childrenExpressionTypes[i - childrenExpressionTypes_.length + 1]
            }
        }else{
            this.childrenExpressionTypes[length - 1] = childrenExpressionTypes_[length - 1]
        }
    }
    
    /** @returns {ExpressionTypeArrow} */
    DeepCopy(){
        return new ExpressionTypeArrow(this.childrenExpressionTypes.map(child => child.DeepCopy()));
    }
}

class ExpressionTypeStar extends ExpressionType{ //ex: int * float * string
    /** @param {ExpressionType[]} childrenExpressionTypes_*/
    constructor(childrenExpressionTypes_){
        super();
        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = childrenExpressionTypes_;
    }

    /** @returns {ExpressionTypeStar} */
    DeepCopy(){
        return new ExpressionTypeStar(this.childrenExpressionTypes.map(child => child.DeepCopy()));
    }
}

class ExpressionTypeConstr extends ExpressionType{ //ex: ('a, 'b) graph
    /** 
     * @param {ExpressionType[]} childrenExpressionTypes_
     * @param {ConstrType} childConstrType_
    */
    constructor(childrenExpressionTypes_, childConstrType_){
        super();
        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = childrenExpressionTypes_;
        /** @type {ConstrType}*/
        this.childConstrType = childConstrType_;
    }

    /** @returns {ExpressionTypeConstr} */
    DeepCopy(){
        return new ExpressionTypeConstr(this.childrenExpressionTypes.map(child => child.DeepCopy()), this.childConstrType);
    }
}

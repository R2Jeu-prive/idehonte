class ExpressionType{
    constructor(){}

    ToText(){
        console.error("this expression type is not set so can't convert to text");
    };
}

class ExpressionTypeIdent extends ExpressionType{ //ex: 'a
    constructor(letter_){
        super();
        /** @type {string}*/
        this.letter = letter_;
    }

    ToText(){
        return "\'" + this.letter;
    }
}

class ExpressionTypeUnderscore extends ExpressionType{ //ex: _
    constructor(){
        super();
    }

    ToText(){
        return "_";
    }
}

class ExpressionTypeParantheses extends ExpressionType{ //ex: (int)
    constructor(childExpr_){
        super();
        /** @type {ExpressionType}*/
        this.childExpr = childExpr_;
    }

    ToText(){
        return "(" + this.childExpr.ToText() + ")";
    }
}

class ExpressionTypeArrow extends ExpressionType{ //ex: int -> float -> string
    constructor(childrenExpressionTypes_){
        super();
        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = childrenExpressionTypes_;
    }

    ToText(){
        let text = this.childrenExpressionTypes[0].ToText();
        for(let i = 1; i < this.childrenExpressionTypes.length; i++){
            text = text + " -> " + this.childrenExpressionTypes[i].ToText();
        }
        return text;
    }
}

class ExpressionTypeStar extends ExpressionType{ //ex: int * float * string
    constructor(childrenExpressionTypes_){
        super();
        /** @type {ExpressionType[]}*/
        this.childrenExpressionTypes = childrenExpressionTypes_;
    }

    ToText(){
        let text = this.childrenExpressionTypes[0].ToText();
        for(let i = 1; i < this.childrenExpressionTypes.length; i++){
            text = text + " * " + this.childrenExpressionTypes[i].ToText();
        }
        return text;
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

    ToText(){
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
    }
}

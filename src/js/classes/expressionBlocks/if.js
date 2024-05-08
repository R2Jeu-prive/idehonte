class IfEB extends ExpressionBlock{
    constructor(){
        super();
        this.children = [null, null];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get("unit"));
    }

    CheckFit(childBlock, spot){
        if(spot == 0){
            if(!(childBlock instanceof ExpressionBlock)){return false;}
            //[TODO] check type bool
            return true;
        }else if(spot == 1){
            //[TODO] check type unit
            if(!(childBlock instanceof ExpressionBlock)){return false;}
            return true;
        }else{
            console.error("spot out of bounds");
        }
    }
}

class IfElseEB extends ExpressionBlock{
    constructor(){
        super();
        this.children = [null, null, null];
    }

    GetEvalType(){
        
    }

    CheckFit(childBlock, spot){
        if(spot == 0){
            if(!(childBlock instanceof ExpressionBlock)){return false;}
            //[TODO] check type bool
            return true;
        }else if(spot == 1){
            //[TODO] check type unit
            if(!(childBlock instanceof ExpressionBlock)){return false;}
            return true;
        }else{
            console.error("spot out of bounds");
        }
    }
}
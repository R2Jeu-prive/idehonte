class minMaxIntFloatEB extends ExpressionBlock{
    /**
     * @param {boolean} min
     * @param {boolean} int
     */
    constructor(min_, int_){
        super(ExpressionBlock.text((min_ ? "min" : "max") + "_" + (int_ ? "int" : "float")))
        this.min = min_;
        this.int = int_;
        this.childrenBlocks = [];
    }

    GetEvalType(){
        return new ExpressionTypeConstr([], ConstrType.Get(this.int ? "int" : "float"));
    }

    Duplicate(){
        let copy = new minMaxIntFloatEB(this.min, this.int);
        copy.DuplicateClassList(this)
        return copy;
    }

    CheckValid(){
        return true;
    }
}

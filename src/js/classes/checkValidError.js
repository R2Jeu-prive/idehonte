class CheckValidError extends Error{
    /**
     * @param {string} msg error message
     */
    constructor(msg){
        super(msg);
    }

    static expressionBlockExpected = new CheckValidError("Le bloc tenu n'est pas une expression");
    static expressionTypeBlockExpected = new CheckValidError("Le bloc tenu n'est pas un type d'expression");
}
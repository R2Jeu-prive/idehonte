class ConstrType{
    constructor(name_, nbOfArgs_, isAlias_){
        /** @type {string}*/
        this.name = name_;
        /** @type {number}*/
        this.nbOfArgs = nbOfArgs_;
        this.isAlias = isAlias_;
    }

    /** @type {ConstrType[]}*/
    static all = [
        new ConstrType("unit",0, false),
        new ConstrType("bool",0, false),
        new ConstrType("int",0, false),
        new ConstrType("float",0, false),
        new ConstrType("char",0, false),
        new ConstrType("string",0, false),
        new ConstrType("list",1, false),
        new ConstrType("array",1, false),
        new ConstrType("option",1, false)
    ];

    static Get(name){
        for(let i = 0; i < ConstrType.all.length; i++){
            if(ConstrType.all[i].name == name){
                return ConstrType.all[i];
            }
        }
        return null;
    }

    static Add(name, nbOfArgs, isAlias){
        if(ConstrType.Get(name) != null){
            return false; //impossible to add this ConstrType, one already exists with that name
        }
        ConstrType.all.push(new ConstrType(name, nbOfArgs, isAlias));
        return true;
    }

    static Remove(name){
        for(let i = 0; i < ConstrType.all.length; i++){
            if(ConstrType.all[i].name == name){
                //[TODO] CHECK NOTHING USES THIS TYPE
                ConstrType.all.splice(i, 1);
                return true;
            }
        }
        return false; //impossible to remove this ConstrType, none exist with that name
    }
}

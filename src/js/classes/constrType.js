class ConstrType{
    constructor(name_, nbOfArgs_){
        /** @type {string}*/
        this.name = name_;
        /** @type {number}*/
        this.nbOfArgs = nbOfArgs_;
    }

    /** @type {ConstrType[]}*/
    static all = [
        new ConstrType("bool",0),
        new ConstrType("int",0),
        new ConstrType("float",0),
        new ConstrType("char",0),
        new ConstrType("string",0),
        new ConstrType("list",1),
        new ConstrType("array",1),
        new ConstrType("option",1)
    ];

    static Get(name){
        for(let i = 0; i < ConstrType.all.length; i++){
            if(ConstrType.all[i].name == name){
                return ConstrType.all[i];
            }
        }
        return null;
    }

    static Add(name, nbOfArgs){
        if(ConstrType.Get(name) != null){
            return false; //impossible to add this ConstrType, one already exists with that name
        }
        ConstrType.all.push(new ConstrType(name, nbOfArgs));
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

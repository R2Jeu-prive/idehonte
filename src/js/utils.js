const alphabet = "abcdefghijklmnopqrstuvwxyz";

/**
 * @param {string[]} usedIdents 
 * @returns {string} a new ident that is not in usedIdents
 */
function GetNewIdent(usedIdents){
    for(let i = 0; i < 26; i++){
        if(!usedIdents.includes(alphabet[i])){
            return alphabet[i];
        }
    }
    console.error("out of idents !");
}
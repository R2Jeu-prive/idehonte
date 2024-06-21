// REGEX
const COMMENT_REGEX = new RegExp(/[(][*][\s\S]*?[*][)][\s]*/g);
const CODE_SEPARATOR_REGEX = new RegExp(/[\S][\s\S]*?(;;)/g);

/**
 * Clean code before execution or processing (remove comments and split command)
 * @param {string} content - Code to clean
 * @return {string[]} - List that contains all codes to execute
 */
let clean_content = function (content) {
    return content.replace(COMMENT_REGEX, "").match(CODE_SEPARATOR_REGEX);
};

/**
 * Auto scroll down output interpreter
 */
function autoscroll_output() {
    let container = document.getElementById("toplevel-container");
    container.scrollTop = container.scrollHeight;
}

let exec_string = function (str) {
    let commands = clean_content(str);
    for (let commandsKey in commands) {
        if (commands[commandsKey].match("Graphics") != null) {
            alert("Le module Grpahics n'est pas encore supporté");
            break;
        }
        executecallback.execute("toplevel", commands[commandsKey]);
    }
    autoscroll_output();
};

//toplevelcallback.reset()
//toplevelcallback.clear()

/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    let stack = [];
    for(let dir of path.split("/")) {
        if(dir === "" || dir === ".") continue;
        if(dir === "..") {
            if(stack.length > 0) stack.pop();
        }else {
            stack.push(dir);
        }
    }

    return "/" + stack.join("/");
};
const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}


function getToDos(){
    let todos = getFiles();
    let res = [];
    for (let file_string of todos){
        res.push(...file_string.split('\r\n').filter((word) => word.trim().includes("// TODO")).map(word => word.slice(word.indexOf("//"))));
    }
    return res;
}


function getUserComments(todos, userName){
    return todos.filter((word) => word.split(';')[0].split(" ")[2] === userName);
}


function processCommand(command) {
    cmd = command.split(" ")[0]
    let res = [];
    switch (cmd) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(getToDos());
            process.exit(0);
            break;
        case "user":
            let todos = getToDos();
            let arg = command.split(" ")[1];
            console.log(getUserComments(todos, arg));
            process.exit(0);
            break;
        case 'important':
            res = []
            let toDo = getToDos()
            console.log(toDo.filter(str => str.includes("!")));
            process.exit(0);
            break;
        case "sort":
            let arg2 = command.split(" ")[1];
            switch (arg2){
                case "importance":
                    break;
                case "user":
                    let todos = getToDos();
                    let userComments = todos.filter(word => word.split(";").length === 3 && word.split(";")[0].split(" ").length > 2).sort();
                    console.log(userComments);
                    console.log(todos.filter(word => !userComments.includes(word)));
                    break;
                case "date":
                    break;
            }
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!

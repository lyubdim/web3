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
            res = [];
            console.log(todos.filter((word) => word.split(';')[0].split(" ")[2] === arg));
            process.exit(0);
            break;
        case 'important':
            res = []
            let toDo = getToDos()
            console.log(toDo.filter(str => str.includes("!")));
            process.exit(0);
            break;
        case "sort":
            arg = command.split(" ")[1];
            switch (arg){
                case "importance":
                    break;
                case "user":
                    break;
                case "date":
                    break;
            }
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!

const {getAllFilePathsWithExtension, readFile} = require('./fileSystem');
const {readLine} = require('./console');

const files = getFiles();

console.log('Please, write your command!');
readLine(processCommand);

function getFiles() {
    const filePaths = getAllFilePathsWithExtension(process.cwd(), 'js');
    return filePaths.map(path => readFile(path));
}

function getToDos() {
    let todos = getFiles();
    let res = [];
    for (let file_string of todos) {
        res.push(file_string.split('\r\n').filter((word) => word.trim().startsWith("// TODO")));
    }
    return res;
}

function processCommand(command) {
    switch (command) {
        case 'exit':
            process.exit(0);
            break;
        case 'show':
            console.log(getToDos());
            process.exit(0);
            break;
        case 'important':
            let res = []
            let toDo = getToDos()
            for (let file_string of toDo) {
                res.push(file_string.filter(str => str.includes("!")))
            }
            console.log(res);
            process.exit(0);
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!

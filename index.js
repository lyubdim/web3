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
        res.push(...file_string.split('\r\n').filter((word) => word.trim().includes("// TODO")).map(word => word.slice(word.indexOf("//"))));
    }
    return res;
}

function getExclamationString() {
    let toDo = getToDos()
    return toDo.filter(str => str.includes("!"));
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
            break;   // TODO digi; 2016-04-08; добавить writeLine!!!!!
        case "user":
            let todos = getToDos();
            let arg = command.split(" ")[1];
            res = [];
            console.log(todos.filter((word) => word.split(';')[0].split(" ")[2] === arg));
            process.exit(0);
            break;
        case 'important':
            console.log(getExclamationString());
            process.exit(0);
            break;
        case "sort":
            let arg2 = command.split(" ")[1];
            switch (arg2) {
                case "importance":
                    let strings = getExclamationString();
                    const sortedStrings = strings.sort((a, b) => {
                        const countA = a.split('!').length - 1;
                        const countB = b.split('!').length - 1;
                        return countB - countA;
                    });
                    console.log(sortedStrings);
                        break;
                case
                    "user"
                :
                    break;
                case
                    "date"
                :
                    break;
                }
                break;
            default:
                console.log('wrong command');
                break;
        }
    }

// TODO you can do it!

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

function getExclamationString() {
    let toDo = getToDos()
    return toDo.filter(str => str.includes("!"));
}


function getUserComments(todos, userName){
    return todos.filter((word) => word.split(';')[0].split(" ")[2] === userName);
}


function printTable(table){
    let max1column = 0;
    let max2column = 0;
    let max3column = 0;
    for (let line of table){
        max1column = Math.max(max1column, line.split(';')[0].trim().length);
        max2column = Math.max(max2column, line.split(';')[1].trim().length);
        max3column = Math.max(max3column, line.split(';')[2].trim().length);
    }
    console.log(` !  | ${"user".padEnd(max1column, " ")} | ${ "date".padEnd(max2column, " ")} | ${"comment".padEnd(max3column, " ")}`);
    for (let line of table){
        console.log(` ${ line.includes('!') ? "!" : " " }  | ${line.split(";")[0].trim().padEnd(max1column, " ")} | ${line.split(";")[1].trim().padEnd(max2column, " ")} | ${line.split(";")[2].trim().padEnd(max3column, " ")}`);
    }
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
            printTable(getUserComments(todos, arg));
            process.exit(0);
            break;
        case 'important':
            console.log(getExclamationString());
            process.exit(0);
            break;
        case "sort":
            let arg2 = command.split(" ")[1];
            switch (arg2){
                case "importance":
                    let strings = getExclamationString();
                    const sortedStrings = strings.sort((a, b) => {
                        const countA = a.split('!').length - 1;
                        const countB = b.split('!').length - 1;
                        return countB - countA;
                    });
                    console.log(sortedStrings);
                    break;
                case "user":
                    let todos = getToDos();
                    let userComments = todos.filter(word => word.split(";").length === 3 && word.split(";")[0].split(" ").length > 2).sort();
                    printTable(userComments);
                    console.log(todos.filter(word => !userComments.includes(word)));
                    break;
                case "date":
                    let temp_res = getToDos().filter(word => word.split(";").length === 3).sort((word1, word2) => {
                        let date1 = new Date(word1.split(";")[1]);
                        let date2 = new Date(word2.split(";")[1]);
                        if (date1 === date2){
                            return 0;
                        }
                        if (date1 > date2){
                            return -1;
                        }
                        return 1;
                    });
                    printTable(temp_res);
                    console.log(getToDos().filter(word => !temp_res.includes(word)));
                    break;
            }
            break;
        default:
            console.log('wrong command');
            break;
    }
}

// TODO you can do it!


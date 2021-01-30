class TASK {
    private headLine: string; private done: string
    constructor (headLine:string, done:string) {
        this.headLine = headLine
        this.done = "no"
    } 
}

let myArray:any;

const setArray = (): void => {
    if (localStorage.length > 0) 
    {myArray = JSON.parse(localStorage.getItem('myArray'));
console.log("yes")}
    else myArray = []; 
}

setArray()

for (let element of myArray){
    createItem(element)
}

document.querySelector('#todo-add').addEventListener('submit', (e) => {
    e.preventDefault();
    setArray();
    let headline:string = (<HTMLInputElement>document.querySelector('#todo-item')).value;
    let done:string = "no"
    const newTask:any = new TASK (headline,done)
    myArray.push(newTask)
    localStorage.setItem('myArray', JSON.stringify(myArray))
    createItem(newTask);
    clear();
})
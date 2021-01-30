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
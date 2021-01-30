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

function createItem(n):void {
    let row = (<HTMLInputElement>document.createElement('div'))
    let item = (<HTMLInputElement>document.createElement('div'))
    let btn = (<HTMLInputElement>document.createElement('button'))
    row.classList.add('todo-row')
    item.classList.add('todo-item')
    btn.classList.add('todo-ok')
    btn.setAttribute('onclick','cross(this,myArray)')
    btn.innerText = "V"
    item.innerText = n.headLine 
    row.appendChild(item);   
    row.appendChild(btn);
    document.querySelector('#todo-list').appendChild(row)
}

const clear = ():void => {
    (<HTMLInputElement>document.querySelector('#todo-item')).value = "";
  }

  const cross = (item:any,array:any):void => {
    let sibling:any = item.previousSibling;
    sibling.classList.add('done');
    let parent:any = item.parentElement;
    parent.classList.add('removeLater')
    array = JSON.parse(localStorage.getItem('myArray'))
    for (let element of array) {
        if (element.headLine == sibling.innerText) {
            element.done = "yes"
        }
    }
    localStorage.setItem('myArray', JSON.stringify(array))
}

const delAll = (array:any) :void => {
    array = [];
    document.querySelector('#todo-list').remove();
    localStorage.setItem('myArray', JSON.stringify(array))   
}

const delCom = (array:any) :void => {   
    array = JSON.parse(localStorage.getItem('myArray'))
    for (let element of array) {
        if (element.done == "yes") {
            let index = array.indexOf(element)
            array.splice(index,1)
        }
    }
    localStorage.setItem('myArray', JSON.stringify(array)) 
    let removeLater = document.querySelectorAll('.removeLater')
    for (let i:number = 0; i<removeLater.length; i++) {
        document.querySelectorAll('.removeLater')[i].remove()
    }
}

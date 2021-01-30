var TASK = /** @class */ (function () {
    function TASK(headLine, done) {
        this.headLine = headLine;
        this.done = "no";
    }
    return TASK;
}());
var myArray;
var setArray = function () {
    if (localStorage.length > 0) {
        myArray = JSON.parse(localStorage.getItem('myArray'));
        console.log("yes");
    }
    else
        myArray = [];
};
setArray();
for (var _i = 0, myArray_1 = myArray; _i < myArray_1.length; _i++) {
    var element = myArray_1[_i];
    createItem(element);
}
document.querySelector('#todo-add').addEventListener('submit', function (e) {
    e.preventDefault();
    setArray();
    var headline = document.querySelector('#todo-item').value;
    var done = "no";
    var newTask = new TASK(headline, done);
    myArray.push(newTask);
    localStorage.setItem('myArray', JSON.stringify(myArray));
    createItem(newTask);
    clear();
});
function createItem(n) {
    var row = document.createElement('div');
    var item = document.createElement('div');
    var btn = document.createElement('button');
    row.classList.add('todo-row');
    item.classList.add('todo-item');
    btn.classList.add('todo-ok');
    btn.setAttribute('onclick', 'cross(this,myArray)');
    btn.innerText = "V";
    item.innerText = n.headLine;
    row.appendChild(item);
    row.appendChild(btn);
    document.querySelector('#todo-list').appendChild(row);
}
var clear = function () {
    document.querySelector('#todo-item').value = "";
};
var cross = function (item, array) {
    var sibling = item.previousSibling;
    sibling.classList.add('done');
    var parent = item.parentElement;
    parent.classList.add('removeLater');
    array = JSON.parse(localStorage.getItem('myArray'));
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var element = array_1[_i];
        if (element.headLine == sibling.innerText) {
            element.done = "yes";
        }
    }
    localStorage.setItem('myArray', JSON.stringify(array));
};
var delAll = function (array) {
    array = [];
    var row = document.querySelectorAll('.todo-row');
    for (var i = 0; i < row.length; i++) {
        document.querySelectorAll('.todo-row')[i].remove();
    }
    localStorage.setItem('myArray', JSON.stringify(array));
};
var delCom = function (array) {
    array = JSON.parse(localStorage.getItem('myArray'));
    for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
        var element = array_2[_i];
        if (element.done == "yes") {
            var index = array.indexOf(element);
            array.splice(index, 1);
        }
    }
    localStorage.setItem('myArray', JSON.stringify(array));
    var removeLater = document.querySelectorAll('.removeLater');
    for (var i = 0; i < removeLater.length; i++) {
        document.querySelectorAll('.removeLater')[i].remove();
    }
};
document.querySelector('#todo-delall').addEventListener('click', function () {
    var answer = confirm("Are you sure?");
    if (answer == true) {
        delAll(myArray);
    }
    else {
        return;
    }
});
document.querySelector('#todo-delcom').addEventListener('click', function () {
    delCom(myArray);
});

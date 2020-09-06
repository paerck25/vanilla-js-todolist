let input = document.querySelector('.input');
let ul = document.querySelector('ul');
let form = document.querySelector('.form');

// function onClickDelete(e) {
//     ul.childNodes.forEach((obj)=>{
//         if(obj === e.target.parentNode){
//             obj.remove();
//         }
//     })
// }

function onClickDelete(e) {
    e.target.parentNode.remove();
}

function onClickComplete(e){
    if(e.target.checked){
        e.target.parentNode.classList.add('complete');
    } else {
        e.target.parentNode.classList.remove('complete');
    }
}

function createCheckBox(){
    let completeCheckBox = document.createElement('input');
    completeCheckBox.type = 'checkbox';
    completeCheckBox.id = `check${ul.childElementCount}`;
    completeCheckBox.className = 'check';
    completeCheckBox.onchange = onClickComplete;
    return completeCheckBox;
}

function createLabel(){
    let textLabel = document.createElement('label');
    textLabel.htmlFor = `check${ul.childElementCount}`;
    textLabel.innerText = input.value;
    textLabel.className = 'textLabel';
    return textLabel;
}

function createDeleteButton(){
    let deleteButton = document.createElement('div');
    deleteButton.onclick = onClickDelete;
    deleteButton.innerText = '×';
    deleteButton.className = 'deleteBtn';
    return deleteButton;
}


function onSubmitForm(e) {
    if(input.value !== ''){
        e.preventDefault();
        let li = document.createElement('li');
        li.appendChild(createCheckBox());
        li.appendChild(createLabel());
        li.appendChild(createDeleteButton());
        ul.appendChild(li);
        input.value = '';
    } else {
        e.preventDefault();
    }
}

document.querySelector('.form').onsubmit = onSubmitForm;
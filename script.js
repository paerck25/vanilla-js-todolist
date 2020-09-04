let input = document.querySelector('.input');
let ul = document.querySelector('ul');

function onClickDelete(e) {
    ul.childNodes.forEach((obj)=>{
        if(obj === e.target.parentNode){
            obj.remove();
        }
    })
}

function onClickComplete(e){
    ul.childNodes.forEach((obj)=>{
        if(obj === e.target.parentNode){
            obj.classList.add('complete');
            e.target.remove();
        }
    })
}

function onSubmitForm(e) {
    e.preventDefault();
    let li = document.createElement('li');
    let deleteBtn = document.createElement('button');
    let completeBtn = document.createElement('button');
    deleteBtn.onclick = onClickDelete;
    completeBtn.onclick = onClickComplete;
    deleteBtn.innerText = '삭제';
    completeBtn.innerText = '완료';
    li.innerText = input.value;
    li.appendChild(deleteBtn);
    li.appendChild(completeBtn);
    ul.appendChild(li);
    input.value = '';
}

document.querySelector('.form').onsubmit = onSubmitForm;
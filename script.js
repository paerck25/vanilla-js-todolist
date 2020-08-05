let text = document.getElementById('input');
let list = document.getElementById('list');

function onClickDelete(e) {
    list.childNodes.forEach((obj)=>{
        if(obj === e.target.parentNode){
            obj.remove();
        }
    })
}

function onClickComplete(e){
    list.childNodes.forEach((obj)=>{
        if(obj === e.target.parentNode){
            obj.style.textDecoration = 'line-through red'
            e.target.remove();
        }
    })
}

function onSubmitForm(e) {
    e.preventDefault();
    let myElement = document.createElement('li');
    let myBtn = document.createElement('button');
    let myBtn2 = document.createElement('button');
    myBtn.onclick = onClickDelete;
    myBtn2.onclick = onClickComplete;
    myBtn.innerText = '삭제';
    myBtn2.innerText = '완료';
    myElement.innerText = text.value;
    myElement.append(myBtn);
    myElement.append(myBtn2);
    list.append(myElement);
    text.value = '';
}

document.getElementById('form').onsubmit = onSubmitForm;
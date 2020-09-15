let form = document.querySelector('.form');
let input = document.querySelector('.input');
let ul = document.querySelector('ul');


let todos = [];

function render() {
    ul.innerHTML = todos.map((obj, index) => {
        if (obj.complete) {
            return (
                `<li>
                <input class="check" type="checkbox" id="check_${index}" checked="true">
                <label class="textLabel complete" for="check_${index}">${obj.text}</label>
                <div class="deleteBtn" id="delete_${index}">×</div>
                </li>`
            )
        }
        return (
            `<li>
            <input class="check" type="checkbox" id="check_${index}">
            <label class="textLabel" for="check_${index}">${obj.text}</label>
            <div class="deleteBtn" id="delete_${index}">×</div>
            </li>`
        )
    }).join("");
    document.querySelectorAll('.check').forEach((node) => {
        node.addEventListener('change', onClickComplete);
    })
    document.querySelectorAll('.deleteBtn').forEach((node) => {
        node.addEventListener('click', onClickDelete);
    })
}

function saveTodos() {
    const now = new Date();
    let data = {
        date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        todos: todos
    };
    console.log(data);
    fetch('/todo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.text())
        .then(response => {
            console.log('Success:', response)
            render();
        })
        .catch(error => console.error('Error:', error));
}

function deleteTodos() {
    const now = new Date();
    let data = {
        date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    };
    fetch('/delete', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.text())
        .then(response => {
            console.log('Success:', response)
            render();
        })
        .catch(error => console.error('Error:', error));
}


function getTodos() {
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    fetch(`./data/${date}.json`)
        .then(res => res.json())
        .then(response => {
            todos = response;
            render();
        })
        .catch(error => console.error('Error:', error));
}

function onClickDelete(e) {
    const id = e.target.id;
    todos = todos.filter((obj, index) => {
        return `delete_${index}` !== id
    })
    if(todos.length === 0){
        return deleteTodos();
    }
    saveTodos();
}

function onClickComplete(e) {
    const id = e.target.id;
    todos = todos.map((obj, index) => {
        if (`check_${index}` === id) {
            obj.complete = !obj.complete;
        }
        return obj;
    })
    saveTodos();
}

function onSubmitForm(e) {
    if (input.value !== '') {
        e.preventDefault();
        todos.push({
            text: input.value,
            complete: false,
        })
        saveTodos();
        input.value = '';
    } else {
        e.preventDefault();
    }
}

getTodos();
form.addEventListener('submit', onSubmitForm);


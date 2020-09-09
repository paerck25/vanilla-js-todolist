let form = document.querySelector('.form');
let input = document.querySelector('.input');
let ul = document.querySelector('ul');


let todos = [];

function saveTodos() {
    const now = new Date();
    let data = {
        date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        todos: todos
    };
    console.log(data);
    fetch('http://localhost:4000/todo', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.text())
        .then(response => console.log('Success:', response))
        .catch(error => console.error('Error:', error));
}

function render() {
    ul.innerHTML = todos.map((obj, index) => {
        if (obj.complete) {
            return (
                `<li>
                <input class="check" type="checkbox" id="check_${index}" value="${obj.text}" checked="true">
                <label class="textLabel complete" for="check_${index}">${obj.text}</label>
                <div data-text="${obj.text}" class="deleteBtn">×</div>
                </li>`
            )
        }
        return (
            `<li>
            <input class="check" type="checkbox" id="check_${index}" value="${obj.text}">
            <label class="textLabel" for="check_${index}">${obj.text}</label>
            <div data-text="${obj.text}" class="deleteBtn">×</div>
            </li>`
        )
    }).join("");
    for (let i = 0; i < todos.length; i++) {
        document.querySelectorAll('.check')[i].addEventListener('change', onClickComplete);
        document.querySelectorAll('.deleteBtn')[i].addEventListener('click', onClickDelete);
    }
}

function onClickDelete(e) {
    const text = e.target.dataset.text
    todos = todos.filter((obj) => {
        return obj.text !== text
    })
    saveTodos();
    render();
}

function onClickComplete(e) {
    const text = e.target.value
    todos = todos.map((obj) => {
        if (obj.text === text) {
            obj.complete = !obj.complete;
        }
        return obj;
    })
    saveTodos();
    render();
}

function onSubmitForm(e) {
    if (input.value !== '') {
        e.preventDefault();
        todos.push({
            text: input.value,
            complete: false,
        })
        saveTodos();
        render();
        input.value = '';
    } else {
        e.preventDefault();
    }
}

form.addEventListener('submit', onSubmitForm);


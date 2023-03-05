const root = document.querySelector(':root'),
themeChenger = document.querySelector('.main__todo__header__img-wrapper'),
bg = document.querySelector('.main__bg'),
todoListUl = document.querySelector('.main__todo__list'),
liTasks = document.querySelectorAll('.main__todo__list li'),
input = document.querySelector('#input'),
form = document.querySelector('#form'),
botttomLinks = document.querySelectorAll('.main__todo__list__last__sort button'),
leftItems = document.querySelector('#left-items'),
clearAllbtn = document.querySelector('#clear');
// changing task item into array so that we can work on it easly;
let ulArray = [];
liTasks.forEach(task => ulArray.push(task))

//we'll use it to keep track of completed tasks to show on the bottom
let arrayLenght = ulArray.length
// themes

function darkTheme() {
    root.style.setProperty('--clr-neutral-100', 'hsl(236, 33%, 92%)');
    root.style.setProperty('--clr-neutral-200', 'hsl(235, 24%, 19%)');
    root.style.setProperty('--clr-neutral-300', 'hsl(234, 39%, 85%)');
    root.style.setProperty('--clr-neutral-400', 'hsl(233, 14%, 35%)');
    root.style.setProperty('--clr-neutral-500', 'hsl(234, 11%, 52%)');
    root.style.setProperty('--clr-neutral-600', 'hsl(235, 21%, 11%)');
    root.style.setProperty('--clr-neutral-700', 'hsl(237, 14%, 26%)');
    root.style.setProperty('--clr-neutral-800', 'hsl(0, 0%, 0%)');
}
// ligth theme
function lightTheme() {
    root.style.setProperty('--clr-neutral-100', 'hsl(0, 0%, 100%)');
    root.style.setProperty('--clr-neutral-200', 'hsl(0, 0%, 100%)');
    root.style.setProperty('--clr-neutral-300', 'hsl(235, 19%, 35%)');
    root.style.setProperty('--clr-neutral-400', 'hsl(233, 11%, 84%)');
    root.style.setProperty('--clr-neutral-500', 'hsl(236, 9%, 61%)');
    root.style.setProperty('--clr-neutral-600', 'hsl(0, 0%, 98%)');
    root.style.setProperty('--clr-neutral-700', '0px 35px 50px -15px rgba(194, 195, 214, 0.5)');
    // root.style.setProperty('--clr-neutral-800', 'hsl(0, 0%, 0%)');
}

themeChenger.addEventListener('click', ()=> {
    themeChenger.classList.toggle('lightTheme');
    if (themeChenger.classList.contains('lightTheme')) {
        themeChenger.firstElementChild.classList.add('icon-animation');
        setTimeout(()=>{
            lightTheme();
            themeChenger.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeChenger.firstElementChild.classList.remove('icon-animation');
            bg.classList.add('light');
        }, 400)
    }
    else {
        themeChenger.firstElementChild.classList.add('icon-animation');
        setTimeout(()=>{
            darkTheme();
            themeChenger.firstElementChild.classList.remove('icon-animation');
            themeChenger.innerHTML = '<i class="fa-solid fa-sun"></i>';
            bg.classList.remove('light');
        }, 400)
    }
})

// completed task 

completedTask()

function completedTask() {
    todoListUl.addEventListener('click', (e)=> {
        target = e.target;
        targetParent = target.parentElement;
        targetParentsParent = targetParent.parentElement;
        targetParentsParentsParent = targetParentsParent.parentElement;
        if (target.classList.contains('main__todo__list__item__check')) targetParent.toggleAttribute('data-completed');
        if (target.classList.contains('check')) targetParentsParent.toggleAttribute('data-completed');
        if (target.classList.contains('fa-check')) targetParentsParentsParent.toggleAttribute('data-completed');
    })
}

// add task
addTask()

function addTask() {
    form.addEventListener('submit', (e)=> {
        e.preventDefault()
        let newTask = createTask(input.value)
        ulArray.push(newTask);
        ulArray.forEach(task => todoListUl.appendChild(task))
        input.value = '';
        itemsleft()
    })
}

function createTask(taskName) {
    let taskTemp = `
    <li class="main__todo__list__item">
        <button class="main__todo__list__item__check">
            <div class="check">
                <i class="fa-solid fa-check"></i>
            </div>
        </button>
        <div class="main__todo__list__item__wrapper">
            <p class="main__todo__list__item__wrapper__name">${taskName}</p>
            <div class="main__todo__list__item__wrapper__icon-wrapper">
            <button id="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button id="delete">
                <i class="fa-solid fa-trash-can"></i> 
            </button>
            </div>
        </div>
    </li>
    `
    let template = document.createElement('template');
    template.innerHTML = taskTemp.trim()
    return template.content.firstElementChild;
}

// filtering 
filtering()
function filtering() {
    botttomLinks[0].addEventListener('click', (e)=> {
        e.preventDefault()
        todoListUl.innerHTML = '';
        addCurrentClass(botttomLinks[0])
        ulArray.forEach(task => todoListUl.appendChild(task))
    })
    botttomLinks[1].addEventListener('click', (e)=> {
        e.preventDefault()
        let active = ulArray.filter(task => !task.hasAttribute('data-completed'));
        addCurrentClass(botttomLinks[1])
        todoListUl.innerHTML = '';
        active.forEach(task => todoListUl.appendChild(task))

    })
    botttomLinks[2].addEventListener('click', (e)=> {
        e.preventDefault()
        let active = ulArray.filter(task => task.hasAttribute('data-completed'));
        addCurrentClass(botttomLinks[2])
        todoListUl.innerHTML = '';
        active.forEach(task => todoListUl.appendChild(task))

    })

    clearAllbtn.addEventListener('click', (e)=> {
        e.preventDefault();
        removeCurrentClass()
        ulArray = []
        todoListUl.innerHTML = '';
        itemsleft()
    })
}

function addCurrentClass(current) {
    botttomLinks.forEach(link => {
        link.classList.remove('current');
        current.classList.add('current')
    })
}
function removeCurrentClass() {
    botttomLinks.forEach(link => {
        link.classList.remove('current');
    })
}

// left items
itemsleft()
function itemsleft() {
    let notcompleted = 0;
    ulArray.forEach(item => {
        if (!item.hasAttribute('data-completed')) notcompleted += 1;
    })
    left(notcompleted)
}
show()
function show() {
    todoListUl.addEventListener('click', ()=> {
        itemsleft()
    })
}

function left(item) {
    leftItems.innerText = `${item} items left`
}

// delete and edit;
deleteEdit()
function deleteEdit() {
    todoListUl.addEventListener('click', (e)=> {
        let target = e.target;
        if (target.parentElement.id == 'edit') {
            let taskedit = target.parentElement.parentElement.previousElementSibling;
            taskedit.setAttribute('contenteditable', true);
            taskedit.focus()
            taskedit.addEventListener('focusout', ()=> {
                taskedit.innerText = taskedit.innerText.trim()
                taskedit.removeAttribute('contenteditable')
            })
            window.addEventListener('keypress', (e)=> {
                if (e.key == 'Enter') {
                    taskedit.innerText = taskedit.innerText.trim()
                    taskedit.removeAttribute('contenteditable')
                }
            }) 
        }
        if (target.parentElement.id == 'delete') {
            let li = target.parentElement.parentElement.parentElement.parentElement;
            let index = ulArray.indexOf(li);
            ulArray.splice(index, 1);
            todoListUl.innerHTML = '';
            ulArray.forEach(task => todoListUl.appendChild(task))
            itemsleft()
        }
    })
}
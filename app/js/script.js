const root = document.querySelector(':root')
const themeChenger = document.querySelector('.main__todo__header__img-wrapper')
const bg = document.querySelector('.main__bg')
const todoListUl = document.querySelector('.main__todo__list')


// themes

function darkTheme() {
    root.style.setProperty('--clr-neutral-100', 'hsl(236, 33%, 92%)')
    root.style.setProperty('--clr-neutral-200', 'hsl(235, 24%, 19%)')
    root.style.setProperty('--clr-neutral-300', 'hsl(234, 39%, 85%)')
    root.style.setProperty('--clr-neutral-400', 'hsl(233, 14%, 35%)')
    root.style.setProperty('--clr-neutral-500', 'hsl(234, 11%, 52%)')
    root.style.setProperty('--clr-neutral-600', 'hsl(235, 21%, 11%)')
    root.style.setProperty('--clr-neutral-700', 'hsl(237, 14%, 26%)')
    root.style.setProperty('--clr-neutral-800', 'hsl(0, 0%, 0%)')
}

themeChenger.addEventListener('click', ()=> {
    themeChenger.classList.toggle('lightTheme')
    if (themeChenger.classList.contains('lightTheme')) {
        themeChenger.firstElementChild.classList.add('icon-animation')
        setTimeout(()=>{
            lightTheme()
            themeChenger.innerHTML = '<i class="fa-solid fa-moon"></i>';
            themeChenger.firstElementChild.classList.remove('icon-animation')
            bg.classList.add('light')
        }, 400)
    }
    else {
        themeChenger.firstElementChild.classList.add('icon-animation')
        setTimeout(()=>{
            darkTheme()
            themeChenger.firstElementChild.classList.remove('icon-animation')
            themeChenger.innerHTML = '<i class="fa-solid fa-sun"></i>'
            bg.classList.remove('light')
        }, 400)
    }
})

// completed task 

completedTask()

function completedTask() {
    todoListUl.addEventListener('click', (e)=> {
        target = e.target;
        targetParent = e.target.parentElement;
        targetParentsParent = e.target.parentElement.parentElement;
        targetParentsParentsParent = e.target.parentElement.parentElement.parentElement;
        if (target.classList.contains('main__todo__list__item__check')) targetParent.toggleAttribute('data-completed');
        if (target.classList.contains('check')) targetParentsParent.toggleAttribute('data-completed');
        if (target.classList.contains('fa-cleck')) targetParentsParentsParent.toggleAttribute('data-completed')
    })
}
// 
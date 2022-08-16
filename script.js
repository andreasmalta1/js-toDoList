const formEl = document.querySelector('.form')
const inputEl = document.querySelector('.input')
const ulEl = document.querySelector('.list')

let list = JSON.parse(localStorage.getItem('list'))

formEl.addEventListener('submit', (event)=>{
    event.preventDefault()
    toDoList()
})

list.forEach(task => {
    toDoList(task)
})

function toDoList(task){
    let newTask = inputEl.value
    inputEl.value = ''

    if (task){
        newTask = task.name
    }

    

    const liEl = document.createElement('li')

    if (task && task.checked){
        liEl.classList.add('checked')
    }

    liEl.innerText = newTask
    ulEl.appendChild(liEl)
    
    const checkBtnEl = document.createElement('div')
    checkBtnEl.innerHTML = `<i class="fas fa-check-square"></i>`

    const trashBtnEl = document.createElement('div')
    trashBtnEl.innerHTML = `<i class="fas fa-trash"></i>`

    liEl.append(checkBtnEl)
    liEl.append(trashBtnEl)

    checkBtnEl.addEventListener('click', ()=>{
        liEl.classList.toggle('checked')
        updateLocalStorage()
    })


    trashBtnEl.addEventListener('click', ()=>{
       liEl.remove()
       updateLocalStorage()
    })

    updateLocalStorage()
}

function updateLocalStorage(){
    const liEls = document.querySelectorAll('li')
    list = []
    liEls.forEach(liEl => {
        list.push({
            name: liEl.innerText,
            checked: liEl.classList.contains('checked')
        })
    })

    localStorage.setItem('list', JSON.stringify(list))

}
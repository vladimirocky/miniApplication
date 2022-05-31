window.onload = () => {
    setTimeout(getData, 2000)
}

let users = []

async function getData(usersCount=200){

    await axios.get(`https://randomuser.me/api/?results=${usersCount}`).then((response)=>{
        users = response.data.results
    })

    render(users)
}

function render(list) {
    console.log(list);
    const blocks = document.querySelector('.blocks')
    const userCount = document.querySelector('.user-count')
    const usersAges = document.querySelector('.users-age')
    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body')

    blocks.innerHTML = ''

    userCount.textContent = list.length

    usersAges.textContent = calculateAgesSum(list)

    const fragment = document.createDocumentFragment()
    for(let user of list){
        const block = document.createElement('div')
        // block.classList.add('block')
        // block.classList.add('shadow')
        // block.classList.add('rounded')
        // block.classList.add('text-center')
        block.className = 'block shadow rounded text-center'


        const html = `<div data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img class="rounded user-img" src="${user.picture.large}" alt="">
                <p class="user-name fs-4">${user.name.title + ' ' + user.name.first + ' ' + user.name.last}</p>
                <p class="user-email">
                    <i class="bi bi-envelope-fill"></i>
                    <span>${user.email}</span>
                </p>
                <p class="user-age">
                    <span>Age: </span>
                    <span>${user.dob.age}</span>
                </p>
                </div>`
        block.innerHTML = html

        block.addEventListener('click', () => {
            modalTitle.innerHTML = `<p class="user-name fs-4">${user.name.title + ' ' + user.name.first + ' ' + user.name.last}</p>`
            modalBody.innerHTML = `
            <p>${'phone:  ' + user.phone}</p>
            <p>${'gender: ' + user.gender}</p>
            <p>${'from: ' + user.location.country + ', ' + user.location.city}</p>
            <p>${'username: ' + user.login.username}</p>
            <p>${'registered: ' + user.registered.date.slice(0,10)}</p>
            `
        })
        fragment.appendChild(block)
    }

    blocks.appendChild(fragment)

}

const dropdown = document.querySelector('.dropdown-menu')
dropdown.addEventListener('click',(e)=>{
    const gender = e.target.dataset.type
    const child = [...dropdown.children]
    child.forEach(el=> el.firstChild.classList.remove('active'))
    e.target.classList.add('active')

    const dropdownTitle = document.getElementById('navbarDropdown')

    if(gender !== 'all'){
        dropdownTitle.textContent = gender
    } else{
        dropdownTitle.textContent = 'Filter'
    }

    filter(gender)
})

function filter(gender) {
    const filteredUsers = users.filter(user => {
        return user.gender === gender || gender === 'all'
    })

    render(filteredUsers)
}

const form = document.forms.search

form.onsubmit = (e)=>{
    e.preventDefault()
    find(form.input.value.trim())
}

function find(email) {
    const user = users.find(user => {
        return user.email === email
    }) || users

    render([user])
}

function calculateAgesSum(users) {
    return users.reduce((acc, current)=> {
        return acc + current.dob.age
    },0)
}

const btn = document.querySelector('.btn-submit');
btn.addEventListener('click', () => chooseUsersCount());
function chooseUsersCount() {
    console.log('xxx');
    const usersCountValue = document.querySelector('.users-count').value;
    getData(usersCountValue);
}
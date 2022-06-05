window.onload = () => {
    setTimeout(getData, 2000)
}

let users = []



async function getData(usersCount){
    // let inp =Number(document.querySelector('.number-requests').value)
    await axios.get('https://randomuser.me/api/?results=200').then((response)=>{
        users = response.data.results
        
    })
    let inp =(document.querySelector('.number-requests').value)
    await axios.get(`https://randomuser.me/api/?results=${inp}`).then((response)=>{
         users= response.data.results
        render(users,usersCount) 
        
        
        
})
}
          


// const numberRequests = getData.bind(usersCount)
// console.log(numberRequests())

function render(list) {
    const blocks = document.querySelector('.blocks')
    const userCount = document.querySelector('.user-count')
    const usersAges = document.querySelector('.users-age')
    // const usersCount = document.querySelector('.number-requests')

    blocks.innerHTML = ''

    userCount.textContent = list.length

    usersAges.textContent = calculateAgesSum(list)

    // usersCount.textContent = calculateUsersCount(list)

    const fragment = document.createDocumentFragment()
    for(let user of list){
        const block = document.createElement('div')
        // block.classList.add('block')
        // block.classList.add('shadow')
        // block.classList.add('rounded')
        // block.classList.add('text-center')
        block.className = 'block shadow rounded text-center'


        const html = `<img class="rounded" src="${user.picture.large}" alt="">
                <p class="user-name fs-4">${user.name.title + ' ' + user.name.first + ' ' + user.name.last}</p>
                <p class="user-email">
                    <i class="bi bi-envelope-fill"></i>
                    <span>${user.email}</span>
                </p>
                <p class="user-age">
                    <span>Age: </span>
                    <span>${user.dob.age}</span>
                </p>`
        block.innerHTML = html

        block.addEventListener('click', ()=>{
            // window.alert(`First Name: ${user.name.first}; Address: ${user.location.city}, ${user.location.street.name}`)
           
            swal(` Name:${user.name.first}; /Address: ${user.location.city}, ${user.location.street.name}, /Age:${user.dob.age},/Email:${user.email}`);
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

    render([user] )
}

function calculateAgesSum(users) {
    return users.reduce((acc, current)=> {
        return acc + current.dob.age
    },0)
}

// function calculateUsersCount(usersCount) {
//     return usersCount.reduce((acc, current)=> {
//         return acc +current.email
//     },0)
// }



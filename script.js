window.onload = () => {
  setTimeout(getData, 2000);
};

let users = [];

async function getData(usersQuantity) {
  await axios.get("https://randomuser.me/api/?results=200").then((response) => {
    users = response.data.results;
  });
  let inputValue = document.querySelector(".quantity-toShow").value;
  await axios
    .get(`https://randomuser.me/api/?results= ${inputValue}`)
    .then((response) => {
      users = response.data.results;

      render(users, usersQuantity);
    });
}

function render(list) {
  const blocks = document.querySelector(".blocks");
  const userCount = document.querySelector(".user-count");
  const usersAges = document.querySelector(".users-age");

  blocks.innerHTML = "";

  userCount.textContent = list.length;

  usersAges.textContent = calculateAgesSum(list);

  const fragment = document.createDocumentFragment();
  for (let user of list) {
    const block = document.createElement("div");
    // block.classList.add('block')
    // block.classList.add('shadow')
    // block.classList.add('rounded')
    // block.classList.add('text-center')
    block.className = "block shadow rounded text-center";

    const html = `<img class="rounded user-img" src="${
      user.picture.large
    }" alt="">
                <p class="user-name fs-4">${
                  user.name.title + " " + user.name.first + " " + user.name.last
                }</p>
                <p class="user-email">
                    <i class="bi bi-envelope-fill"></i>
                    <span>${user.email}</span>
                </p>
                <p class="user-age">
                    <span>Age: </span>
                    <span>${user.dob.age}</span>
                </p>`;
    block.innerHTML = html;

    block.addEventListener("click", () => {
      // window.alert(`First Name: ${user.name.first}; Address: ${user.location.city}, ${user.location.street.name}`)

      const myModal = document.getElementById("modal");
      const content = myModal.querySelector(".modal-body");
      const closeBtn = myModal.querySelector(".close");
      content.innerHTML = `<p>First Name: ${user.name.first}; Address: ${user.location.city}, ${user.location.street.name}</p>`;
      myModal.classList.add("show");
      myModal.style.display = "block";
      let closeModal = () => {
        myModal.style.display = "none";
        myModal.style.opacity = 0;
        myModal.classList.remove("show");
      };
      closeBtn.onclick = () => {
        closeModal();
      };
    });

    fragment.appendChild(block);
  }

  blocks.appendChild(fragment);
}

const dropdown = document.querySelector(".dropdown-menu");
dropdown.addEventListener("click", (e) => {
  const gender = e.target.dataset.type;
  const child = [...dropdown.children];
  child.forEach((el) => el.firstChild.classList.remove("active"));
  e.target.classList.add("active");

  const dropdownTitle = document.getElementById("navbarDropdown");

  if (gender !== "all") {
    dropdownTitle.textContent = gender;
  } else {
    dropdownTitle.textContent = "Filter";
  }

  filter(gender);
});

function filter(gender) {
  const filteredUsers = users.filter((user) => {
    return user.gender === gender || gender === "all";
  });

  render(filteredUsers);
}

const form = document.forms.search;

form.onsubmit = (e) => {
  e.preventDefault();
  find(form.input.value.trim());
};

function find(email) {
  const user =
    users.find((user) => {
      return user.email === email;
    }) || users;

  render([user]);
}

function calculateAgesSum(users) {
  return users.reduce((acc, current) => {
    return acc + current.dob.age;
  }, 0);
}

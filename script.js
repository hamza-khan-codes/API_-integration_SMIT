const API = 'https://fakestoreapi.noksha.dev/api/users'

const fetchUsers = async (USERS_API) => {
    const res = await fetch(USERS_API)
    const data = await res.json()
    console.log(data.data)

    displayUsers(data.data);
    return data
}

const response = fetchUsers(API);


const usersContainer =
    document.getElementById("users");

const searchInput =
    document.getElementById("searchInput");

const visibleUsers =
    document.getElementById("visibleUsers");


function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

}


function displayUsers(users) {

    usersContainer.innerHTML = "";

    visibleUsers.textContent = users.length;


    if (users.length === 0) {

        usersContainer.innerHTML = `
                    <div class="empty">
                        <h2>No users found</h2>
                        <p>Try searching with another name or email.</p>
                    </div>
                `;

        return;
    }


    users.forEach(user => {

        const inactive =
            user.status.toLowerCase() === "inactive";


        usersContainer.innerHTML += `

    <article class="user-card">

        <div class="card-top">

            <div class="avatar">
                ${getInitials(user.name)}
            </div>

            <span class="user-id">
                #${user._id}
            </span>

        </div>


        <h2 class="user-name">
            ${user.name}
        </h2>

        <p class="username">
            @${user.username}
        </p>


        <div class="info">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <rect
                    width="20"
                    height="16"
                    x="2"
                    y="4"
                    rx="2"
                />
                <path
                    d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
                />
            </svg>

            <span>
                ${user.email}
            </span>

        </div>


        <div class="info">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"
                />
                <circle
                    cx="12"
                    cy="10"
                    r="3"
                />
            </svg>

            <span>
                ${user.address.city}
            </span>

        </div>


        <div class="divider"></div>


        <div class="card-bottom">

            <span class="role">
                ${user.role}
            </span>


            <span class="status ${inactive ? " inactive" : ""}">

            <span class="status-dot"></span>

            ${user.status}

        </span>

    </div>

</article>

`;

    });

}

/* Search */

searchInput.addEventListener("input", async () => {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const Data = await response

    const filteredUsers =
        Data.data.filter(user => {

            return (
                user.name.toLowerCase().includes(search) ||
                user.username.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search) ||
                user.role.toLowerCase().includes(search) ||
                user.address.city.toLowerCase().includes(search)
            );

        });
    console.log(filteredUsers)

    displayUsers(filteredUsers);

});


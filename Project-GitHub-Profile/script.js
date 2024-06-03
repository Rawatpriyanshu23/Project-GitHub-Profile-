const url = "https://api.github.com/users";
const searchInputEl = document.getElementById("searchInput");
const searchButtonEl = document.getElementById("searchBtn");
const profileContainerEl = document.getElementById("profileContainer");
const loadingEl = document.getElementById("loading");


const generateProfile = (profile) => {
    return `
        <div class="profile-box">
            <div class="top-section">
                <div class="left">
                    <div class="avtaar">
                        <img alt="avtaar" src="${profile.avatar_url}" />
                    </div>
                    <div class="self">
                        <h1> ${profile.name} </h1>
                        <h1> ${profile.login} </h1>
                    </div>
                </div>
                <a href="${profile.repos_url}">
                <button class="primary-btn"> Check Profile </button>
                </a>
            </div>

            <div class="about">
                <h1> About </h1>
                <p> 
                ${profile.bio} 
                </p>
            </div>
            <div class="status">
                <div class="status-item">
                    <h3> Followers </h3>
                    <p> ${profile.followers}</p>
                </div>
                <div class="status-item">
                    <h3> Following </h3>
                    <p> ${profile.following}</p>
                </div>
                <div class="status-item">
                    <h3> Repositories </h3>
                    <p> ${profile.repositories}</p>
                </div>
            </div>
        </div>
        `;
};


const fetchProfile = async () => {
    const username = searchInputEl.value;

    loadingEl.innerText = "loading....";
    loadingEl.style.color = "black";
    
    
    try {
        const res  = await fetch(`${url}/${username}`);
        const data = await res.json();
        if (data.bio) {
            loadingEl.innerText = "";
            profileContainerEl.innerHTML = generateProfile(data);
        }else {
            loadingEl.innerHTML = data.message;
            loadingEl.style.color = "red";
            profileContainerEl.innerText = "";
        }

        console.log("data", data);
    }catch (error) {
        console.log({error});
        loadingEl.innerText = "";
    }
};

searchButtonEl.addEventListener("click", fetchProfile);

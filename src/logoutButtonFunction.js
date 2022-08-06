function logoutButton (loggedInUser) {
    if (loggedInUser) {
        let logout = document.getElementById('logout');
        logout.style.opacity = 1;
        logout.addEventListener("click", () => {
            sessionStorage.clear();
        })
    }
}

module.exports = {
    logoutButton
}
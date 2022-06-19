const baseUrl = "https://trybeapp.herokuapp.com"

const paths = {
    login: "auth/login/",
    register: "auth/register/",
    currentUser: "auth/users/me/",
    logout: "auth/logout/",
    invitedUsers: "auth/invites",
    wallet: "wallet",
    deposit: "deposit/",
    withdraw: "withdraw/",
    history: "wallet/history",
    balance: "balance/",
    profileUpdate: "auth/profile_update/",
    passwordUpdate: "auth/password/change/",
    session: "bet/1234/session",
    createBet: "bet"
}

export {baseUrl, paths}
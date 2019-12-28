class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        console.log("login");
        sessionStorage.setItem('authenticatedUser', username);
    }

    logout() {
        console.log('logout1');
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser');
        return user ? true : false;
    }
}
export default new AuthenticationService();
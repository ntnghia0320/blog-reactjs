export default function currentUser(){
    const userFromLocalStorage = localStorage.getItem('user');
    const currentUser: UserInfo =  userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};
    return currentUser;
}
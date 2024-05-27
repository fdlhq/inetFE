export default function haveToken(navigate) {
    if(!localStorage.getItem('session')) navigate('/login')
}
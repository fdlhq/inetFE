import { Link, Outlet } from "react-router-dom";

function RootLayout () {

    return(
        <>
            <Link to="/"></Link> 
            <Link to="/login"></Link>
            <Outlet/>
        </>
    )
}

export default RootLayout
import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
export default function UserProtectedRoute({Component}) {
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/check-user-logged-in").then((response) => {
            if (response.data === "failed") {
                navigate("/user-login");
            }

        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <Component/>


    )
}
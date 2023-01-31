import {useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function OrganiserProtectedRoute({Component}) {
    let navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:4000/check-organiser-logged-in").then((response) => {
            if (response.data === "failed") {
                navigate("/organiser/organiser-login");
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <Component/>
    )
}
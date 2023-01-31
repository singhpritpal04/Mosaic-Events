import {useNavigate} from "react-router-dom";
import {useEffect,useState,createContext} from "react";
import axios from "axios";

export let  AdminContext = createContext(null);
const Protected = ({Component}) => {


    let navigate = useNavigate();
    let [session,setsession]=useState({});
    useEffect(() => {
        axios.get('http://localhost:4000/check-admin-logged-in').then(res => {
            if (res.data === "failed") {
                navigate('/admin/admin-login');
            } else {
                setsession(()=> res.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);


    return (
        <AdminContext.Provider value={session}>
        <Component/>
        </AdminContext.Provider>
    );
}
export default Protected;

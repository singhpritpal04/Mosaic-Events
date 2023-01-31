import {useContext} from "react";
import {AdminContext} from "./Protected";
import {useNavigate} from "react-router-dom";

export default function Adminprotectedsession({Component}) {
    const adsession = useContext(AdminContext);
    let navigate = useNavigate();
    if (adsession.type === 'co-admin') {
        navigate('/admin');
    }
    return (
        <>
            <Component/>
        </>
    )

}

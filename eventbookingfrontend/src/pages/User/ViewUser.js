import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage} from "@hookform/error-message";

export default function ViewUser() {
    let [user_email, setuseremail] = useState("");
    let [user_mobile, setusermobile] = useState("");
    let [user_name, setusername] = useState("");
    let [user_address, setuseraddress] = useState("");
    let [user_id, setuserid] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:4000/get-user-details").then((response) => {
            response.data.map((value, index) => {
                let {user_id, user_email, user_mobile, user_name, user_address} = value;
                setuserid(user_id);
                setuseremail(user_email);
                setusermobile(user_mobile);
                setusername(user_name);
                setuseraddress(user_address);
            })
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    return (
        <>
            <div id={"login-bg"} className="bg-imgs" style={{
                backgroundImage: `url(${require('../../images/3.jpg')})`,width:"100%",backgroundSize:"cover"
            }}>

            <div className="container rounded  mt-5 ">

                <div className="row  customcontainer">
                    <div className="col-md-4 border-right">
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                           <span
                               className="font-weight-bold">{user_name}</span><span
                            className="text-black-50">{user_email}</span><span>{user_mobile}</span></div>
                    </div>

                    <div className="col-md-8">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div className="d-flex flex-row align-items-center back"><i
                                    className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                    {/*<h6>Back to home</h6>*/}
                                </div>
                                <h2 className="text-right customstyle"> Profile</h2>
                            </div>

                            <form>

                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <label className="form-control style-input-profile"> {user_email} </label>
                                    </div>


                                    <div className="col-md-6"><label
                                        className="form-control style-input-profile"> {user_mobile} </label>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6"><label
                                        className="form-control style-input-profile"> {user_name} </label>
                                    </div>
                                    <div className="col-md-6"><label
                                        className="form-control style-input-profile"> {user_address} </label>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6 customstyle"></div>

                                </div>

                            </form>


                            <div className="mt-5 text-right">
                                <button className="btn btn-primary profile-button" type="button" onClick={() => {
                                    navigate(`/user-profile/${user_id}`)
                                }}>Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>


        </>)
}
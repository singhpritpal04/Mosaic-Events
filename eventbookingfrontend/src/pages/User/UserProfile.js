import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {ErrorMessage} from "@hookform/error-message";

export default function UserProfile() {
    let navigate = useNavigate();
    let {user_id} = useParams();
    let [user_email, setuseremail] = useState("");
    let [user_mobile, setusermobile] = useState("");
    let [user_name, setusername] = useState("");
    let {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    useEffect(() => {
        axios.get(`http://localhost:4000/update-user-profile${user_id}`).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error!!', 'Some error occured in fetching user details!!', 'error');
            } else {
                response.data.map((value, index) => {
                    let {user_id, user_email, password, user_mobile, user_name, user_address} = value;
                    setValue("user_id", user_id);
                    setValue("user_email", user_email);
                    setValue("password", password);
                    setValue("user_mobile", user_mobile);
                    setValue("user_name", user_name);
                    setValue("user_address", user_address);
                    setuseremail(user_email);
                    setusermobile(user_mobile);
                    setusername(user_name);


                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function onSubmit(data) {
        axios.post(`http://localhost:4000/update-user-details${user_id}`, data).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error', 'Some technical error occured!!', 'error');
                navigate("/view-user");
            } else if (response.data === "success") {
                Swal.fire('Updated', 'Details have been updated successfully!!', 'success');
                navigate("/view-user");
            } else {
                Swal.fire('Error', 'Some error occured!!', 'error');
                navigate("/view-user");
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    return (

        <>
            <div className="container rounded bg-white mt-5 ">
                <div className="row customcontainer">
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
                                    <h6>Back to home</h6>
                                </div>
                                <h2 className="text-right customstyle">Edit Profile</h2>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <input disabled {...register('user_email', {
                                            required: "You must specify email",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Enter valid email"
                                            }
                                        })} type="text"
                                               className="form-control style-input-profile" placeholder="Enter Email"/>

                                        <ErrorMessage name="user_email" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>
                                    </div>

                                    <div className="col-md-6"><input {...register('user_mobile', {
                                        required: "You must specify mobile number",
                                        pattern: {
                                            value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                            message: "Enter  mobile number"
                                        }
                                    })}
                                                                     type="text"
                                                                     className="form-control style-input-profile"
                                                                     placeholder="Enter mobile no"/>

                                        <ErrorMessage name="user_mobile" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <input {...register('user_name', {required: "You must specify name"})}
                                               type="text"
                                               className="form-control style-input-profile"
                                               placeholder="Enter fullname"/>

                                        <ErrorMessage name="user_name" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>
                                    </div>
                                    <div className="col-md-6">
                                        <input {...register('user_address', {required: "You must specify name"})}
                                               type="text"
                                               className="form-control style-input-profile"
                                               placeholder="Enter address"/>

                                        <ErrorMessage name="user_address" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>
                                    </div>
                                </div>
                                <div className="mt-5 text-center">
                                    <button type="submit" className="btn btn-primary profile-button">Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
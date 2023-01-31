import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


import {ErrorMessage} from "@hookform/error-message";

export default function UserChangePassword(){

    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();
    let navigate = useNavigate();

    function onSubmit(data) {

        axios.post("http://localhost:4000/change-user-password", data).then((response) => {
            if (response.data === "wrongpassword") {
                Swal.fire({icon: "error", title: "Invalid old Password"});
            } else if (response.data === "failure") {
                Swal.fire({icon: "error", title: "Some error occured at backend!!"});
                reset();
            } else if (response.data === "success") {
                Swal.fire({icon: "success", title: "Password Changed Successfully"});
                navigate("/user");
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <>

            <div className="container rounded bg-white mt-5 ">

                <div className="row customchngpass">
                    <div className="col-md-12">
                        <div className="p-3 py-5 col-md-6 offset-md-3 style-input-profile">
                            <div className="mb-4">
                                <h2 className="text-center customstyle">Change Password</h2>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="row mt-3">
                                    <div className="form-group contact-forms">
                                        <input {...register('oldpassword', {
                                            required: "You must specify old password",
                                        })} type="password"
                                               className="form-control style-input-profile" placeholder="Old Password"/>
                                    </div>
                                    <ErrorMessage name="oldpassword" errors={errors}
                                                  render={({message}) => <p className="text-danger">{message}</p>}/>


                                    <div className="form-group contact-forms mt-3">
                                        <input {...register('newpassword', {
                                            required: "You must specify a password",
                                            minLength: {
                                                value: 8,
                                                message: "Password must have at least 8 characters"
                                            },
                                            maxLength: {
                                                value: 12,
                                                message: "Please enter less than 13 characters"
                                            }
                                        })} type="password"
                                               className="form-control style-input-profile" placeholder="New Password"/>
                                    </div>
                                    <ErrorMessage name="newpassword" errors={errors}
                                                  render={({message}) => <p className="text-danger">{message}</p>}/>
                                </div>
                                <div className="row mt-3">
                                    <div className="form-group contact-forms">
                                        <input
                                            type="password" {...register('confirmnewpassword', {
                                            required: "You must confirm the password",
                                            validate: (value) => {
                                                const {newpassword} = getValues();
                                                return newpassword === value || "Passwords should match!";
                                            }
                                        })}
                                            className="form-control style-input-profile" placeholder="Confirm new password"/>
                                    </div>
                                    <ErrorMessage name="confirmnewpassword" errors={errors}
                                                  render={({message}) => <p className="text-danger">{message}</p>}/>
                                    {/*<div className="col-md-6"><label*/}
                                    {/*    className="form-control style-input-profile"> {user_address} </label>*/}
                                    {/*</div>*/}
                                </div>

                                <div className="mt-3 text-center">
                                    <button className="btn btn-primary profile-button" type="submit">Change Password
                                    </button>
                                </div>
                            </form>



                        </div>
                    </div>
                </div>
            </div>


        </>)
}
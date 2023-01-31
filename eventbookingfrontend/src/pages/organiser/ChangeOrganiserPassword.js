import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function ChangeOrganiserPassword() {
    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();
    let navigate = useNavigate();

    function onSubmit(data) {

        axios.post("http://localhost:4000/changeorganiserpassword", data).then((response) => {
            if (response.data === "wrongpassword") {
                Swal.fire({icon: "error", title: "Invalid old Password"});
            } else if (response.data === "failure") {
                Swal.fire({icon: "error", title: "Some error occured at backend!!"});
                reset();
            } else if (response.data === "success") {
                Swal.fire({icon: "success", title: "Password Changed Successfully"});
                navigate("/organiser");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <div className="img js-fullheight" style={{
                backgroundImage: `url(${require('../../images/p1.jpg')})`,
                backgroundSize: "cover",
                height: "100vh"
            }}>
            <section className="contact py-5 bg-img ">
                <div>

                    <div className={"pt-5"} style={{
                        borderRadius:"30px",
                        backgroundColor: "rgba(229,222,222,0.5)",
                        height: "80vh",
                        margin: "auto",
                        width: "70%"
                    }}>
                        <div className="text-center mb-4 mt-3">
                            <h1 style={{color:"white",fontWeight:"bolder",fontFamily:"monospace"}}>CHANGE PASSWORD</h1>

                        </div>
                    <div className="col-lg-6 col-md-6 offset-lg-3 offset-md-3 contact-left-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group contact-forms">
                                <input {...register('oldpassword', {
                                    required: "You must specify old password",
                                })} type="password"
                                       className="form-control" placeholder="Old Password" style={{borderRadius: "10px", backgroundColor: "whitesmoke",padding:"12px"}}/>
                            </div>
                            <ErrorMessage name="oldpassword" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>

                            <div className="form-group contact-forms">
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
                                       className="form-control" placeholder="New Password" style={{borderRadius: "10px", backgroundColor: "whitesmoke",padding:"12px"}}/>
                            </div>
                            <ErrorMessage name="newpassword" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <div className="form-group contact-forms">
                                <input
                                    type="password" {...register('confirmnewpassword', {
                                    required: "You must confirm the password",
                                    validate: (value) => {
                                        const {newpassword} = getValues();
                                        return newpassword === value || "Passwords should match!";
                                    }
                                })}
                                    className="form-control" placeholder="Confirm new password" style={{borderRadius: "10px", backgroundColor: "whitesmoke",padding:"12px"}}/>
                            </div>
                            <ErrorMessage name="confirmnewpassword" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>
                            <button className="btn btn-block mt-3 sent-butnn " style={{backgroundColor:"#343a40",color:"violet",borderRadius:"10px"}}>Update Password</button>
                        </form>
                    </div>
                        </div>
                </div>
            </section>
                </div>
        </>
    )
}
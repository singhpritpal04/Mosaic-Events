import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {NavLink} from "react-router-dom";

export default function AddAdmin() {
    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:4000/add-user", data).then((response) => {
            console.log(response.data);
            if (response.data === "success") {
                reset();
                Swal.fire(
                    'Details Added!',
                    'New admin/co-admin has been added successfully',
                    'success'
                )

            } else if (response.data === "exists") {
                Swal.fire(
                    'Error',
                    'Username or email already exists!!',
                    'error'
                )
            } else {
                Swal.fire(
                    'Error',
                    'Details cannot be added. Please try again after sometime!',
                    'error'
                )
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>

            <div id={"login-bg"} className="bg-imgs container-fluid" style={{
                backgroundImage: `url(${require('../../images/1.jpg')})`,
            }}></div>
            <section className="custom-font">
                <div className="login_box opa-1" style={{marginTop: "16vh",backgroundColor:"black"}}>
                    <div className="col-lg-12">
                        <h3 className={"text-center mb-5 mt-2 text-light"}>SIGN UP</h3>
                        <form onSubmit={handleSubmit(onSubmit)}className={"row"}>
                            <div className="col-lg-6 col-md-6  mb-4">
                                <input {...register('user_email', {
                                    required: "You must specify email",
                                    pattern: {
                                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                        message: "Enter valid email"
                                    }
                                })} type="text"
                                       className="form-control style-input" placeholder="Enter Email"/>

                                <ErrorMessage name="user_email" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                            </div>
                            <div className={"col-lg-6 col-md-6 mb-4"}>
                                <input {...register('password', {
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
                                       className="form-control style-input" placeholder="Enter Password"/>

                                <ErrorMessage name="password" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                            </div>
                            <div className={"col-lg-6 col-md-6 mb-4"}>
                                <input
                                    type="password" {...register('confirmpassword', {
                                    required: "You must confirm the password",
                                    validate: (value) => {
                                        const {password} = getValues();
                                        return password === value || "Passwords should match!";
                                    }
                                })}
                                    className="form-control style-input" placeholder="Confirm password"/>

                                <ErrorMessage name="confirmpassword" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                            </div>
                            <div className={"col-lg-6 col-md-6 mb-4"}>
                                <input {...register('user_mobile', {
                                    required: "You must specify mobile number",
                                    pattern: {
                                        value: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/,
                                        message: "Enter  mobile number"
                                    }
                                })}
                                       type="text"
                                       className="form-control style-input" placeholder="Enter mobile no"/>

                                <ErrorMessage name="user_mobile" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                            </div>
                            <div className={"col-lg-6 col-md-6 mb-4"}>
                                <input {...register('user_name', {required: "You must specify name"})} type="text"
                                       className="form-control style-input" placeholder="Enter fullname"/>

                                <ErrorMessage name="user_name" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                            </div>
                            <div className={"col-lg-6 col-md-6 mb-4"}>
                                <input {...register('user_address', {required: "You must specify name"})} type="text"
                                       className="form-control style-input" placeholder="Enter Address"/>

                                <ErrorMessage name="user_address" errors={errors}
                                              render={({message}) => <p className="text-danger">{message}</p>}/>
                            </div>
                            <button className="submit col-lg-4 offset-lg-4">SIGN UP</button>
                        </form>
                        <div className="top_link text-center mt-3"><NavLink className={"text-light"} to={"/user-login"}>Already a member?
                            Sign In</NavLink>
                        </div>
                    </div>
                </div>
                {/*<div className="right">*/}
                {/*    <div className="right-text">*/}
                {/*        <h2>Party Planners</h2>*/}

                {/*    </div>*/}
                {/*    <div className="right-inductor">*/}
                {/*    </div>*/}
                {/*</div>*/}

            </section>
        </>
    )
}
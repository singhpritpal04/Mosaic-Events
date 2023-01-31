import {useForm} from "react-hook-form";
import {NavLink, useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect} from "react";


export default function AdminLogin() {
    let navigate = useNavigate();
    let {register, handleSubmit, formState: {errors}, reset} = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:4000/user-details", data).then((response) => {
            if (response.data === "failure") {
                Swal.fire('Incorrect Details', 'Invalid username or password!!', 'error');
            }
            if (response.data === "success login") {
                navigate("/");
            } else if (response.data === "error") {
                Swal.fire('Technical error', 'Please try again after sometime!!', 'error');
            }
        })
    }

    useEffect(() => {
        axios.get('http://localhost:4000/check-user-logged-in').then(res => {
            if (res.data === "success") {
                Swal.fire({icon: "warning", title: "You have already logged in "});
                navigate("/");

            }
        }).catch((error) => {
            console.log(error)
        });
    }, []);


    return (
        <>
            <div id={"login-bg"} className="bg-imgs container-fluid" style={{
                backgroundImage: `url(${require('../../images/1.jpg')})`,
            }}></div>
            <section className="custom-font">
                <div className="login_box opa-1"style={{marginTop:"16vh"}}>
                    <div className="left">

                        <div className="contact">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3 className={"text-light mt-5"}>SIGN IN</h3>
                                <input {...register('user_email', {required: "This field is required"})}
                                       type="text"
                                       className="form-control style-input" style={{marginTop:"50px"}} placeholder="Enter email "/>

                                <ErrorMessage name="user_email" errors={errors}
                                              render={({message}) => <p
                                                  className="text-danger">{message}</p>}/>

                                <input {...register('password', {required: "You must enter the password!"})}
                                       type="password" className="form-control style-input mb-3 mt-3"
                                       placeholder="Password"/>
                                <ErrorMessage name={"password"} errors={errors}
                                              render={({message}) => <p
                                                  className={"text-danger"}>{message}</p>}/>
                                <button className="submit">LOGIN</button>
                            </form>

                        </div>
                        <div className="top_link text-center text-light mt-4">Not a user? <NavLink className={"text-light"} to={"/user-signup"}>
                            Sign Up</NavLink></div>
                    </div>
                    <div className="right">
                        <div className="right-text">
                            <h2>Party Planners</h2>

                        </div>
                        <div className="right-inductor">
                          </div>
                    </div>
                </div>

            </section>
            {/*<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"*/}
            {/*      integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"*/}
            {/*      crossOrigin="anonymous">*/}


        </>

    )
}
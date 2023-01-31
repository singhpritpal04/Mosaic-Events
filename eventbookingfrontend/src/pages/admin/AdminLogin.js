import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useEffect} from "react";

export default function AdminLogin() {
    let navigate = useNavigate();
    let {register, handleSubmit, formState: {errors}, reset} = useForm();

    function onSubmit(data) {
        axios.post("http://localhost:4000/check-details", data).then((response) => {
            if (response.data === "failure") {
                Swal.fire('Incorrect Details', 'Invalid username or password!!', 'error');
            }
            if (response.data === "success login") {
                navigate("/admin");
            } else if (response.data === "error") {
                Swal.fire('Technical error', 'Please try again after sometime!!', 'error');
            }
        })
    }

    useEffect(() => {
        axios.get('http://localhost:4000/check-admin-logged-in').then(res => {
            console.log(res.data);
            if (res.data === "success") {
                Swal.fire({icon: "warning", title: "You have already logged in "});
                navigate("/admin");

            }
        }).catch((error) => {
            console.log(error)
        });
    }, []);


    return (
        <>
            <div className="img js-fullheight" style={{
                backgroundImage: `url(${require('../../images/party5.jpg')})`,
                backgroundSize: "cover",
                height: "100vh"
            }}>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center mb-4">
                                <h1 className="heading-section mt-5" style={{color: "white"}}>LOGIN</h1>
                            </div>
                        </div>
                        <div className="row justify-content-center align-content-center"
                             style={{backgroundColor: "rgba(0,0,0,0.8)", height: "60vh"}}>
                            <div className="col-md-6 col-lg-4">
                                <h2 className="mb-4 text-center" style={{color: "white"}}>Have an account?</h2>
                                <div className="login-wrap p-0">

                                    <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                                        <div className="form-group">
                                            <input {...register('name_email', {required: "This field is required"})}
                                                   type="text"
                                                   className="form-control" placeholder="Enter email or username"
                                                   style={{borderRadius: "10px"}}/>
                                        </div>
                                        <ErrorMessage name="name_email" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>
                                        <div className="form-group">
                                            <input {...register('login_pass', {required: "You must enter the password!"})}
                                                   type="password" className="form-control"
                                                   placeholder="Password" style={{borderRadius: "10px"}}/>
                                        </div>
                                        <ErrorMessage name={"login_pass"} errors={errors}
                                                      render={({message}) => <p
                                                          className={"text-danger"}>{message}</p>}/>
                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary submit px-3">Sign
                                                In
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";


export default function OrganiserSignUp() {
    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();
    let navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:4000/join-owner", data).then((response) => {
            console.log(response.data);
            if (response.data === "success") {
                reset();
                Swal.fire(
                    'Details Added!',
                    ' Added successfully !!!!',
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
            <div className="img js-fullheight" style={{
                backgroundImage: `url(${require('../../images/party5.jpg')})`,
                backgroundSize: "cover",
                height: "100vh"
            }}>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center mb-5">
                                <h2 className="heading-section"></h2>
                            </div>
                        </div>
                        <div className="row justify-content-center" style={{backgroundColor: "rgba(0,0,0,0.8)", height: "70vh",borderRadius:"20px"}}>
                            <div className="col-md-6 col-lg-4">
                                <div className="login-wrap p-0">
                                    <h1 className="mb-4 text-center" style={{color:"white"}}>SIGN UP</h1>
                                    <form onSubmit={handleSubmit(onSubmit)} className="signin-form">
                                        <div className="form-group">
                                            <input {...register('contact_email', {required: "This field is required"})} type="text"
                                                   className="form-control" placeholder="Enter email " style={{borderRadius: "10px"}}/>
                                        </div>
                                        <ErrorMessage name="contact_email" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>
                                        <div className="form-group">
                                            <input {...register('password', {required: "You must enter the password!"})}
                                                   type="password" className="form-control"
                                                   placeholder="Password" style={{borderRadius: "10px"}}/>
                                        </div>
                                        <ErrorMessage name={"password"} errors={errors}
                                                      render={({message}) => <p className={"text-danger"}>{message}</p>}/>

                                        <div className="form-group">
                                            <input {...register('owner_name', {required: "This field is required"})} type="text"
                                                   className="form-control" placeholder="Enter name " style={{borderRadius: "10px"}}/>
                                        </div>
                                        <ErrorMessage name="owner_name" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>

                                        <div className="form-group">
                                            <input {...register('contact_no', {required: "This field is required"})} type="number"
                                                   className="form-control" placeholder="Enter contact number "style={{borderRadius: "10px"}}/>
                                        </div>
                                        <ErrorMessage name="contact_no" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary submit px-3">Sign
                                                up
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
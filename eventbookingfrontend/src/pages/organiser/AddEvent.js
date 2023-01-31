import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";


export default function AddEvent() {
    let {register, handleSubmit, formState: {errors}, getValues, reset} = useForm();
    let navigate = useNavigate();

    function onSubmit(data) {
        let {
            name, location, owner_email, contact_no, photo, price, category_name
        } = data;
        let formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("owner_email", owner_email);
        formData.append("contact_no", contact_no);
        formData.append("photo", photo[0]);
        formData.append("price", price);
        formData.append("category_name", category_name);

        axios.post("http://localhost:4000/add-event", formData).then((response) => {
            console.log(response.data);
            if (response.data === "success") {
                reset();
                Swal.fire(
                    'Details Added!',
                    'added successfully',
                    'success'
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
                backgroundImage: `url(${require('../../images/p1.jpg')})`,
                backgroundSize: "cover",
                height: "135vh"
            }}>
                <section className="ftco-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6 text-center mb-5">
                                <h2 className="heading-section"></h2>
                            </div>
                        </div>

                        <div className="row justify-content-center" style={{fontFamily: "cursive"}}>
                            <div className="col-md-6 col-lg-4">
                                <div className="login-wrap p-0">
                                    <h1 className="mb-4 text-center mt-4" style={{color:"white",fontWeight:"bolder",fontFamily:"monospace"}}>ADD EVENT</h1>
                                    <form onSubmit={handleSubmit(onSubmit)} className="signin-form">

                                        <div className="form-group">
                                            <input {...register('name', {required: "This field is require"})}
                                                   type="text" className="form-control"
                                                   placeholder="Enter Name " style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name={"name"} errors={errors}
                                                      render={({message}) => <p
                                                          className={"text-danger"}>{message}</p>}/>

                                        <div className="form-group">
                                            <input {...register('location', {required: "This field is required"})}
                                                   type="text"
                                                   className="form-control" placeholder="Enter location " style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="location" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>

                                        <div className="form-group">
                                            <input {...register('owner_email', {required: "This field is required"})}
                                                   type="text"
                                                   className="form-control" placeholder="Enter owner's email " style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="owner_email" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <input {...register('contact_no', {required: "This field is required"})}
                                                   type="number"
                                                   className="form-control" placeholder="Enter contact number "style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="contact_no" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <input {...register('photo', {required: "This field is required"})}
                                                   type="file"
                                                   className="form-control" placeholder="Choose a picture "style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="photo" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <input {...register('price', {required: "This field is required"})}
                                                   type="number"
                                                   className="form-control" placeholder="Enter price "style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="price" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>

                                        <div className="form-group">
                                            <select {...register('category_name', {required: "This field is required"})}
                                                    type="text"
                                                    className="form-control"style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}>
                                                <option className={"form-control"} defaultChecked value="Marriage">Marriage</option>
                                                <option className={"form-control"} value="Engagement">Engagement</option>
                                                <option className={"form-control"} value="Baby Shower">Baby Shower</option>
                                                <option className={"form-control"} value="Bachelorette">Bachelorette</option>
                                                <option className={"form-control"} value="Music Concert">Music Concert</option>
                                                <option className={"form-control"} value="Anniversary Party">Anniversary Party</option>
                                                <option className={"form-control"} value="Bangles Ceremony">Bangles Ceremony</option>
                                                <option className={"form-control"} value="New Year Party">New Year Party</option>
                                                <option className={"form-control"} value="House Warming Party">House Warming Party</option>
                                                <option className={"form-control"} value="Haldi Ceremony">Haldi Ceremony</option>
                                                <option className={"form-control"} value="Halloween Party">Halloween Party</option>
                                                <option className={"form-control"} value="Dhol Night">Dhol Night</option>
                                                <option className={"form-control"} value="Birthday Party">Birthday Party</option>
                                                <option className={"form-control"} value="Christmas Party">Christmas Party</option>
                                            </select>
                                        </div>
                                        <ErrorMessage name="category_name" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group ">
                                            <button type="submit"
                                                    className="form-control btn btn-primary submit px-3 "style={{backgroundColor:"#343a40"}}>Add Event
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
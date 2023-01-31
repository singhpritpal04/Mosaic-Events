import Swal from "sweetalert2";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function EditAdmin() {
    let navigate = useNavigate();
    let {event_id} = useParams();
    let [eventid,seteventid]= useState(null);
    let {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    useEffect(() => {
        reset();
        axios.get(`http://localhost:4000/get-data-by-event_id${event_id}`).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error!!', 'Some error occured in fetching user details!!', 'error');
            } else {
                response.data.map((value, index) => {
                    let {
                        category_name, contact_no, event_id, location, name, owner_email, photo, price, status} = value;

                    seteventid(event_id);
                    setValue("contact_no", contact_no);
                    setValue("category_name", category_name);
                    setValue("location", location);
                    setValue("name", name);
                    setValue("owner_email", owner_email);
                    setValue("photo", photo);
                    setValue("price", price);



                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function onSubmit(data) {
        let {
            category_name, contact_no, event_id, location, name, owner_email, photo, price, status
        } = data;
        console.log(data);
        let formData = new FormData();
        formData.append("category_name", category_name);
        formData.append("contact_no", contact_no);
        formData.append("location", location);
        formData.append("name", name);
        formData.append("owner_email",owner_email);
        formData.append("photo", photo[0]);
        formData.append("price", price);
        formData.append("event_id", eventid);


        axios.post("http://localhost:4000/update-event-details", formData).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error', 'Some technical error occured!!', 'error');
                navigate("/organiser/view-event");
            } else if (response.data === "success") {
                Swal.fire('Updated', 'Details have been updated successfully!!', 'success');
                navigate("/organiser/view-event");
            } else {
                Swal.fire('Error', 'Some error occured!!', 'error');
                navigate("/organiser/view-event");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <div className="img js-fullheight" style={{
                backgroundImage: `url(${require('../../images/p1.jpg')})`,
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
                        <div className="row justify-content-center" style={{fontFamily: "cursive"}}>
                            <div className="col-md-6 col-lg-4">
                                <div className="login-wrap p-0">
                                    <h1 className="mb-4 text-center" style={{fontFamily: "cursive",color:"white"}}>ADD EVENT</h1>
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
                                                   className="form-control" placeholder="Enter owner's email "style={{borderRadius: "10px", backgroundColor: "whitesmoke"}} />
                                        </div>
                                        <ErrorMessage name="owner_email" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <input {...register('contact_no', {required: "This field is required"})}
                                                   type="number"
                                                   className="form-control" placeholder="Enter contact number " style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="contact_no" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <input {...register('photo', {required: "This field is required"})}
                                                   type="file"
                                                   className="form-control" placeholder="Choose a picture " style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="photo" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <input {...register('price', {required: "This field is required"})}
                                                   type="number"
                                                   className="form-control" placeholder="Enter price " style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="price" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>

                                        <div className="form-group">
                                            <input {...register('category_name', {required: "This field is required"})}
                                                   type="text"
                                                   className="form-control" placeholder="Enter the events's category " style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}/>
                                        </div>
                                        <ErrorMessage name="category_name" errors={errors}
                                                      render={({message}) => <p className="text-danger">{message}</p>}/>


                                        <div className="form-group">
                                            <button type="submit"
                                                    className="form-control btn btn-primary submit px-3" style={{backgroundColor:"#343a40"}}>Add Event
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
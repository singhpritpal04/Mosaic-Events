import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

export default function EditAdmin() {
    let navigate = useNavigate();
    let {username} = useParams();
    let {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    useEffect(() => {
        axios.get(`http://localhost:4000/get-data-by-username${username}`).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error!!', 'Some error occured in fetching user details!!', 'error');
            } else {
                response.data.map((value, index) => {
                    let {status, type, username} = value;
                    setValue("uname", username);
                    setValue("type", type);
                    setValue("updatestatus", status);
                })
            }
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function onSubmit(data) {
        axios.post("http://localhost:4000/update-admin-details", data).then((response) => {
            if (response.data === "error") {
                Swal.fire('Error', 'Some technical error occured!!', 'error');
                navigate("/admin/view-admin");
            } else if (response.data === "success") {
                Swal.fire('Updated', 'Details have been updated successfully!!', 'success');
                navigate("/admin/view-admin");
            } else {
                Swal.fire('Error', 'Some error occured!!', 'error');
                navigate("/admin/view-admin");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <section className="contact py-5 bg-img">
                <div>
                    <div className="text-center mb-3">
                        <h3 className={"style-font"}>EDIT ADMIN</h3>
                    </div>
                    <div className={"pt-5"} style={{
                        borderRadius:"30px",
                        backgroundColor: "rgba(229,222,222,0.5)",
                        height: "60vh",
                        margin: "auto",
                        width: "60%"
                    }}>
                    <div className="col-lg-6 col-md-6 offset-lg-3 offset-md-3 contact-left-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group contact-forms">
                                <input {...register('uname')} type="text" disabled
                                       className="form-control" placeholder="Enter Username"  style={{borderRadius: "10px", backgroundColor: "whitesmoke",padding: "11px"}}/>
                            </div>

                            <div className="form-group contact-forms">
                                <select {...register('type', {required: "You must specify admin type"})}
                                        className={"form-control"} name="type"  style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}>
                                    <option className={"form-control"} value="select-type" disabled>-Select type-
                                    </option>
                                    <option className={"form-control"} value="admin">Admin</option>
                                    <option className={"form-control"} value="co-admin">Co-Admin</option>
                                </select>
                            </div>
                            <ErrorMessage name="type" errors={errors}
                                          render={({message}) => <p className="text-danger">{message}</p>}/>

                            <div className="form-group contact-forms">
                                <select {...register('updatestatus')}
                                        className={"form-control"} name="updatestatus"  style={{borderRadius: "10px", backgroundColor: "whitesmoke"}}>
                                    <option className={"form-control"} disabled>-Select Status-
                                    </option>
                                    <option className={"form-control"} value="active">Active</option>
                                    <option className={"form-control"} value="inactive">Inactive</option>
                                </select>
                            </div>
                            <button className="btn btn-block sent-butnn btn-outline-primary" style={{borderRadius:"10px",padding: "11px"}}>Update Details</button>
                            <button className="btn ht-btn btn-danger btn-block danger-butnn btn-outline-danger" style={{borderRadius:"10px"}}
                                    onClick={() => reset()}>Reset Details
                            </button>
                        </form>
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}
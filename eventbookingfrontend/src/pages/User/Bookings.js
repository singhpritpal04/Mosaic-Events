import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export default function UserProfile() {
    let [user_email, setuseremail] = useState("");
    let [user_mobile, setusermobile] = useState("");
    let [user_address, setuseraddress] = useState("");
    let [user_name, setusername] = useState("");
    let [user_id, setuserid] = useState("");
    let [data, setData] = useState([]);
    let navigate = useNavigate();


    function cancelbooking(bill_id) {
        let data = {bill_id};
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post("http://localhost:4000/cancel-booking", data).then((response) => {
                    if (response.data === "success") {
                        window.location.reload();
                    } else {
                        Swal.fire("Technical error!","Please Try after sometime","error")
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        })
    }


    useEffect(() => {
        axios.get("http://localhost:4000/get-bookings").then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <>
            {
                data.map((value, index) => {
                    let {
                        bill_id,
                        user_email,
                        user_name,
                        user_city,
                        grand_total,
                        no_of_people,
                        payment_method,
                        event_date,
                        event_time,
                        category_name,
                        property_name,
                        status
                    } = value;
                    return (
                        <>
                            <div className="container bg-blue emp-profile">
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="profile-head">
                                            <ul className="nav nav-tabs">
                                                <li className="nav-item">
                                                  <a className="nav-link custom-active bg-blue mt-3" style={{textAlign:"center",fontWeight:"bold",color:"darkblue"}}>{index + 1}.BOOKING</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8 offset-md-2">
                                        <div className="tab-content profile-tab" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel"
                                                 aria-labelledby="home-tab">
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>User Name</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{user_name}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{user_email}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Event Category</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{category_name}</p>
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Address</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{property_name}</p>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Number of People</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{no_of_people}</p>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Date</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{new Date(event_date).getDate() + "-" + new Date(event_date).getMonth() + "-" + new Date(event_date).getFullYear()}</p>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Time</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{event_time}</p>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Amount</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{grand_total}</p>
                                                    </div>
                                                </div>

                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Payment Method</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{payment_method}</p>
                                                    </div>
                                                </div>


                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <label>Payment status</label>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p>{status}</p>
                                                    </div>
                                                    {
                                                        status === "Payment Pending" ?
                                                            <>
                                                                <button className="btn btn-success mt-4 offset-md-3 col-md-6">Pay Now</button>
                                                                <button className="btn btn-danger mt-2 offset-md-3 col-md-6 "
                                                                        onClick={() => cancelbooking(bill_id)}>Cancel
                                                                    Booking
                                                                </button>
                                                            </> : <button onClick={() => cancelbooking(bill_id)}
                                                                          className="btn btn-danger mt-4 offset-md-3 col-md-6">Cancel
                                                                Booking</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <br/>


                            <hr/>
                        </>
                    )
                })
            }
        </>
    )
}
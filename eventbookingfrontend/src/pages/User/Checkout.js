import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {useForm} from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useRazorpay from "react-razorpay";
export default function Checkout() {
    const location = useLocation();
    let navigate = useNavigate();
    let total = location.state.total;
    let no_of_people = location.state.no_of_people;
    let date = location.state.date;
    let time = location.state.time;
    let name = location.state.name;
    let owner_email=location.state.owner_email;
    let category_name = location.state.category_name;
    const Razorpay = useRazorpay();

    let { event_id } = useParams();
    let [data, setData] = useState([]);
    
    let options = {
      key: "rzp_test_A3RM3Asww6uWvF",
      currency: "INR",
      amount: 0,
      name: "Event Booking",
      description: "Online Event Booking",
      image:
        "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
      handler: bookOrder,
      prefill: {
        name: "",
        // email: "",
        email: "",
        contact: "",
        // contact: "",
      },
      theme: {
        color: "#F46432",
      },
    };
    let {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();
    useEffect(() => {
        axios.get("http://localhost:4000/get-user-checkout").then((response) => {
            response.data.map((value, index) => {
                let {user_id, user_address, user_email, user_mobile, user_name} = value;
                setValue("user_id", user_id);
                setValue("user_address", user_address);
                setValue("user_email", user_email);
                setValue("user_mobile", user_mobile);
                setValue("user_name", user_name);
                setValue("date", date);
                setValue("time", time);
            })
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    function bookOrder(response) {
      let payment_id = response.razorpay_payment_id;

      if (payment_id !== "") {
        let data = JSON.parse(localStorage.getItem("bookingInfo"));
        console.log(data);

        axios
          .post("http://localhost:4000/add-cart", data)
          .then((response) => {
            if (response.data === "success") {
              Swal.fire("Success", "Details addded Successfully.", "success");
              reset();
            } else {
              Swal.fire(
                "Error",
                "Details cannot be added. Please try again after sometime!",
                "error"
              );
            }
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              icon: "error",
              title: error,
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed. Try again...",
        });
      }
    }

    function OnSubmit(data) {
        let {
            date,
            time,
            payment_method,
            user_city,
            user_address,
            user_email,
            user_id,
            user_mobile,
            user_name,
            user_state
        } = data;
        if (payment_method === "cod") {
            let status = "Payment Pending";
            let finalData = {
                user_city,
                user_state,
                user_email,
                user_name,
                total,
                name,
                owner_email,
                no_of_people,
                date,
                time,
                payment_method,
                category_name,
                status
            };
            axios.post("http://localhost:4000/billing-details", finalData).then((response) => {
                if (response.data === "success") {
                    navigate("/thankyou", {state: {name, user_email}});
                    console.log(response.data)

                } else {
                    console.log(response.data)
                    // Swal.fire("OOPS!!", "Some Error Occured", "error");
                }
            })
        } else {
            localStorage.setItem("bookingInfo", JSON.stringify(data));

            options.amount = total * 100;
            // options.prefill.email = user_email;
            // options.prefill.contact = user_mobile;
            let rzp = new Razorpay(options);
            rzp.open();
        }
    }

    return (
        <>
            <section className="banner_inner" id="home">
                <div className="banner_inner_overlay">
                </div>
            </section>
            <div>
                <div className="py-3">
                    <div className="container">
                        <h1 className="text-light-primary my-2 text-center bg-dark col-6 rounded fw-bold text-light mx-auto mt-5">
                            CHECKOUT
                        </h1>
                    </div>
                </div>
                <div className="py-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 offset-md-1">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 style={{ textAlign:"center"}}>Basic Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit(OnSubmit)}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"} style={{fontWeight:"bold"}} htmlFor="user_id">Id Number</label>
                                                        <input {...register("user_id")} type={"text"} disabled
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"} style={{fontWeight:"bold"}} htmlFor="user_name">User Name</label>
                                                        <input {...register("user_name")} disabled type="text"
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"} style={{fontWeight:"bold"}} htmlFor="user_email">Email</label>
                                                        <input {...register("user_email")} disabled type="email"
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"} style={{fontWeight:"bold"}} htmlFor="user_mobile">Mobile</label>
                                                        <input {...register("user_mobile")} disabled type="text"
                                                               className="form-control"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"} style={{fontWeight:"bold"}} htmlFor="checkin_date">Event Time</label>
                                                        <input disabled {...register("time")} type="time"
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"} style={{fontWeight:"bold"}} htmlFor="checkout_date">Event Date</label>
                                                        <input disabled {...register("date")} type="date"
                                                               className="form-control"/>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"}  style={{fontWeight:"bold"}} htmlFor="user_city">City</label>
                                                        <input {...register("user_city")} type="text"
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group mb-3">
                                                        <label className={"text-dark"} style={{fontWeight:"bold"}} htmlFor="user_state">State</label>
                                                        <input {...register("user_state")} type="text"
                                                               className="form-control"/>
                                                    </div>
                                                </div>
                                                {/*<div className="col-md-12">*/}
                                                {/*    <div className="form-group mb-3">*/}
                                                {/*        <textarea {...register("user_room_needs")}*/}
                                                {/*                  style={{resize: "none"}} rows="2"*/}
                                                {/*                  className="form-control"*/}
                                                {/*                  placeholder="Write Message..."/>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <br/>
                                                <div className="col-md-12 mb-1">
                                                    <b>Payment Methods : </b>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="Cod" className="me-1" style={{fontWeight:"bold"}}>
                                                        Cash On Delivery
                                                    </label>
                                                    <input {...register("payment_method")} type="radio" value="cod"/>
                                                </div>

                                                <div className="col-md-4">
                                                    <label htmlFor="Online" className="me-1" style={{fontWeight:"bold"}}>
                                                        Online Payment
                                                    </label>
                                                    <input {...register("payment_method")} type="radio" value="online"/>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="" style={{fontWeight:"bold"}}></label>
                                                        <button className="btn btn-primary col-12 mt-4">
                                                            Place Order
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10 offset-md-1">
                                <table className="table table-bordered reset_table">
                                    <thead>
                                    <tr>
                                        <th style={{textAlign:"center"}}>Property</th>
                                        <th style={{textAlign:"center"}}>Event</th>
                                        <th style={{textAlign:"center"}}>No of people</th>
                                        <th style={{textAlign:"center"}}>Total</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><h6>{name}</h6></td>
                                        <td style={{textAlign: "center", fontWeight: "bold"}}>{category_name}</td>
                                        <td style={{textAlign: "center"}}>{no_of_people}</td>
                                        <td>Rs.{total}</td>
                                    </tr>
                                    {/*<tr>*/}
                                    {/*    <td colSpan={"2"}><h6>Taxes(in GST 18%):-</h6></td>*/}
                                    {/*    <td style={{textAlign: "center"}}>Rs.{gst}</td>*/}
                                    {/*    <td>Rs.{gst}</td>*/}
                                    {/*</tr>*/}
                                    {/*<tr>*/}
                                    {/*    <td colSpan="2" className="text-end fw-bold">Grand total</td>*/}
                                    {/*    <td colSpan="2" className="text-end fw-bold">Rs.{grandTotal}</td>*/}
                                    {/*</tr>*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
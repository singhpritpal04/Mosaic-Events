import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ErrorMessage } from "@hookform/error-message";
import CheckOut from "./Checkout";

const Cart = () => {
  let navigate = useNavigate();
  let { event_id } = useParams();
  let [data, setData] = useState([]);
  let [propertyname, setName] = useState("");
  let [ownerMail, setOwnermail] = useState("");
  const [total, setTotal] = useState(null);
  let {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm();

  function calculatePrice() {
    let { no_of_people } = getValues();
    data.map((value, index) => {
      let { price } = value;
      no_of_people === 100
        ? setTotal(price)
        : setTotal(price + (no_of_people / 100) * 100000 - 100000);
    });
  }

  function onSubmit(data) {
    let { name, category_name, no_of_people, date, time } = data;
    navigate("/checkout", {
      state: {
        name,
        category_name,
        no_of_people,
        date,
        time,
        total,
        owner_email: ownerMail,
      },
    });
  }
  function getEvent() {
    axios
      .get(`http://localhost:4000/cart${event_id}`)
      .then((response) => {
        setData(response.data);
        response.data.map((value, index) => {
          let { name, price, owner_email } = value;
          setName(name);
          setValue("name", name);
          setTotal(price);
          setOwnermail(owner_email);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // function validateFromBilling() {
  //   axios.post("http://localhost:4000/validation-billing", { propertyname }).then((response) => {
  //       response.data.map((value)=>{
  //         let{event_date}=value;
  //         let edate=new Date(event_date);
  //         console.log(edate);
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  useEffect(() => {
    getEvent();
  }, []);

  // useEffect(() => {
  //    validateFromBilling();
  // }, [propertyname]);
  

  return (
    <>
      <section className="wthree-row w3-contact py-5" id="contact">
        <div className="container py-xl-5 py-lg-3">
          {/*<p className="sub-tittle text-uppercase text-center">Get In Touch</p>*/}
          <h3
            id={"contactus"}
            className="tittle text-center text-uppercase mb-sm-5 mb-4"
          >
            Book
            <span>Now</span>
          </h3>
          <div className="row contact-form py-3">
            <div
              className="col-md-7 wthree-form-left container "
              style={{ backgroundColor: "#dddaec" }}
            >
              <div className="contact-top1 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  action="#"
                  method="get"
                  className="f-color"
                >
                  <div className="form-group mt-4 mb-4">
                    <input
                      {...register("name")}
                      type="text"
                      className="form-control"
                      disabled
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                    />
                  </div>

                  <select
                    {...register("no_of_people", {
                      required: "This field is required",
                    })}
                    onInput={() => {
                      setTimeout(() => {
                        calculatePrice();
                      }, 2000);
                    }}
                    type="text"
                    className="form-control mb-4 "
                    style={{ borderRadius: "10px" }}
                  >
                    {/*<option className={"form-control"} defaultChecked disabled>No of people</option>*/}
                    <option className={"form-control"} value="100">
                      1-100
                    </option>
                    <option className={"form-control"} value="200">
                      100-200
                    </option>
                    <option className={"form-control"} value="300">
                      200-300
                    </option>
                    <option className={"form-control"} value="400">
                      300-400
                    </option>
                    <option className={"form-control"} value="500">
                      400-500
                    </option>
                  </select>

                  <div className="form-group mb-4">
                    <input
                      value={total}
                      type="text"
                      className="form-control"
                      disabled
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      {...register("date", {
                        required: "You must select a date!!",
                        validate: (value) => {
                          let d = new Date();
                          return (
                            new Date(value).toISOString().substr(0, 10) >=
                              d.toISOString().substr(0, 10) ||
                            "It must be greater than current date"
                          );
                        },
                      })}
                      type="date"
                      className="form-control"
                      placeholder="Date"
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                    />
                    <ErrorMessage
                      name="date"
                      errors={errors}
                      render={({ message }) => (
                        <p className="text-danger">{message}</p>
                      )}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <input
                      {...register("time", {
                        required: "You must select time!!",
                      })}
                      type="time"
                      className="form-control"
                      placeholder="Time"
                      style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                      }}
                    />
                    <ErrorMessage
                      name="date"
                      errors={errors}
                      render={({ message }) => (
                        <p className="text-danger">{message}</p>
                      )}
                    />
                  </div>
                  <select
                    {...register("category_name", {
                      required: "This field is required",
                    })}
                    type="text"
                    className="form-control mb-4 "
                    style={{ borderRadius: "10px" }}
                  >
                    <option
                      className={"form-control"}
                      defaultChecked
                      value="Marriage"
                    >
                      Marriage
                    </option>
                    <option className={"form-control"} value="Engagement">
                      Engagement
                    </option>
                    <option className={"form-control"} value="Baby Shower">
                      Baby Shower
                    </option>
                    <option className={"form-control"} value="Bachelorette">
                      Bachelorette
                    </option>
                    <option className={"form-control"} value="Music Concert">
                      Music Concert
                    </option>
                  </select>

                  <button
                    className="btn mt-2"
                    style={{
                      backgroundColor: "blueviolet",
                      borderRadius: "10px",
                    }}
                  >
                    Book now
                  </button>
                </form>
              </div>
            </div>

            {data.map((value, index) => {
              let {
                event_id,
                name,
                location,
                owner_email,
                contact_no,
                photo,
                price,
                category_name,
              } = value;
              return (
                <>
                  <div className="col-md-5" style={{ width: "18rem" }}>
                    <img src={photo} className="card-img-top" alt="..." />
                    <div
                      className="card-body"
                      style={{ backgroundColor: "#dddaec", height: "200px" }}
                    >
                      <h4 className="card-title mt-3 ">{name.toUpperCase()}</h4>
                      <h6 className="card-text mb-2 ">
                        <span style={{ fontWeight: "bolder" }}>Location:</span>{" "}
                        {location}
                      </h6>
                      {/*<h6 className="card-text mb-2"><span style={{fontWeight:"bolder"}}>Event: </span> {category_name}</h6>*/}
                      <h6 className="card-text mb-2 ">
                        <span style={{ fontWeight: "bolder" }}>Price:</span>{" "}
                        {price}
                      </h6>

                      {/*<NavLink to={`Cart/${event_id}`} className="btn "  style={{backgroundColor:"black",color:"white"}}>Book Now</NavLink>*/}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
export default Cart;

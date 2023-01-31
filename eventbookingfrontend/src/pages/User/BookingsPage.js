import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import SearchFilter from "react-filter-search";

export default function BookingsPage() {

    let [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    let {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();


    useEffect(() => {
        axios.get("http://localhost:4000/view-eventson-bookingpage").then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.log(error);

        })
    }, []);

    return (
        <>
            <section className="banner-bottom-w3layouts py-5" id="news">
                <div className="wrap py-xl-5 py-lg-3">
                    <p className="sub-tittle text-uppercase text-center" id={"bookingpage"}>Some More</p>
                    <h1 className="tittle text-center text-uppercase mb-sm-5 mb-4" id={"booknow"} >
                        EVENTS

                    </h1>
                    <br/>
                    <div className="row">
                        <div className="col-9 mx-auto">
                            <input
                                className="form-control"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                type="text"
                                placeholder="Search Events ..."
                            />
                        </div>
                    </div>
                    <div className={"row"}>
                        <SearchFilter
                            value={searchInput}
                            data={data}
                            renderResults={(results) => (
                                <div className="menu-items container-fluid mt-5" id="dishes">
                                    <div className="row">
                                        <div className="col-12 mx-auto">
                                            <div className="row">
                                                {
                                                    results.map((value, index) => {
                                                        let {
                                                            event_id,
                                                            name,
                                                            location,
                                                            owner_email,
                                                            contact_no,
                                                            photo,
                                                            price,
                                                            category_name
                                                        } = value;
                                                        return (
                                                            <>
                                                                <div key={index} className="col-md-4 mt-5"
                                                                     style={{width: "18rem"}}>
                                                                    <img src={photo} className="card-img-top"
                                                                         alt="..." style={{height:"200px"}}/>
                                                                    <div className="card-body"
                                                                         style={{backgroundColor: "floralwhite",height:"250px"}}>
                                                                        <h4 className="card-title">{name.toUpperCase()}</h4>
                                                                        <h6 className="card-text mb-2"><span
                                                                            style={{fontWeight: "bolder"}}>Location:</span> {location}
                                                                        </h6>
                                                                        <h6 className="card-text mb-2"><span
                                                                            style={{fontWeight: "bolder"}}>Event: </span> {category_name}
                                                                        </h6>
                                                                        <h6 className="card-text mb-2"><span
                                                                            style={{fontWeight: "bolder"}}>Price:</span> {price}
                                                                        </h6>


                                                                        <NavLink to={`/Cart/${event_id}`}
                                                                                 className="btn "
                                                                                 style={{
                                                                                     backgroundColor: "black",
                                                                                     color: "white"
                                                                                 }}>Book
                                                                            Now</NavLink>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />

                    </div>
                </div>
            </section>


        </>
    )
}
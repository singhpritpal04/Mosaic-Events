import ReactLoading from "react-loading";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {FaTrashAlt, FaUserEdit} from "react-icons/fa";

export default function ViewPendingEvents() {

    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        let status = {activatestatus: "pending"};
        axios.post("http://localhost:4000/getpendingevents", status).then((response) => {
            setTimeout(() => {
                if (response.data !== "nodata") {
                    setData(response.data);
                    setStat(true);
                } else if (response.data === "nodata") {
                    setData([]);
                    setStat(true);
                }
            }, 3000)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    function activateAccount(event_id) {
        let status = {event_id: event_id, accountstatus: "pending"};
        axios.post("http://localhost:4000/activate-event", status).then((response) => {
            if (response.data === "activated") {
                Swal.fire({icon: "success", title: "Event has been Activated"});
                getData();
            } else if (response.data === "error") {
                Swal.fire({icon: "error", title: "Error occured at backend"});
                getData();
            }
        })
    }

    return (
        <>
            {
                stat ?
                    data.length === 0 ?
                        <div className={"custom-flex container bg-inactive"}><h1
                            className={"custom-flex pt-5 font height-view"}>No Requests
                            Found!!</h1>
                        </div> :
                        <section className="ftco-section">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center mb-5">
                                        <h2 className="style-font">Pending Owner Requests</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap" style={{overflowX: "hidden"}}>
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Contact No</th>
                                                    <th>Category Name</th>
                                                    <th>Event id</th>
                                                    <th>Location</th>
                                                    <th>Name</th>
                                                    <th>Owner Email</th>
                                                    <th>Photo</th>
                                                    <th>Price</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.map((value, index) => {
                                                        let {
                                                            category_name,
                                                            contact_no,
                                                            event_id,
                                                            location,
                                                            name,
                                                            owner_email,
                                                            photo,
                                                            price,
                                                            status
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{contact_no}</td>
                                                                <td>{category_name}</td>
                                                                <td>{event_id}</td>
                                                                <td>{location}</td>
                                                                <td>{name}</td>
                                                                <td>{owner_email}</td>
                                                                <td><img width="150px" height={"150px"} src={photo}
                                                                         alt="Loading.."/></td>
                                                                <td>{price}</td>
                                                                <td>{status}</td>
                                                                <td>
                                                                    <button
                                                                        onClick={() => activateAccount(event_id)}
                                                                        type={"button"}
                                                                        className={"btn btn-success"}>Activate
                                                                    </button>
                                                                </td>

                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> :
                    <>
                        <div className={"custom-flex"}><h1 className={"font"}>Fetching Requests</h1><ReactLoading
                            className={"d-flex justify-content-center"}
                            type={"balls"} color={"darkred"} height={800} width={90}/>
                        </div>
                    </>
            }
        </>
    )
}
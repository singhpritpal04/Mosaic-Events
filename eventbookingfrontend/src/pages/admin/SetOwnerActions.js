import ReactLoading from "react-loading";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function SetOwnerActions() {
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        let status = {activatestatus: "activated"};
        axios.post("http://localhost:4000/getpendingowners", status).then((response) => {
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

    function activateAccount(contact_email) {
        let status = {email: contact_email, accountstatus: "pending"};
        axios.post("http://localhost:4000/owner-actions", status).then((response) => {
            if (response.data === "activated") {
                Swal.fire({icon: "success", title: "Owner has been Unblocked"});
                getData();
            } else if (response.data === "error") {
                Swal.fire({icon: "error", title: "Error occured at backend"});
                getData();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    function deactivateAccount(contact_email) {
        let status = {email: contact_email, accountstatus: "activated"};
        axios.post("http://localhost:4000/owner-actions", status).then((response) => {
            if (response.data === "blocked") {
                Swal.fire({icon: "success", title: "Owner has been blocked"});
                getData();
            } else if (response.data === "error") {
                Swal.fire({icon: "error", title: "Error occured at backend"});
                getData();
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            {
                stat ?
                    data.length === 0 ?
                        <div className={"custom-flex container bg-inactive"}><h1
                            className={"custom-flex pt-5 font height-view"}>No Data
                            Found!!</h1>
                        </div> :
                        <section className="ftco-section">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center mb-5">
                                        <h2 className="style-font">OWNER DETAILS</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap" style={{overflowX: "hidden"}}>
                                            <table className="table table-responsive-xl">
                                                <thead>
                                                <tr>
                                                    <th>Owner_email</th>
                                                    <th>Owner_name</th>
                                                    <th>Password</th>
                                                    <th>Owner_contact_no</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.map((value, index) => {
                                                        let {
                                                            contact_email,
                                                            organiser_name, password,
                                                            contact_no, status
                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{contact_email}</td>
                                                                <td>{organiser_name}</td>
                                                                <td>{password}</td>
                                                                <td>{contact_no}</td>
                                                                {
                                                                    status === "activated" ?
                                                                        <td className={"status"}><span
                                                                            className="active">{status}</span>
                                                                        </td> : <td className={"status"}><span
                                                                            className="inactive">{status}</span>
                                                                        </td>
                                                                }
                                                                <td>
                                                                    {
                                                                        status === "activated" ? <button
                                                                            onClick={() => deactivateAccount(contact_email)}
                                                                            type={"button"}
                                                                            className={"btn btn-danger"}>Block
                                                                        </button> : <button
                                                                            onClick={() => activateAccount(contact_email)}
                                                                            type={"button"}
                                                                            className={"btn btn-success"}>Unblock
                                                                        </button>
                                                                    }
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
                        <div className={"custom-flex"}><h1 className={"font"}>Fetching Data</h1><ReactLoading
                            className={"d-flex justify-content-center"}
                            type={"balls"} color={"darkred"} height={800} width={90}/>
                        </div>
                    </>
            }
        </>
    )
}
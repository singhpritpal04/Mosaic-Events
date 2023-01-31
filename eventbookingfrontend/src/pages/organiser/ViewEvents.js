import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {FaTrashAlt, FaUserEdit} from "react-icons/fa";
import {MDBSpinner} from 'mdb-react-ui-kit';
import Swal from "sweetalert2";

export default function ViewAdmin() {
    let navigate = useNavigate();
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        axios.get("http://localhost:4000/geteventdetails").then((response) => {
            setTimeout(() => {
                if (response.data !== "nodata") {
                    setData(response.data);
                    setStat(true);
                } else if (response.data === "nodata") {
                    setData([]);
                    setStat(true);
                }
            }, 1000)
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    function deleteEvent(event_id){
        axios.post("http://localhost:4000/delete-event",{'event_id':event_id}).then((res)=>{
            if(res.data==="success"){
                Swal.fire(
                    'Deleted',
                    'Event has been deleted',
                    'success'

                )
                getData();
            }else{
                Swal.fire(
                ' Not Deleted',
                'Event has not been deleted',
                'error'

            )}
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
                            <div >
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center mb-5">
                                        <h2 className="style-font">EVENT DETAILS</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap" style={{overflow: "auto"}}>
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
                                                    <th colSpan={"2"} className={"text-center"}>Actions</th>
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
                                                                    <button onClick={() => {
                                                                        navigate(`/organiser/edit-event/${event_id}`)
                                                                    }} type={"button"} className={"btn btn-warning"}>
                                                                        <FaUserEdit/>
                                                                    </button>
                                                                </td>
                                                                <td>
                                                                   <button type={"button"} onClick={() => deleteEvent(event_id)} className={"btn btn-danger"}> <FaTrashAlt/> </button>
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
                        <div className={"custom-flex"}><h1 className={"font"}>Fetching Data</h1>
                            {/*<ReactLoading*/}
                            {/*className={"d-flex justify-content-center"}*/}
                            {/*type={"balls"} color={"coral"} height={800} width={90}/>*/}
                            <MDBSpinner color='primary'>
                                <span className='visually-hidden'>Loading...</span>
                            </MDBSpinner>


                        </div>
                    </>
            }
        </>
    )
}
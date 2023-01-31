import {FaUserEdit} from "react-icons/fa";
import {MDBSpinner} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ViewAllBookings(){
    let navigate = useNavigate();
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        axios.get("http://localhost:4000/view-all-bookings").then((response) => {
            console.log(response.data);
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


    function AllBookings(bill_id){
        let data ={bill_id};
        axios.post("http://localhost:4000/change-booking-status",data).then((response)=>{
            if (response.data==="success"){
                getData();
            }else{
                Swal.fire("Backend Issue","Try Again Later","error")
            }
        }).catch((error)=>{
            console.log(error);
        })

    }



    useEffect(() => {
        getData();
    }, []);

    return(<>

            {
                stat ?
                    data.length === 0 ?
                        <div className={"custom-flex container bg-inactive"}><h1
                            className={"custom-flex pt-5 font height-view"}>No Data
                            Found!!</h1>
                        </div> :
                        <section className="ftco-section">
                            <div className="">
                                <div className="row justify-content-center">
                                    <div className="col-md-6 text-center mb-5">
                                        <h2 className="style-font">Bookings</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            <table className="table table-responsive-xl reset_table">
                                                <thead>
                                                <tr>
                                                    <th>Bill_id</th>
                                                    <th>User_name</th>
                                                    <th>User_email</th>
                                                    <th>Property Name</th>
                                                    <th>Event Category</th>
                                                    <th>Date</th>
                                                    <th>Time</th>
                                                    <th>Payment Method</th>
                                                    <th>Grand Total</th>
                                                    <th>Status</th>
                                                    <th>Actions</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    data.map((value, index) => {
                                                        let {
                                                            bill_id   ,
                                                            user_name,
                                                            user_email,
                                                            property_name,
                                                            category_name,
                                                            event_date,
                                                            event_time,
                                                            payment_method,
                                                            grand_total,
                                                            status

                                                        } = value;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{bill_id}</td>
                                                                <td>{user_name}</td>
                                                                <td>{user_email}</td>
                                                                <td>{property_name}</td>
                                                                <td>{category_name}</td>
                                                                <td>{new Date(event_date).getDate() + "-" + new Date(event_date).getMonth() + "-" + new Date(event_date).getFullYear()}</td>
                                                                <td>{event_time}</td>
                                                                <td>{payment_method}</td>
                                                                <td>{grand_total}</td>
                                                                <td>{status}</td>
                                                                <td>
                                                                    <button onClick={()=>{
                                                                        AllBookings(bill_id)
                                                                    }}
                                                                            type={"button"} className={"btn btn-primary"}>
                                                                        Booking Done?
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
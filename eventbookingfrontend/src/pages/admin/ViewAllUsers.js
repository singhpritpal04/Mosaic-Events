import {MDBSpinner} from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function(){

    let navigate = useNavigate();
    let [data, setData] = useState([]);
    let [stat, setStat] = useState(false);

    function getData() {
        setStat(false);
        axios.get("http://localhost:4000/view-all-users").then((response) => {
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
    useEffect(() => {
        getData();
    }, []);


    return(<>   {
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
                                <h2 className="style-font">Contact Queries</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="table-wrap" style={{overflow: "auto"}}>
                                    <table className="table table-responsive-xl">
                                        <thead>
                                        <tr>
                                            <th>User_id</th>
                                            <th>User_name</th>
                                            <th>User_email</th>
                                            <th>User_address</th>
                                            <th>User_mobile</th>
                                            <th>Password</th>


                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data.map((value, index) => {
                                                let {
                                                    user_id   ,
                                                    user_name,
                                                    user_email,
                                                    user_address,
                                                    user_mobile,
                                                    password

                                                } = value;
                                                return (
                                                    <tr key={index}>
                                                        <td>{user_id}</td>
                                                        <td>{user_name}</td>
                                                        <td>{user_email}</td>
                                                        <td>{user_address}</td>
                                                        <td>{user_mobile}</td>
                                                        <td>{password}</td>


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
    } </>)

}
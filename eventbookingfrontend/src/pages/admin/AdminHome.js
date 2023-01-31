import {useForm} from "react-hook-form";

import {ErrorMessage} from "@hookform/error-message";
import axios from "axios";


export default function AdminHome() {

    return (
        <>

            <section className="wrapper mt-5">
                <div className="container-fostrap">
                    <div>
                        {/*<img*/}
                        {/*    src="https://4.bp.blogspot.com/-7OHSFmygfYQ/VtLSb1xe8kI/AAAAAAAABjI/FxaRp5xW2JQ/s320/logo.png"*/}
                        {/*    className="fostrap-logo"/>*/}
                        <h1 className="heading mb-5">
                            ADMIN DASHBOARD
                        </h1>
                    </div>
                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-4"
                              >
                                    <div className="card"  >
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content"  style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#fff0f5"}}>
                                            <h4 className="card-title" >
                                                ADD ADMIN
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/add-admin"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#E6E6FA"}}>
                                            <h4 className="card-title">
                                                VIEW ADMIN
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/view-admin"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#CBC3E3"}}>
                                            <h4 className="card-title">
                                                EVENT ORGANISERS
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/view-organiser"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#CBC3E3"}}>
                                            <h4 className="card-title">
                                                PENDING STATUS ORGANISERS
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/pending-organiser"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#fff0f5"}}>
                                            <h4 className="card-title">
                                                PENDING STATUS EVENTS
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/pending-events"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#E6E6FA"}}>
                                            <h4 className="card-title">
                                                ACTIVATED EVENTS
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/view-activated-events"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#E6E6FA"}}>
                                            <h4 className="card-title">
                                                CONTACT US QUERIES
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/view-contact-us"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#CBC3E3"}}>
                                            <h4 className="card-title">
                                                 USERS
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/view-all-users"}
                                               className="btn btn-link btn-block" style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-sm-4">
                                    <div className="card">
                                        {/*<a className="img-card">*/}
                                        {/*    <img*/}
                                        {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                        {/*</a>*/}
                                        <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#fff0f5"}}>
                                            <h4 className="card-title">
                                                BOOKINGS
                                            </h4>

                                        </div>
                                        <div className="card-read-more">
                                            <a href={"/admin/view-all-bookings"}
                                               className="btn btn-link btn-block"style={{color:"black",fontWeight:"bold"}}>
                                                VIEW
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}


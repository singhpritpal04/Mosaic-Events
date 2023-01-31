import {NavLink, Outlet} from "react-router-dom";
import axios from "axios";
import {useContext} from "react";
import {AdminContext} from "./Protected";
import {FaEdit, FaHome} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {FcGallery} from "react-icons/fc";
import {MdManageAccounts, MdOutlinePreview} from "react-icons/md";
import {IoIosPersonAdd} from "react-icons/io";
import {HashLink as Link} from "react-router-hash-link";


export default function AdminLayout() {
    const adsession = useContext(AdminContext);

    function logOutAdmin() {
        axios.post("http://localhost:4000/logout-admin").then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>

            <div id="home">

                <div className="main-top">
                    <nav className="navbar navbar-expand-lg navbar-light fixed-navi p-lg-0 py-lg-0 py-2">
                        <div>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-lg-auto text-center">
                                    <li className="nav-item active">
                                        <a className="navbar-brand font-weight-bold bg-dark" href="/">
                                            <img src="images/newLogo.jpg" width={"250px"} height={"70px"}
                                                 className="logo-img pt-1" alt=""/>
                                        </a>
                                    </li>
                                    <li className="nav-item active">
                                        <NavLink className="nav-link" to={"/admin"}><FaHome size={30}
                                                                                            color='white'/> Home
                                            <span className="sr-only">(current)</span>
                                        </NavLink>
                                    </li>
                                    {
                                        adsession.type === "admin" ? <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                               role="button" data-toggle="dropdown"
                                               aria-haspopup="true" aria-expanded="false"> <MdManageAccounts size={30}
                                                                                                             color='white'/>
                                                Manage Admin
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown"
                                                 style={{backgroundColor: "antiquewhite"}}>

                                                <NavLink className="dropdown-item scroll"
                                                         to={"/admin/add-admin"}><IoIosPersonAdd size={30}
                                                                                                 color='coral'/>Add
                                                    Admin</NavLink>
                                                <hr style={{color: "grey"}}/>
                                                <NavLink className="dropdown-item scroll"
                                                         to={"/admin/view-admin"}><MdOutlinePreview size={30}
                                                                                                    color='coral'/>View
                                                    Admin</NavLink>


                                            </div>
                                        </li> : ""
                                    }

                                    <li className="nav-item  mx-xl-4 mx-lg-2">
                                        <NavLink className="nav-link scroll" to={"/#gallery"}> <FcGallery size={30}
                                                                                                          color='white'/> Gallery</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link scroll" to="/admin/change-admin-password"> <FaEdit
                                            size={30} color='white'/> Change
                                            Password</NavLink>
                                    </li>
                                    <li className="nav-item ml-xl-4 ml-lg-2">
                                        <NavLink className="nav-link scroll" to="/admin/admin-login" role={"button"}
                                                 onClick={logOutAdmin}> <FiLogOut size={30}
                                                                                  color='white'/> Logout</NavLink>
                                    </li>
                                </ul>

                                {/*<a href="#" className="reqe-button ml-lg-5">Request a Call Back</a>*/}

                            </div>
                        </div>
                    </nav>
                </div>

            </div>


            <Outlet/>

            <footer className="footer-emp bg-dark py-5">
                <div className="wrap">
                    <div className="row footer-top">
                        <div className="col-lg-4 footer-grid pr-5">
                            <h3 className="footer-title border-bottom text-uppercase mb-4 pb-3">About Us</h3>
                            <div className="footer-text">

                                <h2>
                                    <a className="navbar-brand font-weight-bold bg-dark p-2 mb-4" href="/">

                                        {/*<span className="font-weight-light mr-1">Mosaic Events</span>*/}
                                        <img src="images/newLogo.jpg" className="img-fluid logo-img pt-1" alt=""/>
                                        <span
                                            className="text-dark font-weight-bold logo-style-w3l ">Fun For You</span>
                                    </a>
                                </h2>
                                <p> Mosaic Events,where we make your event not less than a <strong>DREAM</strong>!!!.
                                </p>

                            </div>
                        </div>
                        <div className="col-lg-4 footer-grid my-lg-0 my-4">
                            <h3 className="footer-title border-bottom text-uppercase mb-4 pb-3">Quick Links</h3>
                            <ul className="links list-unstyled">
                                <li>
                                    <NavLink to={"/"}>Home</NavLink>
                                </li>
                                <li className="my-2">
                                    <Link to={"/#contactus"}>Contact us</Link>
                                </li>
                                <li>
                                    <Link to={"/#services"}>Services</Link>
                                </li>
                                <li className="my-2">
                                    <Link to={"/#services"}>Are Special Services!</Link>
                                </li>
                                <li>
                                    <Link to={"/#aboutus"}>About Us</Link>
                                </li>
                                <li className="mt-2">
                                    <Link to={"/#gallery"}>Gallery</Link>
                                </li>
                            </ul>

                            <div className="clearfix"></div>
                        </div>
                        <div className="col-lg-4 footer-grid">
                            <h3 className="footer-title border-bottom text-uppercase mb-4 pb-3">Contact Us</h3>
                            <div className="contact-info">
                                <ul className="list-unstyled">
                                    <li>
                                        <div className="row">
                                            <div className="col-1">
                                                <i className="fas fa-map-marker"></i>
                                            </div>
                                            <div className="col-11">
                                                <p>Mosaic Events
                                                    <span>Street9</span>Ambey Valley,Ajmer. </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="my-2">
                                        <div className="row">
                                            <div className="col-1">
                                                <i className="fas fa-phone"></i>
                                            </div>
                                            <div className="col-11">
                                                <p>1234567890</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div className="col-1">
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                            <div className="col-11">
                                                <a href="http://www.gmail.com">abc@gmail.com</a>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </div>
                            <ul className="footer-social mt-md-4 mt-3">
                                <li className="mx-2">
                                    <a href="#">
                                        <span className="fab fa-facebook-f"></span>
                                    </a>
                                </li>
                                <li className="mx-2">
                                    <a href="#">
                                        <span className="fab fa-twitter"></span>
                                    </a>
                                </li>
                                <li className="mx-2">
                                    <a href="#">
                                        <span className="fab fa-google-plus-g"></span>
                                    </a>
                                </li>
                                <li className="mx-2">
                                    <a href="#">
                                        <span className="fab fa-linkedin-in"></span>
                                    </a>
                                </li>
                                <li className="mx-2">
                                    <a href="#">
                                        <span className="fas fa-rss"></span>
                                    </a>
                                </li>
                                <li className="mx-2">
                                    <a href="#">
                                        <span className="fab fa-vk"></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    )
}
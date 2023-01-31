import {NavLink, Outlet} from "react-router-dom";
import axios from "axios";
import {FaBook, FaEdit, FaServicestack, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {useEffect, useState} from "react";
import {HashLink as Link} from "react-router-hash-link";
import {FaHome} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {FcGallery} from "react-icons/fc";
import {MdManageAccounts, MdOutlinePreview} from "react-icons/md";
import {IoIosPersonAdd} from "react-icons/io";
import {HiInformationCircle} from "react-icons/hi";
import {IoCallSharp} from "react-icons/io5";


export default function UserLayout() {
    let [userSession, setUserSession] = useState({});
    let [data, setData] = useState([]);

    function logoutuser() {
        axios.post("http://localhost:4000/logout-user").then((response) => {
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        axios.get("http://localhost:4000/get-user-session").then((response) => {
                setUserSession(response.data);
            }
        ).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
      <>
        {Object.keys(userSession).length > 0 && (
          <div id="home">
            <div className="main-top">
              <nav className="navbar navbar-expand-lg navbar-light bg-custom p-lg-0 py-lg-0 py-2">
                <div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav mr-lg-auto text-center">
                      <li className="nav-item active">
                        <a
                          className="navbar-brand font-weight-bold bg-dark"
                          href="/"
                        >
                          <img
                            src="images/newLogo.jpg"
                            width={"250px"}
                            height={"70px"}
                            className="logo-img pt-1"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="nav-item active">
                        <NavLink className="nav-link " to={"/"}>
                          <FaHome size={25} color="white" /> Home
                          <span className="sr-only">(current)</span>
                        </NavLink>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link " to={"#aboutus"}>
                          <HiInformationCircle size={25} color="white" /> About
                          Us
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link " to={"#gallery"}>
                          <FcGallery size={25} color="white" /> Gallery
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>

                      <li className="nav-item active">
                        <Link className="nav-link " to={"#services"}>
                          <FaServicestack size={25} color="white" /> Services
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>

                      <li className="nav-item active">
                        <Link className="nav-link" to={"#contactus"}>
                          <IoCallSharp size={25} color="white" /> Contact us
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle "
                          href="#"
                          id="navbarDropdown"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {userSession.user_name}
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <NavLink className="dropdown-item" to={"/view-user"}>
                            {" "}
                            <FaUser size={20} color="violet" />
                            My Profile
                          </NavLink>

                          <NavLink
                            className="dropdown-item scroll"
                            to={"/user-change-password"}
                          >
                            <FaEdit size={20} color="violet" />
                            Change Password
                          </NavLink>
                          <NavLink
                            className="dropdown-item scroll"
                            to={"/user-login"}
                            onClick={logoutuser}
                          >
                            <FaSignOutAlt size={20} color="violet" />
                            Logout
                          </NavLink>
                          <NavLink
                            className="dropdown-item scroll"
                            to={"/bookings"}
                          >
                            {" "}
                            <FaBook size={20} color="violet" />
                            My Bookings
                          </NavLink>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
        {Object.keys(userSession).length === 0 && (
          <div id="home">
            <div className="main-top">
              <nav className="navbar navbar-expand-lg navbar-light fixed-navi p-lg-0 py-lg-0 py-2">
                <div>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav mr-lg-auto text-center">
                      <li className="nav-item active">
                        <a
                          className="navbar-brand font-weight-bold bg-dark"
                          href="/"
                        >
                          <img
                            src="images/newLogo.jpg"
                            width={"250px"}
                            height={"70px"}
                            className="logo-img pt-1"
                            alt=""
                          />
                        </a>
                      </li>
                      <li className="nav-item active">
                        <NavLink className="nav-link " to={"/"}>
                          {" "}
                          <FaHome size={25} color="white" /> Home
                          <span className="sr-only">(current)</span>
                        </NavLink>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link " to={"/#aboutus"}>
                          <HiInformationCircle size={25} color="white" /> About
                          Us
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link " to={"/#gallery"}>
                          <FcGallery size={25} color="white" /> Gallery
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>

                      <li className="nav-item active">
                        <Link className="nav-link " to={"/#services"}>
                          <FaServicestack size={25} color="white" /> Services
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>

                      <li className="nav-item active">
                        <Link className="nav-link " to={"/#contactus"}>
                          <IoCallSharp size={25} color="white" />
                          Contact us
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <NavLink className="nav-link " to={"/user-login"}>
                          <FaSignOutAlt size={25} color="white" /> Signin
                          <span className="sr-only">(current)</span>
                        </NavLink>
                      </li>

                      {/*<li className="nav-item dropdown">*/}
                      {/*    <a className="nav-link dropdown-toggle " href="#" id="navbarDropdown"*/}
                      {/*       role="button" data-toggle="dropdown"*/}
                      {/*       aria-haspopup="true" aria-expanded="false">*/}
                      {/*        User*/}
                      {/*    </a>*/}
                      {/*    <div className="dropdown-menu" aria-labelledby="navbarDropdown">*/}

                      {/*        <NavLink className="dropdown-item scroll" to={"/user/user-profile"}> <FaUser size={20} color='violet'/>My Profile*/}
                      {/*        </NavLink>*/}

                      {/*        <NavLink className="dropdown-item scroll" to={"/user/user-change-password"}> <FaEdit  size={20} color='violet'/>Change Password</NavLink>*/}
                      {/*        <NavLink className="dropdown-item scroll" to={"/user-login"} onClick={logoutuser} ><FaSignOutAlt  size={20} color='violet'/>Logout</NavLink>*/}

                      {/*    </div>*/}
                      {/*</li>*/}

                      {/*<li className="nav-item">*/}
                      {/*    <NavLink className="nav-link scroll" to="change-organiser-password">Change*/}
                      {/*        Password</NavLink>*/}
                      {/*</li>*/}
                      {/*<li className="nav-item ml-xl-4 ml-lg-2">*/}
                      {/*    <NavLink className="nav-link scroll" to="/user/user-login"*/}
                      {/*             role={"button"} onClick={logoutuser} >Logout</NavLink>*/}
                      {/*</li>*/}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}

        <Outlet />

        <footer className="footer-emp bg-dark py-5">
          <div className="wrap">
            <div className="row footer-top">
              <div className="col-lg-4 footer-grid pr-5">
                <h3 className="footer-title border-bottom text-uppercase mb-4 pb-3">
                  About Us
                </h3>
                <div className="footer-text">
                  <h2>
                    <a
                      className="navbar-brand font-weight-bold bg-dark p-2 mb-4"
                      href="/"
                    >
                      {/*<span className="font-weight-light mr-1">Mosaic Events</span>*/}
                      <img
                        src="images/newLogo.jpg"
                        className="img-fluid logo-img pt-1"
                        alt=""
                      />
                      <span className="text-dark font-weight-bold logo-style-w3l ">
                        Fun For You
                      </span>
                    </a>
                  </h2>
                  <p>
                    {" "}
                    Mosaic Events,where we make your event not less than a{" "}
                    <strong>DREAM</strong>!!!.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 footer-grid my-lg-0 my-4">
                <h3 className="footer-title border-bottom text-uppercase mb-4 pb-3">
                  Quick Links
                </h3>
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
                  <li className="mt-2">
                    <p
                      style={{
                        fontWeight: "bolder",
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      {" "}
                      Want to work with us?
                    </p>
                    <NavLink
                      to={"/organiser/organiser-signup"}
                      style={{ fontWeight: "bolder", color: "white" }}
                    >
                      Join as event Organiser
                    </NavLink>
                  </li>
                  <li className="mt-2">
                    <NavLink
                      to={"/organiser/organiser-login"}
                      style={{ fontWeight: "bolder", color: "white" }}
                    >
                      Already a Organiser?
                    </NavLink>
                  </li>
                </ul>

                <div className="clearfix"></div>
              </div>
              <div className="col-lg-4 footer-grid">
                <h3 className="footer-title border-bottom text-uppercase mb-4 pb-3">
                  Contact Us
                </h3>
                <div className="contact-info">
                  <ul className="list-unstyled">
                    <li>
                      <div className="row">
                        <div className="col-1">
                          <i className="fas fa-map-marker"></i>
                        </div>
                        <div className="col-11">
                          <p>
                            Mosaic Events
                            <span>Street9</span>Ambey Valley,Ajmer.{" "}
                          </p>
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
    );
}
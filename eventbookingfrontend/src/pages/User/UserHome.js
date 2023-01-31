import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import Swal from "sweetalert2";
import {HashLink as Link} from "react-router-hash-link";

const UserHome = () => {


    let [data, setData] = useState([]);
    let [session, setSession] = useState({});
    let {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();


    useEffect(() => {
        axios.get("http://localhost:4000/view-eventson-homepage").then((response) => {
            setData(response.data);
        }).catch((error) => {
            console.log(error);

        })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:4000/get-user-session").then((response) => {
            setSession(response.data);
            setValue("user_email", response.data.user_email);
            setValue("user_name", response.data.user_name);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    function onSubmit(data) {
        axios.post("http://localhost:4000/contact_details", data).then((response) => {
            if (response.data === "success") {
                Swal.fire("Request sent", "We will contact you soon ", "success");
                reset();
            } else {
                Swal.fire("Request not sent", "Try  after sometime ", "error");

            }
        }).catch((error) => {
            console.log(error);
        })

    }

    return (
        <>
            <div className="banner-text-agile">
                <div className="wrap">
                    <div className="row banner-agiles">
                        <div className="col-xl-6 banner-w3lstexts text-white pt-xl-4">
                            <h3 className="font-weight-bold" id="text">Parties </h3>
                            <p className="text-white mt-md-4 mt-3">Specializing in organizing all kinds of events for
                                every age group,every occasion. We mainly focus on making your parties last forever as
                                memories.
                            </p>
                            <a href="#booknow" className="banner-button scroll btn mt-md-5 mt-4">Book Now</a>
                        </div>
                        <div className="col-xl-6 video-w3ls mt-xl-0 mt-sm-5 mt-4 text-xl-left text-center">
                            <iframe src="https://www.youtube.com/embed/1bdQdQst3OI"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="banner-bottom py-5" id="about">
                <div className="wrap py-xl-5 py-lg-3">
                    <p className="sub-tittle text-uppercase text-center">Few Words</p>
                    <h3 className="tittle text-center text-uppercase mb-sm-5 mb-4" id={"aboutus"}>
                        About
                        <span>Us</span>
                    </h3>
                    <div className="w3ls-about-agile">
                        <h4 className="text-dark">Specializing in organizing all kinds of events for
                            every age group,every occasion.</h4>
                        <p className="my-3">Mosaic Event offers a wide range of party decorations, games, and tableware,
                            cakes, balloons, and banners for you and your loved ones at your doorstep. It's been 4 long
                            years that we have been making your dreamy events turn inot reality. Mosaic Events was
                            started with a vision to deliver a wide range of qualified party supplies, so your events
                            can be lovable memory.</p>
                        <p>We are a creative events and
                            <span className="text-danger">party planning agency</span> with a passion for design &
                            developing
                            <span className="text-danger">beautiful events.</span>
                        </p>
                        <p className="my-3">Mosaic Events not only aims to make your big day memorable and special but
                            it is also the heart of the beautiful Rocky Mountains, which sets perfect settings for your
                            dreamy events. Mosaic Events offers a wide range of services to create an event that is
                            truly and utterly you. Since 5 years we have worked with hundreds of satisfied customers.
                            It's all because of our cutsomer's feedback that we have worked upon to be brand that we are
                            today</p>

                    </div>
                </div>
            </div>

            <div className="middle-w3l py-5" id="subscribe">
                <div className="wrap py-xl-5 py-lg-3">
                    <div className="row">
                        <div className="col-xl-6 left-midd-agile pr-5">
                            <h3 className="tittle-2 text-white font-weight-bold mb-3">We Create Fun Lasting
                                Memories</h3>
                            <p>Sed ut perspiciatis unde omnis iste natus error olorlaudantium, dsdstotam rem
                                aperiam.</p>
                            <h4 className="text-white mt-4">We offers a range of party services</h4>
                            <a href="#services" id={"services"} className="btn banner-button button-w3ls scroll mt-4">Our
                                Services</a>
                        </div>

                        <div className="col-xl-6 subscribe-info-w3l border-left pt-4 mt-xl-0 mt-4">
                            <h3 className="tittle-2 text-white font-weight-bold mb-3">Subscribe & Save</h3>
                            <p className="mb-4">Subscribe to our email and get updates right in your inbox</p>
                            {/*<form action="#" method="post">*/}
                            {/*    <input type="email" name="email" placeholder="Enter your Email..." required=""/>*/}
                            {/*    <input type="submit" value="Submit"/>*/}
                            {/*</form>*/}
                        </div>

                    </div>
                </div>
            </div>

            <div className="why-choose-agile py-5 bg-light" id="services">
                <div className="wrap py-xl-5 py-3">
                    <p className="sub-tittle text-uppercase text-center">Excellent Services</p>
                    <h3 className="tittle text-center text-uppercase mb-sm-5 mb-4">
                        Our
                        <span>Services</span>
                    </h3>
                    <div className="row agileits-w3layouts-grid pt-md-4">
                        <div className="col-lg-4 services-agile-1">
                            <div className="d-flex wthree_agile_us bg-white py-4">
                                <div className="col-2 pr-0">
                                    <div className="wthree_features_grid text-center">

                                    </div>
                                </div>
                                <div className="col-10 agile-why-text">
                                    <h4 className="text-dark font-weight-bold mb-3">Bachelorette</h4>
                                    <p style={{color: "#ab3bfb", fontWeight: "bolder", textAlign: "left"}}>"Trust me,
                                        you can dance!!!".Let's get on the dance floor</p>
                                    <NavLink to={"/events-page"} className="btn mt-3 service-button p-0 scroll"
                                             role="button">View

                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 services-agile-1 my-lg-0 my-4">
                            <div className="d-flex wthree_agile_us bg-white py-4">
                                <div className="col-2 pr-0">
                                    <div className="wthree_features_grid text-center">

                                    </div>
                                </div>
                                <div className="col-10 agile-why-text">
                                    <h4 className="text-dark font-weight-bold mb-3">Baby Shower</h4>
                                    <p style={{color: "#ab3bfb", fontWeight: "bolder", textAlign: "left"}}>Someone
                                        special, someone dear, someone new to love is here.</p>
                                    <NavLink to={"/events-page"} className="btn mt-3 service-button p-0 scroll"
                                             role="button">View

                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 services-agile-1">
                            <div className="d-flex wthree_agile_us bg-white py-4">
                                <div className="col-2 pr-0">
                                    <div className="wthree_features_grid text-center">

                                    </div>
                                </div>
                                <div className="col-10 agile-why-text">
                                    <h4 className="text-dark font-weight-bold mb-3">Engagement</h4>
                                    <p style={{color: "#ab3bfb", fontWeight: "bolder"}}>“Love is just a word until
                                        someone comes along and gives it meaning. </p>
                                    <NavLink to={"/events-page"} className="btn mt-3 service-button p-0 scroll"
                                             role="button">View

                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row agileits-w3layouts-grid mt-lg-5 mt-4">
                        <div className="col-lg-4 services-agile-1">
                            <div className="d-flex wthree_agile_us bg-white py-4">
                                <div className="col-2 pr-0">
                                    <div className="wthree_features_grid text-center">

                                    </div>
                                </div>
                                <div className="col-10 agile-why-text">
                                    <h4 className="text-dark font-weight-bold mb-3">Halloween Party</h4>
                                    <p style={{color: "#ab3bfb", fontWeight: "bolder"}}>“When black cats prowl and
                                        pumpkins gleam, may luck be yours on Halloween.”</p>
                                    <NavLink to={"/events-page"} className="btn mt-3 service-button p-0 scroll"
                                             role="button">View

                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 services-agile-1 my-lg-0 my-4">
                            <div className="d-flex wthree_agile_us bg-white py-4">
                                <div className="col-2 pr-0">
                                    <div className="wthree_features_grid text-center">

                                    </div>
                                </div>
                                <div className="col-10 agile-why-text">
                                    <h4 className="text-dark font-weight-bold mb-3">Housewarming Party</h4>
                                    <p style={{color: "#ab3bfb", fontWeight: "bolder"}}> New place, new adventures,
                                        await you as you enter your new house.</p>
                                    <NavLink to={"/events-page"} className="btn mt-3 service-button p-0 scroll"
                                             role="button">View

                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 services-agile-1">
                            <div className="d-flex wthree_agile_us bg-white py-4">
                                <div className="col-2 pr-0">
                                    <div className="wthree_features_grid text-center">

                                    </div>
                                </div>
                                <div className="col-10 agile-why-text">
                                    <h4 className="text-dark font-weight-bold mb-3">New Year' Eve</h4>
                                    <p style={{color: "#ab3bfb", fontWeight: "bolder"}}>“Celebrate endings—for they
                                        precede new beginnings.” —Jonathan Lockwood.</p>
                                    <NavLink to={"/events-page"} className="btn mt-3 service-button p-0 scroll"
                                             role="button" style={{textAlign: "center"}}>View
                                        {/*<i className="fas fa-long-arrow-alt-right ml-1"></i>*/}
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="who-agile" id="who">
                <div className="wrap py-xl-5 py-lg-3">
                    <div className="text-center style-agile-2 py-5 px-4">
                        <h3 className="tittle-2 text-dark font-weight-bold mb-5">Our Special Services</h3>
                        <div className="row">
                            <div className="col-sm-4 exce-grid1-mmstyle">
                                <div className="grid-ec1-2 pt-4 px-xl-4 px-2">
                                    <i className="fas fa-birthday-cake"></i>
                                    <h4 className="my-3 mx-lg-3 text-dark" style={{fontWeight: "bolder"}}>Birthday
                                        Parties</h4>
                                    <p>“We turn not older with years, but newer every day you get a chance to start
                                        new.”</p>
                                    <p>– Sam Hagar</p>
                                    <NavLink to={"/events-page"}
                                             className="btn banner-button button-w3ls style-button mt-4 scroll">View
                                        More</NavLink>
                                </div>
                            </div>
                            <div className="col-sm-4 exce-grid1-mmstyle my-sm-0 my-4">
                                <div className="grid-ec1-2 pt-4 px-xl-4 px-2">
                                    <i className="fab fa-accusoft"></i>
                                    <h4 className="my-3 mx-lg-3 text-dark" style={{fontWeight: "bolder"}}>Wedding
                                        Planning</h4>
                                    <p>“And I knew exactly how old Walt Disney’s Cinderella felt when she found her
                                        prince.”
                                        —Elizabeth Young.</p>
                                    <NavLink to={"/events-page"}
                                             className="btn banner-button button-w3ls style-button mt-4 scroll">View
                                        More</NavLink>
                                </div>
                            </div>
                            <div className="col-sm-4 exce-grid1-mmstyle">
                                <div className="grid-ec1-2 pt-4 px-xl-4 px-2">
                                    <i className="fas fa-music"></i>
                                    <h4 className="my-3 mx-lg-3 text-dark" style={{fontWeight: "bolder"}}>Anniversary
                                        Party</h4>
                                    <p>"I love being married. It's so great to find one special person you want to annoy
                                        for the rest of your life." — Rita Rudner</p>
                                    <NavLink to={"/events-page"}
                                             className="btn banner-button button-w3ls style-button mt-4 scroll">View
                                        more</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="gallery pt-5" id="gallery">
                <div className="gallery-inner">
                    <p className="sub-tittle text-uppercase text-center">Our Events</p>
                    <h3 className="tittle text-center text-uppercase mb-sm-5 mb-4">
                        Our
                        <span>Gallery</span>
                    </h3>
                    <ul className="portfolio-categ filter my-md-5 mb-md-0 mb-3 py-4 text-center">
                        <li className="port-filter all active">
                            <a href="#gallery" style={{textAlign: "center"}}>Some Sneak Peaks into the events</a>
                        </li>
                        {/*<li className="cat-item-1">*/}
                        {/*    <a href="#" title="Category 1">category 1</a>*/}
                        {/*</li>*/}
                        {/*<li className="cat-item-2">*/}
                        {/*    <a href="#" title="Category 2">category 2</a>*/}
                        {/*</li>*/}
                        {/*<li className="cat-item-3">*/}
                        {/*    <a href="#" title="Category 3">category 3</a>*/}
                        {/*</li>*/}
                        {/*<li className="cat-item-4">*/}
                        {/*    <a href="#" title="Category 4">category 4</a>*/}
                        {/*</li>*/}

                    </ul>
                    <ul className="portfolio-area clearfix">
                        <li className="portfolio-item2" data-id="id-0" data-type="cat-item-4">
					<span className="image-block img-hover">
						<a className="image-zoom" href="images/g1.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/g1.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                        <li className="portfolio-item2" data-id="id-1" data-type="cat-item-2">
					<span className="image-block">
						<a className="image-zoom" href="images/g2.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/g2.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                        <li className="portfolio-item2" data-id="id-2" data-type="cat-item-1">
					<span className="image-block">
						<a className="image-zoom" href="images/g3.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/g3.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                        <li className="portfolio-item2" data-id="id-4" data-type="cat-item-3">
					<span className="image-block">
						<a className="image-zoom" href="images/g4.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/g4.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                        <li className="portfolio-item2" data-id="id-5" data-type="cat-item-2">
					<span className="image-block">
						<a className="image-zoom" href="images/g5.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/g5.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                        <li className="portfolio-item2" data-id="id-7" data-type="cat-item-1">
					<span className="image-block">
						<a className="image-zoom" href="images/g6.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/g6.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                        <li className="portfolio-item2" data-id="id-7" data-type="cat-item-1">
					<span className="image-block">
						<a className="image-zoom" href="images/g7.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/g7.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                        <li className="portfolio-item2" data-id="id-7" data-type="cat-item-1">
					<span className="image-block">
						<a className="image-zoom" href="images/g8.jpg" data-gal="prettyPhoto[gallery]">
							<img src="images/p1.jpg" className="img-fluid " alt=""/>
						</a>
					</span>
                        </li>
                    </ul>

                </div>

            </section>

            <section className="banner-bottom-w3layouts py-5" id="news">
                <div className="wrap py-xl-5 py-lg-3">
                    <p className="sub-tittle text-uppercase text-center">Some More</p>
                    <h3 className="tittle text-center text-uppercase mb-sm-5 mb-4" id={"booknow"}>
                        Latest
                        <span>News</span>
                    </h3>
                    <div className={"row"}>

                        {
                            data.map((value, index) => {
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
                                        <div className="col-md-4 mt-5" style={{width: "18rem"}}>
                                            <img src={photo} className="card-img-top" alt="..."
                                                 style={{height: "200px"}}/>
                                            <div className="card-body"
                                                 style={{backgroundColor: "floralwhite", height: "250px"}}>
                                                <h4 className="card-title">{name.toUpperCase()}</h4>
                                                <h6 className="card-text mb-2"><span
                                                    style={{fontWeight: "bolder"}}>Location:</span> {location}</h6>
                                                <h6 className="card-text mb-2"><span
                                                    style={{fontWeight: "bolder"}}>Event: </span> {category_name}</h6>
                                                <h6 className="card-text mb-2"><span
                                                    style={{fontWeight: "bolder"}}>Price:</span> {price}</h6>


                                                <NavLink to={`Cart/${event_id}`} className="btn"
                                                         style={{backgroundColor: "black", color: "white"}}>Book
                                                    Now</NavLink>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                        <NavLink to={"/events-page"} className="btn col-md-4 offset-md-4 mt-5"
                                 style={{backgroundColor: "black", color: "white"}}>VIEW MORE</NavLink>
                    </div>


                    {/*<div className="row choose-main mt-lg-5 mt-4">*/}
                    {/*    <div className="col-sm-6">*/}
                    {/*        <div className="row">*/}
                    {/*            <div className="col-xl-6 galsses-grid-right">*/}
                    {/*                <div className="galsses-grid-left">*/}
                    {/*                    <img src="images/g3.jpg" alt="" className="img-fluid"/>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-xl-6 galsses-grid-right mt-xl-0 mt-4">*/}
                    {/*                <h5>*/}
                    {/*                    <span className="post-color">08</span> June 2018</h5>*/}
                    {/*                <h4 className="post my-3">*/}
                    {/*                    <a href="#">Lorem ipsum dolor sit amet</a>*/}
                    {/*                </h4>*/}
                    {/*                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-sm-6 mt-sm-0 mt-4">*/}
                    {/*        <div className="row">*/}
                    {/*            <div className="col-xl-6 galsses-grid-right">*/}
                    {/*                <div className="galsses-grid-left">*/}
                    {/*                    <img src="images/g7.jpg" alt="" className="img-fluid"/>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*            <div className="col-xl-6 galsses-grid-right mt-xl-0 mt-4">*/}
                    {/*                <h5>*/}
                    {/*                    <span className="post-color">11</span> June 2018</h5>*/}
                    {/*                <h4 className="post my-3">*/}
                    {/*                    <a href="#">Lorem ipsum dolor sit amet</a>*/}
                    {/*                </h4>*/}
                    {/*                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </section>

            <section className="testimonials py-5" id="clients">
                <div className="wrap py-xl-5 py-lg-3">
                    <p className="sub-tittle text-uppercase text-white text-center">Peoples Loved</p>
                    <h3 className="tittle text-center text-white text-uppercase mb-lg-5 mb-3"> Our
                        <span>Clients</span>
                    </h3>
                    <div className="inner-sec-w3ls-agileinfo pt-4">
                        <div className="owl-carousel owl-theme">
                            <div className="item">
                                <div className="feedback-info text-left">
                                    <div className="feedback-top">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sedc dnmo eiusmod
                                            tempor incididunt ut labore et
                                            dolore magna
                                            Sed semper leo metus, a lacinia eros semper at.</p>
                                    </div>
                                    <div className="feedback-grids">
                                        <div className="feedback-img">
                                            <img src="images/te1.jpg" className="img-fluid rounded-circle" alt=""/>
                                        </div>
                                        <div className="feedback-img-info">
                                            <h5>Mary Jane</h5>
                                            <p>United States
                                                <span>(Company)</span>
                                            </p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-info text-left">
                                    <div className="feedback-top">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sedc dnmo eiusmod
                                            tempor incididunt ut labore et
                                            dolore magna
                                            Sed semper leo metus, a lacinia eros semper at.</p>
                                    </div>
                                    <div className="feedback-grids">
                                        <div className="feedback-img">
                                            <img src="images/te3.jpg" className="img-fluid rounded-circle" alt=""/>
                                        </div>
                                        <div className="feedback-img-info">
                                            <h5>Steven Wilson</h5>
                                            <p>United States
                                                <span>(Company)</span>
                                            </p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <div className="feedback-info text-left">
                                    <div className="feedback-top">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sedc dnmo eiusmod
                                            tempor incididunt ut labore et
                                            dolore magna
                                            Sed semper leo metus, a lacinia eros semper at.</p>
                                    </div>
                                    <div className="feedback-grids">
                                        <div className="feedback-img">
                                            <img src="images/te3.jpg" className="img-fluid rounded-circle" alt=""/>
                                        </div>
                                        <div className="feedback-img-info">
                                            <h5>Peter guptill</h5>
                                            <p>Vestibulum</p>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wthree-row w3-contact py-5" id="contact">
                <div className="container py-xl-5 py-lg-3">
                    <p className="sub-tittle text-uppercase text-center">Get In Touch</p>
                    <h3 id={"contactus"} className="tittle text-center text-uppercase mb-sm-5 mb-4">Contact
                        <span>Us</span>
                    </h3>
                    <div className="row contact-form py-3">
                        <div className="col-lg-6 wthree-form-left">
                            <div className="contact-top1">
                                <form onSubmit={handleSubmit(onSubmit)} className="f-color">
                                    {
                                        Object.keys(session).length === 0 ? <>
                                            <div className="form-group">
                                                <label className="text-dark">Name</label>
                                                <input {...register('user_name', {required: "This field is required"})}
                                                       type="text" className="form-control"/>
                                                <ErrorMessage name="user_name" errors={errors}
                                                              render={({message}) => <p
                                                                  className="text-danger">{message}</p>}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-dark">Email</label>
                                                <input
                                                    type="email" {...register('user_email', {required: "This field is required"})}
                                                    className="form-control"/>

                                                <ErrorMessage name="user_email" errors={errors}
                                                              render={({message}) => <p
                                                                  className="text-danger">{message}</p>}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-dark">Mobile</label>
                                                <input
                                                    {...register('user_mobile', {required: "This field is required"})}
                                                    type="text" className="form-control"/>
                                                <ErrorMessage name="user_mobile" errors={errors}
                                                              render={({message}) => <p
                                                                  className="text-danger">{message}</p>}/>
                                            </div>

                                        </> : <>
                                            <div className="form-group">
                                                <label className="text-dark">Name</label>
                                                <input {...register('user_name', {required: "This field is required"})}
                                                       type="text" className="form-control"/>
                                                <ErrorMessage name="user_name" errors={errors}
                                                              render={({message}) => <p
                                                                  className="text-danger">{message}</p>}/>
                                            </div>
                                            <div className="form-group">
                                                <label className="text-dark">Email</label>
                                                <input
                                                    type="email" {...register('user_email', {required: "This field is required"})}
                                                    className="form-control"/>

                                                <ErrorMessage name="user_email" errors={errors}
                                                              render={({message}) => <p
                                                                  className="text-danger">{message}</p>}/>
                                            </div>

                                            <div className="form-group">
                                                <label className="text-dark">Mobile</label>
                                                <input {...register('user_mobile', {required: "This field is required"})}
                                                       type="text" className="form-control"/>
                                                <ErrorMessage name="user_mobile" errors={errors}
                                                              render={({message}) => <p
                                                                  className="text-danger">{message}</p>}/>
                                            </div>
                                        </>
                                    }
                                    <div className="form-group">
                                        <label className="text-dark">Your Message</label>
                                        <textarea
                                            className="form-control" {...register('user_message', {required: "This field is required"})}
                                            rows="5" id="contactcomment"
                                        ></textarea>
                                        <ErrorMessage errors={errors}
                                                      render={({message}) => <p
                                                          className="text-danger">{message}</p>}/>

                                    </div>
                                    <button type={"submit"} className="btn">Submit</button>
                                </form>
                            </div>

                        </div>

                        <div className="col-lg-6 map mt-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d848.885276755991!2d74.87751453326175!3d31.673772265600785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391964aa569e7355%3A0x173ff8a224b5eef8!2sSpring%20Dale%20Senior%20School!5e0!3m2!1sen!2sin!4v1670011016387!5m2!1sen!2sin"
                                width="600" height="550"
                            ></iframe>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default UserHome;
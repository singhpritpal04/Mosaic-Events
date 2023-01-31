const OrganiserHome=()=>{
    return(
        <>
            <>

                <section className="wrapper mt-5">
                    <div className="container-fostrap">
                        <div>
                            {/*<img*/}
                            {/*    src="https://4.bp.blogspot.com/-7OHSFmygfYQ/VtLSb1xe8kI/AAAAAAAABjI/FxaRp5xW2JQ/s320/logo.png"*/}
                            {/*    className="fostrap-logo"/>*/}
                            <h1 className=" style-font mb-5">
                                ORGANISER DASHBOARD
                            </h1>
                        </div>
                        <div className="content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-xs-12 col-sm-6"
                                    >
                                        <div className="card" >
                                            {/*<a className="img-card">*/}
                                            {/*    <img*/}
                                            {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                            {/*</a>*/}
                                            <div className="card-content"  style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#e8f4ea"}}>
                                                <h4 className="card-title">
                                                    ADD EVENT
                                                </h4>

                                            </div>
                                            <div className="card-read-more">
                                                <a href={"/organiser/add-event"}
                                                   className="btn btn-link btn-block">
                                                    VIEW
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="card">
                                            {/*<a className="img-card">*/}
                                            {/*    <img*/}
                                            {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                            {/*</a>*/}
                                            <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#c8e1cc"}}>
                                                <h4 className="card-title">
                                                    VIEW EVENTS
                                                </h4>

                                            </div>
                                            <div className="card-read-more">
                                                <a href={"/organiser/view-event"}
                                                   className="btn btn-link btn-block">
                                                    VIEW
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="card">
                                            {/*<a className="img-card">*/}
                                            {/*    <img*/}
                                            {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                            {/*</a>*/}
                                            <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#c8e1cc"}}>
                                                <h4 className="card-title">
                                                    VIEW BOOKINGS
                                                </h4>

                                            </div>
                                            <div className="card-read-more">
                                                <a href={"/organiser/view-all-bookings"}
                                                   className="btn btn-link btn-block">
                                                    VIEW
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 col-sm-6">
                                        <div className="card">
                                            {/*<a className="img-card">*/}
                                            {/*    <img*/}
                                            {/*        src="https://1.bp.blogspot.com/-Bii3S69BdjQ/VtdOpIi4aoI/AAAAAAAABlk/F0z23Yr59f0/s640/cover.jpg"/>*/}
                                            {/*</a>*/}
                                            <div className="card-content" style={{padding:"47px", textAlign:"center",height:"150px",backgroundColor:"#e8f4ea"}}>
                                                <h4 className="card-title">
                                                    CHANGE PASSWORD
                                                </h4>

                                            </div>
                                            <div className="card-read-more">
                                                <a href={"/organiser/change-organiser-password"}
                                                   className="btn btn-link btn-block">
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
        </>
    )
}

export default OrganiserHome;
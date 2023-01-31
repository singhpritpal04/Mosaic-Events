import {NavLink} from "react-router-dom";

export default function ThankyouPage(){
    return<>

        <div className="jumbotron text-center">
            <h1 className="display-3">Thank You!</h1>
            <p className="lead"><strong>Please check your email</strong> for further instructions on how to complete
                your account setup.</p>
            <hr/>
                <p>
                    Having trouble? <a href="https://bootstrapcreative.com/">Contact us</a>
                </p>
                <p className="lead">
                    <NavLink className="btn btn-primary btn-sm" to={"/"} role="button">Continue
                        to homepage</NavLink>
                </p>
        </div>




    </>
}
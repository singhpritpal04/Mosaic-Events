import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AddAdmin from "./pages/admin/AddAdmin";
import ChangeAdminPassword from "./pages/admin/ChangeAdminPassword";
import ViewAdmin from "./pages/admin/ViewAdmin";
import AdminLogin from "./pages/admin/AdminLogin";
import EditAdmin from "./pages/admin/EditAdmin";
import Protected from "./pages/admin/Protected";
import OrganiserLayout from "./pages/organiser/OrganiserLayout";
import OrganiserHome from "./pages/organiser/OrganiserHome";
import OrganiserLogin from "./pages/organiser/OrganiserLogin";

import SetOwnerActions from "./pages/admin/SetOwnerActions";
import ViewPendingOwner from "./pages/admin/ViewPendingOwners";
import OrganiserSignUp from "./pages/organiser/OrganiserSignUp";
import ChangeOrganiserPassword from "./pages/organiser/ChangeOrganiserPassword";
import Adminprotectedsession from "./pages/admin/Adminprotectedsession";
import AddEvent from "./pages/organiser/AddEvent";
import ViewEvent from "./pages/organiser/ViewEvents";
import OrganiserProtectedRoute from "./pages/organiser/OrganiserProtectedRoute";
import EditEvent from "./pages/organiser/EditEvent";
import ViewPendingEvents from "./pages/admin/ViewPendingEvents";
import EventActions from "./pages/admin/EventActions";
import UserHome from "./pages/User/UserHome";
import UserLayout from "./pages/User/UserLayout";
import UserSignup from "./pages/User/UserSignup";
import UserLogin from "./pages/User/UserLogin";
import UserProfile from "./pages/User/UserProfile";
import ViewUser from "./pages/User/ViewUser";
import UserChangePassword from "./pages/User/UserChangePassword";
import UserProtectedRoute from "./pages/User/UserProtectedRoute";
import Cart from "./pages/User/Cart";
import Checkout from "./pages/User/Checkout";
import ThankyouPage from "./pages/User/ThankyouPage";
import Bookings from "./pages/User/Bookings";
import ViewContactUs from "./pages/admin/ViewContactUs";
import ViewAllUsers from "./pages/admin/ViewAllUsers";
import ViewAllBookings from "./pages/admin/ViewAllBookings";
import ViewAllBookingToOwner from "./pages/organiser/ViewAllBookingToOwner";
import BookingsPage from "./pages/User/BookingsPage";
import Error from "./pages/User/Error";



function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/admin/admin-login"} element={<AdminLogin/>}/>
                    <Route path={"/admin"} element={<Protected Component={AdminLayout}/>}>
                        <Route index element={<AdminHome/>}/>
                        <Route path={"add-admin"} element={<Adminprotectedsession Component={AddAdmin}/>}/>
                        <Route path={"view-admin"} element={<Adminprotectedsession Component={ViewAdmin}/>}/>
                        <Route path={"change-admin-password"} element={<ChangeAdminPassword/>}/>}
                        <Route path={"edit-admin/:username"} element={<EditAdmin/>}/>
                        <Route path={"view-organiser"} element={<SetOwnerActions/>}/>
                        <Route path={"pending-organiser"} element={<ViewPendingOwner/>}/>
                        <Route path={"pending-events"} element={<ViewPendingEvents/>}/>
                        <Route path={"view-activated-events"} element={<EventActions/>}/>
                        <Route path={"view-contact-us"} element={<ViewContactUs/>}/>
                        <Route path={"view-all-users"} element={<ViewAllUsers/>}/>
                        <Route path={"view-all-bookings"} element={<ViewAllBookings/>}/>


                    </Route>

                    <Route path={"/organiser/organiser-login"} element={<OrganiserLogin/>}/>
                    <Route path={"/organiser/organiser-signup"} element={<OrganiserSignUp/>}/>
                    <Route path={"/organiser"} element={<OrganiserLayout/>}>
                        <Route index element={<OrganiserProtectedRoute Component={OrganiserHome}/>}/>
                        <Route path={"change-organiser-password"}
                               element={<OrganiserProtectedRoute Component={ChangeOrganiserPassword}/>}/>
                        <Route path={"add-event"} element={<OrganiserProtectedRoute Component={AddEvent}/>}/>
                        <Route path={"view-event"} element={<OrganiserProtectedRoute Component={ViewEvent}/>}/>
                        <Route path={"edit-event/:event_id"} element={<OrganiserProtectedRoute Component={EditEvent}/>}/>
                        <Route path={"view-all-bookings"} element={<OrganiserProtectedRoute Component={ViewAllBookingToOwner}/>}/>
                    </Route>


                    <Route path={"user-login"} element={<UserLogin/>}/>
                    <Route path={"user-signup"} element={<UserSignup/>}/>
                    <Route path={"/"} element={<UserLayout/>}>
                        <Route index element={<UserHome/>}/>
                        <Route path={"user-profile/:user_id"} element={<UserProtectedRoute Component={UserProfile}/>}/>
                        <Route path={"view-user"} element={<UserProtectedRoute Component={ViewUser}/>}/>
                        <Route path={"user-change-password"} element={<UserProtectedRoute Component={UserChangePassword}/>}/>
                        <Route path={"cart/:event_id"} element={<UserProtectedRoute Component={Cart}/>}/>
                        <Route path={"checkout"} element={<UserProtectedRoute Component={Checkout}/>}/>
                        <Route path={"thankyou"} element={<UserProtectedRoute Component={ThankyouPage}/>}/>
                        <Route path={"bookings"} element={<UserProtectedRoute Component={Bookings}/>}/>
                        <Route path={"events-page"} element={<BookingsPage/>}/>
                        <Route path={"*"} element={<Navigate to={"/error-page"}/>}/>

                    </Route>
                    <Route path={"/error-page"} element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

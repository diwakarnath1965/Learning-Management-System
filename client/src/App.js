
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomePage from './Pages/HomePage';
import AboutUs from './Pages/AboutUs';
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import AllCourses from './Pages/Course/AllCourses';
import CourseDescription from './Pages/Course/CourseDescription';
import RequireAuth from '../src/Auth/RequireAuth';
import CreateCourse from './Pages/Course/CreateCourse';
import Denied from './Pages/Denied';
import Profile from './Pages/User/Profile';
import EditProfile from './Pages/User/EditProfile';
import DisplayLectures from './Pages/Dashboard.js/DisplayLectures';
import AddLecture from './Pages/Dashboard.js/AddLecture';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess';
import Checkout from './Pages/Payment/Checkout';
import CheckoutFailure from './Pages/Payment/CheckoutFailure';
import AdminDashboard from './Pages/Dashboard.js/AdminDashboard';
import ChangePassword from './Pages/Password/ChangePassword';
import ResetPassword from './Pages/Password/ResetPassword';
import ForgetPassword from './Pages/Password/ForgetPassword';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/courses' element={<AllCourses/>}/>
        <Route path='/course/description' element={<CourseDescription/>}/>
        <Route path='/denied' element={<Denied/>}/>
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
            <Route path='/course/create' element={<CreateCourse/>}/>
            <Route path="/course/addlecture" element={<AddLecture />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
            <Route path='/user/profile' element={<Profile/>}/>
            <Route path='/user/editprofile' element={<EditProfile/>}/>
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout/success' element={<CheckoutSuccess />} />
            <Route path='/checkout/fail' element={<CheckoutFailure />} />
            <Route path='/course/displaylectures' element={<DisplayLectures/>}/>
        </Route>


        <Route path='*' element={<NotFound/>}/>
      </Routes>
     <Footer/>
    </div>
  );
}

export default App;

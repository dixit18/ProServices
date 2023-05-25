import "./App.css";
import './app.scss'
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import AddService from './pages/addService/Add'
import Bookings from './pages/bookings/Bookings'
import Message from './pages/message/Message'
import Messages from './pages/messages/Messages'
import MyServices from './pages/myServices/MyServices'
import Service from './pages/service/Service'
import Services from './pages/services/Services'
function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/myservices",
          element: <MyServices />,
        },
        {
          path: "/bookings",
          element: <Bookings />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/addservice",
          element: <AddService />,
        },
        {
          path: "/services/:id",
          element: <Service />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

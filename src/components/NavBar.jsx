import { useLocation, useNavigate, Link } from "react-router-dom";

function NavBar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="navbar bg-base-100 w-[95%] ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/home">Trang chủ</Link>
            </li>
            <li>
              <Link to="/chat">Trò chuyện</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/noti">Notifications</Link>
            </li>
            <li>
              <Link to="/faq">FAQs</Link>
            </li>
            <li>
              <Link to="/issue">Báo lỗi/ Góp ý</Link>
            </li>
          </ul>
        </div>
        <a
          onClick={() => navigate("/home")}
          className="btn btn-ghost normal-case font-extrabold text-2xl bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1280px]:!tracking-normal [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]"
        >
          GluTis Chatbot
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold ">
          <li className="p-1">
            <button
              onClick={() => navigate("/home")}
              className={
                location.pathname === "/home" ? "btn btn-outline btn-primary" : ""
              }
            >
              Trang chủ
            </button>
          </li>
          <li className="p-1">
            <button
              onClick={() => navigate("/dashboard")}
              className={
                location.pathname === "/dashboard" ? "btn btn-outline btn-primary" : ""
              }
            >
              Dashboard
            </button>
          </li>
          <li className="p-1">
            <button
              onClick={() => navigate("/chat")}
              className={
                location.pathname === "/chat" ? "btn btn-outline btn-primary" : ""
              }
            >
              Trò chuyện
            </button>
          </li>
          <li className="p-1">
            <button
              onClick={() => navigate("/noti")}
              className={
                location.pathname === "/noti" ? "btn btn-outline btn-primary" : ""
              }
            >
              Notifications
            </button>
          </li>
          <li className="p-1">
            <button
              onClick={() => navigate("/faq")}
              className={
                location.pathname === "/faq" ? "btn btn-outline btn-primary" : ""
              }
            >
              FAQs
            </button>
          </li>
          <li className="p-1">
            <button
              onClick={() => navigate("/issue")}
              className={
                location.pathname === "/issue" ? "btn btn-outline btn-primary" : ""
              }
            >
              Báo lỗi/ Góp ý
            </button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <button
          onClick={onLogout}
          className="btn btn-outline btn-primary md:flex hidden"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default NavBar;

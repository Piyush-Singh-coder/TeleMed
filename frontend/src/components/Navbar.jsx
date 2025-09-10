import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom";

const Navbar = () => {
    const {authUser,logout} = useAuthStore();
  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-6">
      {/* Left side - Brand */}
      <div className="flex-1">
        <Link to= "/">
        <span className="font-bold normal-case text-xl text-primary">TeleMed +</span>
        </Link>
      </div>
     
      {/* Right side - Desktop buttons */}
      <div className="hidden md:flex gap-3">
        {
            authUser && (
                <>
                {
                  (authUser.role === "PATIENT" || authUser.role === "ADMIN") && (
                    <Link to={"/doctors"} >
                 <button className="btn btn-ghost btn-info">Doctors</button>
                </Link>
                  )
                }
                {
                  (authUser.role === "DOCTOR" || authUser.role === "ADMIN") && (
                    <Link to={"/dashboard"} >
                    <button className="btn btn-ghost btn-info" >Dashboard</button>
                    </Link>
                  )
                }

                <Link to={'/medicines'}  >
                <button className="btn btn-ghost btn-info">Medicines</button>
                </Link>

                <Link to={"/ai-consult"} >
                 <button className="btn btn-ghost btn-info">Consult</button>
                </Link>

                {
                  (authUser.role !== "ADMIN") &&
                  <Link to={"/profile"} >
                 <button className="btn btn-ghost btn-info">Profile</button>
                </Link> 
                }
                
                {
                  authUser.role === "ADMIN" && (
                    <Link to={"/doctor/approval"} >
                    <button className="btn btn-ghost btn-info" >Approval</button>
                    </Link>
                    
                  )
                }
                {
                  authUser.role === "ADMIN" && (
                    <Link to={"/medicines/add"} >
                    <button className="btn btn-ghost btn-info" >Add Med</button>
                    </Link>
                    
                  )
                }
                <button onClick={logout} className="btn btn-ghost btn-error">Logout</button>
                </>
            )
        }
      </div>

      {/* Right side - Mobile dropdown */}
      <div className="dropdown dropdown-end md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost m-1">
          ☰
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm"
        >
            {
                authUser && (
                    <li>
                        
                        {
                          authUser.role === "PATIENT" && (
                          <Link to={"/doctors"} >
                            <button>Doctors</button>
                          </Link>
                          )
                        }
                        {
                        authUser.role === "DOCTOR" && (
                          <Link to={"/dashboard"} >
                            <button>Dashboard</button>
                          </Link>
                          )
                        }
                        <Link to={'/medicines'} >
                          <button>Medicines</button>
                        </Link>

                        <Link to={"/ai-consult"} >
                          <button>Consult</button>
                        </Link>

                        <Link to={"/profile"} >
                          <button>Profile</button>
                        </Link>

                        <button onClick={logout}>Logout</button>
                     </li>
                )
            }
        </ul>
      </div>
    </div>
  )
}

export default Navbar

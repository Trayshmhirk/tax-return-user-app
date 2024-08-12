import { NavLink, Outlet, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const Profile = () => {
   const location = useLocation();
   // Function to get initials from a full name
   const getInitials = (name: string) => {
      const words = name.split(" ");
      const initials = words.map((word) => word.charAt(0));
      return initials.join("").toUpperCase();
   };

   const fullName = "Frank Micheal";

   // const initials = currentUser ? getInitials(currentUser.fullname) : "";
   const initials = getInitials("Frank Micheal");

   return (
      <>
         {location.pathname === "/profile" ? (
            <div className="flex flex-col gap-8 self-center">
               <div className="flex flex-col justify-center items-center gap-3 md:flex-row">
                  <div className="w-16 h-16 flex items-center justify-center bg-brightGray dark:bg-spanishGray text-eerieBlack font-semibold rounded-full">
                     {initials}
                  </div>
                  <p className="text-xl font-medium">{fullName}</p>
               </div>

               <div className="flex flex-col gap-4">
                  <NavLink
                     to="my-requests"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                  >
                     <span>My requests</span>
                     <FaAngleRight className="" />
                  </NavLink>
                  <NavLink
                     to="integrated-banks"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                  >
                     <span>Integrated bank accounts</span>
                     <FaAngleRight className="" />
                  </NavLink>
                  <NavLink
                     to="my-documents"
                     className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                  >
                     <span>My documents</span>
                     <FaAngleRight className="" />
                  </NavLink>
               </div>

               <div className="settings flex flex-col gap-3">
                  <h6 className="font-medium text-lg">Settings</h6>

                  <div className="flex flex-col gap-4">
                     <div
                        // onClick={handleShowFormModal}
                        className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark cursor-pointer hover-shadow-body"
                     >
                        <span>Change password</span>
                        <FaAngleRight className="" />
                     </div>
                     <NavLink
                        to="/terms-and-conditions"
                        className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                     >
                        <span>Terms and conditions</span>
                        <FaAngleRight className="" />
                     </NavLink>

                     <NavLink
                        to="/faq"
                        className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                     >
                        <span>FAQ</span>
                        <FaAngleRight className="" />
                     </NavLink>
                     <NavLink
                        to="/help-and-support"
                        className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                     >
                        <span>Help and support</span>
                        <FaAngleRight className="" />
                     </NavLink>
                     <NavLink
                        to="/privacy-policy"
                        className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark hover-shadow-body"
                     >
                        <span>Privacy policy</span>
                        <FaAngleRight className="" />
                     </NavLink>
                     <div
                        // onClick={handleShowModal}
                        className="flex items-center justify-between bg-white dark:bg-gray text-eerieBlack dark:text-white py-3 px-5 rounded-lg no-underline shadow-md dark:shadow-md-dark cursor-pointer hover-shadow-body"
                     >
                        <span className="font-medium">Delete account</span>
                        <FaAngleRight className="" />
                     </div>
                  </div>
               </div>
            </div>
         ) : (
            <Outlet />
         )}
      </>
   );
};

export default Profile;

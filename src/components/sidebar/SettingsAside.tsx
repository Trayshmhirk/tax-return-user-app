import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PiNavigationArrowDuotone } from "react-icons/pi";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
   DialogFooter,
} from "@/components/ui/dialog";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import FormInput from "../form-components/FormInput";
import { IChangePasswordForm } from "@/types/AllTypes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/validation/schema";
import { ClipLoader } from "react-spinners";

const route = [
   { name: "Profile", route: "profile" },
   { name: "Privacy policy", route: "privacy-policy" },
   { name: "My requests", route: "my-requests" },
   { name: "Integrated banks", route: "integrated-banks" },
   { name: "My documents", route: "my-documents" },
   { name: "FAQ", route: "faq" },
   { name: "Help and support", route: "help-and-support" },
   { name: "Terms and conditions", route: "terms-and-conditions" },
];

const SettingsAside = () => {
   const location = useLocation();
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [selectedDropdownTitle, setSelectedDropdownTitle] =
      useState("Profile");
   const [isLoading, setIsLoading] = useState(false);
   const [loginError] = useState<string | null>(null);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<IChangePasswordForm>({
      resolver: yupResolver(changePasswordSchema),
   });

   useEffect(() => {
      // Find the matching route based on location.pathname and update the title
      const currentRoute = route.find((r) =>
         location.pathname.includes(r.route)
      );
      if (currentRoute) {
         setSelectedDropdownTitle(currentRoute.name);
      }
   }, [location.pathname]);

   const handleDropdownSelect = (route: string) => {
      setSelectedDropdownTitle(route);
      setIsDropdownOpen(false);
   };

   const onSubmit = async (data: IChangePasswordForm) => {
      console.log(data);
      setIsLoading(true);

      // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);

         setTimeout(() => {
            // Next after mock success
         }, 700);
      }, 2000); // Mock API call delay of 2 seconds}
   };

   return (
      <>
         <div className="relative mt-3 ml-2 lg:hidden">
            <button
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="bg-white dark:bg-gray w-56 h-11 py-3 px-6 text-center rounded-lg shadow-md dark:shadow-md-dark text-[15px] font-medium flex items-center gap-3"
            >
               <PiNavigationArrowDuotone className="text-lg text-gray dark:text-white" />
               {selectedDropdownTitle}
            </button>
            {isDropdownOpen && (
               <div className="absolute left-0 right-0 bg-white dark:bg-gray mt-2 w-56 rounded-lg shadow-md dark:shadow-md-dark z-10 overflow-hidden">
                  {route.map((route, index) => (
                     <NavLink
                        key={index}
                        className="block py-2 px-5 text-sm font-medium hover:bg-brightGray dark:hover:bg-spanishGray text-eerieBlack dark:text-white no-underline"
                        onClick={() => handleDropdownSelect(route.name)}
                        to={route.route}
                     >
                        {route.name}
                     </NavLink>
                  ))}
               </div>
            )}
         </div>

         <aside className="w-[185px] h-full hidden lg:block">
            <div className="h-[650px] flex flex-col gap-4 mt-4 px-2 overflow-scroll">
               <div className="flex flex-col gap-2">
                  <h2 className="font-medium">Settings</h2>

                  <nav className="flex flex-col gap-2">
                     <NavLink
                        to="profile"
                        className={`
                           flex items-center justify-between py-1 px-3 rounded-md no-underline
                           ${location.pathname === "/settings/profile" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-shadow"}
                        `}
                     >
                        <span className="text-sm">Profile</span>
                     </NavLink>

                     <Dialog>
                        <DialogTrigger asChild>
                           <div className="flex items-center justify-between bg-white dark:bg-gray text-mutedGray dark:text-white py-1 px-3 rounded-md no-underline cursor-pointer hover-shadow">
                              <span className="text-sm">Change password</span>
                           </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-md gap-5">
                           <DialogHeader>
                              <DialogTitle className="text-xl">
                                 Change Password
                              </DialogTitle>
                           </DialogHeader>
                           <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="flex flex-col gap-6"
                           >
                              <div className="flex flex-col gap-3 mb-auto">
                                 <FormInput<IChangePasswordForm>
                                    label="Old Password"
                                    type="password"
                                    register={register}
                                    name="oldPassword"
                                    placeholder="Enter old Password"
                                    error={errors}
                                 />
                                 <FormInput<IChangePasswordForm>
                                    label="New Password"
                                    type="password"
                                    register={register}
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    error={errors}
                                 />
                              </div>

                              {loginError && (
                                 <p className="text-red-500 text-center">
                                    {loginError}
                                 </p>
                              )}

                              <DialogFooter>
                                 <Button
                                    type="submit"
                                    className="w-full bg-richElectricBlue hover:bg-richElectricBlue hover:bg-opacity-85 dark:bg-richElectricBlue dark:hover:bg-richElectricBlue dark:hover:bg-opacity-80 text-white dark:text-white"
                                    // onClick={() => exportToPDF(transaction)}
                                 >
                                    {isLoading ? (
                                       <ClipLoader color="#ffffff" size={20} />
                                    ) : (
                                       "Save password"
                                    )}
                                 </Button>
                              </DialogFooter>
                           </form>
                        </DialogContent>
                     </Dialog>

                     <NavLink
                        to="privacy-policy"
                        className={`
                           flex items-center justify-between py-1 px-3 rounded-md no-underline
                           ${location.pathname === "/settings/privacy-policy" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-shadow"}
                        `}
                     >
                        <span className="text-sm">Privacy policy</span>
                     </NavLink>
                  </nav>
               </div>

               <div className="flex flex-col gap-2">
                  <h2 className="font-medium">Account overview</h2>

                  <nav className="flex flex-col gap-2">
                     <NavLink
                        to="my-requests"
                        className={`
                           flex items-center justify-between py-1 px-3 rounded-md no-underline
                           ${location.pathname === "/settings/my-requests" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-shadow"}
                        `}
                     >
                        <span className="text-sm">My requests</span>
                     </NavLink>

                     <NavLink
                        to="files"
                        className={`
                           flex items-center justify-between py-1 px-3 rounded-md no-underline
                           ${location.pathname === "/settings/files" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-shadow"}
                        `}
                     >
                        <span className="text-sm">Files</span>
                     </NavLink>
                  </nav>
               </div>

               <div className="flex flex-col gap-2">
                  <h2 className="font-medium">Support</h2>

                  <nav className="flex flex-col gap-2">
                     <NavLink
                        to="faq"
                        className={`
                           flex items-center justify-between py-1 px-3 rounded-md no-underline
                           ${location.pathname === "/settings/faq" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-shadow"}
                        `}
                     >
                        <span className="text-sm">FAQ</span>
                     </NavLink>
                     <NavLink
                        to="help-and-support"
                        className={`
                           flex items-center justify-between py-1 px-3 rounded-md no-underline
                           ${location.pathname === "/settings/help-and-support" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-shadow"}
                        `}
                     >
                        <span className="text-sm">Help and support</span>
                     </NavLink>
                  </nav>
               </div>

               <div className="flex flex-col gap-2">
                  <h2 className="font-medium">Legal</h2>

                  <nav className="">
                     <NavLink
                        to="terms-and-conditions"
                        className={`
                           flex items-center justify-between py-1 px-3 rounded-md no-underline
                           ${location.pathname === "/settings/terms-and-conditions" ? "bg-richElectricBlue text-white" : "bg-white dark:bg-gray text-mutedGray dark:text-white hover-shadow"}
                        `}
                     >
                        <span className="text-sm">Terms and conditions</span>
                     </NavLink>
                  </nav>
               </div>

               <div className="flex flex-col gap-2">
                  <h2 className="font-medium">Danger zone</h2>

                  <AlertDialog>
                     <AlertDialogTrigger asChild>
                        <div className="flex items-center justify-between bg-white dark:bg-gray text-mutedGray dark:text-white py-1 px-3 rounded-md no-underline cursor-pointer hover-shadow">
                           <span className="text-sm text-bostonRed dark:text-red-500">
                              Delete account
                           </span>
                        </div>
                     </AlertDialogTrigger>
                     <AlertDialogContent>
                        <AlertDialogHeader>
                           <AlertDialogTitle>
                              Are you absolutely sure?
                           </AlertDialogTitle>
                           <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                           </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                           <AlertDialogAction className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white dark:text-white">
                              Delete
                           </AlertDialogAction>
                        </AlertDialogFooter>
                     </AlertDialogContent>
                  </AlertDialog>
               </div>
            </div>
         </aside>
      </>
   );
};

export default SettingsAside;

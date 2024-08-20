import { AiOutlineEdit } from "react-icons/ai";

const Profile = () => {
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
      <div className="h-[600px] flex flex-col gap-7 mt-4 px-2 py-3 overflow-scroll">
         <h1 className="text-lg font-semibold">My Profile</h1>

         <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between p-4 border border-chineseWhite dark:border-opacity-50 rounded-xl">
               <div className="flex flex-col items-center gap-4 md:flex-row">
                  <div className="w-16 h-16 flex items-center justify-center bg-brightGray dark:bg-spanishGray text-eerieBlack font-semibold rounded-full">
                     {initials}
                  </div>

                  <div className="flex flex-col gap-1">
                     <p className="font-medium">{fullName}</p>
                     <p className="text-xs font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Harlex.mikkey@gmail.com
                     </p>
                     <p className="text-xs font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        {fullName}
                     </p>
                  </div>
               </div>

               <div className="flex items-center gap-1 px-3 py-1 border border-chineseWhite dark:border-opacity-50 rounded-2xl cursor-pointer hover-shadow">
                  <span className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                     Edit
                  </span>
                  <AiOutlineEdit className="text-sm  text-mutedGray dark:text-chineseWhite text-opacity-80" />
               </div>
            </div>

            {/*  */}
            <div className="flex flex-col gap-5 p-4 border border-chineseWhite dark:border-opacity-50 rounded-xl">
               <div className="flex flex-row justify-between gap-4">
                  <h2 className="font-semibold">My Profile</h2>

                  <div className="flex items-center gap-1 px-3 py-1 border border-chineseWhite dark:border-opacity-50 rounded-2xl cursor-pointer hover-shadow">
                     <span className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Edit
                     </span>
                     <AiOutlineEdit className="text-sm  text-mutedGray dark:text-chineseWhite text-opacity-80" />
                  </div>
               </div>

               <div className="flex flex-col gap-7">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           First Name
                        </p>
                        <p className="font-medium">Micheal</p>
                     </div>

                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           Last Name
                        </p>
                        <p className="font-medium">Frank</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           Email address
                        </p>
                        <p className="w-fit font-medium">
                           harlex.mikkey@gmail.com
                        </p>
                     </div>

                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           Phone
                        </p>
                        <p className="font-medium">+234 80 5571 2758</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           User category
                        </p>
                        <p className="font-medium">Individuals</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col gap-5 p-4 border border-chineseWhite dark:border-opacity-50 rounded-xl">
               <div className="flex flex-row justify-between gap-4">
                  <h2 className="font-semibold">Address</h2>

                  <div className="flex items-center gap-1 px-3 py-1 border border-chineseWhite dark:border-opacity-50 rounded-2xl cursor-pointer hover-shadow">
                     <span className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                        Edit
                     </span>
                     <AiOutlineEdit className="text-sm  text-mutedGray dark:text-chineseWhite text-opacity-80" />
                  </div>
               </div>

               <div className="flex flex-col gap-7">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           Country
                        </p>
                        <p className="font-medium">Nigeria</p>
                     </div>

                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           City/state
                        </p>
                        <p className="font-medium">Akure, Ondo</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           Postal code
                        </p>
                        <p className="font-medium">105690</p>
                     </div>

                     <div className="flex flex-col gap-1 flex-grow">
                        <p className="text-sm font-medium text-mutedGray dark:text-chineseWhite text-opacity-80">
                           Tax ID
                        </p>
                        <p className="font-medium">Wd638H748</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Profile;

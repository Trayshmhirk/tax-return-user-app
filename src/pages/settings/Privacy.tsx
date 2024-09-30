const Privacy = () => {
   return (
      <>
         <h1 className="text-lg font-bold">Privacy policy</h1>

         <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">Introduction</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>
                     Welcome to Tax Returns Privacy Policy. We value your
                     privacy and are committed to protecting your personal
                     information while using our tax return services.
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">Information We Collect</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>We may collect the following types of information:</p>
                  <ul className="list-disc pl-5">
                     <li>Personal Information (Name, Email, Phone number)</li>
                     <li>
                        Tax-related Information (Income, Deductions, Filing
                        Status)
                     </li>
                     <li>
                        Usage Data (IP address, browser type, pages visited)
                     </li>
                  </ul>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">How We Use Your Information</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>We use your information to:</p>
                  <ul className="list-disc pl-5">
                     <li>Provide and maintain our tax return services</li>
                     <li>Process your tax returns</li>
                     <li>
                        Communicate with you regarding your account or support
                     </li>
                  </ul>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">Data Security</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>
                     We take the security of your personal information seriously
                     and employ various measures to protect it from unauthorized
                     access, alteration, or disclosure.
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">Sharing of Data</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>
                     We do not share your personal information with third
                     parties except as necessary to complete your tax return or
                     as required by law.
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">Your Rights</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>
                     You have the right to access, update, or delete your
                     personal data. To exercise these rights, please contact us
                     at @taxreturns.com.
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">Changes to This Policy</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>
                     We may update this Privacy Policy from time to time. We
                     will notify you of any changes by posting the new policy on
                     our website.
                  </p>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <h2 className="font-semibold">Contact Us</h2>

               <div className="flex flex-col gap-3 text-sm">
                  <p>
                     If you have any questions about this Privacy Policy, please
                     contact us at @taxreturns.com.
                  </p>
               </div>
            </div>
         </section>
      </>
   );
};

export default Privacy;

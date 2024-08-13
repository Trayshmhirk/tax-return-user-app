import { useNavigate } from "react-router-dom";
import FilingCard from "../components/FilingCard";
import { CardType } from "../types/AllTypes";
import { filings } from "../mocks/AllMockData";

const PreviousFiling = () => {
   const navigate = useNavigate();
   const colorPalette = ["#62C3DB", "#0F6074", "#121212"];

   // useEffect(() => {
   //    const fetchFilings = async () => {
   //       const { email, token } = userProfile;
   //       try {
   //          const res = await getFilings(email, token);

   //          if (res.status === 200) {
   //             dispatch(setFilings(res.data.previous_filling));
   //          }
   //       } catch (error) {
   //          console.error(error);
   //          // You can also check error.response to see the server's response
   //          if (error.response) {
   //             console.error("Error response from server:", error.response);
   //          }
   //       }
   //    };

   //    fetchFilings();
   // }, [dispatch, userProfile]);

   const handleCreateNewFiling = () => {
      // setModalData({
      //    show: true,
      //    title: "Upload previous filing",
      //    onClose: () => {
      //       setModalData({ show: false });
      //    },
      //    onConfirm: async (file) => {
      //       const base64File = await getBase64(file);
      //       // in megabytes
      //       const fileSizeInBytes = file.size;
      //       const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
      //       const { email, token } = userProfile;
      //       try {
      //          const uploadResponse = await api.post(
      //             "/create-previous-filling",
      //             {
      //                year: "2024",
      //                file: base64File,
      //                size: fileSizeInMB,
      //                type: file.type,
      //                name: file.name,
      //             },
      //             {
      //                headers: {
      //                   useremail: email,
      //                   usertoken: token,
      //                },
      //             }
      //          );
      //          // If upload is successful, add the new document to the Redux state
      //          if (uploadResponse.status === 200) {
      //             // Optionally fetch the updated list of documents from the server
      //             const updatedFilings = await getFilings(email, token);
      //             dispatch(setFilings(updatedFilings.data.previous_filling));
      //             setConfirmationModal({
      //                show: true,
      //                title: "Your previous filing has been created successful",
      //                content:
      //                   "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      //                onClose: () => {
      //                   setConfirmationModal({ show: false });
      //                },
      //             });
      //          }
      //       } catch (error) {
      //          console.error("API Error:", error);
      //          // Handle error, log it, or display a user-friendly message
      //       }
      //    },
      // });
   };

   const handleFilingCardClick = (filing: CardType | undefined) => {
      if (filing) {
         navigate("/previous-filing/view-filing", {
            state: { data: filing },
         });
      }
   };

   return (
      <div className="flex flex-col gap-7">
         <div className="w-full flex flex-wrap gap-4">
            <FilingCard
               isAddNew
               handleClick={handleCreateNewFiling}
               color=""
               cardName=""
               cardNumber={0}
               cardText=""
            />

            {filings.length ? (
               <>
                  {filings.map((filing, index) => (
                     <FilingCard
                        key={index}
                        card={filing}
                        handleClick={() => handleFilingCardClick(filing)}
                        color={colorPalette[index % colorPalette.length]}
                        cardName={filing.cardName}
                        cardNumber={filing.cardNumber}
                        cardText={filing.cardText}
                     />
                  ))}
               </>
            ) : (
               <p className="w-full pending-text text-center">
                  No previous filings to show here
               </p>
            )}
         </div>
      </div>
   );
};

export default PreviousFiling;

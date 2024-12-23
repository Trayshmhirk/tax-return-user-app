import { useForm } from "react-hook-form";
import Forms from "../Forms";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { getBase64 } from "../../../helpers/getBase64";
import { FileUploadProgress } from "../../common/FIleUploadProgress";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UploadForm = ({
   onPrev,
   currentForm,
   formSuccess,
   setFormSuccess,
}: UploadFormPropTypes) => {
   const { handleSubmit } = useForm();
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState(false);
   const [uploadProgress, setUploadProgress] = useState<number[]>([]);
   const [selectedFiles, setSelectedFiles] = useState<
      { file: File; base64: string | ArrayBuffer | null; sizeInMB: number }[]
   >([]);
   const [error, setError] = useState<string | null>(null);

   const handleFileUpload = async (
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
   ) => {
      const files = Array.from(e.target.files || []);
      const filesWithBase64 = await Promise.all(
         files.map(async (file) => ({
            file,
            base64: await getBase64(file),
            sizeInMB: parseFloat((file.size / (1024 * 1024)).toFixed(2)),
         }))
      );

      // Update selected files state
      setSelectedFiles((prevFiles) => {
         const updatedFiles = [...prevFiles];
         updatedFiles[index] = filesWithBase64[0]; // Assuming one file per upload field
         return updatedFiles;
      });

      // Initialize progress for each file
      setUploadProgress((prevProgress) => {
         const updatedProgress = [...prevProgress];
         updatedProgress[index] = 0; // Reset progress for the file
         return updatedProgress;
      });

      // Simulate file upload progress
      simulateUploadProgress(index);
   };

   const simulateUploadProgress = (index: number) => {
      const simulationInterval = 500; // in milliseconds
      const totalSimulationSteps = 5;

      for (let step = 1; step <= totalSimulationSteps; step++) {
         setTimeout(() => {
            const progress = (step / totalSimulationSteps) * 100;
            setUploadProgress((prevProgress) => {
               const updatedProgress = [...prevProgress];
               updatedProgress[index] = parseFloat(progress.toFixed(1));
               return updatedProgress;
            });
         }, step * simulationInterval);
      }
   };

   const onSubmit = async () => {
      // Profile picture validation
      if (!selectedFiles[0]?.file) {
         setError("Please upload a profile picture.");
         return;
      }

      setIsLoading(true);

      // Prepare documents array
      const documents = selectedFiles.map((fileData) => ({
         document_name: fileData.file.name,
         document: fileData.base64,
         size: fileData.sizeInMB,
         type: fileData.file.type,
      }));

      // Simulate API call with setTimeout
      setTimeout(() => {
         setIsLoading(false);
         documents;
         setFormSuccess(true);
         setError("");

         if (documents) {
            setTimeout(() => {
               // Navigate after mock success
               navigate("/");
            }, 700);
         }
      }, 2000);
   };

   const handlePrevForm = () => {
      onPrev && onPrev();
   };

   return (
      <Forms
         handleSubmit={handleSubmit(onSubmit)}
         title="Upload Files"
         description=""
         isCurrentForm={currentForm}
         isFormSuccess={formSuccess}
      >
         <div className="flex flex-col gap-4 mb-auto mt-2">
            {/* First Upload Field */}
            <label
               htmlFor="profile-photo"
               className="p-4 bg-white dark:bg-gray rounded-md shadow-md dark:shadow-md-dark"
            >
               {selectedFiles[0]?.file ? (
                  <FileUploadProgress
                     file={selectedFiles[0].file}
                     progress={uploadProgress[0]}
                     fileSizeInMB={selectedFiles[0].sizeInMB}
                  />
               ) : (
                  <>
                     <input
                        id="profile-photo"
                        type="file"
                        accept=".pdf, .png, .jpg, .jpeg"
                        onChange={(e) => handleFileUpload(e, 0)}
                        className="hidden"
                     />
                     <p className="font-medium">Upload Profile Photo</p>
                  </>
               )}
            </label>

            {/* Second Upload Field */}
            <label
               htmlFor="tax-doc"
               className="p-4 bg-white dark:bg-gray rounded-md shadow-md dark:shadow-md-dark"
            >
               {selectedFiles[1]?.file ? (
                  <FileUploadProgress
                     file={selectedFiles[1].file}
                     progress={uploadProgress[1]}
                     fileSizeInMB={selectedFiles[1].sizeInMB}
                  />
               ) : (
                  <>
                     <input
                        id="tax-doc"
                        type="file"
                        accept=".pdf, .png, .jpg, .jpeg"
                        onChange={(e) => handleFileUpload(e, 1)}
                        className="hidden"
                     />
                     <p className="font-medium">Upload Tax Reform Document</p>
                  </>
               )}
            </label>
         </div>

         {error && (
            <div className="text-bostonRed dark:text-red-500 text-center">
               {error}
            </div>
         )}
         <div className="w-full flex gap-4 text-center">
            <Button
               type="button"
               onClick={handlePrevForm}
               className="w-full bg-transparent text-richElectricBlue border border-richElectricBlue"
            >
               Previous
            </Button>
            <Button type="submit" className="w-full" disabled={isLoading}>
               {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Submit"}
            </Button>
         </div>
      </Forms>
   );
};

export default UploadForm;

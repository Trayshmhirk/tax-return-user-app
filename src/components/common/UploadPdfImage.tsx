import { IoCloudUploadOutline } from "react-icons/io5";

type UploadPdfProps = {
   handleFileUpload?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const UploadPdfImage = ({ handleFileUpload }: UploadPdfProps) => {
   return (
      <label className="h-36 flex flex-col justify-center items-center gap-2 bg-bubbles dark:bg-mutedGray text-xl text-richElectricBlue dark:text-white font-medium shadow-md dark:shadow-md-dark rounded cursor-pointer">
         <IoCloudUploadOutline className="w-8 h-8" />
         <input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            onChange={handleFileUpload}
            className="hidden"
         />
         <p className="">Upload pdf or image</p>
      </label>
   );
};

export default UploadPdfImage;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactTyped } from "react-typed";
import AOS from "aos";
import { useEffect, useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { db } from "../../db";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../components/Loader";

const contactSchema = z.object({
  fullname: z
    .string()
    .min(3, { message: "Fullname must be at least 3 characters long." })
    .max(14, { message: "Fullname cannot exceed 14 characters." }),

  email: z.string().email({ message: "Please enter a valid email address." }),
});

const Hero = () => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [formData, setFormData] = useState<any>({
    fullname: "",
    email: "",
  });
  const [errors, setErrors] = useState<any>(
    {}
  );
console.log(errors)
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevState:any) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate the individual field on change
    validateField(name, value);
  };

  // Handle blur for validation
  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Validate individual fields
  const validateField = (name: string, value: string) => {
    const fieldData = { ...formData, [name]: value };

    const result = contactSchema.safeParse(fieldData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string[] | undefined } = result.error.formErrors.fieldErrors;
      setErrors((prevErrors:any) => ({
        ...prevErrors,
        [name]: fieldErrors[name]?.[0],
      }));
    } else {
      setErrors((prevErrors:any) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSignedUp = async () => {
    setIsLoading(true);

    // Validate the full form
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      toast.error("সঠিকভাবে সব ক্ষেত্র পূরণ করুন.");
      setIsLoading(false);
      return;
    }

    // Submit to Firebase
    try {
      await addDoc(collection(db, "waitlistBangla"), formData);
      toast.success(
        "অপেক্ষা তালিকায় যোগদানের জন্য ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করা হবে.",
        {
          duration: 4000,
          position: "top-center",
        }
      );

      // Reset form and errors
      setFormData({
        fullname: "",
        email: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding data:", error);
      toast.error("ডেটা যোগ করার সময় ত্রুটি৷ আবার চেষ্টা করুন.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <section
      id="home"
      className="z-30 h-screen w-full  justify-center overflow-hidden flex bg-primary"
    >
      <div className="relative w-full overflow-hidden ">
        <div className="absolute mix-blend-screen  animate-delay-2000 animate-blob filter blur-2xl   opacity-40 top-0 left-0 w-[50%] h-[30%] rounded-full bg-indigo-900"></div>
        <div className="absolute mix-blend-screen  animate-delay-2000 animate-blob filter blur-2xl   opacity-40 top-0 right-0  w-[50%] h-[30%] rounded-full bg-green-900"></div>
        <div className="absolute mix-blend-screen  animate-delay-4000 animate-blob filter blur-2xl   opacity-20  top-8 left-[25%] w-[50%] h-[30%] rounded-full bg-onPrimary"></div>
      </div>
      <div className="absolute  top-0 left-0 flex flex-col  items-center gap-12 justify-center w-full h-full  text-textSecondary">
        <h1 className="text-3xl md:text-5xl text-center font-semibold text-white capitalize leading-snug tracking-wider">
          <ReactTyped
            fadeOut={true}
            stopped={false}
            loopCount={1}
            typeSpeed={40}
            loop={true}
            strings={["প্রিয়জনদের টাকা পাঠাতে চান?", "ভবিষ্যতের জন্য সঞ্চয় করতে চান?"]}
          />
        </h1>
        <div className="flex flex-col gap-4 trext-center justify-center items-center">
          <p className="text-lg md:text-xl text-gray-300">আমরা আপনাকে সাহায্য করতে পারি।</p>
          <p className="text-lg md:text-xl text-gray-300">
          সহজ। সহজলভ্য । বিশ্বস্ত {" "}
            <span className="text-white font-semibold">কোনো লুকানো ফি নেই.</span>
          </p>
          <p className="text-lg md:text-xl text-gray-300">
            <span className="text- font-semibold">ভিশন এক্স</span>
          </p>
          <p className="text-lg md:text-xl font-medium text-gray-200">
          ভিআইপি ওয়েটিং লিস্টে যোগ দিন{" "}
            <span className="text-indigo-500 font-bold">ভিআইপি ওয়েটিং লিস্ট</span>.
          </p>
        </div>
        <div className="input-wrapper ">
          <svg
            className="icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g data-name="Layer 2">
              <g data-name="inbox">
                <rect
                  width="24"
                  height="24"
                  transform="rotate(180 12 12)"
                  opacity="0"
                ></rect>
                <path d="M20.79 11.34l-3.34-6.68A3 3 0 0 0 14.76 3H9.24a3 3 0 0 0-2.69 1.66l-3.34 6.68a2 2 0 0 0-.21.9V18a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-5.76a2 2 0 0 0-.21-.9zM8.34 5.55a1 1 0 0 1 .9-.55h5.52a1 1 0 0 1 .9.55L18.38 11H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 0-1-1H5.62z"></path>
              </g>
            </g>
          </svg>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
            placeholder="নামের প্রথম অংশ"
          />
        

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
            placeholder="ইমেইল"
          />
          

          <button onClick={handleSignedUp} className="Subscribe-btn w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="10"
              viewBox="0 0 38 15"
              className="arrow"
            >
              <path d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"></path>
            </svg>
            সাইন আপ
          </button>
        </div>
      </div>
      {isLoading && <Loader />}
    </section>
  );
};
export default Hero;
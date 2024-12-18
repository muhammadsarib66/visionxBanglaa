import  { useState, useEffect } from 'react';
import "./Loader.css"

const ProgressLoader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // Adjust the speed of progress

    return () => clearInterval(interval);
  }, []);

  return (
    <>

    <div className="w-full h-screen flex flex-col justify-center items-center gap-8 backdrop-blur-md z-50 fixed left-0 top-0 ">
        <div className="flex items-center h-fit w-fit justify-center">

<div className="loader">
  <span></span>
</div>

    </div>
    <div className=" relative top-0  w-1/4 bg-textSecondary  rounded-full h-4">
            
            <div
              className="bg-onPrimary h-4 flex items-center justify-center  rounded-full"
              style={{ width: `${progress}%` }}
            >

            </div>
          <p className="absolute text-center w-full top-0 left-0 text-xs text-textPrimary">{progress}%</p>
          </div>
            <p className=" text-textSecondary text-center font-semibold text-xs  ">  Please Stay Calm While Loading Vison X EcoSystem</p>
    </div>
    
    </>

      
  );
};

export default ProgressLoader;

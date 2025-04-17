import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    <div className="w-full h-[350px] flex justify-center md:gap-5 min-h[350px]">
      {imageIndex !== null && (
        <div className="absolute w-full z-[99999] top-0 left-0 bg-black flex items-center justify-between gap-6">
          <div className="md:flex-1 flex items-center justify-center cursor-pointer" onClick={() => changeSlide("left")}>
            <img src="arrow.png" className="w-5 md:w-10 ml-2 md:ml-8"/>
          </div>
          <div className="md:flex-10 flex w-[50%] ">
            <img src={images[imageIndex]} alt="" className="w-full h-[97vh] object-cover"/>
          </div>
          <div className="arrow md:flex-1 flex items-center justify-center" onClick={() => changeSlide("right")}>
            <img src="arrow.png" className="w-5 md:w-10 rotate-180 absolute cursor-pointer"/>
          </div>
          <div onClick={() => setImageIndex(null)} className='absolute -top-10 -right-5 text-white font-bold text-2xl p-12 cursor-pointer'>
            X
          </div>
        </div>
      )}

      <div className="flex sm:flex-row flex-col gap-4 min-h[350px]">

        <div className="">
          <img src={images[0]} alt="" onClick={() => setImageIndex(0)} className="h-[250px] w-[450px] sm:w-[500px] sm:h-[350px] object-cover rounded-lg cursor-pointer shadow-md shadow-gray-400"/>
        </div>
        <div className=" flex sm:flex-col justify-between sm:gap-5 gap-2">
          {images.slice(1).map((image, index) => (
            <img
            className="w-[230px] object-cover rounded-lg cursor-pointer h-[70px] sm:h-[100px]"
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Slider;
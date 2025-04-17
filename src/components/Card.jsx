import { Link } from "react-router-dom";
import { MdOutlineBedroomParent } from "react-icons/md";
import { GiBathtub } from "react-icons/gi";
import { BsChatLeftText } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";

function Card({ item }) {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg overflow-hidden transition-shadow duration-300 mb-5">

      <Link to={`/${item._id}`} className="block">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      </Link>


      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          <Link to={`/${item.id}`} className="hover:text-blue-500">
            {item.title}
          </Link>
        </h2>

        <p className="text-sm text-gray-600 flex items-center mb-4">
          <IoLocationOutline alt="location pin" className="h-4 w-4 mr-2" />
          {item.address}
        </p>

        <p className="text-xl font-bold text-yellow-500 mb-4">₹ {item.price}</p>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <MdOutlineBedroomParent className="h-4 w-4 mr-1" />
              <span>{item.bedroom} Bedroom</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <GiBathtub className="h-4 w-4 mr-1"/>
              <span>{item.bathroom} Bathroom</span>
            </div>
          </div>

          <div className="flex gap-4">
            {/* <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <img src="./save.png" alt="save icon" className="h-5 w-5" />
            </button> */}
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer">
              <BsChatLeftText alt="chat icon" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

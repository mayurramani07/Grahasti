import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex gap-4 pr-10">
          <img src={item.images[0]} alt="" className="h-[65px] w-[50px] rounded-sm object-cover"/>
          <div className="flex flex-col justify-between w-30 ">
            <Link to={`/${item._id}`} className="w-30">{item.title}</Link>
            <span>{item.bedroom} bedroom</span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
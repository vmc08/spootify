import { FC } from "react";
import "../styles/_discover-item.scss";

interface IDiscoverItemProps {
  name: string;
  images: Array<{ url: string }>;
}

const DiscoverItem: FC<IDiscoverItemProps> = ({ images, name }) => {
  return (
    <div className="discover-item animate__animated animate__fadeIn">
      <div
        className="discover-item__art"
        style={{ backgroundImage: `url(${images[0].url})` }}
      />
      <p className="discover-item__title">{name}</p>
    </div>
  );
};

export default DiscoverItem;

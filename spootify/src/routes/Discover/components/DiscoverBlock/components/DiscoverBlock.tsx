import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { TResponse } from "types/spotify";
import DiscoverItem from "./DiscoverItem";
import "../styles/_discover-block.scss";

interface IDiscoverBlockProps {
  id: string;
  text: string;
  response?: TResponse;
}

function scrollContainer(id: string, isNegative = false) {
  return () => {
    const scrollableContainer = document.getElementById(id);
    if (!scrollableContainer) return;
    const amount = isNegative
      ? -scrollableContainer.offsetWidth
      : scrollableContainer.offsetWidth;

    scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
  };
}

const DiscoverBlock: FC<IDiscoverBlockProps> = ({ text, id, response }) => {
  const data = response?.data || [];
  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {data.length ? (
          <div className="animate__animated animate__fadeIn">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={scrollContainer(id, true)}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={scrollContainer(id)}
            />
          </div>
        ) : null}
      </div>
      <div className="discover-block__row" id={id}>
        {data.map(({ images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverBlock;

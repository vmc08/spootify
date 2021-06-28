import { FC, useRef } from "react";
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
  data?: TResponse;
}

const DiscoverBlock: FC<IDiscoverBlockProps> = ({ text, id, data }) => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (isNegative = false) => {
    if (!scrollableContainerRef.current) return;
    const amount = isNegative
      ? -scrollableContainerRef.current.offsetWidth
      : scrollableContainerRef.current.offsetWidth;

    scrollableContainerRef.current.scrollLeft =
      scrollableContainerRef.current.scrollLeft + amount;
  };

  const dataResult = data?.data || [];

  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {dataResult.length ? (
          <div className="animate__animated animate__fadeIn">
            <FontAwesomeIcon
              icon={faChevronLeft}
              onClick={() => scrollContainer(true)}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={() => {
                scrollContainer();
                if (scrollableContainerRef.current) {
                  const { scrollLeft, scrollWidth, clientWidth } =
                    scrollableContainerRef.current;
                  if (scrollLeft === scrollWidth - clientWidth) {
                    alert("fire query");
                  }
                }
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="discover-block__row" id={id} ref={scrollableContainerRef}>
        {dataResult.map(({ images, name }) => (
          <DiscoverItem key={name} images={images} name={name} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverBlock;

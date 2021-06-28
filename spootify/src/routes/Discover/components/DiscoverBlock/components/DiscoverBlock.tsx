import { FC, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { TResponse } from "types/spotify";
import DiscoverItem from "./DiscoverItem";
import "../styles/_discover-block.scss";
import { TQueryParams } from "hooks/useSpotify";

interface IDiscoverBlockProps {
  id: string;
  text: string;
  response?: TResponse;
  fetchMore: (params: TQueryParams) => Promise<TResponse>;
  pageNum: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const DiscoverBlock: FC<IDiscoverBlockProps> = ({
  text,
  id,
  response,
  fetchMore,
  pageNum,
  setPage,
}) => {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const scrollContainer = (isNegative = false) => {
    if (!scrollableContainerRef.current) return;
    const amount = isNegative
      ? -scrollableContainerRef.current.offsetWidth
      : scrollableContainerRef.current.offsetWidth;

    scrollableContainerRef.current.scrollLeft =
      scrollableContainerRef.current.scrollLeft + amount;
  };

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
              onClick={() => scrollContainer(true)}
            />
            <FontAwesomeIcon
              icon={faChevronRight}
              onClick={async () => {
                scrollContainer();
                if (scrollableContainerRef.current) {
                  const { scrollLeft, scrollWidth, clientWidth } =
                    scrollableContainerRef.current;
                  if (
                    scrollLeft === scrollWidth - clientWidth &&
                    response?.next
                  ) {
                    fetchMore({ page: pageNum + 1, callback: scrollContainer });
                    setPage(pageNum + 1);
                  }
                }
              }}
            />
          </div>
        ) : null}
      </div>
      <div className="discover-block__row" id={id} ref={scrollableContainerRef}>
        {data.map(({ images, name }, idx) => (
          <DiscoverItem key={`${name}-${idx}`} images={images} name={name} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverBlock;

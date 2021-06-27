import cx from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch,
  faStream,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { ReactComponent as Avatar } from "assets/images/avatar.svg";
import "./_sidebar.scss";
import useAccount from "store/account/useAccount";

function renderSideBarOption(
  link: string,
  icon: IconProp,
  text: string,
  selected = false
) {
  return (
    <div
      className={cx("sidebar__option", {
        "sidebar__option--selected": selected,
      })}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  );
}

export default function SideBar() {
  const { accountState } = useAccount();
  const avatar = accountState?.images[0].url;
  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {avatar && (
          <img
            className="sidebar__profile__avatar"
            src={avatar}
            alt={accountState?.display_name}
            draggable={false}
          />
        )}
        <p>{accountState?.display_name}</p>
      </div>
      <div className="sidebar__options">
        {renderSideBarOption("/", faHeadphonesAlt, "Discover", true)}
        {renderSideBarOption("/search", faSearch, "Search")}
        {renderSideBarOption("/favourites", faHeart, "Favourites")}
        {renderSideBarOption("/playlists", faPlayCircle, "Playlists")}
        {renderSideBarOption("/charts", faStream, "Charts")}
      </div>
    </div>
  );
}

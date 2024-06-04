import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PopularSetMenuModal from "./PopularSetMenuModal";
import PageTitle from "./PageTitle";

export default function PopularSetMenuProduct({ depth2 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setAnimationClass("show-modal-animation");
      }, 10);

      return () => clearTimeout(timer);
    } else {
      setAnimationClass("");
    }
  }, [isModalOpen]);

  // 모달을 여는 함수
  const openModal = () => {
    setIsModalOpen(true);
  };

  // 모달을 닫는 함수
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [props, setprops] = useState({
    title: "메뉴",
    breadcrumb: "사이드디시",
    breadcrumbLink: "/pizzas",
    nav1: "피자",
    nav2: "하프앤하프",
    nav3: "사이드디시",
    nav4: "인기세트메뉴",
    link1: "/pizzas",
    link2: "/menu/halfnhalf",
    link3: "/sides",
    link4: "/popular",
  });

  return (
    <div className="content">
      <PageTitle props={props} depth2={depth2} />
      <div className="popular-set-menu">
        <div className="popular-set-menu-image">
          <img
            src="https://cdn.dominos.co.kr/admin/upload/event/20230519_217DoRW3.jpg"
            alt="combo"
          />
        </div>
        <div className="popular-set-menu-box">
          <div className="popular-set-menu-title">콤보 밀</div>
          <div className="popular-set-menu-title-date">
            2023-05-19 ~ 2024-06-30
          </div>
        </div>
        <button className="popular-modal-button" onClick={openModal}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
        {isModalOpen && (
          <PopularSetMenuModal
            onClose={closeModal}
            className={`modal ${animationClass}`}
          />
        )}
      </div>
    </div>
  );
}

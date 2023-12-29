import React from "react";

const CardAuthorAva = ({ size = 12, src }) => {
  return (
    <img
      src={
        src
          ? src
          : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
      }
      className={`w-12 h-12 rounded-full`}
    />
  );
};

export default CardAuthorAva;

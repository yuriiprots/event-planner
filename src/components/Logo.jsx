import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Logo() {
  return (
    <div className="flex justify-center">
      <Link to="/">
        <img
          src={import.meta.env.BASE_URL + "/assets/logo_light.png"}
          alt="Logo"
          height={120}
          width={120}
        />
      </Link>
    </div>
  );
}

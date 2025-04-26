// components/skillComponent/ManageSkillsButton.tsx
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ManageSkillsButton = () => {
  return (
    <Link href="/hub/me" passHref>
      <button
        className="relative flex items-center px-6 py-3 bg-gradient-to-r from-[#0f1c47] to-[#1a2b6b] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden cursor-pointer"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#1a2b6b] to-[#253a8f] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>

        <span className="relative flex items-center">
          <FontAwesomeIcon
            icon={faUserGear}
            className="mr-3 text-lg transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="font-medium tracking-wide">My Skill Profile</span>
        </span>

        <span className="absolute inset-0 overflow-hidden">
          <span className="absolute top-1/2 left-1/2 w-0 h-0 bg-white rounded-full opacity-20 group-active:animate-ripple"></span>
        </span>
      </button>
    </Link>
  );
};

export default ManageSkillsButton;

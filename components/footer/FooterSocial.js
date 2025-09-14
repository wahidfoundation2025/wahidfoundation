import { FaFacebook, FaYoutube } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { IoLogoLinkedin } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";

export default function FooterSocial({ socialLinks }) {
  if (!socialLinks) return null;

  return (
    <div className="flex flex-row gap-4 items-center">
      {socialLinks.facebook && (
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-gray-200"
        >
          <FaFacebook />
        </a>
      )}
      {socialLinks.instagram && (
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-gray-200"
        >
          <LuInstagram />
        </a>
      )}
      {socialLinks.linkedin && (
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-gray-200"
        >
          <IoLogoLinkedin />
        </a>
      )}
      {socialLinks.twitter && (
        <a
          href={socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-gray-200"
        >
          <RiTwitterXFill />
        </a>
      )}
      {socialLinks.youtube && (
        <a
          href={socialLinks.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl text-white hover:text-gray-200"
        >
          <FaYoutube />
        </a>
      )}
    </div>
  );
}

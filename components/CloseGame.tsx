import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function CloseGame() {
  return (
    <Link
      href="/work"
      className="fixed bottom-5 right-5 flex items-center gap-2 bg-red-500 text-gray-100 no-underline px-5 py-3 rounded-full z-50 hover:bg-red-600 transition-all duration-300 hover:scale-105"
    >
      <span className="text-sm font-medium">Close the game</span>
      <FontAwesomeIcon icon={faCircleXmark} className="w-5 h-5" />
    </Link>
  );
}

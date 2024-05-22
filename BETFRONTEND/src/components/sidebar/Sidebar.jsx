import { useState } from "react";
import { Link } from "react-router-dom";
import { privateRoutes } from "./navigation";
import { FaBars, FaTimes } from "react-icons/fa";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 space-y-6 py-7 px-2 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <nav>
          {privateRoutes.map(({ path, name, icon: Icon }) => (
            <Link
              to={path}
              key={path}
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              onClick={toggleSidebar}
            >
              <Icon className="inline-block mr-2" />
              {name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Sidebar;

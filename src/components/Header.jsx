import React, { useState } from "react";
import "./head.css";
import Logo from "../assests/Logo.png";

import Player from "./Player";
import useMediaRecorder from "@wmik/use-media-recorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToastContainer, toast } from "react-toastify";
import {
  faBars,
  faCopy,
  faVideoCamera,
  faVideoSlash,
  faMicrophoneLines,
  faMicrophoneLinesSlash,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

function Header({
  onVideoToggle,
  onAudioToggle,
  userId,
  showBoard,
  setShowBoard,
  showEditor,
  setshowEditor,
  onChangeBoard,
  showProblemsPage,
  setShowProblemsPage,
  onProblemPageChange,
  setIsSideDrawerOpen,
  isSideDrawerOpen,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [video, setVideo] = useState(true);
  const [audio, setAudio] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording,
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: "video/webm" },
    mediaStreamConstraints: { audio: true, video: true },
  });

  const handleSaveVideo = () => {
    const url = URL.createObjectURL(mediaBlob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "recorded-video.webm";
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Recording Downladed Successfully");
  };

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  function handleClick() {
    navigator.clipboard.writeText(window.location.href);
  }

  const toggleAudioCss = () => {
    setAudio(!audio);
  };

  const toggleVideoCss = () => {
    setVideo(!video);
  };
  const notify = () => toast("Wow so easy!");
  const handleBoard = () => {
    //
    setShowProblemsPage(false);
    setShowBoard(true);
    setshowEditor(false);
  };
  const handleProblems = () => {
    //
    setIsSideDrawerOpen(!isSideDrawerOpen);
    setShowBoard(false);
    setshowEditor(true);
    setShowProblemsPage(true);
  };

  const handleCode = () => {
    //  setShowProblemsPage(false);
    setshowEditor(true);
    setShowBoard(false);
  };
  const showNotify = (e) => {
    //  setShowProblemsPage(false);
    toast.success(e);
  };
  return (
    <div className="bg-purple-700 text-white">
      <nav className="flex items-center justify-between flex-wrap p-1">
        <div className="flex items-center flex-shrink-0">
          <h1 className="font-semibold text-3xl tracking-tight ml-2 mr-6">
            <img className="w-20 inline" src={Logo} />
            Code With Companion
          </h1>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-stone-100 border-gray-600 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon className="fa-xl" icon={faBars} />
          </button>
        </div>
        {showNotification && (
          <div className="bg-white rounded shadow-md absolute top-0 right-0 mt-16 mr-5 p-4">
            <p className="text-gray-800 mr-6">Room Url Copy</p>
            <button
              className="text-sm text-stone-100 hover:text-gray-800 absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
        )}
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:justify-end ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow lg:text-right">
            <a
              className="block mt-4 lg:inline-block lg:mt-0  cursor-pointer text-stone-100 hover:text-white mr-4"
              onClick={() => {
                onVideoToggle(userId);
                toggleVideoCss();
              }}
            >
              {video ? (
                <FontAwesomeIcon className="fa-xl" icon={faVideoCamera} />
              ) : (
                <FontAwesomeIcon className="fa-xl" icon={faVideoSlash} />
              )}
            </a>
            <a
              className="block mt-4 lg:inline-block lg:mt-0  cursor-pointer text-stone-100 hover:text-white mr-10"
              onClick={() => {
                onAudioToggle(userId);
                toggleAudioCss();
              }}
            >
              {audio ? (
                <FontAwesomeIcon
                  className="fa-xl"
                  size={70}
                  icon={faMicrophoneLines}
                />
              ) : (
                <FontAwesomeIcon
                  className="fa-xl"
                  icon={faMicrophoneLinesSlash}
                />
              )}
            </a>
            <div className="inline relative m-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center w-50 px-4 py-2 text-lg text-stone-100 rounded-md hover:bg-purple-400 focus:outline-none "
                id="options-menu"
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                <h1>Record Session &nbsp;</h1>
                {error ? `${status} ${error.message}` : status}
              </button>

              <div
                className={`${
                  isOpen ? "block" : "hidden"
                } absolute right-0 mt-2 rounded-md shadow-lg bg-purple-300 ring-1 ring-black ring-opacity-5`}
                aria-labelledby="options-menu"
                role="menu"
                aria-orientation="vertical"
              >
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-400 hover:text-gray-900"
                  onClick={() => {
                    getMediaStream();
                    showNotify("Screen Shared");
                  }}
                  disabled={status === "ready"}
                  role="menuitem"
                >
                  Share screen
                </a>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-400 hover:text-gray-900"
                  onClick={() => {
                    startRecording();
                    showNotify("Recording Started");
                  }}
                  disabled={status === "recording"}
                  role="menuitem"
                >
                  Start recording
                </a>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-400 hover:text-gray-900"
                  onClick={() => {
                    stopRecording();
                    showNotify("Recording Stopped");
                  }}
                  disabled={status !== "recording"}
                  role="menuitem"
                >
                  Stop recording
                </a>

                <Player srcBlob={mediaBlob} handleSaveVideo={handleSaveVideo} />
              </div>
            </div>

            <a
              className="block mt-4 text-lg lg:inline-block lg:mt-0 cursor-pointer text-stone-100 hover:text-white mr-10"
              onClick={() => {
                handleClick();
                showNotify("Copied");
              }}
            >
              <FontAwesomeIcon icon={faCopy} />
              <span className="ml-1">Room URL </span>
            </a>
            <button
              className="block mt-4 text-lg lg:inline-block lg:mt-0 text-stone-100 hover:text-white mr-4"
              onClick={() => handleCode()}
            >
              Code Editor
            </button>
            <button
              className="block mt-4 text-lg lg:inline-block lg:mt-0 text-stone-100 hover:text-white mr-4"
              onClick={() => {
                handleProblems();
              }}
            >
              Problem Statements
            </button>
            <button
              className="block mt-4 text-lg lg:inline-block lg:mt-0 text-stone-100 hover:text-white mr-4"
              onClick={() => {
                onChangeBoard(!showBoard);
                handleBoard();
              }}
            >
              Whiteboard
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;

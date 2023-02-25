import React, { useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { save } from "save-file";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faSave } from "@fortawesome/free-solid-svg-icons";

const ConfigBar = (props) => {
  useEffect(() => {}, [props.mode, props.code]);
  const handleSaveCode = async () => {
    if (props.modeForile === "cpp") {
      await save(props.code, "code.cpp");
    } else if (props.modeForile === "java") {
      await save(props.code, "code.java");
    } else if (props.modeForile === "python") {
      await save(props.code, "code.py");
    } else if (props.modeForile === "javascript") {
      await save(props.code, "code.js");
    } else if (props.modeForile === "c") {
      await save(props.code, "code.c");
    } else await save(props.code, "code.txt");
  };
  return (
    <div className="bg-purple-200 flex justify-between p-2">
      <Dropdown
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        placeholder="Theme"
        selection
        options={props.themes}
        onChange={(e, data) => props.handleOnChange(e, data)}
        defaultValue={props.themes[8].value}
      />
      <Dropdown
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        placeholder="Language"
        search
        selection
        options={props.languages}
        onChange={(e, data) => props.handleOnChange(e, data)}
        value={props.mode}
        style={{ minWidth: "7em" }}
      />
      <Dropdown
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        placeholder="Font Size"
        search
        selection
        options={props.fontSizes}
        onChange={(e, data) => props.handleOnChange(e, data)}
        defaultValue={props.fontSizes[4].value}
        style={{ minWidth: "5em" }}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded mr-2"
        onClick={() => props.handleDownloadCode()}
      >
        Save
        <FontAwesomeIcon className="ml-2" icon={faSave} />
      </button>
      <button
        className="bg-green-700 text-white font-bold px-4 rounded ml-auto"
        onClick={() => props.handleRunClick()}
      >
        <div
          className="inline"
          dangerouslySetInnerHTML={{ __html: props.status }}
        />
        <FontAwesomeIcon className="ml-2" icon={faLaptopCode} />
      </button>
    </div>
  );
};

export default ConfigBar;

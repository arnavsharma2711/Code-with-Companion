import React, { useState } from "react";
import ConfigBar from "./ConfigBar";
import AceEditor from "react-ace";
import SplitPane from "react-split-pane-v2";
import { languageToEditorMode } from "../config/mappings";
import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/ext-language_tools";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-rust";
import "ace-builds/src-noconflict/mode-kotlin";

import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-solarized_light";

//import "../css/Editor.css";
import { save } from "save-file";
import { Input } from "semantic-ui-react";
const languages = Object.keys(languageToEditorMode);
const fontSizes = [
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
  "24",
  "26",
  "28",
  "30",
  "32",
];
const themes = [
  "monokai",
  "github",
  "solarized_dark",
  "dracula",
  "eclipse",
  "tomorrow_night",
  "tomorrow_night_blue",
  "xcode",
  "ambiance",
  "solarized_light",
].sort();
var lang;
var font;
var theme;

const Editor = (props) => {
  const [theme2, setTheme] = useState("dracula");
  const [fontSize, setFontSize] = useState(16);
  const [modeForile, setModeForFile] = useState("cpp");
  let i = 0;
  lang = languages.map((language) => {
    i++;
    return { key: "" + i, text: language, value: language };
  });
  let j = 0;
  font = fontSizes.map((fontSize) => {
    j++;
    return { key: "" + j, text: fontSize, value: fontSize };
  });
  let k = 0;
  theme = themes.map((theme) => {
    k++;
    return { key: "" + k, text: theme, value: theme };
  });
  const handleOnChange = (e, data) => {
    if (data.placeholder === "Theme") {
      setTheme(data.value);
    } else if (data.placeholder === "Font Size") {
      setFontSize(parseInt(data.value));
    } else if (data.placeholder === "Language") {
      props.onChangeMode(data.value);
      setModeForFile(data.value);
    }
  };
  return (
    <React.Fragment>
      <ConfigBar
        mode={props.mode}
        status={props.status}
        handleOnChange={handleOnChange}
        languages={lang}
        fontSizes={font}
        themes={theme}
        code={props.code}
        modeForile={modeForile}
        handleRunClick={() => props.handleRunClick()}
        handleDownloadCode={() => props.handleDownload()}
      />
      <div className="flex">
        <SplitPane
          split="vertical"
          minSize={100}
          maxSize={window.innerWidth - 50}
          defaultSize={window.innerWidth * 0.5}
          style={{ position: "static" }}
        >
          <div>
            <div className="bg-zinc-700 p-1">
              <div className="text-white font-mono font-semibold">
                CODE HERE
              </div>
            </div>
            <AceEditor
              mode={props.mode}
              theme={theme2}
              fontSize={fontSize}
              value={props.code}
              onChange={(data) => props.onChangeCode(data)}
              width={"50vw"}
              height={"54.8vh"}
              showGutter={true}
              useWorker={false}
              editorProps={{ $blockScrolling: false }}
              setOptions={{
                enableLiveAutocompletion: true,
                enableSnippets: true,
              }}
            />
          </div>
          <div className="border-l-2">
            <div>
              <div className="bg-zinc-700 p-1">
                <div className="text-white font-mono font-semibold">
                  USER INPUT
                </div>
              </div>
              <AceEditor
                mode={"text"}
                theme={theme2}
                fontSize={fontSize}
                value={props.input}
                onChange={(data) => props.onChangeInput(data)}
                width={"100vw"}
                height={"25vh"}
                showGutter={true}
                useWorker={false}
                editorProps={{ $blockScrolling: false }}
                setOptions={{
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            </div>

            <div>
              <div className="bg-zinc-700 p-1">
                <div className="text-white font-mono font-semibold">
                  CODE OUTPUT
                </div>
              </div>

              <AceEditor
                mode={"text"}
                theme={theme2}
                fontSize={fontSize}
                value={props.output}
                onChange={(data) => props.onChangeOutput(data)}
                width={"100vw"}
                height={"25vh"}
                readOnly={true}
                showGutter={true}
                useWorker={false}
                editorProps={{ $blockScrolling: false }}
                setOptions={{
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                }}
              />
            </div>
          </div>
        </SplitPane>
      </div>
      <div className="w-90 p-2 text-white font-mono">
        <div className="text-2xl bg-zinc-700 p-1">EXPECTED OUTPUT</div>
        <pre id="expected" className="bg-zinc-500 p-2">
          {props.expected}
        </pre>
        <div className="">
          {props.passed == "" ? (
            <div></div>
          ) : props.passed == "passed" ? (
            <div className="bg-green-500 p-1">Test Case Passed</div>
          ) : (
            <div className="bg-red-700 p-1">Test Case Failed</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Editor;

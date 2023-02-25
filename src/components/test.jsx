import React, { Component } from "react";
import Header from "./Header";
import VideoBar from "./VideoBar";
import Editor from "./Editor";
import ProblemsPage from "./Problems/Problems";
import Footer from "./Footer";
import io from "socket.io-client";
import Peer from "peerjs";
import axios from "axios";
import "../css/App.css";
import { useEffect,useState } from "react";
import { save } from 'save-file'
import Board from "./Board";
import useMediaRecorder from '@wmik/use-media-recorder';
import Player from "./Player";
const myPeer = new Peer();
// https://code-with-companion-backend.onrender.com
// http://localhost:4000
const socket = io("https://code-with-companion-backend.onrender.com");
const peers = {};


const AppTest = ({roomId ,username}) => {
  let {
    error,
    status,
    mediaBlob,
    stopRecording,
    getMediaStream,
    startRecording
  } = useMediaRecorder({
    recordScreen: true,
    blobOptions: { type: 'video/webm' },
    mediaStreamConstraints: { audio: true, video: true }
  });

  const handleSaveVideo = () => {
    const url = URL.createObjectURL(mediaBlob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = url;
    a.download = 'recorded-video.webm';
    a.click();
    window.URL.revokeObjectURL(url);
  };



  const [resumeData, setResumeData] = useState({});

  useEffect(() => {
    fetch("/problems.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        
        setResumeData(data);
        console.log(resumeData);
      });
  }, []);
//alert(roomId)
const[peerStream2,setPeerStream2]=useState([]);
const[userId2,setUserId2]=useState("");
const[username2,setusername2]=useState(username)
const[Code2,setCode2]=useState("");
const [mode2,setMode2]=useState("cpp");
const[streamChange,setStreamChange]=useState({});
const[state,setState]=useState({
    userId: "",
      stream: {},
      peers: [],
      mode: "cpp",
      code: "",
      input: "",
      output: "",
      status: "RUN",
    });
    
    const[statusChanged,setStatusChanged]=useState("RUN");
    const [drawingMode,setDrawingMode]=useState(null);
    const [inputOnModeChange,setInputOnModeChange]=useState("");
     const [showBoard,setShowBoard]=useState(false);
     const [showProblems,setShowProblems]=useState(false);
      const [showEditor,setShowEditor]=useState(true);
      const [FixVideoPeers,setFixVideoPeers]=useState([]);
      const [showProblemsPage,setShowProblemsPage]=useState(false);
      // useEffect(()=>{
      //  const newData = peerStream2.forEach(el => {
      //     console.log(el.userId)

      //  })
      // // console.log(newData)
      //  console.log("Data fixed")
      //  console.log(FixVideoPeers)
      //  setFixVideoPeers(newData)

      // },[streamChange,peerStream2,userId2])
useEffect(()=>{
  myPeer.on("open", (id) => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
       setusername2(username)
        addUserIdAndStream(id, stream);
        addVideoStream(id, stream, false);
        socket.on("user-connected", (userId) => {
          connectToNewUser(userId, stream);
          console.log("USER")
          console.log(username)
          sendDatatoNewUser();
        });
        myPeer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            addVideoStream(call.peer, userVideoStream, false,username2);
          });
          call.on("close", () => {
            const peers = state.peers;
            var peersModified = peers.filter((peer) => {
              return peer.userId !== call.peer;
            });
            setState({ peers: peersModified });
          });
          peers[call.peer] = call;
        });
        socket.emit("join-room", roomId, id,username2);
        socket.on("receive code", (payload) => {
          updateCodeFromSockets(payload);
        });
        socket.on("whiteBoardDataResponse", (data) => {
          console.log(data)
          setDrawingMode(data.imgURL);
        });
        socket.on("receive input", (payload) => {
          updateInputFromSockets(payload);
        });
        socket.on("receive output", (payload) => {
          updateOutputFromSockets(payload);
        });
        socket.on("receive-data-for-new-user", (payload) => {
          updateStateFromSockets(payload);
        });
        socket.on("mode-change-receive", (payload) => {
          updateModeFromSockets(payload);
        });

        socket.on("board-change-receive", (payload) => {
          updateBoarddataFromSockets(payload);
        });
      });
  });
  socket.on("user-disconnected", (userId) => {
    if (peers[userId]) peers[userId].close();
  });
  addVideoStream();
},[]);

useEffect(()=>{
const changeCodeOnMode =()=>{
  if(mode2==="cpp"){
    setInputOnModeChange(
  `#include <iostream>
using namespace std;
int main() {
  cout<<"Hello World!";
  // your code goes here
  return 0;
}`);
    
    
  }else if(mode2==="java"){
setInputOnModeChange(`public class Main {
  public static void main(String args[]) {
      System.out.println("Hello World!");
  }
}`)
  }else if(mode2==="python" || mode2==="python3"){
setInputOnModeChange(`print("Hello World!")`)
  }else if(mode2==="c"){
setInputOnModeChange(`#include <stdio.h>
int main() {
    printf("Hello World!");
}
`)
  }
}
changeCodeOnMode();

},[mode2]);

const handleSaveCode= async()=>{
  console.log(state.code)
  console.log(state.mode)
  //  await save(state.code,  `code.`+`${state.mode}` )}
  if(mode2==="cpp"){
    let fileName = prompt("Enter File Name ", "code.cpp");
    await save(state.code,  fileName )}
  else if(mode2==="java"){
    let fileNameJ = prompt("Enter File Name ", "code.java");
    await save(state.code,  fileNameJ )}
  else if(mode2==="python"){
    let fileNameP = prompt("Enter File Name ", "code.py");
    await save(state.code,  fileNameP )}
  else if(mode2==="javascript"){
    let fileNameJS = prompt("Enter File Name ", "code.js");
    await save(state.code,  fileNameJS)}
  else if(mode2==="c"){
    let fileNameC = prompt("Enter File Name ", "code.c");
    await save(state.code,  fileNameC )}
  // else  
  // await save(state.code,  "code.txt" )
}

   const sendDatatoNewUser = () => {
        socket.emit("data-for-new-user", {
        //  newCode: state.code,
        newCode:inputOnModeChange,
          newInput: state.input,
          newOutput: state.output,
          newMode: state.mode,
          newDrawing:drawingMode,
          newBoard:showBoard,
          newUserName:username2

        });
      }
      const updateStateFromSockets =(payload) => {
       // setState({ code: payload.newCode });
        setInputOnModeChange(payload.newCode);
        setState({ input: payload.newInput });
        setState({ output: payload.newOutput });
        setState({ mode: payload.newMode });
        setDrawingMode(payload.newDrawing);
        setShowBoard(payload.newBoard)
        setShowEditor(!payload.newBoard)
        setusername2(payload.newUserName)

      }
      const updateCodeFromSockets=(payload) =>{
       // setState({ code: payload.newCode });
        setInputOnModeChange(payload.newCode);
      }
     const  updateInputFromSockets=(payload) =>{
        setState({ input: payload.newInput });
      }
      const updateOutputFromSockets=(payload)=> {
        setState({ output: payload.newOutput });
      }
      const updateModeFromSockets=(payload) =>{
        setState({ mode: payload.mode });
      }
      const updateBoarddataFromSockets=(payload) =>{
        console.log("payload")
        console.log(payload.board)
        setShowBoard(payload.board);
        setShowEditor(!payload.board)
      }
      const connectToNewUser=(userId, stream)=> {
        const call = myPeer.call(userId, stream);
        call.on("stream", (userVideoStream) => {
          addVideoStream(userId, userVideoStream, false);
        });
        call.on("close", () => {
          const peers = state.peers;
          var peersModified = peers.filter((peer) => {
            return peer.userId !== userId;
          });
          setState({ peers: peersModified });
        });
        peers[userId] = call;
      }
    
     const  addVideoStream=(userId, stream, flag,username2) =>{
        if (userId === state.userId) {
          stream.getVideoTracks()[0].enabled = false;
          stream.getAudioTracks()[0].enabled = false;
        }
        const peers = state.peers;
        const peers2=peerStream2
        peers.forEach((peer) => {
          if (peer.userId === userId) {
            peer.stream = stream;
            flag = true;
          }
        });
        if (!flag) peers.push({ userId: userId, stream: stream ,user:username2});
        peers2.forEach((peer) => {
          console.log(peer.userId)
          if (peer.userId === userId ) {
            peer.stream = stream;
            flag = true;
          }
        });
        if (!flag) peers2.push({ userId: userId, stream: stream , user:username2 });
        setState({ peers: peers });
        setPeerStream2(peers2);
      }
    
     const  addUserIdAndStream=(userId2, stream2,username22) =>{
      console.log(userId2, stream2);
      setUserId2(userId2);
      setStreamChange(stream2);
      setusername2(username22)
        setState({ userId: userId2, stream: stream2 });
      }
    
     const  handleVideoToggle=(userId) =>{
       peerStream2.forEach((peer) => {
          if (peer.userId === userId) {
            const enabled = peer.stream.getVideoTracks()[0].enabled;
            peer.stream.getVideoTracks()[0].enabled = !enabled;
          }
        });
      }
    
      const handleAudioToggle=(userId) =>{
        peerStream2.forEach((peer) => {
          if (peer.userId === userId) {
            const enabled = peer.stream.getAudioTracks()[0].enabled;
            peer.stream.getAudioTracks()[0].enabled = !enabled;
          }
        });
      }
      const handleChangeCode=(newCode)=> {
        console.log(newCode)
        setState({ code: newCode });
        setCode2(newCode);
        setInputOnModeChange(newCode)
        socket.emit("code change", {
          newCode: newCode,
        });
      }
     const  handleChangeInput=(newInput)=> {
        setState({ input: newInput });
        socket.emit("input change", {
          newInput: newInput,
        });
      }
     const  handleChangeOutput=(newOutput)=> {
      console.log("output changed")
      console.log(newOutput)
        setState({ output: newOutput });
        socket.emit("output change", {
          newOutput: newOutput,
        });
      }
     const  handleRunClick=() =>{
        setState({
          status: `RUNNING <i class="fas fa-spinner fa-spin"></i>`,
        });
        setStatusChanged(`RUNNING <i class="fas fa-spinner fa-spin"></i>`)
        console.log(Code2);
        
        const params = {
          source_code: inputOnModeChange,
          language: mode2,
          input: state.input,
          api_key: "guest",
        };
        axios.post(`https://api.paiza.io/runners/create`, params).then((res) => {
          console.log(res)
          const query = new URLSearchParams({
            id: res.data.id,
            api_key: "guest",
          });
          var callback = (res, error) => {
            setState({ status: "RUN" });
            setStatusChanged("RUN");
            // consume data
            if (error) {
              console.log("error")
              console.error(error);
              return;
            }
            let output = "";
            if (res.data.stdout) output += res.data.stdout;
            if (res.data.stderr) output += res.data.stderr;
            if (res.data.build_stderr) output += res.data.build_stderr;
            handleChangeOutput(output);
          };
    
          request(20, callback);
          function request(retries, callback) {
            axios
              .get(`https://api.paiza.io/runners/get_details?${query.toString()}`)
              .then((response) => {
                 // console.log(response);
                if (response.data.status === "completed") {
                  // server done, deliver data to script to consume
                  callback(response);
                } else {
                  if (retries > 0) {
                    request(--retries, callback);
                  } else {
                    // no retries left, calling callback with error
                    callback([], "out of retries");
                  }
                }
              })
              .catch((error) => {
                
                if (retries > 0) {
                  request(--retries, callback);
                } else {
                  // no retries left, calling callback with error
                  callback([], error);
                }
              });
          }
        });
      }
     const  handleChangeMode=(mode) =>{
      console.log(mode);
        setState({ mode: mode });
        setMode2(mode);
        socket.emit("mode-change-send", { mode: mode });
      }

      const handleChangeBoard=(e) =>{
        console.log("changed");
        console.log(e)
        setShowBoard(e);
        setShowEditor(!e)
        setShowProblems(!e)
        socket.emit("board-change-send", { board: e });
      }
      const handleChangeProblems = (e) =>{
        //setShowBoard(false);
       // setShowEditor(false);
        setShowProblemsPage(true);

      }

      const handleChangeDrawing=(e) =>{
        console.log(e);
      }
      const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

    return (
        <React.Fragment>
            <article>
      <h1>Record Session</h1>
      {error ? `${status} ${error.message}` : status}
      <section>
        <button
          type="button"
          onClick={getMediaStream}
          disabled={status === 'ready'}
        >
          Share screen
        </button>
        <button
          type="button"
          onClick={startRecording}
          disabled={status === 'recording'}
        >
          Start recording
        </button>
        <button
          type="button"
          onClick={stopRecording}
          disabled={status !== 'recording'}
        >
          Stop recording
        </button>
        <button
          type="button"
          onClick={handleSaveVideo}
          disabled={!mediaBlob}
        >
          Save video
        </button>
      </section>
      <Player srcBlob={mediaBlob} />
    </article>
       
        <Header
          userId={userId2}
          username={username}
          // stream={state.stream}
          showBoard={showBoard}
          setShowBoard={setShowBoard}
          showEditor={showEditor}
          showProblems={showProblems}
          setshowEditor={setShowEditor}
          setShowProblems={setShowProblems}
          setShowProblemsPage={setShowProblemsPage}
          stream={streamChange}
          onVideoToggle={handleVideoToggle}
          onAudioToggle={handleAudioToggle}
          onChangeBoard={handleChangeBoard}
          onProblemPageChange = {handleChangeProblems}
          setIsSideDrawerOpen={setIsSideDrawerOpen}
          isSideDrawerOpen={isSideDrawerOpen}
        />
          <VideoBar peersStream={ peerStream2} userId={userId2} username={username2} />

          <ProblemsPage isOpen={isSideDrawerOpen} setIsSideDrawerOpen={setIsSideDrawerOpen} />   

{showEditor && ( 
  <Editor
          mode={state.mode}
          code={inputOnModeChange}
          input={state.input}
          output={state.output}
          status={statusChanged}
          onChangeCode={handleChangeCode}
          onChangeInput={handleChangeInput}
          onChangeOutput={handleChangeOutput}
          handleRunClick={handleRunClick}
          onChangeMode={handleChangeMode}
          handleDownload={handleSaveCode}
        />
      

        
        )}

       

        {showBoard && (
        <Board
        user={userId2}
        socket={socket}
       // onChange={(e)=>console.log("GOT IT")}
        
        />)}
      
{/* 
{showProblemsPage && (<ProblemsPage />)} */}


        
      
        {/* <Footer /> */}
      </React.Fragment>
    );
    };


export default AppTest;

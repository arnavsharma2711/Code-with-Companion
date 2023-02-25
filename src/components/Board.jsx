import React from "react";
import WhiteBoard from "./Whiteboard";
import "../css/Board.css";
class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: "#000000",
      size: "5",
    };
  }

  changeColor(params) {
    this.setState({
      color: params.target.value,
    });
  }

  changeSize(params) {
    this.setState({
      size: params.target.value,
    });
  }

  render() {
    return (
      <div className="m-2">
        <div class="flex justify-center items-center bg-zinc-300" style={{backgroundColor:"#c4b5fd"}}>
          <div className="inline">Select Brush Color :</div>
          <div className="mr-2">
            <input
              type="color"
              value={this.state.color}
              onChange={this.changeColor.bind(this)}
              id="primary_color"
              class="rounded-2xl m-2 h-10 w-10 border-none outline-none appearance-none"
            />
          </div>
          <div className="inline">
            Select Brush Size :
            <select
              className="bg-zinc-200 rounded-2xl text-center m-2 h-10 w-10 appearance-none"
              value={this.state.size}
              onChange={this.changeSize.bind(this)}
            >
              <option> 5 </option>
              <option> 10 </option>
              <option> 15 </option>
              <option> 20 </option>
              <option> 25 </option>
              <option> 30 </option>
            </select>
          </div>
        </div>

        <div className="h-screen w-90 bg-white">
          <WhiteBoard
            color={this.state.color}
            size={this.state.size}
            socket={this.props.socket}
          />
        </div>
      </div>
    );
  }
}

export default Board;

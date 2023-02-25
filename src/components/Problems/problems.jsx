import React, { useState } from "react";
import "./problems.css";

function App({ isOpen, setIsSideDrawerOpen }) {
  const [selectedProblem, setSelectedProblem] = useState("");
  const [selectedProblemName, setSelectedProblemName] = useState("");
  const [isShow, setIsShow] = useState(false);
  // const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(isOpen);
  console.log(isOpen);

  const handleClick = (problem) => {
    setSelectedProblem(problem.description);
    setSelectedProblemName(problem.name);
    setIsSideDrawerOpen(false);
  };

  const problems = [
    {
      name: "             Missing number in array",
      description: `      Given an array of size N-1 such that it only contains distinct integers in the range of 1 to N. Find the missing element.

        Example 1:
        
        Input:
        N = 5
        A[] = {1,2,3,5}
        Output: 4
        Example 2:
        
        Input:
        N = 10
        A[] = {6,1,2,8,3,4,7,10,5}
        Output: 9
        
        Your Task :
        You don't need to read input or print anything.
         Complete the function MissingNumber() that takes array and N as input  
         parameters and returns the value of the missing number.
        
        
        Expected Time Complexity: O(N)
        Expected Auxiliary Space: O(1)
        
        
        Constraints:
        1 ≤ N ≤ 106
        1 ≤ A[i] ≤ 106`,
    },
    {
      name: "                 Stock buy and sell",
      description: `                  The cost of stock on each day is given in an array A[] of size N. Find all the segments of days on which you buy and sell the stock so that in between those days your profit is maximum.

        Note: Since there can be multiple solutions, the driver code will print 1 if your answer is correct, otherwise, it will return 0. In case there's no profit the driver code will print the string "No Profit" for a correct solution.
        
        Example 1:
        
        Input:
        N = 7
        A[] = {100,180,260,310,40,535,695}
        Output:
        1
        Explanation:
        One possible solution is (0 3) (4 6)
        We can buy stock on day 0,
        and sell it on 3rd day, which will 
        give us maximum profit. Now, we buy 
        stock on day 4 and sell it on day 6.
        Example 2:
        
        Input:
        N = 5
        A[] = {4,2,2,2,4}
        Output:
        1
        Explanation:
        There are multiple possible solutions.
        one of them is (3 4)
        We can buy stock on day 3,
        and sell it on 4th day, which will 
        give us maximum profit.
        
        Your Task:
        The task is to complete the function stockBuySell() which takes an array A[] and N as input parameters and finds the days of buying and selling stock. The function must return a 2D list of integers containing all the buy-sell pairs i.e. first value of pair will represent the day on which you buy the stock and second value represent the day on which you sell that stock. If there is No Profit, return an empty list.
        
        
        Expected Time Complexity: O(N)
        Expected Auxiliary Space: O(N)
        
        
        Constraints:
        2 ≤ N ≤ 106
        0 ≤ A[i] ≤ 106`,
    },
    {
      name: "          Subarray with given sum",
      description: `                  Given an unsorted array A of size N that contains only non-negative integers, find a continuous sub-array that adds to a given number S and return the left and right index(1-based indexing) of that subarray.

        In case of multiple subarrays, return the subarray indexes which come first on moving from left to right.
        
        Note:- You have to return an ArrayList consisting of two elements left and right. In case no such subarray exists return an array consisting of element -1.
        
        Example 1:
        
        Input:
        N = 5, S = 12
        A[] = {1,2,3,7,5}
        Output: 2 4
        Explanation: The sum of elements 
        from 2nd position to 4th position 
        is 12.
         
        
        Example 2:
        
        Input:
        N = 10, S = 15
        A[] = {1,2,3,4,5,6,7,8,9,10}
        Output: 1 5
        Explanation: The sum of elements 
        from 1st position to 5th position
        is 15.
         
        
        Your Task:
        You don't need to read input or print anything. The task is to complete the function subarraySum() which takes arr, N, and S as input parameters and returns an ArrayList containing the starting and ending positions of the first such occurring subarray from the left where sum equals to S.The two indexes in the array should be according to 1-based indexing. If no such subarray is found, return an array consisting of only one element that is -1.
        
         
        
        Expected Time Complexity: O(N)
        Expected Auxiliary Space: O(1)
        
         
        
        Constraints:
        1 <= N <= 105
        1 <= Ai <= 109`,
    },
  ];

  return (
    <div className="App2 bg-neutral-700">
      <div className={`SideDrawer z-50 bg-purple-300 ${isOpen ? "open" : ""}`}>
        <button
          className="CloseButton"
          onClick={() => setIsSideDrawerOpen(false)}
        >
          &#x2715;
        </button>
        {problems.map((problem) => (
          <button
            className="hover:bg-purple-400"
            key={problem.name}
            onClick={() => {
              handleClick(problem);
              setIsShow(true);
            }}
          >
            {problem.name}
          </button>
        ))}
      </div>
      {isShow && (
        <button
          className="CloseButton bg-neutral-700 text-white "
          onClick={() => {
            setIsShow(false);
          }}
        >
          &#x2715;
        </button>
      )}
      <div className="MainContent bg-neutral-700 text-white ">
        {isShow && (
          <>
            <pre className="">
              <div> {selectedProblemName}</div>
              <div>
                {" "}
                {"  "}
                {selectedProblem}{" "}
              </div>
              <br></br>
              <hr></hr>
              {"  "}
            </pre>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
// const App = () => {
//   const [problems, setProblems] = useState([
//     { name: 'Problem 1', description: 'Description 1' },
//     { name: 'Problem 2', description: 'Description 2' },
//     { name: 'Problem 3', description: 'Description 3' }
//   ]);
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const handleProblemClick = (problem) => {
//     setSelectedProblem(problem);
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   return (
//     <div className="App2">
//       <div className="problems">
//         <h2>Problems</h2>
//         <ul>
//           {problems.map((problem) => (
//             <li key={problem.name} onClick={() => handleProblemClick(problem)}>
//               {problem.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {drawerOpen && (
//         <div className="drawer">
//           <button className="close-btn" onClick={handleDrawerClose}>
//             X
//           </button>
//           <div className="description">
//             <h2>{selectedProblem.name}</h2>
//             <p>{selectedProblem.description}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

//working
// const App = () => {
//   const [problems, setProblems] = useState([
//     { name: 'Problem 1', description: 'Description 1' },
//     { name: 'Problem 2', description: 'Description 2' },
//     { name: 'Problem 3', description: 'Description 3' }
//   ]);
//   const [selectedProblem, setSelectedProblem] = useState(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const handleProblemClick = (problem) => {
//     setSelectedProblem(problem);
//     setDrawerOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setDrawerOpen(false);
//   };

//   return (
//     <div className="App">
//       <div className="problems">
//         <h2>Problems</h2>
//         <ul>
//           {problems.map((problem) => (
//             <li key={problem.name} onClick={() => handleProblemClick(problem)}>
//               {problem.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       {drawerOpen && (
//         <div className="drawer">
//           <button className="close-btn" onClick={handleDrawerClose}>
//             X
//           </button>
//           <div className="description">
//             <h2>{selectedProblem.name}</h2>
//             <p>{selectedProblem.description}</p>
//           </div>
//         </div>
//       )}
//       {!drawerOpen && (
//         <button className="drawer-button" onClick={() => setDrawerOpen(true)}>
//           Open Drawer
//         </button>
//       )}
//     </div>
//   );
// };

// export default App;
// const Problems = () => {
//   const [resumeData, setResumeData] = useState({
//     problems: [
//       {
//         name: "problem1",
//         description: "description1",
//       },
//       {
//         name: "problem2",
//         description: "description2",
//       },
//       {
//         name: "problem3",
//         description: "description3",
//       },
//     ],
//   });

//   const [selectedProblem, setSelectedProblem] = useState(null);

//   const handleProblemClick = (index) => {
//     setSelectedProblem(index);
//   };

//   const problemItems = resumeData.problems.map((problem, index) => (
//     <li key={problem.name} onClick={() => handleProblemClick(index)}>
//       {problem.name}
//     </li>
//   ));

//   return (
//     <div>
//       <div>
//         <ul>{problemItems}</ul>
//       </div>
//       <div>
//         {selectedProblem !== null && (
//           <div>
//             <h3>{resumeData.problems[selectedProblem].name}</h3>
//             <p>{resumeData.problems[selectedProblem].description}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Problems;

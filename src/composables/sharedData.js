let mutatedGeneTypes = ["TNNT2", "MYH7", "MYBPC3", "TPM1"];

let cardiomyopathyTypes = [
  "Hypertrophic Cardiomyopathy",
  "Dilated Cardiomyopathy",
  "Restrictive Cardiomyopathy",
  "Transthyretin Amyloid Cardiomyopathy (ATTR-CM)",
  "Arrhythmogenic Right Ventricular Dysplasia"
];

let dataTypes = [
  "Force-time Curve",
  "Sarcomere Length vs Time",
  "Sliding Velocity vs Calcium Concentration",
  "Tension vs Calcium Concentration",
  "Force vs Calcium Concentration",
  "Tension vs Sarcomere Shortening Velocity",
  "Force vs Sarcomere Shortening Velocity",
  "Sarcomere Shortening vs Time"
];

//Make sure you add id correspondingly

let GuideQuestions = [
  {
    id: 0,
    questions: "How do I make an account?",
    type: "para",

    answer:
      "Visit the register page and fill the form in with appropriate data. Once you have registered, you will need to verify your account through your email. Once you have verified yourself, you will automatically have full access to the entire website.",
    displayAnswer: false
  },
  {
    id: 1,
    questions: "I have forgotten my password, what shall I do?",
    type: "para",
    answer:
      "Click on the 'Reset Password' button. You will be directed to a page that will ask you to input the email associated with your account. Once you have entered your email and submit the form, you will be sent a reset link that can be used to reset your password.",
    displayAnswer: false
  },
  {
    id: 2,
    questions: "How can I add graph data?",
    type: "list",
    answer: [
      "1) Make an account.",
      "2) Login to the website.",
      "3) Verify your account.",
      "4) Click on the 'Add Graph' button.",
      "5) Once you are on the add graph page, fill in the required details.",
      "6) Input a CSV file with the appropriate data. (Note: our system only accepts CSV files. Any other file type will not be read).",
      "7) Finalise everything and submit the data."
    ],
    displayAnswer: false
  },
  {
    id: 3,
    questions: "How can I delete a graph?",
    type: "para",
    answer:
      "Visit the 'User Dashboard' and go to the graph that you wish to delete. There will be a delete button next to the graph. Click the delete button and then your graph will be automatically deleted. (Note: user can only delete their own graphs)."
  },
  {
    id: 4,
    questions:
      "What's the difference between the Global Dashboard and the User Dashboard?",
    type: "list",
    answer: [
      "Global Dashboard - The Global Dashboard will display graphs made by all the users on our website system.",
      "User Dashboard - The User Dashboard will display your user details, as well as all the graphs that you have made."
    ],
    displayAnswer: false
  },
  {
    id: 5,
    questions: "How can I view specific details of a graph?",
    type: "para",
    answer:
      "Once you are logged in, you can either go to the user dashboard, global dashboard or search dashboard to view graphs, and there will be a 'View Details' button on each graph displayed. Click on the button and you will be redirected to that specific graph which will show all the details.",
    displayAnswer: false
  }
];

export { mutatedGeneTypes, cardiomyopathyTypes, dataTypes, GuideQuestions };

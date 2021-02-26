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
    questions: "How do I make an account",
    type: "para",

    answer:
      "Simply go on to the Register page, then input all of the required details. Once you have registered you will then need to verify your account through email. Once you have verified you email you will then have access to the whole website.",
    displayAnswer: false
  },
  {
    id: 1,
    questions: "I forgotten my password",
    type: "para",
    answer:
      "No worries :) simply click on then forgotten password link. This page will ask you for your email. Once you have given you registered email, it will then send you a reset link that can be used to reset your password.",
    displayAnswer: false
  },
  {
    id: 2,
    questions: "How do I add graph data",
    type: "list",
    answer: [
      "1) Register account",
      "2) Login",
      "3) Click on the add graph link",
      "4) Once you are on the add graph page, fill in the required details.",
      "5) Input CSV file (Note the system can only take in CSV files, any other file types will not be compatible)",
      "6) Click Submit"
    ],
    displayAnswer: false
  },
  {
    id: 3,
    questions: "How do I delete my graph",
    type: "para",
    answer:
      "For you to delete your graph you would need to hop on to your user dashboard. Assuming you have some graphs, there should a delete button. Click the delete button then your graph should be automatically deleted. (Note user can only delete their own graphs, a user cannot delete other users graphs)"
  },
  {
    id: 4,
    questions: "Whats the difference between the global and user dashboard",
    type: "list",
    answer: [
      "UserDashboard - The user dashboard will display your user details, as well as all the graphs you have made. ",
      "GlobalDashboard - The Global dashboard will display graphs made by all the users on the system."
    ],
    displayAnswer: false
  },
  {
    id: 5,
    questions: "I want to see a specific graph",
    type: "para",
    answer:
      "Once you are logged in you can go on to the user, global and search dashboards. There each graph will have a view details button. Click the button then you will be redirected to that specific graph",
    displayAnswer: false
  }
];

export { mutatedGeneTypes, cardiomyopathyTypes, dataTypes, GuideQuestions };

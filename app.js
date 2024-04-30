// Initialize Firebase with your config
//connecting to our application by using the firebase.initializeApp
firebase.initializeApp({
    apiKey: "AIzaSyBLdYZZp6LqwWXzzTUiK5EeKhYraV5kyKs",
    authDomain: "plp-demo.firebaseapp.com",
    projectId: "plp-demo",
    storageBucket: "plp-demo.appspot.com",
    messagingSenderId: "527407695911",
    appId: "1:527407695911:web:033a987709e2897253e602",
     
  });
  
  const db = firebase.firestore();
  
  // Define a Function to add a task
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        //add it to our database
      db.collection("tasks").add({
        //what columns you want in your database
        //adding a task to our database
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      //we reset our input element by assigning an empty screen
      taskInput.value = "";
      console.log("Task added.");
    }
  }
  
  // Function to render tasks
  function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
  }
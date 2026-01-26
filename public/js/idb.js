// Global variable to hold IndexedDB database connection
let db;

// Open or create an IndexedDB database named 'pwa_budget_tracker' with version 1
const request = indexedDB.open("pwa_budget_tracker", 1);

// Fires when database needs to be upgraded (new version or first creation)
request.onupgradeneeded = function (event) {
  // Get reference to the newly created/upgraded database
  const db = event.target.result;
  // Create an object store (similar to a table) for storing transactions with auto-incrementing keys
  db.createObjectStore("new_transaction", { autoIncrement: true });
};

// Fires when database connection is successfully established
request.onsuccess = function (event) {
  // Save the database connection to global variable for use throughout the app
  db = event.target.result;

  // Check if user is online and sync any offline transactions with the server
  if (navigator.onLine) {
    uploadTransaction();
  }
};

// Fires if database connection fails
request.onerror = function (event) {
  // Log database connection error to console for debugging
  console.log(event.target.errorCode);
};

// Save a transaction to IndexedDB when the user is offline
function saveRecord(record) {
  // Start a new read-write transaction on the new_transaction object store
  const transaction = db.transaction(["new_transaction"], "readwrite");

  // Get reference to the object store where transactions are stored
  const transactionObjectStore = transaction.objectStore("new_transaction");

  // Add the new record to the store
  transactionObjectStore.add(record);
}

// Retrieve all offline transactions from IndexedDB and send them to the server
function uploadTransaction() {
  // Start a new read-write transaction on the new_transaction object store
  const transaction = db.transaction(["new_transaction"], "readwrite");

  // Get reference to the object store containing saved transactions
  const transactionObjectStore = transaction.objectStore("new_transaction");

  // Retrieve all records from the object store (asynchronous operation)
  const allTransactions = transactionObjectStore.getAll();

  // Handle successful retrieval of transactions from IndexedDB
  allTransactions.onsuccess = function () {
    // Only send to server if there are transactions to upload
    if (allTransactions.result.length > 0) {
      // Send transactions to the API endpoint
      fetch("/api/transaction", {
        method: "POST",
        body: JSON.stringify(allTransactions.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        // Check if server returned an error message
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // Clear all transactions from IndexedDB after successful upload
          const transaction = db.transaction(["new_transaction"], "readwrite");
          const transactionObjectStore =
            transaction.objectStore("new_transaction");
          // Remove all records from the store
          transactionObjectStore.clear();

          alert("All saved transactions have been submitted!");
        })
        .catch((err) => {
          // Log any errors that occur during the upload process
          console.log(err);
        });
    }
  };
}

// Automatically attempt to upload transactions when user comes back online
document.addEventListener("online", uploadTransaction);

// ui.js – Fatima's file (frontend only)

function handleAddRecord(event) {
    event.preventDefault();
  
    const patientId = document.getElementById("patientId").value.trim();
    const patientName = document.getElementById("patientName").value.trim();
    const diagnosis = document.getElementById("diagnosis").value.trim();
    const resultDiv = document.getElementById("addResult");
  
    if (!patientId || !patientName || !diagnosis) {
      resultDiv.textContent = "Please fill in all fields.";
      return;
    }
  
    if (!window.blockchainApp || typeof blockchainApp.addRecord !== "function") {
      resultDiv.textContent = "Blockchain logic is not ready yet.";
      return;
    }
  
    const res = blockchainApp.addRecord(patientId, patientName, diagnosis);
    resultDiv.textContent = "Record added:\n" + JSON.stringify(res, null, 2);
    document.getElementById("addRecordForm").reset();
  }
  
  function handleShowChain() {
    const container = document.getElementById("chainContainer");
  
    if (!window.blockchainApp || typeof blockchainApp.getChain !== "function") {
      container.textContent = "Blockchain logic not ready.";
      return;
    }
  
    const chain = blockchainApp.getChain();
    container.textContent = JSON.stringify(chain, null, 2);
  }
  
  function handleValidateChain() {
    const resultDiv = document.getElementById("validationResult");
  
    if (!window.blockchainApp || typeof blockchainApp.isValid !== "function") {
      resultDiv.textContent = "Blockchain logic not ready.";
      return;
    }
  
    const valid = blockchainApp.isValid();
    resultDiv.textContent = valid
      ? "✅ Blockchain is valid."
      : "❌ Blockchain is NOT valid.";
  }
  
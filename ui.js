// Handles record submission from the form
function handleAddRecord(event) {
  event.preventDefault();

  const patientId = document.getElementById("patientId").value.trim();
  const patientName = document.getElementById("patientName").value.trim();
  const diagnosis = document.getElementById("diagnosis").value.trim();
  const resultDiv = document.getElementById("addResult");

  // Basic form validation
  if (!patientId || !patientName || !diagnosis) {
    resultDiv.textContent = "All fields are required.";
    return;
  }

  // Make sure blockchain interface is available
  if (!window.blockchainApp?.addRecord) {
    resultDiv.textContent = "Blockchain module isn't loaded.";
    return;
  }

  const newBlock = blockchainApp.addRecord(patientId, patientName, diagnosis);
  resultDiv.textContent = "Record added:\n" + JSON.stringify(newBlock, null, 2);

  // Reset form after submission
  document.getElementById("addRecordForm").reset();
}

// Displays the entire chain
function handleShowChain() {
  const container = document.getElementById("chainContainer");

  if (!window.blockchainApp?.getChain) {
    container.textContent = "Unable to load chain.";
    return;
  }

  const chain = blockchainApp.getChain();
  container.textContent = JSON.stringify(chain, null, 2);
}

// Validates the blockchain
function handleValidateChain() {
  const resultDiv = document.getElementById("validationResult");

  if (!window.blockchainApp?.isValid) {
    resultDiv.textContent = "Validation logic is missing.";
    return;
  }

  const isValid = blockchainApp.isValid();
  resultDiv.textContent = isValid
    ? "Blockchain looks good."
    : "Validation failed. Chain may be broken.";
}

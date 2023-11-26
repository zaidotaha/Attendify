// Define the findFeedbackRowByName function
function findFeedbackRowByName(name) {
    let tableRows = document.getElementById("feedback-table").rows;

    for (let i = 0; i < tableRows.length; i++) {
        let currentName = tableRows[i].children[0].textContent;
        if (currentName === name) {
            return tableRows[i];
        }
    }

    return null;
}
// Define the generateFeedbackTable function
function generateFeedbackTable() {
    let tableContainer = document.getElementById("feedback-table");

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);

        if (key.startsWith("feedback-")) {
            let feedbackObj = JSON.parse(localStorage.getItem(key));

            // Check if any of the required fields is undefined or empty
            if (feedbackObj.name && feedbackObj.Feedback && feedbackObj.Date) {
                let existingRow = findFeedbackRowByName(feedbackObj.name);

                if (existingRow) {
                    existingRow.children[1].textContent = feedbackObj.Feedback;
                    existingRow.children[2].textContent = feedbackObj.Date;
                } else {
                    let row = document.createElement("tr");
                    let nameCell = document.createElement("td");
                    let feedbackCell = document.createElement("td");
                    let dateCell = document.createElement("td");

                    nameCell.textContent = feedbackObj.name;
                    feedbackCell.textContent = feedbackObj.Feedback;
                    dateCell.textContent = feedbackObj.Date;

                    row.appendChild(nameCell);
                    row.appendChild(feedbackCell);
                    row.appendChild(dateCell);

                    tableContainer.insertBefore(row, tableContainer.rows[i]);
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    generateFeedbackTable();
});

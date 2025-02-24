async function fetchLeaves() {
    const empId = document.getElementById("empId").value.trim();
    const statusFilter = document.getElementById("statusFilter").value;
    
    if (!empId) {
        alert("Please enter an Employee ID.");
        return;
    } 

    const url=`http://localhost:3000/leaves?empId=${empId}`;
    console.log(empId);
    if(statusFilter) {
        url += `&status=${statusFilter}`
        console.log(url);
    }
    try {
        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Failed to fetch data");

        let leaves = await response.json();
        console.log(leaves);
        

        displayLeaves(leaves.data);

    } catch (error) {
        console.error("Error fetching leaves:", error);
        alert("Error you dont have this status");
    }
}

function displayLeaves(leaves) {
    const list = document.getElementById("leavesList");
    list.innerHTML = ""; 

    if (leaves.length === 0) {
        list.innerHTML = "<li>No leaves found.</li>";
        return;
    }

    leaves.forEach(leave => {
        const li = document.createElement("li");
        li.textContent = `Status: ${leave.status},EmployeeName: ${leave.empId.firstName}`;
        list.appendChild(li);
    });
}

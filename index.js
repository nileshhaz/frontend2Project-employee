const btn = document.getElementById("sub");
const txt = document.getElementById("txt");

btn.addEventListener("click",(event)=>{
    event.preventDefault();
    const fname = document.getElementById("input1").value;
    const prof = document.getElementById("input2").value;
    const age = document.getElementById("input3").value;

    if (!fname || !prof || !age) 
    {
        txt.innerText = "Error: Please make sure all fields are filled before adding an employee!";
        txt.classList.add("text-danger");
        return;
    }

    const employee = { name: fname, profession: prof, age };

    let employees = JSON.parse(localStorage.getItem("employees")) || []

    employees.push(employee);

    localStorage.setItem("employees", JSON.stringify(employees));

    txt.innerText = "Success: Employee Added!";
    txt.classList.remove("text-danger");
    txt.classList.add("text-success");
    
    display()

    document.getElementById("input1").value = ""
    document.getElementById("input2").value = ""
    document.getElementById("input3").value = ""
})

function display(){
    const employees = JSON.parse(localStorage.getItem("employees")) || []
    const empList = document.querySelector(".emp-list")

    empList.innerHTML = ""

    employees.forEach((emp,index) => {
        const empRow = document.createElement("div");
        empRow.classList.add("d-flex", "justify-content-between", "align-items-center", "mt-2");
        const empDiv = document.createElement("div");
        empDiv.classList.add("alert", "alert-secondary", "flex-grow-1", "mb-0");
        empDiv.innerHTML = `<strong>${emp.name}</strong> - ${emp.profession}, Age: ${emp.age}` 
        const btn = document.createElement("button");
        btn.classList.add("btn", "btn-danger", "rounded-pill", "ms-3");
        btn.innerText = "Delete User";
        btn.onclick = () => deleteEmployee(index);

        empRow.appendChild(empDiv);
        empRow.appendChild(btn);

        empList.appendChild(empRow);
    });
}

function del(index){
    let employees = JSON.parse(localStorage.getItem("employees")) || []
    employees.splice(index,1)
    localStorage.setItem("employees", JSON.stringify(employees))
    display();
}

document.addEventListener("DOMContentLoaded", display);
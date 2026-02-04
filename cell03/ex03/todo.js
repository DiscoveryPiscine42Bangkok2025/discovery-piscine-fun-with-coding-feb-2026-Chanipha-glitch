window.onload = function () {
    loadTodos();

    document.getElementById("newBtn").addEventListener("click", newTodo);
};


// เพิ่มงานใหม่
function newTodo() {

    let text = prompt("Enter new TO DO:");

    if (text === null || text.trim() === "") {
        return;
    }

    addTodo(text);
    saveTodos();
}


// สร้างกล่อง todo
function addTodo(text) {

    let div = document.createElement("div");

    div.className = "todo";
    div.textContent = text;

    div.addEventListener("click", function () {

        if (confirm("Delete this TO DO?")) {
            div.remove();
            saveTodos();
        }
    });

    let list = document.getElementById("ft_list");

    // ใส่บนสุด
    list.prepend(div);
}


// บันทึก cookie
function saveTodos() {

    let todos = [];
    let items = document.querySelectorAll(".todo");

    items.forEach(function (item) {
        todos.push(item.textContent);
    });

    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + "; path=/";
}


// โหลดจาก cookie
function loadTodos() {

    let cookies = document.cookie.split("; ");

    for (let i = 0; i < cookies.length; i++) {

        let parts = cookies[i].split("=");

        if (parts[0] === "todos") {

            let data = decodeURIComponent(parts[1]);
            let todos = JSON.parse(data);

            todos.forEach(function (text) {
                addTodo(text);
            });
        }
    }
}

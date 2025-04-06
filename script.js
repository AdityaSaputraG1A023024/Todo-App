const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const value = inputBox.value.trim();
    if (!value) return alert("Please Enter a Task");

    const li = document.createElement("li");

    // Buat elemen teks
    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = value;
    li.appendChild(textSpan);

    // Tombol Edit
    const editBtn = document.createElement("span");
    editBtn.className = "icon edit";
    editBtn.innerHTML = '<i class="uil uil-pen"></i>';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        enableInlineEdit(li);
    };
    li.appendChild(editBtn);

    // Tombol Delete
    const delBtn = document.createElement("span");
    delBtn.className = "icon delete";
    delBtn.innerHTML = '<i class="uil uil-trash"></i>';
    
    delBtn.onclick = (e) => {
        e.stopPropagation();
        li.classList.add("fall"); // jalankan animasi
    
        li.addEventListener("transitionend", () => {
            li.remove(); // hapus setelah animasi selesai
        });
    };
    
    li.appendChild(delBtn);

    listContainer.appendChild(li);
    inputBox.value = "";
}

function enableInlineEdit(li) {
    const textEl = li.querySelector(".task-text");
    const currentText = textEl.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.className = "inline-input";
    input.value = currentText;

    li.replaceChild(input, textEl);
    input.focus();

    input.addEventListener("blur", () => {
        const newText = input.value.trim() || currentText;
        const newSpan = document.createElement("span");
        newSpan.className = "task-text";
        newSpan.textContent = newText;
        li.replaceChild(newSpan, input);
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") input.blur();
    });
}

// Menandai item checklist
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
});

const text = "Todo App";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        document.getElementById("typed-text").textContent += text.charAt(index);
        index++;
        setTimeout(typeEffect, 150); // kecepatan ketik
    }
}

typeEffect();




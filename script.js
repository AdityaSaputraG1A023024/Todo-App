const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const value = inputBox.value.trim();
    if (!value) return alert("Please Enter a Task");

    const li = document.createElement("li");

    const checkbox = document.createElement("span");
    checkbox.className = "checkbox";
    checkbox.onclick = () => {
        li.classList.toggle("checked");
    };
    li.appendChild(checkbox);

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = value;
    li.appendChild(textSpan);

    const editBtn = document.createElement("span");
    editBtn.className = "icon edit";
    editBtn.innerHTML = '<i class="uil uil-pen"></i>';
    editBtn.onclick = (e) => {
        e.stopPropagation();
        enableInlineEdit(li);
    };
    li.appendChild(editBtn);

    const delBtn = document.createElement("span");
    delBtn.className = "icon delete";
    delBtn.innerHTML = '<i class="uil uil-trash"></i>';
    delBtn.onclick = (e) => {
        e.stopPropagation();
        li.classList.add("fall");
        li.addEventListener("transitionend", () => li.remove());
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
    li.classList.add("editing");
    input.focus();

    input.addEventListener("blur", () => {
        const newText = input.value.trim() || currentText;
        const newSpan = document.createElement("span");
        newSpan.className = "task-text";
        newSpan.textContent = newText;
        li.replaceChild(newSpan, input);
        li.classList.remove("editing");
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") input.blur();
    });
}

const text = "Just Do It";
let index = 0;

function typeEffect() {
    const typedText = document.getElementById("typed-text");

    if (index <= text.length) {
        typedText.textContent = text.substring(0, index);
        index++;
        setTimeout(typeEffect, 150);
    } else {
        setTimeout(() => {
            typedText.textContent = "";
            index = 0;
            typeEffect();
        }, 1000);
    }
}
typeEffect();







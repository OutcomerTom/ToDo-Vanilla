const taskNumber = document.querySelector('h2 span');
const taskDoneNumber = document.querySelector('h3 span');
let doneCounter = 0;
let items = [];

window.onload = () => {
    const loadLocal = JSON.parse(localStorage.getItem("items"));
    if (loadLocal !== null) {
        items = loadLocal;
        doneCounter = items.filter(item => item.includes("<strike>")).length;
    }

    display();

};

const addItem = () => {
    if (document.querySelector('.addTxt').value.trim() !== "") {
        items.push(document.querySelector('.addTxt').value.trim());

        localStorage.setItem('items', JSON.stringify(items));

        document.querySelector('.addTxt').value = "";
        display();
    }

}

const display = () => {
    document.querySelector('.list').innerHTML = "";
    for (let i = 0; i < items.length; i++)
        document.querySelector('.list').innerHTML += `<center><div class='item'> ${items[i]} <img class='tick' src='img/check-square-regular.svg' onclick='strike(${i})'><img class='dustbin' src = 'img/minus-square-regular.svg' onclick='removeItem(${i})'></div></center><br>`;
    taskNumber.textContent = items.length;
    taskDoneNumber.textContent = doneCounter;
    console.log(items);

}

const removeItem = (index) => {
    if (items[index].includes("<strike>")) {
        doneCounter--;
    };

    items.splice(index, 1);

    localStorage.setItem("items", JSON.stringify(items));

    display();
}

const strike = (index) => {
    if (items[index].includes("<strike>")) {
        items[index] = items[index].replace("<strike>", "").replace("</strike>", "");
        doneCounter--;

    } else {
        items[index] = "<strike>" + items[index] + "</strike>";
        doneCounter++;
    }
    localStorage.setItem("items", JSON.stringify(items));
    display();
}


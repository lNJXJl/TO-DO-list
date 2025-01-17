document.addEventListener('DOMContentLoaded', () => {
    let inputField = document.getElementById("inputField");
    let upList = document.getElementById("upList");

    console.log(document.body.innerHTML);

    if (!upList || !inputField) {
        console.error('Nie znaleziono wymaganego elementu w DOM.');
        return;
    }

    let listCounter = 0;

    // Funkcja wczytująca dane z LocalStorage
    function loadFromLocalStorage() {
        const savedList = JSON.parse(localStorage.getItem('list')) || [];
        listCounter = savedList.length;

        savedList.forEach((item, index) => {
            let createList = document.createElement('div');
            createList.className = 'list';
            createList.textContent = `TASK ${index + 1}: ${item}`;


            // Tworzenie przycisku X
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'deleteButton';
            deleteButton.addEventListener('click', () => deleteItem(createList, item));

            // Dodaj przycisk X obok elementu listy
            createList.appendChild(deleteButton);
            upList.appendChild(createList);
        });
    }

    // Funkcja zapisująca dane do LocalStorage
    function saveToLocalStorage(value) {
        const savedList = JSON.parse(localStorage.getItem('list')) || [];
        savedList.push(value);
        localStorage.setItem('list', JSON.stringify(savedList));
    }

    // Funkcja zapisująca nowe elementy listy
    function saveList(event) {
        let text = inputField.value;

        if (!text.trim()) return;

        listCounter++;

        let createList = document.createElement('div');
        createList.className = 'list';
        createList.textContent = `TASK ${listCounter}: ${text}`;

        // Tworzenie przycisku X
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'deleteButton';
        deleteButton.addEventListener('click', () => deleteItem(createList, text));

        // Dodaj przycisk X obok elementu listy
        createList.appendChild(deleteButton);
        upList.appendChild(createList);

        saveToLocalStorage(text);

        console.log('Zapisano:', text);

        inputField.value = '';
    }

    // Funkcja do usuwania elementu
    function deleteItem(listElement, itemText) {
        // Usuwanie elementu z DOM
        listElement.remove();
        listCounter--;
        // Usuwanie elementu z localStorage
        let savedList = JSON.parse(localStorage.getItem('list')) || [];
        savedList = savedList.filter(item => item !== itemText);  // Usuń tylko ten tekst
        localStorage.setItem('TASK', JSON.stringify(savedList));
    }
    // Nasłuchiwanie na kliknięcie Enter w polu tekstowym
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            saveList(event);
        }
    });

    // Załadowanie danych przy starcie strony
    loadFromLocalStorage();
});

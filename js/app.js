// Load DOm Content from Local Storage
document.addEventListener('DOMContentLoaded', function () {
    loadItems();
});

// Get elements

const form = document.getElementById('input-form');
const input = document.getElementById('input-value');
const feedback = document.querySelector('.feedback');
const listItems = document.querySelector('.list-items');
const clearBtn = document.querySelector('.clearBtn');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (input.value === '') {
        showFeedback('Please enter a valid item', 'alert-danger');
    } else {
        addItem(input.value);
        addStorage(input.value);
        showFeedback('Successfully added', 'alert-success');
        input.value = '';
    }
});

// Delete All Item
clearBtn.addEventListener('click', function () {
    while (listItems.children.length > 0) {
        listItems.removeChild(listItems.children[0]);
        clearStorage();
    }
});

// Delete Item
listItems.addEventListener('click', function (e) {
    if (e.target.parentElement.classList.contains('remove-icon')) {
        let parent = e.target.parentElement.parentElement;
        listItems.removeChild(parent);
        showFeedback('Itemd sucessfully deleted', 'alert-success');
        let text = e.target.parentElement.previousElementSibling.textContent;
        clearItem(text);
    }
});

// Display Feedback Popup
function showFeedback(text, alertAction) {
    feedback.textContent = text;
    feedback.classList.add('showItem', `${alertAction}`);

    setTimeout(function () {
        feedback.classList.remove('showItem', `${alertAction}`);
    }, 5000);
}

// Add Item
function addItem(value) {
    const div = document.createElement('div');
    div.classList.add(
        'item',
        'my-3',
        'd-flex',
        'justify-content-between',
        'p-2'
    );
    div.innerHTML = `
    <h5 class="item-title text-capitalize">${value}</h5>
    <span class="remove-icon text-danger"><i class="fas fa-trash"></i></span>
    `;
    listItems.appendChild(div);
}

// Add Storage
function addStorage(value) {
    let items;
    if (localStorage.getItem('grocery')) {
        items = JSON.parse(localStorage.getItem('grocery'));
    } else {
        items = [];
    }

    items.push(value);
    localStorage.setItem('grocery', JSON.stringify(items));
}

// Clear Storage
function clearStorage() {
    localStorage.removeItem('grocery');
}

// Clear Single Item
function clearItem(text) {
    let tempItems = JSON.parse(localStorage.getItem('grocery'));
    const items = tempItems.filter(function (item) {
        if (item !== text) {
            return item;
        }
    });

    localStorage.removeItem('grocery');
    localStorage.setItem('grocery', JSON.stringify(items));
}

function loadItems() {
    if (localStorage.getItem('grocery')) {
        let tempItems = JSON.parse(localStorage.getItem('grocery'));
        tempItems.forEach(function (item) {
            addItem(item);
        });
    } else {
        console.log(`No Items`);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    
    let totalBudget = 0;
    let allocatedTotal = 0;

   
    const totalBudgetInput = document.getElementById('total-budget');
    const remainingBudgetDisplay = document.getElementById('remainingBudget');
    const allocatedTotalDisplay = document.getElementById('allocatedTotal');
    const budgetForm = document.getElementById('budget-form');
    const budgetTableBody = document.querySelector('#budget-table tbody');
    const progressBar = document.getElementById('progressBar');

   
    totalBudgetInput.addEventListener('input', function () {
        totalBudget = parseFloat(this.value) || 0;
        updateRemainingBudget();
    });

   
    budgetForm.addEventListener('submit', function (e) {
        e.preventDefault();

        
        const budgetName = document.getElementById('budget-name').value;
        const budgetAmount = parseFloat(document.getElementById('budget-amount').value) || 0;
        const budgetCategory = document.getElementById('budget-category').value;

        // Check if budget amount exceeds remaining budget
        if (allocatedTotal + budgetAmount > totalBudget) {
            alert('You cannot allocate more than the remaining budget!');
            return;
        }

       
        allocatedTotal += budgetAmount;
        updateRemainingBudget();
        updateProgressBar();

       
        addBudgetToTable(budgetName, budgetAmount, budgetCategory);

       
        allocatedTotalDisplay.textContent = allocatedTotal.toFixed(2);

        
        budgetForm.reset();
    });

   
    function updateRemainingBudget() {
        const remaining = totalBudget - allocatedTotal;
        remainingBudgetDisplay.textContent = remaining.toFixed(2);
    }

   
    function updateProgressBar() {
        const progress = (allocatedTotal / totalBudget) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function addBudgetToTable(name, amount, category) {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = name;
        row.appendChild(nameCell);

        const amountCell = document.createElement('td');
        amountCell.textContent = amount.toFixed(2);
        row.appendChild(amountCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = category;
        row.appendChild(categoryCell);

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteBudgetEntry(row, amount);
        });
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        budgetTableBody.appendChild(row);
    }

    // Function to delete a budget entry and update totals
    function deleteBudgetEntry(row, amount) {
        
        allocatedTotal -= amount;
        updateRemainingBudget();
        updateProgressBar();
        allocatedTotalDisplay.textContent = allocatedTotal.toFixed(2);
        row.remove();
    }
});

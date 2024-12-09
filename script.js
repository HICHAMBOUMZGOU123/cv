const transactions=[]
const formulaire=document.getElementById('transaction-form')
formulaire.addEventListener('submit', function (e) {
    e.preventDefault();

    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = new Date().toLocaleDateString('fr-FR');

    if (!description || isNaN(amount)) {
        alert('Veuillez remplir tous les champs correctement.');
        return;
    }

    // Ajouter la transaction au tableau
    transactions.push({ description, amount, category, date });

    // Réinitialiser le formulaire
    document.getElementById('transaction-form').reset();

    // Mettre à jour l'interface
    updateUI();
});
function updateUI() {
    const tbody = document.querySelector('#transactions table tbody');
    tbody.innerHTML = ''; // Efface les anciennes lignes

    transactions.forEach(transaction => {
        const row = `
            <tr>
                <td>${transaction.description}</td>
                <td>${transaction.amount.toFixed(2)} €</td>
                <td>${transaction.category}</td>
                <td>${transaction.date}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });

    updateTotals();
}
function updateTotals() {
    const income = transactions
        .filter(transaction => transaction.category === 'revenu')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const expense = transactions
        .filter(transaction => transaction.category === 'dépense')
        .reduce((sum, transaction) => sum + transaction.amount, 0);

    const balance = income - expense;

    document.getElementById('total-income').textContent = `${income.toFixed(2)} €`;
    document.getElementById('total-expense').textContent = `${expense.toFixed(2)} €`;
    document.getElementById('balance').textContent = `${balance.toFixed(2)} €`;
}

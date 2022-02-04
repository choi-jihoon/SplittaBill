# SplittaBill - SplitWise Clone

TESTING TEST BRANCH TO DEV

Friends
- When a friend is added, find User with that email and create 2 records on the Friends table
- When a friend is deleted, delete both records on the Friends table

Bills
- When a Bill is created,
    - Grab ids of all users specified by username
    - Create an expense with the total_amount split between each payer_id
    - Update all the Friend balances involved
- When a Bill is deleted, all related Expenses, Transaction Records, and Comments are also deleted (taken care of by cascade on models)
- Editing a Bill's total_amount should edit corresponding Expenses
- Editing a Bill's description has no effect on corresponding Expenses

Transaction records
- When a user clicks "Settle Up"/"Pay" next to a bill/expense, create a Transaction Record for that expense_id using the Bill's owner_id (as recipient_id)
    - Decrease (update) that Expense's amount_due
        - Check if the amount_due is 0. If it is, change "settled" attribute to True.
    - Update the corresponding balances in Friends

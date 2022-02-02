Friends
A logged in user may get, add, and delete their friends. Any time a friend is added, two rows in the Friends table is created (mutual friendship).

GET /api/users/:userId/friends
POST /api/users/:userId/friends
DELETE /api/users/:userId/friends/:friendId

Bills
A logged in user may get, add, edit, and delete their bills.

GET /api/users/:userId/bills
POST /api/users/:userId/bills
PUT /api/bills/:billId
DELETE /api/bills/:billId

Expenses
A logged in user may get, edit(make payments toward), and delete an expense. An expense for a specific user is created when a bill is created.

GET /api/users/:userId/expenses
POST /api/users/:userId/expenses
PUT /api/expenses/:expenseId
DELETE /api/expenses/:expenseId

Comments
A logged in user may get, add, edit, and delete comments on a bill.

GET /api/bills/:billId/comments
POST /api/bills/:billId/comments
PUT /api/comments/:commentId
DELETE /api/comments/:commentId

Transaction Records
A logged in user may see all the transaction records related to bills they are associated with. A transaction record is created every time an expense is updated.

GET /api/users/:userId/transaction-records
POST /api/transaction-records

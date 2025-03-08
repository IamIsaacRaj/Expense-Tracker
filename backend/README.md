# 🖥️ Expense Tracker Backend (MERN)

This is the **backend** for the Expense Tracker application, built with **Node.js, Express, and MongoDB**.

📂 Folder Structure

``` Project
📂 backend
 ┣ 📂 node_modules
 ┣ 📂 models
    ┣ 📄 Transaction.js
 ┣ 📂 routes
    ┣ 📄 transactionRoutes.js
 ┣ 📄 server.js
 ┣ 📄 package.json
 ┣ 📄 package-lock.json
 ┣ 📄 .gitignore
 ┣ 📄 .env
 ┣ 📄 README.md
```
 ---


## 📌 Features
✅ Express.js API  
✅ MongoDB connection with Mongoose  
✅ CORS support for frontend-backend communication  
✅ Environment variables with dotenv  
✅ RESTful API structure 

---

## 🚀 Setup & Run Backend

### 1️⃣ Install Dependencies
```bash
npm install
```
2️⃣ Create .env File
```bash
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

3️⃣ Start the Server
```bash
npm run dev
```
Your backend should now be running on http://localhost:5000 🚀

##  API Endpoints
### 1️⃣Get All Transactions

```
 http://localhost:5000/api/transactions

 GET('/');
```

| Parameter | Type     | Description                                        | Access     |
| :-------- | :------- | :--------------------------------                  | :-------   |
| `none`    | `Object` |   Fetch all **transactions** from the database     | Public     |



### 2️⃣Get One Transaction

```
 http://localhost:5000/api/transactions/:id

 GET('/:id');
```

| Parameter | Type     | Description                       | Access     |
| :-------- | :------- | :-------------------------------- | :-------   |
| `none`    | `String` |   Fetch one **transactions** by id| Public     |

### 3️⃣Add a New Transaction

```
 http://localhost:5000/api/transactions/

 POST('/');
```

| Parameter | Type     | Description                       | Access     |
| :-------- | :------- | :-------------------------------- | :-------   |
| `text`    | `String` |  Description of the transaction   | Public     |
| `amount`  | `Number` |  Transaction amount               | Public     |
| `type`    | `String` |  Must be either **income** or **expense**| Public     |

#### Example Request Body

``` json
{
  "text": "Freelance Payment",
  "amount": 3000,
  "type": "income"
}

```

#### Response

``` json
{
  "_id": "67cbf85da20b3b3c8c3e0e1a",
  "text": "Groceries",
  "amount": -1500,
  "type": "expense",
  "createdAt": "2025-03-08T07:12:45.232Z"
}

```

### 4️⃣Delete One Transaction

```
 http://localhost:5000/api/transactions/:id

 DELETE('/:id');
```

| Parameter | Type     | Description                       | Access     |
| :-------- | :------- | :-------------------------------- | :-------   |
| `id`      | `String` |  Delete one **transactions** by id| Public     |

#### Response

``` json
{
  "message": "Transaction deleted successfully"
}

```

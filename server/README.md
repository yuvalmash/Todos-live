# Welcome to the Todo App! 🚀

This is a simple yet powerful application designed to help you manage your tasks effectively. With its intuitive interface and robust features, staying organized has never been easier! ✅

## Client Side (React) 💻

### Components:

- **Add Todo Section:** 📝 The add todo section lets you create new todos effortlessly. Located at the top of the todo list, it includes a text input field and an "Add" button. Simply enter the title of your new todo in the input field and press the "Add" button to add it to your list.

- **Search Bar:** 🔍 The search bar allows you to filter todos by their title. Simply type in a keyword or phrase, and the app will display only the todos that match your search criteria. This feature is helpful for quickly finding specific tasks within your list.

- **Checkbox:** ✅ Each todo item has a checkbox next to it, allowing you to mark the task as complete or incomplete. When you check the box, the todo is marked as complete and displayed with a strikethrough effect. Unchecking the box changes the todo back to its original state, indicating that it is incomplete.

- **Edit Button:** ✏️ The edit button enables you to modify a todo's title directly within the app. Clicking on the edit icon next to a todo item activates an inline text field, allowing you to edit the title. Once you've made your changes, simply press the save icon to update the todo with the new title.

- **Delete Button:** 🗑️ The delete button provides a convenient way to remove a todo from your list. Clicking on the delete icon next to a todo item instantly deletes it from the list, allowing you to declutter your todo list and focus on the tasks that matter most.

- **Loader:** 🔄 The loader component displays a spinning animation (CircularProgress) to indicate that the application is loading data. It appears when fetching todos from the server and disappears once the data is loaded.

- **Toast:** 🍞 The toast feature provides user feedback in the form of an alert (Alert component from Material-UI). It notifies users about the status of their actions, such as successfully adding, updating, or deleting a todo, or encountering an error during the process.

## Server Side (Express) 🛠️

### Routes:

- **GET /api/todos:** Fetches todos from the server. Supports pagination and search by title. Caches data to improve performance.

- **POST /api/todo:** Adds a new todo to the server. Requires a title for the new todo.

- **PUT /api/todo:** Updates an existing todo on the server. Requires the updated todo object.

- **DELETE /api/todo/:id:** Deletes a todo from the server by ID. Supports pagination.

- Caching Mechanism
The Todo App employs an in-memory caching system to store previously fetched todos, page numbers, and search queries. When users revisit a previously accessed page or perform a similar search, the app checks the cache first to retrieve the data, enhancing performance and reducing server load. Cached data is periodically refreshed to ensure data accuracy and minimize stale content.

## Usage:

1. Clone the repository.
2. Navigate to the `client` directory.
3. Run `npm install` to install client-side dependencies.
4. Run `npm start` to start the client-side development server.
5. Navigate to the `server` directory.
6. Run `npm install` to install server-side dependencies.
7. Run `npm start` to start the server.


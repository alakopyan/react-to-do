const sendRequest = (address, method, body) => {
  return fetch(
    `https://exceed-todo-list.herokuapp.com/api/v1/todos/${address}`,
    {
      method,
      headers: {
        apikey: "39d77f49-c419-43c9-8cad-02e8e7fc9a83",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    }
  );
};

export default sendRequest;

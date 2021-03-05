const sendRequest = (address, method, body) => {
  return fetch(
    `/api/tasks/${address}`,
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

import axios from "axios";

let Get = () => {
  const config = {
    method: "GET",
    url: "/books",
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config);
};

export { Get };

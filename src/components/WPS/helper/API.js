import axios from "axios";

const FetchEvents = async (sort, order, date, type) => {
  try {
    const response = await axios.get(`/api/events?sort=${sort}&order=${order}&dateRange=${date}&type=${type}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return { response: response.data, status: response.status };
  } catch (err) {
    return { status: err.response.status };
  }
};

export { FetchEvents };

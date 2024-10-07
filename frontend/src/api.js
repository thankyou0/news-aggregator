import axios from "axios";
import config from "./config";

const headers = {
  'Content-Type': 'application/json',
  "authorization": "Bearer " + localStorage.getItem("token")
};

const GET = async (url) => {
  try {
    const response = await axios.get(config.BACKEND_API + url, { headers });
    return response;
  } catch (error) {
    console.error("GET request error:", error);
    // Handle the error gracefully
    return { success: false, message: "An error occurred while fetching data." };
  }
};

const POST = async (url, data) => {
  try {
    const response = await axios.post(config.BACKEND_API + url, data, { headers });
    return response;
  } catch (error) {
    console.error("POST request error:", error);
    // Handle the error gracefully
    return { success: false, message: "An error occurred while sending data." };
  }
};

export { GET, POST };
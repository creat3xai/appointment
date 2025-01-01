import axios , {AxiosError} from "axios";


const apiClient = axios.create({
    baseURL: "/api", // Set the base URL for your API
    headers: {
      "Content-Type": "application/json",
    },
  });

const isAxiosError = (error: unknown): error is AxiosError => {
    return axios.isAxiosError(error);
  };



export const bookAppointment = async (data : AppointmentT) => {
    try {
      const response = await apiClient.post("/validate", data);
      return response.data; // Return the API response data
    } catch (error) {
        if (isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log("API Error:", error.response.data);
        return false;
      } else {
        // Network or other errors
        console.log("Network Error:", error.message);
        return false;
      }
    }}
  };
import axios from "axios";

const API_URL = process.env.API_URI + "/api/diary";

export const getAllUserDiary = async () => {
  try {
    const response = await axios.get(`${API_URL}`, {
      withCredentials: true,
    });
    console.log("respooonse ", response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteDiaryById = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || "Unknown error",
    };
  }
};

export const updateDiaryById = async (id, updatedDiary) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedDiary, {
      withCredentials: true,
    });

    return {
      status: response.status,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || "Unknown error",
    };
  }
};

export const createDiary = async (diary) => {
  try {
    console.log("ini diary 2", diary);
    const response = await axios.post(`${API_URL}/create`, diary, {
      withCredentials: true,
    });

    console.log("response ", response);

    return {
      status: response.status,
      message: response.data.message,
      data: response.data,
    };
  } catch (error) {
    throw {
      status: error.response?.status,
      message: error.response?.data?.message || "Unknown error",
    };
  }
};

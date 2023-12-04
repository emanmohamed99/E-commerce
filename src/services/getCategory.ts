import axios from "axios";

const category =axios.get("http://localhost:7400/category")

const getCategoryAPI = () => Promise.resolve(category);

export default getCategoryAPI;
// TODO 8 - Fetch storage of the Lottery by completing fetchStorage

import axios from "axios";

export const getStorage = async (address: string) => {
    const response = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/${address}/storage`);
    return response.data;
};
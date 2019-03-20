import { injectable } from "inversify";
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

@injectable()
export class HomeService {

    public async getUserDetails(id: string): Promise<any> {
        try {
            const response = await axios.get(`https://api.github.com/users/${id}`);
            return (response.data);
        } catch (error) {
            console.log(error);
        }

    }

}

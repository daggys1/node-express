import { injectable } from "inversify";
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

@injectable()
export class HomeService {

    public async getUserDetails(): Promise<any> {
        try {
            const response = await axios.get("https://api.github.com/users/daggys1");
            return (response.data);;
        } catch (error) {
            console.log(error);
        }

    }

}

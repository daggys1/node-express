import { injectable } from "inversify";
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";

@injectable()
export class HomeService {

    public async getUserDetails(): Promise<any> {
        let resp = null;
        axios.get("https://api.github.com/users/daggys1")
            .then((res) => {
                console.log(res);
                resp = res;
            }).catch((err) => {
                console.log(err);
            });
        return resp;

    }

}

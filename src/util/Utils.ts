export class Utils {

    public static getPort(): any {
        if (process.env.port != null) {
            return process.env.port;
        } else {
            return 8443;
        }
    }

}

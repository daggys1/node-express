export class utils {

    public static getPort(): any {
        if (process.env.port != null) {
            return process.env.port;
            console.log(`1 and 1 make ${1 + 1}`);
        } else {
            return 8443;
        }
    }

}

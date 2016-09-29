// Static helper class for precondition checking.
export class ArgumentHelper  {

    /**
     * Checks the given parameter is not null, throws an exception if not.
     */
    public static checkNotNull(parameterName: string, arg: any) {
        if (arg === null || arg === undefined) {
            throw new Error(`The parameter/input '${parameterName}' must not be null.`);
        }
    }

    public static checkNotEmpty(parameterName: string, arg: string) {
        ArgumentHelper.checkNotNull(parameterName, arg);
        if (arg.length === 0) {
            throw new Error(`The parameter/input '${parameterName}' must not be empty.`);
        }
    }

    public static checkInputNotNull(parentName: string, inputName: string, arg: any) {
        if (arg === null || arg === undefined) {
            throw new Error(`The @Input('${inputName}') is mandatory on '${parentName}'.`);
        }
    }

    public static checkChildNotNull(parentName: string, childName: string, arg: any) {
        if (arg === null || arg === undefined) {
            throw new Error(`The @ViewChild('${childName}') is mandatory on '${parentName}'.`);
        }
    }
}

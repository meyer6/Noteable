export interface dataInstance{
    type: string;
    value: string;
    extraData: any;
    content: Array<dataInstance>;
}
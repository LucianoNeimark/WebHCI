export interface Action {
    device:{
        id: string;
        name: string;
        type:{
            id: string;
            name: string;
            powerUsage: number;
        }
        meta?: any;
    };
    actionName: string;
    params: any;
    meta?: any;
}
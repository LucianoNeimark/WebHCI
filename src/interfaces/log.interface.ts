export default interface Log {
    timestamp: string;
    deviceId: string;
    action: string;
    params: string[];
    result: any;
}
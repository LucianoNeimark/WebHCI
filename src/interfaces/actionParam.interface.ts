export interface Parameter{
    name : string
    type : string
    minValue? : number | string
    maxValue? : number | string
    supportedValues? : string[]
}
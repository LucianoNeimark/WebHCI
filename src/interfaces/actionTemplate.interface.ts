import type { Parameter } from "./actionParam.interface"

export interface ActionTemplate {
   name : string
   params : Parameter[]
   return : {
        type :  string
   }
}

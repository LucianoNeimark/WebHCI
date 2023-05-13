import type { Parameter } from "@/interfaces/actionParam.interface"

export interface ActionTemplate {
   name : string
   params : Parameter[]
   return : {
        type :  string
   }
}

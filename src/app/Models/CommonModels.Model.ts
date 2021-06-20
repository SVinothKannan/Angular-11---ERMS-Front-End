export class EmpProfileSearch{
    IsLineManager:boolean;
    Location: string;
    MstSkill_Id: number;
    InBench: boolean;
    IsWFH:boolean;
    MinPage:number;
    MaxPage:number;
  }

 export interface ViewProfilesModel
 {
   EmpId:number;
 } 

 export class OrderModels{
  OrderedFoodName: string;
  OrderId: number;
  OrderedTime: Date;
}

export class AddEmployeeModel {

    constructor(
      public EmpId: number,
      public EmpName?: string,
      public DOJ?: string,
      public JobTitle?: string,
      public DepartMent?:string,
      public SalaryMonthly?:number,
      public SalaryAnnually?:number,
      public Address?:string,
      public IsLineManager?:boolean,
      public IsActive?:boolean
    ) {  }
  
  }
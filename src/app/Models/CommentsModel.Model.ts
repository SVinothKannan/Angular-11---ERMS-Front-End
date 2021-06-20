export class CommentsModel {
    constructor(
      public EmpId: number=0,
      public EmpName: string,
      public CommentsId: number=0,
      public Author?: string,
      public Comments?: string,
    ) {  }

  }
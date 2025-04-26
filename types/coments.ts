// types/comments.ts
export interface Comment {
    _id: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
    replies: Reply[];
  }
  
  export interface Reply {
    _id: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
  }
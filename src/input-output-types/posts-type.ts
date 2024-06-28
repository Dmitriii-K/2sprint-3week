import { ObjectId } from "mongodb";

export type PstId = {
  id: string;
};

export type PostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};

export type PostViewModel = {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export type PostDbType = {
  _id?: ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: string;
};

export type PaginatorPostViewModel = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: PostViewModel[];
};

export type TypePostHalper = {
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
};

export type CommentInputModel = {
  content:	string;
};

export type CommentatorInfo = {
  userId:	string;
  userLogin:	string;
};

export type CommentViewModel = {
id:string;
content:	string;
createdAt:	string;
commentatorInfo: CommentatorInfo;
};

export type CommentDBType = {
  _id?: ObjectId;
  postId?: string;
  content:	string;
  createdAt:	string;
  commentatorInfo: CommentatorInfo;
  }

export type PaginatorCommentViewModelDB = {
pagesCount:	number;
page:	number;
pageSize:	number;
totalCount:	number;
items: CommentViewModel[];
};
export type TypeCommentPagination = {
  sortBy: string;
  sortDirection: string;
  pageNumber: number;
  pageSize: number;
};
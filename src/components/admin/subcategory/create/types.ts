export interface ISubCategoryCreate {
    name: string;
    categoryId: number | "";
    imageSubCategory: File | null;
}

export interface IUploadedFile {
    lastModified: number;
    lastModifiedDate: Date;
    name: string;
    originFileObj: File;
    percent: number;
    size: number;
    thumbUrl: string;
    type: string;
    uid: string;
}
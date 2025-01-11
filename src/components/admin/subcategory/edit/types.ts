export interface ISubCategoryEdit {
    id: number;
    name: string;
    categoryId: number | "";
    currentImagePath: string;
    newImageSubCategory: File | null;
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
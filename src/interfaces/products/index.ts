export interface IProductItem {
    id: number;
    code: string,
    name: string,
    price: number,
    images: string[],
    manufacturer: string,
    size: string,
    color: string,
    type: string,
    form: string,
    quantityInPack: number,
    quantityInStock: number,
    //model: string,
    subCategoryName: string,
    subCategoryId: number,
    description: string
}

export interface IProductCreate {
    code: string,
    name: string,
    price: number,
    images: File[],
    manufacturer: string,
    size: string,
    color: string,
    type: string,
    form: string,
    quantityInPack: number,
    quantityInStock: number,
    //model: string,
    subCategoryName: string,
    subCategoryId: number,
    description: string
}

export interface IProductImageDesc {
    id: number,
    image: string,
}

export interface IProductEdit {
    id: number,
    code: string,
    name: string,
    price: number,
    images?: File[];
    manufacturer: string,
    size: string,
    color: string,
    type: string,
    form: string,
    quantityInPack: number,
    quantityInStock: number,
    //model: string,
    subCategoryName: string,
    subCategoryId: number,
    description: string
}

export interface IUploadedFile {
    id: number;
    image: string;
    priority: number;
    preview: any;
    url: any;
    originFileObj: File;
    size: number;
    type: string;
    uid: string;
}
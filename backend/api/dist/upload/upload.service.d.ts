export declare class UploadService {
    private readonly uploadDir;
    constructor();
    saveLicenseDocument(file: Express.Multer.File): string;
    deleteLicenseDocument(filePath: string): void;
    validateLicenseFile(file: Express.Multer.File): boolean;
}

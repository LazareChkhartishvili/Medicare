import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadLicense(file: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        data: {
            filePath: string;
            fileName: string;
            fileSize: number;
            mimeType: string;
        };
    }>;
}

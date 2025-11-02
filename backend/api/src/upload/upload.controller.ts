import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('license')
  @UseInterceptors(FileInterceptor('file'))
  async uploadLicense(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validate file
    if (!this.uploadService.validateLicenseFile(file)) {
      throw new BadRequestException(
        'Invalid file. Only PDF, JPG, JPEG, PNG files up to 5MB are allowed.',
      );
    }

    // Save file
    const filePath = await this.uploadService.saveLicenseDocument(file);

    return {
      success: true,
      message: 'File uploaded successfully',
      data: {
        filePath,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
      },
    };
  }
}

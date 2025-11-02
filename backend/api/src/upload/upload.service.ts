import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  private readonly uploadDir = path.join(process.cwd(), 'uploads', 'licenses');

  constructor() {
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  saveLicenseDocument(file: Express.Multer.File): string {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    const filePath = path.join(this.uploadDir, fileName);

    // Save file
    fs.writeFileSync(filePath, file.buffer);

    // Return relative path
    return `uploads/licenses/${fileName}`;
  }

  deleteLicenseDocument(filePath: string): void {
    const fullPath = path.join(process.cwd(), filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  validateLicenseFile(file: Express.Multer.File): boolean {
    // Allowed mime types
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    // Check mime type
    if (!allowedTypes.includes(file.mimetype)) {
      return false;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return false;
    }

    return true;
  }
}

// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';

cloudinary.config({
  cloud_name: 'daukrklu1',
  api_key: '115624961362672',
  api_secret: 'wRyFvN7_4D20sDMJRaEQsQTP1aM',
});

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path);
    fs.unlinkSync(file.path); // delete local file after upload
    return result.secure_url;
  }
}

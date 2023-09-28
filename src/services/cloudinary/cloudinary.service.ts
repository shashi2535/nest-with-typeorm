import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
@Injectable()
export class CloudinaryService {
  async uploadImage(
    path: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      const upload = await v2.uploader.upload(path);
      return upload;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
  async updateImage(
    path: string,
    public_id: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      await v2.uploader.destroy(public_id);
      const upload = await v2.uploader.upload(path);
      return upload;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}

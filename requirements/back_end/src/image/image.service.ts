import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as FormData from 'form-data';
import { map } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ImageService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async uploadImage(imageBinary: string): Promise<any> {
    const formData = new FormData();
    formData.append('image', imageBinary);
    const imgbbApiKey = this.configService.get<string>('IMGBB_API_KEY');
    const expirationTime = this.configService.get<number>(
      'IMGBB_EXPIRATION_TIME',
    );
    const imgbbUrl = this.configService.get<string>('IMGBB_UPLOAD_URI');
    const url = `${imgbbUrl}?expiration=${expirationTime}&key=${imgbbApiKey}`;

    let result = null;
    try {
      result = await lastValueFrom(
        this.httpService
          .post(url, formData, { headers: formData.getHeaders() })
          .pipe(map((resp) => resp.data)),
      );
    } catch (error) {
      console.error(error);
    }
    // console.log('IMGBB Result: ', result);
    return result;
  }
}

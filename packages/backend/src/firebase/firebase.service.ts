import {Injectable} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor() {
    if (admin.apps.length === 0) {
      const clientCredentials = {
        credential: admin.credential.applicationDefault(),
      };
      admin.initializeApp(clientCredentials);
    }
  }

  private async getAuth(): Promise<admin.auth.Auth> {
    return admin.auth();
  }

  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return (await this.getAuth()).verifyIdToken(token);
  }
}

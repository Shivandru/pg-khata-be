import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env-validator.ts";

export type GoogleUser = {
  name: string;
  email: string;
  avatar: string | null;
};

export class GoogleAuthService {
  private readonly client: OAuth2Client;

  constructor() {
    const clientId = env.GOOGLE_CLIENT_ID;

    if (!clientId) {
      throw new Error("GOOGLE_CLIENT_ID is not configured.");
    }

    this.client = new OAuth2Client(clientId);
  }

  async verify(idToken: string): Promise<GoogleUser> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.name) {
      throw new Error("Invalid Google token.");
    }

    return {
      name: payload.name,
      email: payload.email,
      avatar: payload.picture ?? null,
    };
  }
}
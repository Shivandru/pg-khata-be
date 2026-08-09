export type GoogleUser = {
    name: string;
    email: string;
    avatar: string | null;
};
export declare class GoogleAuthService {
    private readonly client;
    constructor();
    verify(idToken: string): Promise<GoogleUser>;
}
//# sourceMappingURL=googleAuth.service.d.ts.map
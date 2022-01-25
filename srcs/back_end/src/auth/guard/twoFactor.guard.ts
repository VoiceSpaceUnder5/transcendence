import { AuthGuard } from '@nestjs/passport';

export class TwoFactorGuard extends AuthGuard('jwt-2fa') {}

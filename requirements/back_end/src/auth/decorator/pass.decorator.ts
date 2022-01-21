import { SetMetadata } from '@nestjs/common';

export const PassAccessGuard = () => SetMetadata('isPassAccessGuard', true);
export const PassTwoFactorGuard = () =>
  SetMetadata('isPassTwoFactorGuard', true);

import { SetMetadata } from '@nestjs/common';

export const PassAccessGuard = () => SetMetadata('isPassAccessGuard', true);

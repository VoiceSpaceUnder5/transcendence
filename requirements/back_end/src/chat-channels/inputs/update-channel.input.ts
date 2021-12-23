import { PartialType } from '@nestjs/graphql';
import { CreateChannelInput } from './create-channel.input';

export class UpdateChannelInput extends PartialType(CreateChannelInput) {}

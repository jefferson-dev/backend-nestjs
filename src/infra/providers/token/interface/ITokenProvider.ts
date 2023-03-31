import { DecodeInput, DecodeOutput } from '../types/decode';
import { SingInput, SingOutput } from '../types/sing';

export abstract class ITokenProvider {
  abstract sing(data: SingInput): Promise<SingOutput>;
  abstract decode(data: DecodeInput): Promise<DecodeOutput>;
}

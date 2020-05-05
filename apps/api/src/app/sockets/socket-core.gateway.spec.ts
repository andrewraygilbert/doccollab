import { Test, TestingModule } from '@nestjs/testing';
import { SocketCoreGateway } from './socket-core.gateway';

describe('SocketCoreGateway', () => {
  let gateway: SocketCoreGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketCoreGateway],
    }).compile();

    gateway = module.get<SocketCoreGateway>(SocketCoreGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

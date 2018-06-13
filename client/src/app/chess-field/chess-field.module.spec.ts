import { ChessFieldModule } from './chess-field.module';

describe('ChessFieldModule', () => {
  let chessFieldModule: ChessFieldModule;

  beforeEach(() => {
    chessFieldModule = new ChessFieldModule();
  });

  it('should create an instance', () => {
    expect(chessFieldModule).toBeTruthy();
  });
});

import { PipeablePipe } from './pipeable.pipe';

describe('PipeablePipe', () => {
  it('create an instance', () => {
    const pipe = new PipeablePipe();
    expect(pipe).toBeTruthy();
  });
});

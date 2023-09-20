import { AskManager } from './ask-manager';

jest.useFakeTimers();

describe('ask-manager', () => {
  it('sets defautlvalues', async () => {
    const theAskManager = new AskManager();
    expect(theAskManager.isInOptionsView).toBeFalsy();
  });
});

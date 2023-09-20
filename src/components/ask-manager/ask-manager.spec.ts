import { AskManager } from './ask-manager';

jest.useFakeTimers();

describe('ask-manager', () => {
  it('throws errors on faulty input', async () => {
    const theAskManager = new AskManager();
    let options: any = {
      //To avoid warnings getting printed
      cookiePolicyLastUpdated: '2023-01-01',
    };

    expect(theAskManager.setOptions(options)).rejects.toThrow();
    options.linkToPrivacyPolicy = null;
    expect(theAskManager.setOptions(options)).rejects.toThrow();
    options.linkToPrivacyPolicy = '';
    expect(theAskManager.setOptions(options)).rejects.toThrow();
    options.linkToPrivacyPolicy = ' ';
    expect(theAskManager.setOptions(options)).rejects.toThrow();
    options.linkToPrivacyPolicy = 'https://example.com';
    expect(theAskManager.setOptions(options)).resolves.toBe(undefined);

    options.linkText = null;
    expect(theAskManager.setOptions(options)).rejects.toThrow();
    options.linkText = '';
    expect(theAskManager.setOptions(options)).rejects.toThrow();
    options.linkText = ' ';
    expect(theAskManager.setOptions(options)).rejects.toThrow();
    options.linkText = 'policy';
    expect(theAskManager.setOptions(options)).resolves.toBe(undefined);
  });
});

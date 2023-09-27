import { AskManager } from './ask-manager';

jest.useFakeTimers();

describe('ask-manager', () => {
  [
    {
      errorMessage: 'No linkToPrivacyPolicy provided',
    },
    {
      linkToPrivacyPolicy: null,
      errorMessage: 'No linkToPrivacyPolicy provided',
    },
    {
      linkToPrivacyPolicy: '',
      errorMessage: 'No linkToPrivacyPolicy provided',
    },
    {
      linkToPrivacyPolicy: ' ',
      errorMessage: 'No linkToPrivacyPolicy provided',
    },
  ].forEach(({ linkToPrivacyPolicy, errorMessage }) =>
    it(`throw ${errorMessage} when linkToPrivacyPolicy is ${linkToPrivacyPolicy}`, () => {
      const theAskManager = new AskManager();
      const options = {
        cookiePolicyLastUpdated: '2023-01-01',
        linkToPrivacyPolicy,
      };

      expect(theAskManager.setOptions(options)).rejects.toThrow(errorMessage);
    }),
  );

  [
    {
      texts: { linkText: null },
      errorMessage: 'Empty linkText provided',
    },
    {
      texts: { linkText: '' },
      errorMessage: 'Empty linkText provided',
    },
    {
      texts: { linkText: ' ' },
      errorMessage: 'Empty linkText provided',
    },
  ].forEach(({ texts, errorMessage }) =>
    it(`throw ${errorMessage} when linkText is ${texts.linkText}`, () => {
      const theAskManager = new AskManager();
      const options = {
        cookiePolicyLastUpdated: '2023-01-01',
        linkToPrivacyPolicy: 'http://example.com',
        texts,
      };

      expect(theAskManager.setOptions(options)).rejects.toThrow(errorMessage);
    }),
  );

  it('throws no error on valid input', async () => {
    const theAskManager = new AskManager();
    let options: any = {
      //To avoid warnings getting printed
      cookiePolicyLastUpdated: '2023-01-01',
      linkText: 'policy',
      linkToPrivacyPolicy: 'https://example.com',
    };

    expect(theAskManager.setOptions(options)).resolves.toBe(undefined);
  });
});

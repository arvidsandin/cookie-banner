import { Options } from '../../components';
import { AskManager } from './ask-manager';

jest.useFakeTimers();

describe('linkToPrivacyPolicy', () => {
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

  it('throws no error on valid input', async () => {
    const theAskManager = new AskManager();
    let options: Options = {
      //To avoid warnings getting printed
      cookiePolicyLastUpdated: '2023-01-01',
      linkToPrivacyPolicy: 'https://example.com',
    };

    expect(theAskManager.setOptions(options)).resolves.toBe(undefined);
  });
});
describe('linkText', () => {
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
    let options: Options = {
      //To avoid warnings getting printed
      cookiePolicyLastUpdated: '2023-01-01',
      texts: { linkText: 'policy' },
      linkToPrivacyPolicy: 'https://example.com',
    };

    expect(theAskManager.setOptions(options)).resolves.toBe(undefined);
  });
});

describe('ask-manager', () => {
  [
    {
      categories: [
        {
          key: 'functional',
          description: 'Gives functionality',
          name: 'Functional cookies',
        },
      ],
      errorMessage: 'Missing "purpose" in Category object to insert in default text',
    },
    {
      categories: [
        {
          key: 'functional',
          description: 'Gives functionality',
          name: 'Functional cookies',
          purpose: 'functional',
        },
        {
          key: 'analytical',
          description: 'Analyzes',
          name: 'Analytical cookies',
          purpose: 'functional',
        },
        {
          key: 'marketing',
          description: 'Gives targeted ads',
          name: 'Marketing Cookies',
          purpose: '',
        },
      ],
      errorMessage: 'Missing "purpose" in Category object to insert in default text',
    },
  ].forEach(({ categories, errorMessage }) =>
    it(`throw ${errorMessage} when categories is ${JSON.stringify(categories)}`, () => {
      const theAskManager = new AskManager();
      const options = {
        cookiePolicyLastUpdated: '2023-01-01',
        linkToPrivacyPolicy: 'https://example.com/',
        categories,
      };

      expect(theAskManager.setOptions(options)).rejects.toThrow(errorMessage);
    }),
  );

  it('throws no error on valid input', async () => {
    const theAskManager = new AskManager();
    let options: Options = {
      cookiePolicyLastUpdated: '2023-01-01',
      linkToPrivacyPolicy: 'https://example.com',
      categories: [
        {
          key: 'functional',
          description: 'Gives functionality',
          name: 'Functional cookies',
          purpose: 'functional',
        },
      ],
    };
    expect(theAskManager.setOptions(options)).resolves.toBe(undefined);
  });

  it('throws no error on valid input', async () => {
    const theAskManager = new AskManager();
    let options: Options = {
      cookiePolicyLastUpdated: '2023-01-01',
      linkToPrivacyPolicy: 'https://example.com',
      categories: [
        {
          key: 'functional',
          description: 'Gives functionality',
          name: 'Functional cookies',
        },
      ],
      texts: {
        linkText: 'policy',
        mainContent: 'We use functional cookies',
      },
    };
    expect(theAskManager.setOptions(options)).resolves.toBe(undefined);
  });
});

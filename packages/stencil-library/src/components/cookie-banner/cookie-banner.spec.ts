import { Options } from '../../components';
import { CookieBanner } from './cookie-banner';

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
      const theCookieBanner = new CookieBanner();
      const options = {
        cookiePolicyLastUpdated: '2023-01-01',
        linkToPrivacyPolicy,
      };

      expect(theCookieBanner.setOptions(options)).rejects.toThrow(errorMessage);
    }),
  );

  it('throws no error on valid input', async () => {
    const theCookieBanner = new CookieBanner();
    let options: Options = {
      //To avoid warnings getting printed
      cookiePolicyLastUpdated: '2023-01-01',
      linkToPrivacyPolicy: 'https://example.com',
    };

    expect(theCookieBanner.setOptions(options)).resolves.toBe(undefined);
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
      const theCookieBanner = new CookieBanner();
      const options = {
        cookiePolicyLastUpdated: '2023-01-01',
        linkToPrivacyPolicy: 'http://example.com',
        texts,
      };

      expect(theCookieBanner.setOptions(options)).rejects.toThrow(errorMessage);
    }),
  );

  it('throws no error on valid input', async () => {
    const theCookieBanner = new CookieBanner();
    let options: Options = {
      //To avoid warnings getting printed
      cookiePolicyLastUpdated: '2023-01-01',
      texts: { linkText: 'policy' },
      linkToPrivacyPolicy: 'https://example.com',
    };

    expect(theCookieBanner.setOptions(options)).resolves.toBe(undefined);
  });
});

describe('monthsOfValidity', () => {
  [
    {
      monthsOfValidity: -1,
      errorMessage: 'monthsOfValididy cannot be negative',
    },
    {
      monthsOfValidity: -10,
      errorMessage: 'monthsOfValididy cannot be negative',
    },
    {
      monthsOfValidity: Number.NEGATIVE_INFINITY,
      errorMessage: 'monthsOfValididy cannot be negative',
    },
  ].forEach(({ monthsOfValidity, errorMessage }) =>
    it(`throw ${errorMessage} when monthsOfValidity is ${monthsOfValidity}`, () => {
      const theCookieBanner = new CookieBanner();
      const options = {
        cookiePolicyLastUpdated: '2023-01-01',
        linkToPrivacyPolicy: 'https://example.com',
        monthsOfValidity,
      };

      expect(theCookieBanner.setOptions(options)).rejects.toThrow(errorMessage);
    }),
  );

  [{ monthsOfValidity: null }, { monthsOfValidity: 0 }, { monthsOfValidity: 1 }, { monthsOfValidity: Number.MAX_VALUE }, { monthsOfValidity: Number.POSITIVE_INFINITY }].forEach(
    ({ monthsOfValidity }) =>
      it(`throws no error on when input is ${monthsOfValidity}`, async () => {
        const theCookieBanner = new CookieBanner();
        const options = {
          cookiePolicyLastUpdated: '2023-01-01',
          linkToPrivacyPolicy: 'https://example.com',
          monthsOfValidity,
        };

        expect(theCookieBanner.setOptions(options)).resolves.toBe(undefined);
      }),
  );
});

describe('cookie-banner', () => {
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
      const theCookieBanner = new CookieBanner();
      const options = {
        cookiePolicyLastUpdated: '2023-01-01',
        linkToPrivacyPolicy: 'https://example.com/',
        categories,
      };

      expect(theCookieBanner.setOptions(options)).rejects.toThrow(errorMessage);
    }),
  );

  it('throws no error on valid input', async () => {
    const theCookieBanner = new CookieBanner();
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
    expect(theCookieBanner.setOptions(options)).resolves.toBe(undefined);
  });

  it('throws no error on valid input', async () => {
    const theCookieBanner = new CookieBanner();
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
    expect(theCookieBanner.setOptions(options)).resolves.toBe(undefined);
  });
});

import { AskManager } from './ask-manager';

jest.useFakeTimers();

describe('ask-manager', () => {
  it('initializes with correct default values', async () => {
    const theAskManager = new AskManager();

    expect(theAskManager.categories).toEqual([]);
    expect(theAskManager.cookieConsent).toEqual({ lastAccepted: null, acceptedCategories: [] });
  });

  it('accept all and reject all changes relevant values', async () => {
    const theAskManager = new AskManager();
    let timeBefore = new Date();
    jest.advanceTimersByTime(10);
    theAskManager.categories = ['functional', 'analytical'];
    theAskManager.acceptAllCookies();
    jest.advanceTimersByTime(10);
    let timeAfter = new Date();

    expect(theAskManager.cookieConsent.acceptedCategories).toEqual(['functional', 'analytical']);
    expect(theAskManager.cookieConsent.lastAccepted > timeBefore).toBeTruthy();
    expect(theAskManager.cookieConsent.lastAccepted < timeAfter).toBeTruthy();

    timeBefore = new Date();
    jest.advanceTimersByTime(10);
    theAskManager.rejectAllCookies();
    jest.advanceTimersByTime(10);
    timeAfter = new Date();

    expect(theAskManager.cookieConsent.acceptedCategories).toEqual([]);
    expect(theAskManager.cookieConsent.lastAccepted > timeBefore).toBeTruthy();
    expect(theAskManager.cookieConsent.lastAccepted < timeAfter).toBeTruthy();
  });
});

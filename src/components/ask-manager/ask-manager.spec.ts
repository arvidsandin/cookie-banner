import { AskManager } from './ask-manager';

describe('my-component', () => {
  it('initializes with correct default values', async () => {
    const theAskManager = new AskManager();

    expect(theAskManager.categories).toEqual([]);
    expect(theAskManager.cookieConsent).toEqual({ lastAccepted: null, acceptedCategories: [] });
  });

  //short sleep to ensure different timestamps
  function sleep() {
    return new Promise(resolve => setTimeout(resolve, 10));
  }

  it('accept all and reject all changes relevant values', async () => {
    const theAskManager = new AskManager();
    var timeBefore = new Date();
    await sleep();
    theAskManager.categories = ['functional', 'analytical'];
    theAskManager.acceptAllCookies();
    await sleep();
    var timeAfter = new Date();

    expect(theAskManager.cookieConsent.acceptedCategories).toEqual(['functional', 'analytical']);
    expect(theAskManager.cookieConsent.lastAccepted > timeBefore).toBeTruthy();
    expect(theAskManager.cookieConsent.lastAccepted < timeAfter).toBeTruthy();

    timeBefore = new Date();
    await sleep();
    theAskManager.rejectAllCookies();
    await sleep();
    timeAfter = new Date();

    expect(theAskManager.cookieConsent.acceptedCategories).toEqual([]);
    expect(theAskManager.cookieConsent.lastAccepted > timeBefore).toBeTruthy();
    expect(theAskManager.cookieConsent.lastAccepted < timeAfter).toBeTruthy();
  });
});

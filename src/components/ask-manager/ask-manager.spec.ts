import { AskManager } from "./ask-manager";

describe("my-component", () => {
  it("initializes with a false", async () => {
    const theAskManager = new AskManager();
    expect(theAskManager.hasAccepted).toBe(false);
  });
});

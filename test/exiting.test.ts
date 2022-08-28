import Code from "@hapi/code";
import Exiting from "exiting";
import Hoek from "@hapi/hoek";
import Lab from "@hapi/lab";
import { deployment, manager } from "../server";

// Test shortcuts

const lab = (exports.lab = Lab.script());
const { describe, it, before, beforeEach, after } = lab;
const { expect } = Code;

describe("Manager", () => {

  before(() => {
    const log = Exiting.log;
    Exiting.log = function (...args) {
      const consoleError = console.error;
      console.error = Hoek.ignore;
      log.apply(Exiting, args);
      console.error = consoleError;
    };
  });

  beforeEach(() => {
    Exiting.reset();
  });

  after(async () => {
    Exiting.reset();
  });

  it("unhandledRejection handler ignores ProcessExitErrors", async (flags: Lab.script.Flags) => {

    await deployment({ start: true });

    await new Promise<void>((resolve, reject) => {
      flags.onUnhandledRejection = (err: unknown) => {
        err instanceof Exiting.ProcessExitError ? resolve() : reject(err);
      };
      Promise.reject(new Exiting.ProcessExitError());
    });

    await manager.stop()
    expect(manager.state).to.equal("stopped");
  });
});

import { TSESLint } from "@typescript-eslint/utils";
import rule from "./no-process-node-env";

const ruleTester = new TSESLint.RuleTester();

ruleTester.run("no-process-node-env", rule, {
  valid: ["process.env.hoge", "process.env"],
  invalid: [
    {
      code: "process.env.NODE_ENV",
      errors: [
        {
          messageId: "unexpectedProcessEnvNodeEnv",
        },
      ],
    },
  ],
});

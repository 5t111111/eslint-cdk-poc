import { RuleTester } from "eslint";

const rule = require("../src/no-process-node-env");

const ruleTester = new RuleTester();
// rule名, ルールの実装(先程実装したやつ), 成功ケースと失敗ケース
ruleTester.run("no-process-node-env", rule, {
  // 成功ケース
  valid: ["process.env.hoge", "process.env"],
  // 失敗ケース
  invalid: [
    {
      code: "process.env.NODE_ENV",
      errors: [
        {
          // 失敗したときの詳細。ID指定じゃない場合はメッセージを直に書くのが正解かも。
          messageId: "unexpectedProcessEnvNodeEnv",
          type: "MemberExpression",
        },
      ],
    },
  ],
});

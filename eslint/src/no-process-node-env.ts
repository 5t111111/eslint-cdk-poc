import { Rule as noProcessNodeEnvRule } from "eslint";
import {
  MemberExpression,
  Expression,
  Super,
  Identifier,
  PrivateIdentifier,
} from "estree";

const isMemberExpression = (
  object: Expression | Super
): object is MemberExpression & {
  parent: noProcessNodeEnvRule.Node;
} => {
  return object.type === "MemberExpression";
};

const isIdentifier = (
  expression: Expression | Super | PrivateIdentifier
): expression is Identifier => {
  return expression.type === "Identifier";
};

const rule: noProcessNodeEnvRule.RuleModule = {
  meta: {
    type: "problem",
    hasSuggestions: true,
    docs: {
      description: "許可のされていないprocess.env.NODE_ENV",
    },
    messages: {
      unexpectedProcessEnvNodeEnv:
        "process.env.NODE_ENVは許可されていません。myNodeEnv() を利用してください。",
      replaceToNodeEnv: "myNodeEnv() に置き換える。",
    },
  },
  create(context: noProcessNodeEnvRule.RuleContext) {
    return {
      MemberExpression(
        node: MemberExpression & noProcessNodeEnvRule.NodeParentExtension
      ) {
        // typeチェックを行います。typeといってもASTのtypeです。
        const sourceNode = node.object;

        // propertyにアクセスする親がMemberExpressionでなければ今回確認するやつではないですね。
        if (!isMemberExpression(sourceNode)) {
          return;
        }

        const sourceObject = sourceNode.object;
        const sourceProperty = sourceNode.property;
        const targetProperty = node.property;

        // TypeScriptじゃなければ、せいぜい確認するのはsourceObjectだけですが
        // すべてIdentifier型ではないので、TypeGuardも兼ねてすべてIdentifierであることを確認します。
        if (!isIdentifier(sourceObject)) {
          return;
        }
        if (!isIdentifier(sourceProperty)) {
          return;
        }
        if (!isIdentifier(targetProperty)) {
          return;
        }

        // 続いて値を確認していきます。
        // node.computedを確認しているのは、本家の`no-process-env`でやっていたからですが、正直不要だと思います。
        if (
          !node.computed &&
          sourceObject.name === "process" &&
          sourceProperty.name === "env" &&
          targetProperty.name === "NODE_ENV"
        ) {
          // 無事process.env.NODE_ENVのASTが現れたことを確認したらレポートします。
          context.report({
            node,
            // messageIdはmeta.messagesに指定した値を利用します。
            messageId: "unexpectedProcessEnvNodeEnv",
            // 提案する場合はこれを指定します。VSCodeで変換できるようになりますね。
            // またmeta.hasSuggestionsがtrueにする必要があります。
            suggest: [
              {
                // messageIdはmeta.messagesに指定した値を利用します。
                messageId: "replaceToNodeEnv",
                // 変換する動作です。今回は単純に`process.env.NODE_ENV`を`myNodeEnv()`に置き換えるだけに留まっています。
                fix(fixer) {
                  return fixer.replaceText(node, "myNodeEnv()");
                },
              },
            ],
          });
        }
      },
    };
  },
};

module.exports = rule;

import {MathToken} from "./exp_type";
import { EXPRESSION_CONSTANTS } from "./constants";

/*eslint no-eval: ["error", {"allowIndirect": true} ]*/
/*global window*/

export const seperateTokens = (text: string): MathToken[] => {
  const testString = text
    .replace(/\s/gi, "")
    .replace("++", "+")
    .replace("--", "+")
    .replace("-+", "-")
    .replace("+-", "-");
  const bracketsLeft = [
    ...testString.matchAll(EXPRESSION_CONSTANTS.PATTERNS.bracketsLeft),
  ].map((x: any) => {
    return {
      text: x.toString(),
      startIndex: x.index,
      endIndex: x.index + x.toString().length,
      type: "bracketsLeft",
    };
  });
  const bracketsRight = [
    ...testString.matchAll(EXPRESSION_CONSTANTS.PATTERNS.bracketsRight),
  ].map((x: any) => {
    return {
      text: x.toString(),
      startIndex: x.index,
      endIndex: x.index + x.toString().length,
      type: "bracketsRight",
    };
  });
  const delimeters = [
    ...testString.matchAll(EXPRESSION_CONSTANTS.PATTERNS.delimeters),
  ].map((x: any) => {
    return {
      text: x.toString(),
      startIndex: x.index,
      endIndex: x.index + x.toString().length,
      type: "delimeters",
    };
  });
  let operators = [
    ...testString.matchAll(EXPRESSION_CONSTANTS.PATTERNS.operators),
  ].map((x: any) => {
    return {
      text: x.toString(),
      startIndex: x.index,
      endIndex: x.index + x.toString().length,
      type: "operators",
    };
  });
  const params = [...testString.matchAll(EXPRESSION_CONSTANTS.PATTERNS.params)]
    .map((x: any) => {
      return {
        text: x.toString(),
        startIndex: x.index,
        endIndex: x.index + x.toString().length,
        type: "params",
      };
    })
    .filter((x) => !operators.map((y) => y.text).includes(x.text));
  operators = operators.filter(
    (x) =>
      !params.some(
        (y) =>
          ((y.startIndex <= x.startIndex && y.endIndex >= x.startIndex) ||
            (y.startIndex <= x.endIndex && y.endIndex >= x.endIndex)) &&
          y.text.toLowerCase().indexOf(x.text.toLowerCase()) !== -1
      )
  );
  const numbers = [
    ...testString.matchAll(EXPRESSION_CONSTANTS.PATTERNS.numbers),
  ]
    .map((x: any) => {
      return {
        text: x.toString().toLowerCase(),
        startIndex: x.index,
        endIndex: x.index + x.toString().length,
        type: "numbers",
      };
    })
    .filter(
      (x) =>
        !params.some(
          (y) =>
            (y.startIndex <= x.startIndex && y.endIndex >= x.startIndex) ||
            (y.startIndex <= x.endIndex && y.endIndex >= x.endIndex)
        ) &&
        !operators
          .filter((y) => y.text.length > 1)
          .some(
            (y) =>
              (y.startIndex <= x.startIndex && y.endIndex >= x.startIndex) ||
              (y.startIndex <= x.endIndex && y.endIndex >= x.endIndex)
          )
    );
  let sortList = [
    ...bracketsLeft,
    ...bracketsRight,
    ...delimeters,
    ...operators.map((x) => {
      return {
        ...x,
        text: x.text.toLowerCase(),
      };
    }),
    ...params,
    ...numbers.map((x) => {
      return {
        ...x,
        text: x.text.toUpperCase(),
      };
    }),
  ].sort((a, b) => a.startIndex - b.startIndex);
  const fixedList: MathToken[] = [];
  sortList.forEach((item, index) => {
    if (item.type === "operators") {
      if (item.text.length > 1 || !["+", "-"].includes(item.text)) {
        fixedList.push(item);
      } else {
        if (index === 0) {
          if (item.text === "-" && sortList.length > 1) {
            sortList.slice(2).map((t) => {
              return {
                ...t,
                startIndex: t.startIndex + 1,
                endIndex: t.endIndex + 1,
              };
            });
            sortList[1] = {
              ...sortList[1],
              startIndex: item.startIndex,
              endIndex: sortList[1].endIndex + 1,
              text: "-" + sortList[1].text,
            };
          } else if (item.text === "-") {
            fixedList.push(item);
          }
        } else {
          if (
            sortList[index + 1] &&
            ["numbers", "params"].includes(sortList[index + 1].type)
          ) {
            if (item.text === "-" && sortList[index - 1].type === "operators") {
              const cloneItem = { ...item };
              sortList[index + 1] = {
                ...sortList[index + 1],
                startIndex: cloneItem.startIndex,
                text: cloneItem.text + sortList[index + 1].text,
              };
            } else {
              fixedList.push(item);
            }
          } else {
            fixedList.push(item);
          }
        }
      }
    } else {
      if (["delimeters", "bracketsLeft"].includes(item.type)) {
        if (
          sortList[index + 1] &&
          ["+", "-"].includes(sortList[index + 1].text)
        ) {
          if (sortList[index + 1].text === "+") {
            sortList.splice(index + 1, 1);
          } else {
            if (sortList[index + 2]) {
              if (["numbers", "params"].includes(sortList[index + 2].type)) {
                sortList[index + 2] = {
                  ...sortList[index + 2],
                  startIndex: sortList[index + 2].startIndex - 1,
                  text: "-" + sortList[index + 2].text,
                };
                sortList.splice(index + 1, 1);
              } else {
                const startIndex = sortList[index + 1].startIndex;
                sortList = [
                  ...sortList.slice(0, index + 1),
                  {
                    text: "-1",
                    type: "numbers",
                    startIndex: startIndex,
                    endIndex: startIndex + 2,
                  },
                  {
                    text: "*",
                    type: "operators",
                    startIndex: startIndex + 2,
                    endIndex: startIndex + 3,
                  },
                  ...sortList.slice(index + 2).map((t) => {
                    return {
                      ...t,
                      startIndex: t.startIndex + 2,
                      endIndex: t.endIndex + 2,
                    };
                  }),
                ];
              }
            }
          }
        }
      }
      fixedList.push(item);
    }
  });
  return fixedList;
};

export const expressionFormatHtml = (tokens: MathToken[]) => {
  let html = "";
  tokens.forEach((token) => {
    let value = "";
    switch (token.type) {
      case "bracketsLeft":
        value = "_codeA_" + token.text + "_codeG_";
        break;
      case "bracketsRight":
        value = "_codeB_" + token.text + "_codeG_";
        break;
      case "delimeters":
        value = "_codeC_" + token.text + "_codeG_";
        break;
      case "operators":
        value = "_codeD_" + token.text + "_codeG_";
        break;
      case "params":
        value = "_codeE_" + token.text + "_codeG_";
        break;
      case "numbers":
        value = "_codeF_" + token.text + "_codeG_";
        break;
    }
    html = html + value;
  });
  Object.keys(EXPRESSION_CONSTANTS.CODES_LIST).forEach((key) => {
    html = html.replaceAll(key, EXPRESSION_CONSTANTS.CODES_LIST[key]);
  });
  return html;
};

const formatItem = (item: string, type: string): string => {
  if (!item) return "";
  let className: string = "";
  switch (type) {
    case "bracketsLeft":
      className = "exp-brackets-left";
      break;
    case "bracketsRight":
      className = "exp-brackets-right";
      break;
    case "delimeters":
    case "operators":
    case "params":
    case "numbers":
      className = `exp-${type}`;
      break;
    default: break;
  }
  return `<span class="${className}">${item}</span>`;
}

const formatToken = (token?: MathToken): string => {
  if (!token) return "";
  return formatItem(token.text, token.type);
}

const validateOperators = (tokens: MathToken[]): {valid: boolean, index?: number, detail?: string } => {
  const operaters: MathToken[] = tokens
  .filter((tk: MathToken) => tk.type === "operators");
  for (let i = 0; i < operaters.length; i++) {
    const tk: MathToken = operaters[i];
    const index = tokens.findIndex((x: MathToken) => x.startIndex === tk.startIndex);
    const prevToken = tokens[index - 1];
    const nextToken = tokens[index + 1];
    if (tk.text.length > 1 && (!nextToken || nextToken.type !== "bracketsLeft")) {
      return { valid: false, index: index, detail: `${formatToken(tk)}${formatToken(nextToken)}` };
    }
    if (tk.text.length === 1 && (!prevToken || !nextToken || !["params", "numbers", "bracketsRight"].includes(prevToken.type) || (nextToken.type === "operators" && nextToken.text.length === 1) || !["params", "numbers", "bracketsRight"])) {
      return { valid: false, index: index, detail: `${formatToken(prevToken)}${formatToken(tk)}${formatToken(nextToken)}` };
    }
  }
  return { valid: true };
}

const validateParms = (tokens: MathToken[], availableParams: string[]): string => {
  const params: MathToken[] = tokens.filter((tk: MathToken) => tk.type === "params");
  const paramsNotDefined: string[] = [];
  params.forEach((param: MathToken) => {
    if (!availableParams.includes(param.text)) {
      paramsNotDefined.push(formatToken(param));
    }
  });
  if (paramsNotDefined.length === 0) return "";
  return `Param${paramsNotDefined.length > 1 ? "s" : ""} ${paramsNotDefined.join(", ")} not defined`;
}

const usage = (operator: string): string => {
  if (operator.length === 1) {
    return `<br/>Usage: ${formatItem("a", "params")} ${formatItem(operator, "operators")} ${formatItem("b", "params")}<br/>Where ${formatItem("a", "params")}, ${formatItem("b", "params")} is a param, number or valid math expression`;
  }
  if (["pow"].includes(operator.toLowerCase())) {
    return `<br/>Usage: ${formatItem(operator, "operators")}${formatItem("(","bracketsLeft")}${formatItem("a", "params")}${formatItem(", ", "delimeters")}${formatItem("b", "params")}${formatItem(")", "bracketsRight")}<br/>Where ${formatItem("a", "params")}, ${formatItem("b", "params")} is a param, number or valid math expression`;
  }
  return `<br/>Usage: ${formatItem(operator, "operators")}${formatItem("(","bracketsLeft")}${formatItem("n", "params")}${formatItem(")", "bracketsRight")}<br/>Where ${formatItem("n", "params")} is a param, number or valid math expression`;
}

export const validateMathExpression = (expression: string, availableParams: string[]): string => {
  const tokens = seperateTokens(expression);
  const validOperators = validateOperators(tokens)
  if (!validOperators.valid) {
    const operator: MathToken = tokens[validOperators.index??0]
    return `Error at ${validOperators.detail}\n${usage(operator.text)}`;
  }
  const params = tokens.filter((token) => token.type === "params");
  let mathExpression = "";
  tokens.forEach((tk) => {
    const token = { ...tk };
    token.text = token.text.toLowerCase();
    switch (token.type) {
      case "operators":
        if (token.text.length === 1) break;
        if (token.text === "inverse") {
          token.text = "-1*";
          break;
        }
        if (token.text.startsWith("-")) {
          token.text = "-Math." + token.text.substring(1);
        } else {
          token.text = "Math." + token.text;
        }
        break;
      case "params":
        token.text = (params.indexOf(tk) + 1000000000).toString();
        break;
      default:
        break;
    }
    mathExpression = mathExpression + token.text;
  });
  try {
    window.eval(mathExpression);
  } catch (error: any) {
    let errMessage = error.message;
    const n = parseFloat(errMessage);
    if (!isNaN(n)) {
      const paramIndex = n - 1000000000;
      if (paramIndex >= 0) {
        errMessage = errMessage.replace(n.toString(), formatItem(params[paramIndex].text, "operators"));
      }
    }
    return errMessage.replaceAll("Math.", "");
  }
  return validateParms(tokens, availableParams);
};

export const buildPopup = (span: HTMLElement, popupElm: HTMLElement) => {
  if (!popupElm || !popupElm.parentElement) return;
  const boundingContentainer = (
    popupElm.parentElement as HTMLElement
  ).getBoundingClientRect();
  const bounding = span.getBoundingClientRect();
  popupElm.style.display = "none";
  popupElm.style.top = bounding.bottom - boundingContentainer.top + 8 + "px";
  popupElm.style.left = bounding.left - boundingContentainer.left + "px";
  const contentData: any = {};
  const spanClass = span.classList.length > 0 ? span.classList[0] : "";
  const spanValue = span.innerText;
  contentData.title = spanValue;
  popupElm.innerHTML = '<p class="title">' + contentData.title + "</p>";

  switch (spanClass) {
    case "exp-operators":
      contentData.type = '<span class="type">Operator</span>';
      if (
        ["abs", "inverse", "sqrt", "log", "sin", "cos", "tan"].includes(
          spanValue.toLowerCase()
        )
      ) {
        contentData.params = ["n"];
        contentData.usage = spanValue + '(<span class="params">n</span>)';
        contentData.description =
          '<span>Where <span class="params">n</span> is kind of number, params or a valid math expression</span>';
      } else {
        contentData.params = ["a", "b"];
        contentData.usage =
          spanValue.length === 1
            ? '<span class="params">a </span>' +
              spanValue +
              ' <span class="params">b</span>'
            : spanValue +
              '(<span class="params">a</span>' +
              "," +
              '<span class="params"> b</span>)';
        contentData.description =
          '<span>Where <span class="params">a</span> and <span class="params">b</span> is kind of number, params or a valid math expression</span>';
      }
      contentData.ret =
        '<span class="label">Return: </span>' + contentData.usage;
      popupElm.innerHTML =
        popupElm.innerHTML +
        '<p><span class="label">Type:</span>' +
        contentData.type +
        "</span></p>" +
        '<span class="label">Params:</span>';
      contentData.params.forEach((param: string, index: number) => {
        popupElm.innerHTML =
          popupElm.innerHTML +
          (index !== 0 ? ", " : "") +
          '<span class="params">' +
          param +
          "</span>";
      });
      popupElm.innerHTML =
        popupElm.innerHTML +
        '<p><span class="label">Usage: </span>' +
        contentData.usage +
        "</p>" +
        '<p><span class="label">Description: </span>' +
        contentData.description +
        "</p>" +
        contentData.ret;
      popupElm.style.display = "block";
      break;
    case "exp-params":
    case "exp-numbers":
      contentData.type =
        '<span class="type">' +
        (spanClass === "exp-params" ? "Param" : "Number") +
        "</span>";
      contentData.description = "";
      contentData.value = "";
      popupElm.innerHTML =
        popupElm.innerHTML +
        '<p><span class="label">Type:</span>' +
        contentData.type +
        "</span></p>";
      if (contentData.description !== "") {
        popupElm.innerHTML =
          popupElm.innerHTML +
          '<p><span class="label">Description: </span>' +
          contentData.description +
          "</p>";
      }
      if (contentData.value !== "") {
        popupElm.innerHTML =
          popupElm.innerHTML +
          '<p><span class="label">Value: </span>' +
          contentData.value +
          "</p>";
      }
      popupElm.style.display = "block";
      break;
    default:
      break;
  }
};

export const formatExpressionInHTML = (ori: string) => {
  if (!ori) {
    return `<span class="exp"></span>`;
  }
  ori = ori
    .trim()
    .replace("--", "+")
    .replace("-+", "-")
    .replace("+-", "-")
    .replace("++", "+")
    .replace("==", "=")
    .replace(/[([]/g, "(")
    .replace(/[)]]/g, ")");
  const value = ori;
  const tokens: MathToken[] = seperateTokens(value);
  const expressionFormatted = expressionFormatHtml(tokens);

  return `<span class="exp">${expressionFormatted}</span>`;
};

export const getCaretCoordinates = () => {
  const sel = document.getSelection();
  if (!sel) return { left: 0, top: 0 };
  const r = sel.getRangeAt(0);
  let rect;
  let r2;
  const node: any = r.startContainer;
  const offset = r.startOffset;
  if (offset > 0) {
    r2 = document.createRange();
    r2.setStart(node, offset - 1);
    r2.setEnd(node, offset);
    rect = r2.getBoundingClientRect();
    return { left: rect.right, top: rect.top };
  } else if (offset < node.length) {
    r2 = document.createRange();
    r2.setStart(node, offset);
    r2.setEnd(node, offset + 1);
    rect = r2.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  } else {
    rect = node.getBoundingClientRect();
    const styles = getComputedStyle(node);
    const lineHeight = parseInt(styles.lineHeight);
    const fontSize = parseInt(styles.fontSize);
    const delta = (lineHeight - fontSize) / 2;
    return { left: rect.left, top: rect.top + delta };
  }
};

export const attachEvent = (
  element: Element,
  eventName: string,
  callback: (event: any) => void
) => {
  if (element && eventName && element.getAttribute("listener") !== "true") {
    element.setAttribute("listener", "true");
    element.addEventListener(eventName, callback);
  }
};

export const detachEvent = (
  element: Element,
  eventName: string,
  callback: (event: any) => void
) => {
  if (eventName && element) {
    element.removeEventListener(eventName, callback);
  }
};
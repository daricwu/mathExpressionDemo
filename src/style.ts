import styled from "styled-components";
import { COLORS } from "./utils/constants";

export const ConditionWrapper = styled.div(() => ({
    color: "black",
    ".exp": {
      fontFamily: "Nunito",
      fontWeight: "bold",
      cursor: "pointer",
      fontSize: "13px",
      color: COLORS.expression_values_color,
      display: "block",
      width: "200px",
      height: "34px",
      border: `1px solid ${COLORS.orochimaru}`,
      padding: "0 5px",
      borderRadius: "5px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      alignContent: "center",
    },
    ".exp-brackets-left": {
      fontSize: "13px",
      cursor: "pointer",
      color: COLORS.expression_brackets_color,
      marginRight: "2px",
    },
    ".exp-brackets-right": {
      fontSize: "13px",
      cursor: "pointer",
      color: COLORS.expression_brackets_color,
      marginLeft: "2px",
    },
    ".exp-delimeters": {
      fontSize: "13px",
      cursor: "pointer",
      color: COLORS.expression_delimeter_color,
    },
    ".exp-operators": {
      fontSize: "13px",
      cursor: "pointer",
      color: COLORS.expression_operators_color,
    },
    ".exp-params": {
      fontSize: "13px",
      cursor: "pointer",
      color: COLORS.expression_params_color,
    },
    ".exp-numbers": {
      fontSize: "13px",
      cursor: "pointer",
      color: COLORS.expression_values_color,
    },
    table: {
      td: {
        width: "25%",
        div: {
          width: "100%",
          backgroundColor: "white",
        },
      },
    },
  }));
/** Begin: Dropdown list for commons */
const commonOptionsList = [
  { value: "StepTime", label: "StepTime" },
  { value: "TestTime", label: "TestTime" },
  { value: "AC_Impedance", label: "AC_Impedance" },
  { value: "ACR", label: "ACR" },
  { value: "Voltage", label: "Voltage" },
  { value: "Current", label: "Current" },
  { value: "ChargeCapacity", label: "ChargeCapacity" },
  { value: "DischargeCapacity", label: "DischargeCapacity" },
  { value: "ChargeEnergy", label: "ChargeEnergy" },
  { value: "DischargeEnergy", label: "DischargeEnergy" },
  { value: "Power", label: "Power" },
  { value: "DataLogSpeed", label: "DataLogSpeed" },
  { value: "dVdt", label: "dVdt" },
  { value: "dIdt", label: "dIdt" },
  { value: "dQdV", label: "dQdV" },
  { value: "dVdQ", label: "dVdQ" },
  { value: "InternalResistance", label: "InternalResistance" },
  { value: "ChannelStatus", label: "ChannelStatus" },
  { value: "StepAndCycle", label: "StepAndCycle" },
];
/** End: Dropdown list for commons */

/** Begin:  Dropdown list for channel statuses */
const channelStatusOptionsList = [
  { value: "Idle", label: "Idle" },
  { value: "Transition", label: "Transition" },
  { value: "Charge", label: "Charge" },
  { value: "DisCharge", label: "DisCharge" },
  { value: "Rest", label: "Rest" },
  { value: "Wait", label: "Wait" },
  { value: "ExternalCharge", label: "ExternalCharge" },
  { value: "Calibration", label: "Calibration" },
  { value: "Unsafe", label: "Unsafe" },
  { value: "Pulse", label: "Pulse" },
  { value: "IR", label: "IR" },
  { value: "ACI", label: "ACI" },
  { value: "MCellACI", label: "MCellACI" },
  { value: "AddIn", label: "AddIn" },
  { value: "Error", label: "Error" },
  { value: "Finished", label: "Finished" },
  { value: "VoltMeter", label: "VoltMeter" },
  { value: "WaitingACS", label: "WaitingACS" },
  { value: "Pause", label: "Pause" },
  { value: "Empty", label: "Empty" },
  { value: "IdleMcu", label: "IdleMcu" },
  { value: "Start", label: "Start" },
  { value: "Running", label: "Running" },
  { value: "StepTransfer", label: "StepTransfer" },
  { value: "Resume", label: "Resume" },
  { value: "GoPause", label: "GoPause" },
  { value: "GoStop", label: "GoStop" },
  { value: "GoNextStep", label: "GoNextStep" },
  { value: "OnlineUpdate", label: "OnlineUpdate" },
  { value: "DaqMemoryUnsafe", label: "DaqMemoryUnsafe" },
  { value: "ACR", label: "ACR" },
  { value: "Suspent", label: "Suspent" },
  { value: "TrayControling", label: "TrayControling" },
  { value: "PreEqualizing", label: "PreEqualizing" },
  { value: "MaxCount", label: "MaxCount" },
];
/** End: Dropdown list for channel statuses */

/** Begin: Dropdown list for Aux */
const auxOptionsList = [
  { value: "Aux_T", label: "Aux_T" },
  { value: "Aux_Tdt", label: "Aux_Tdt" },
  { value: "Aux_V", label: "Aux_V" },
  { value: "Aux_Vdt", label: "Aux_Vdt" },
  { value: "Aux_Pressure", label: "Aux_Pressure" },
  { value: "Aux_Pressuredt", label: "Aux_Pressuredt" },
];
/** End: Dropdown list for Aux */

/** Begin: Dropdown list for math functions */
const functionOptionsList = [
  { value: "+", label: "+" },
  { value: "-", label: "-" },
  { value: "*", label: "*" },
  { value: "/", label: "/" },
  { value: "Abs", label: "Abs" },
  { value: "Power", label: "Power" },
  { value: "%", label: "%" },
  { value: "Sin", label: "Sin" },
  { value: "Cos", label: "Cos" },
  { value: "Tan", label: "Tan" },
  { value: "Log", label: "Log" },
  { value: "Sqrt", label: "Sqrt" },
];
/** End: Dropdown list for math functions */

/** Begin: Dropdown list for math operators */
const operatorOptionsList = [
  {
    value: "=",
    label: "is",
    suffix: "input",
  },
  {
    value: "<",
    label: "< less than",
    suffix: "input",
  },
  {
    value: "<=",
    label: "â‰¦ less or equal to",
    suffix: "input",
  },
  {
    value: ">",
    label: "> greater than",
    suffix: "input",
  },
  {
    value: ">=",
    label: "â‰§ greater or equal to",
    suffix: "input",
  },
  {
    value: "<>",
    label: "is not",
    suffix: "input",
  },
  {
    value: "InRange",
    label: "in the range of",
    suffix: "range",
  },
  {
    value: "NotInRange",
    label: "not in the range of",
    suffix: "range",
  },
  {
    value: "Between",
    label: "between of",
    suffix: "range",
  },
];
/** End: Dropdown list for math operators */

/** Begin: Dropdown list for status operators */
const statusOperatorOptionsList = [
  {
    value: "=",
    label: "is",
    suffix: "input",
  },
  {
    value: "<>",
    label: "is not",
    suffix: "input",
  },
  {
    value: "In",
    label: "in the list of",
    suffix: "select_list_status",
  },
  {
    value: "NotIn",
    label: "not in the list of",
    suffix: "select_list_status",
  },
];
/** End: Dropdown list for status operators */

/** Begin: Dropdown list for MV_UDS
 * MV_UD[1-16]
 */
const mvudOptionsList = [
  { value: "MV_UD1", label: "MV_UD1" },
  { value: "MV_UD2", label: "MV_UD2" },
  { value: "MV_UD3", label: "MV_UD3" },
  { value: "MV_UD4", label: "MV_UD4" },
  { value: "MV_UD5", label: "MV_UD5" },
  { value: "MV_UD6", label: "MV_UD6" },
  { value: "MV_UD7", label: "MV_UD7" },
  { value: "MV_UD8", label: "MV_UD8" },
  { value: "MV_UD9", label: "MV_UD9" },
  { value: "MV_UD10", label: "MV_UD10" },
  { value: "MV_UD11", label: "MV_UD11" },
  { value: "MV_UD12", label: "MV_UD12" },
  { value: "MV_UD13", label: "MV_UD13" },
  { value: "MV_UD14", label: "MV_UD14" },
  { value: "MV_UD15", label: "MV_UD15" },
  { value: "MV_UD16", label: "MV_UD16" },
];
/** End: Dropdown list for MV_UDS */

/** Begin:  Dropdown list for CAN messages
 * CAN_MV_RX[1-2500]
 */
const canMessageOptionsList = [];
for (let i = 1; i <= 2500; i++) {
  canMessageOptionsList.push({
    value: `CAN_MV_RX${i}`,
    label: `CAN_MV_RX${i}`,
  });
}
/** End: Dropdown list for CAN messages */

/** Begin: Patterns list
 * 1. Brackets: (,),[,]
 * 2. Operators: +,-,...
 * 3. Params: MV_UD1,...
 */
const patternsList = {
  bracketsLeft: /[(]/gi,
  bracketsRight: /[)]/gi,
  delimeters: /[,]/gi,
  operators: /[+\-*/^%]|abs|sin|cos|tan|log|pow|inverse|sqrt/gi,
  params: /[a-z][a-z0-9_]*[a-z0-9]|[a-z][a-z0-9]*/gi,
  numbers: /[0-9][0-9]*[.]{0,1}[0-9]*/gi,
};
/** End: Patterns list */

/** Begin: Codes list
 * Purpose: render expression in HTML style
 */
const codesList: any = {
  _codeA_: '<span class="exp-brackets-left">',
  _codeB_: '<span class="exp-brackets-right">',
  _codeC_: '<span class="exp-delimeters">',
  _codeD_: '<span class="exp-operators">',
  _codeE_: '<span class="exp-params">',
  _codeF_: '<span class="exp-numbers">',
  _codeG_: "</span>",
};
/** End: Codes list */

export enum ConditionInputEnum {
  Expression = 0,
  RightFrom = 1,
  RightTo = 2,
}

export const EXPRESSION_CONSTANTS = {
  CODES_LIST: codesList,
  PATTERNS: patternsList,
  OPTIONS: {
    COMMON_OPTIONS_LIST: commonOptionsList,
    CHANNEL_STATUS_OPTIONS_LIST: channelStatusOptionsList,
    MV_UD_OPTIONS_LIST: mvudOptionsList,
    AUX_OPTIONS_LIST: auxOptionsList,
    CAN_MESSAGE_OPTIONS_LIST: canMessageOptionsList,
    FUNCTION_OPTIONS_LIST: functionOptionsList,
  },
  OPERATORS: {
    STATUS_OPERATOR_OPTIONS_LIST: statusOperatorOptionsList,
    OPERATOR_OPTIONS_LIST: operatorOptionsList,
  },
};

export const COLORS = {
  expression_values_color: "#1212ff",
  expression_brackets_color: "margenta",
  expression_operators_color: "#61dafbaa",
  expression_params_color: "brown",
  expression_delimeter_color: "blue",
  orochimaru: "#c7c7c7",

}
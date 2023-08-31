// SPDX-License-Identifier: MIT

"use strict";

async function mathsAdd(parameters) {
  if (parameters.length !== 2) {
    return "Mismatched parameters";
  }

  const lhs = parseFloat(parameters[0]);
  const rhs = parseFloat(parameters[1]);

  const result = lhs + rhs;

  return result.toString();
}

async function mathsSub(parameters) {
  if (parameters.length !== 2) {
    return "Mismatched parameters";
  }

  const lhs = parseFloat(parameters[0]);
  const rhs = parseFloat(parameters[1]);

  const result = lhs - rhs;

  return result.toString();
}

async function mathsMul(parameters) {
  if (parameters.length !== 2) {
    return "Mismatched parameters";
  }

  const lhs = parseFloat(parameters[0]);
  const rhs = parseFloat(parameters[1]);

  const result = lhs * rhs;

  return result.toString();
}

async function mathsDiv(parameters) {
  if (parameters.length !== 2) {
    return "Mismatched parameters";
  }

  const lhs = parseFloat(parameters[0]);
  const rhs = parseFloat(parameters[1]);

  const result = lhs / rhs;

  return result.toString();
}

async function mathsCmp(parameters) {
  if (parameters.length !== 2) {
    return "Mismatched parameters";
  }

  const lhs = parseFloat(parameters[0]);
  const rhs = parseFloat(parameters[1]);

  if (lhs < rhs) {
    return "-1";
  } else if (lhs > rhs) {
    return "1";
  }

  return "0";
}

async function apiCall(functionName, parameters) {
  switch (functionName) {
    case "maths-add":
      return mathsAdd(parameters);

    case "maths-sub":
      return mathsSub(parameters);

    case "maths-mul":
      return mathsMul(parameters);

    case "maths-div":
      return mathsDiv(parameters);

    case "maths-cmp":
      return mathsCmp(parameters);

    default:
      return "Unknown Function";
  }
}

exports.apiCall = apiCall;

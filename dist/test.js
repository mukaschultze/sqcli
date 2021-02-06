"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const chalk_1 = __importDefault(require("chalk"));
const ava_1 = __importDefault(require("ava"));
const ink_testing_library_1 = require("ink-testing-library");
const ui_1 = __importDefault(require("./ui"));
ava_1.default('greet unknown user', t => {
    const { lastFrame } = ink_testing_library_1.render(react_1.default.createElement(ui_1.default, null));
    t.is(lastFrame(), chalk_1.default `Hello, {green Stranger}`);
});
ava_1.default('greet user with a name', t => {
    const { lastFrame } = ink_testing_library_1.render(react_1.default.createElement(ui_1.default, { name: "Jane" }));
    t.is(lastFrame(), chalk_1.default `Hello, {green Jane}`);
});

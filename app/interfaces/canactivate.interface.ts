import {Instruction} from "../../node_modules/angular2/src/router/instruction";

export function CanActivate(hook: Function | ((next: Instruction, prev: Instruction) => Promise<boolean> | boolean)) {
    // implementation
}

export interface CanActivate {
    routerCanActivate(next: Instruction, prev: Instruction): Promise<boolean> | boolean;
}

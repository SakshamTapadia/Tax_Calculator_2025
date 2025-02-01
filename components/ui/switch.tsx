"use client";

import * as React from "react";
import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onCheckedChange}
      className={clsx(
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        checked ? "bg-blue-600" : "bg-gray-300"
      )}
    >
      <span
        className={clsx(
          "inline-block h-4 w-4 transform rounded-full bg-white transition",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </HeadlessSwitch>
  );
}

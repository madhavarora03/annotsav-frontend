import { Label, RadioGroup, XStack } from "tamagui";

import type { SizeTokens } from "tamagui";

const RadioBtn = (props: {
  size: SizeTokens;
  gap?: SizeTokens;
  value: string;
  label: string;
}) => {
  const id = `radiogroup-${props.value}`;

  return (
    <XStack width={300} alignItems="center" gap={props.gap || "$5"}>
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size="$8" htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  );
};

export default RadioBtn;

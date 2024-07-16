import RadioBtn from "@/components/RadioBtn";
import React from "react";
import { Button, Form, H1, RadioGroup, YStack } from "tamagui";

const Page = () => {
  return (
    <YStack padding="$6" gap="$5">
      <H1>Choose Your Language</H1>
      <Form gap="$5">
        <RadioGroup defaultValue="1">
          <YStack width={300} alignItems="center" gap="$2" paddingLeft="$4">
            <RadioBtn size="$6" value="1" label="English" />
            <RadioBtn size="$6" value="2" label="हिन्दी" />
            <RadioBtn size="$6" value="3" label="ਪੰਜਾਬੀ" />
          </YStack>
        </RadioGroup>
        <Form.Trigger asChild>
          <Button size="$6">Submit</Button>
        </Form.Trigger>
      </Form>
    </YStack>
  );
};

export default Page;

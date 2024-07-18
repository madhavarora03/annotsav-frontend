import { green } from "@tamagui/themes";
import { useEffect, useState } from "react";
import { Paragraph, Progress, XStack, YStack, useTheme, Text } from "tamagui";
export default function CropTable() {
  const theme = useTheme();
  const [date, setDate] = useState({ dd: '', mm: '', yyyy: '' });
  const [today, setToday] = useState(new Date());
  const tmrw = new Date();
  const datmrw = new Date();
  tmrw.setDate(today.getDate()+1);
  datmrw.setDate(tmrw.getDate()+1);

  useEffect(() => {
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(today.getFullYear());
    setDate({ dd, mm, yyyy });
  }, [])
  return (
    <XStack
      alignItems="center"
      justifyContent="space-around"
      marginVertical="$5"
    >
      <YStack alignItems="center">
        <Paragraph alignSelf="center" color={theme.green10.get()}>Day</Paragraph>
        <YStack marginVertical="$2">
          <Paragraph>{`${date.dd}/${date.mm}/${date.yyyy}`}</Paragraph>
          <Paragraph>{tmrw.toLocaleDateString("en-IN", { weekday: 'long' })}</Paragraph>
          <Paragraph>{datmrw.toLocaleDateString("en-IN", { weekday: 'long' })}</Paragraph>
        </YStack>
      </YStack>
      <YStack>
        <Paragraph alignSelf="center" color={theme.green10.get()}>Slot-1</Paragraph>
        <YStack marginVertical="$2">
          <Paragraph>12:00-13:00</Paragraph>
          <Paragraph>12:30-13:30</Paragraph>
          <Paragraph>13:00-14:00</Paragraph>
        </YStack>
      </YStack>
      <YStack>
        <Paragraph alignSelf="center" color={theme.green10.get()}>Slot-2</Paragraph>
        <YStack marginVertical="$2">
          <Paragraph>15:30-16:30</Paragraph>
          <Paragraph>16:00-17:00</Paragraph>
          <Paragraph>16:30-17:30</Paragraph>
        </YStack>
      </YStack>
      <YStack>
        <Paragraph alignSelf="center" color={theme.green10.get()}>Total Duration</Paragraph>
        <YStack alignItems="center" marginVertical="$2">
          <Paragraph>2 hours</Paragraph>
          <Paragraph>2 hours</Paragraph>
          <Paragraph>2 hours</Paragraph>
        </YStack>
      </YStack>
    </XStack>
  );
}

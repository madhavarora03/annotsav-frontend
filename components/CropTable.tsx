import { green } from "@tamagui/themes";
import { useEffect, useState } from "react";
import { Paragraph, Progress, XStack, YStack, useTheme, Text } from "tamagui";
import { useTranslation } from "react-i18next"
export default function CropTable() {
  const { t } = useTranslation()
  const theme = useTheme();
  const [date, setDate] = useState({ dd: '', mm: '', yyyy: '' });
  const [today, setToday] = useState(new Date());
  const datmrw = new Date();
  datmrw.setDate(today.getDate()+2);

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
        <Paragraph alignSelf="center" color={theme.green10.get()}>{t('day')}</Paragraph>
        <YStack marginVertical="$2">
          <Paragraph>{t('today')}</Paragraph>
          <Paragraph>{t('Tomorrow')}</Paragraph>
          <Paragraph>{`${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear())}`}</Paragraph>
        </YStack>
      </YStack>
      <YStack>
        <Paragraph alignSelf="center" color={theme.green10.get()}>{t('Slot')}-1</Paragraph>
        <YStack marginVertical="$2">
          <Paragraph>12:00-13:00</Paragraph>
          <Paragraph>12:30-13:30</Paragraph>
          <Paragraph>13:00-14:00</Paragraph>
        </YStack>
      </YStack>
      <YStack>
        <Paragraph alignSelf="center" color={theme.green10.get()}>{t('Slot')}-2</Paragraph>
        <YStack marginVertical="$2">
          <Paragraph>15:30-16:30</Paragraph>
          <Paragraph>16:00-17:00</Paragraph>
          <Paragraph>16:30-17:30</Paragraph>
        </YStack>
      </YStack>
      <YStack>
        <Paragraph alignSelf="center" color={theme.green10.get()}>{t('Total Duration')}</Paragraph>
        <YStack alignItems="center" marginVertical="$2">
          <Paragraph>2 {t('hours')}</Paragraph>
          <Paragraph>2 {t('hours')}</Paragraph>
          <Paragraph>2 {t('hours')}</Paragraph>
        </YStack>
      </YStack>
    </XStack>
  );
}

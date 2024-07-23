import React, { useState } from "react";
import { useMemo } from 'react'
import type { FontSizeTokens, SelectProps } from 'tamagui'
import { Adapt, Sheet, getFontSize } from 'tamagui'
import { useTranslation } from "react-i18next"
import {
  Card,
  Text,
  XStack,
  YStack,
  useTheme,
  Button,
  Input,
  H1,
  Select,
  Label,
} from "tamagui";

export default function Page() {
  const { t } = useTranslation()
  const theme = useTheme();
 
  return (
    <Card
      backgroundColor={theme.gray5.get()}
      size="$4"
      bordered
      borderColor={theme.gray7.get()}
      scale={0.95}
    >
      <Card.Header padded>
        <H1 textAlign="center">{t('Crop Registration')}</H1>
      </Card.Header>
      <YStack alignItems="center" gap='$2' justifyContent="center" padding="$2">
          <Input placeholder="Crop Name" width='$20' backgroundColor={'white'}/>
          <Input placeholder="Location" width='$20' backgroundColor={'white'}/>
          <XStack width='$20' gap='$2'>
          <Input placeholder="Area" width={'60%'} backgroundColor={'white'}/>
          <SelectDemoItem id="select-demo-1"/>
          </XStack>
          <Input placeholder="Soil Type" width='$20' backgroundColor={'white'}/>

          <Button style={{backgroundColor:theme.green10.get(),
          color:"white",
          justifyContent:"center",
          width:"80%"
          }} > {t('Register')}</Button>
      </YStack>
      <Card.Footer padded></Card.Footer>
    </Card>
  );
}
export function SelectDemoItem(props: SelectProps) {
  const { t } = useTranslation()
   const items = [
    { name: t('Square Feet') },
    { name: t('Square meter') },
    { name: t('hecter') },
  ];

  
  const [val, setVal] = useState('sqft.')
  const theme = useTheme();
  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger width='$10' backgroundColor={'white'}>
        <Select.Value placeholder="Something" color={theme.green10.get()}/>
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.Viewport
          minWidth={'200'}
        >
          <Select.Group>
            <Select.Label>{t('Units')}</Select.Label>
            {useMemo(
              () =>
                items.map((item, i) => {
                 
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [items]
            )}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  )
}

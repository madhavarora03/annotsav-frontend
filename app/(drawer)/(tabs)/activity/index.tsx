import { useState } from "react"
import {
  Card,
  Text,
  XStack,
  YStack,
  useTheme,
  Button,
  Input,
  Switch,
  H1,
} from "tamagui"
import { View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useTranslation } from "react-i18next"
import i18next from "../../../../i18n/i18n.config"

export default function Page() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [auto, setAuto] = useState(false)
  const [timer, setTimer] = useState<number | "">(30)

  const handleInputChange = (value: any) => {
    if (value === "") {
      setTimer("")
    } else {
      const number = parseFloat(value)
      if (!isNaN(number)) {
        setTimer(number)
      }
    }
  }
  // function to toggle between the languages
  const changeLng = async () => {
    console.log("hello ")
    try {
      if(i18next.language == 'en'){
        await AsyncStorage.setItem("lng", "hi")
        i18next.changeLanguage("hi")
      }
      else{
        await AsyncStorage.setItem("lng", "en")
        i18next.changeLanguage("en")
      }
    } catch (error) {
     console.log(error);
    }
    finally{
      const result = await AsyncStorage.getItem('lng');
      console.log("stored pref is " , result);
    }  
  }
  return (
    <Card
      backgroundColor={theme.gray5.get()}
      size="$4"
      bordered
      borderColor={theme.gray7.get()}
      height={300}
      scale={0.95}>
      <Card.Header padded>
        <H1 textAlign="center">{t("Manual Override")}</H1>
      </Card.Header>
      <YStack justifyContent="center" alignItems="center" gap="$5">
        <XStack gap="$2" alignItems="center">
          <Text color={theme.green10.get()}>Auto</Text>
          <Switch
            size="$4"
            checked={!!auto}
            onCheckedChange={(val) => setAuto(val)}>
            <Switch.Thumb
              animation={[
                "quick",
                {
                  transform: {
                    overshootClamping: true,
                  },
                },
              ]}
            />
          </Switch>
          <Text color={theme.green10.get()}>{t("Manual")}</Text>
        </XStack>
        <XStack alignItems="center" gap="$4">
          <Button
            size="$4"
            fontSize={12}
            disabled={!auto}
            disabledStyle={{
              backgroundColor: theme.green5.get(),
              borderColor: theme.black12.get(),
            }}>
            {t("Start")}
          </Button>
          <Input
            width="$12"
            keyboardType="numeric"
            disabled={!auto}
            disabledStyle={{
              backgroundColor: theme.gray7.get(),
              borderColor: theme.gray7.get(),
            }}
            textAlign="center"
            value={String(timer)}
            onChangeText={handleInputChange}
          />
          <Button
            size="$4"
            fontSize={12}
            disabled={!auto}
            disabledStyle={{
              backgroundColor: theme.green5.get(),
              borderColor: theme.black12.get(),
            }}>
            {t("Stop")}
          </Button>
        </XStack>
        {/* this button is for testing purposes only.  */}
        <Button size="$4" fontSize={12} onPress={() => changeLng()}>
          language change
        </Button>
      </YStack>
      <Card.Footer padded></Card.Footer>
    </Card>
  )
}

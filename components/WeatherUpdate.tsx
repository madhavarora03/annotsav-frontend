<<<<<<< HEAD
import { getWeatherData } from "@/utils/api"
import { Feather } from "@expo/vector-icons"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
=======
import { getWeatherData } from "@/utils/api";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"
>>>>>>> main
import {
  Button,
  Card,
  H2,
  Paragraph,
  Spinner,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui"
import { useTranslation } from "react-i18next"

type WeatherData = {
  daily: {
    time: string[]
    temperature2mMax: number[]
    precipitationProbabilityMax: number[]
    windSpeed10mMax: number[]
  }
}

const WeatherUpdate = () => {
<<<<<<< HEAD
  const [isFetching, setIsFetching] = useState(false)
  const [data, setData] = useState<WeatherData | null>(null)
  const theme = useTheme()
  const { t } = useTranslation()
=======
  const { t } = useTranslation()
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<WeatherData | null>(null);
  const theme = useTheme();

>>>>>>> main
  const {
    refetch,
    data: weatherData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weather-data"],
    queryFn: getWeatherData,
  })

  useEffect(() => {
    if (!isLoading) {
      setData(weatherData!)
    }
  }, [isLoading])

  const handleRefresh = async () => {
    setData(null)
    setIsFetching(true)
    await refetch()
    setIsFetching(false)
    setData(weatherData!)
  }

  const loading = isLoading || isFetching

  return (
    <Card elevate size="$4" bordered scale={0.95}>
      <Card.Header padded>
        <XStack justifyContent="space-between" alignItems="center">
<<<<<<< HEAD
          <H2>{t("weather update")}</H2>
=======
          <H2>{t('weather update')}</H2>
>>>>>>> main
          {loading ? (
            <Spinner size="large" color="$green10" marginRight="$3" />
          ) : (
            <Button borderRadius="$12" onPress={handleRefresh}>
              <Feather name="refresh-cw" size={24} color="black" />
            </Button>
          )}
        </XStack>

        <Paragraph color={theme.green8.get()}>3 {t('day')} {t('forecast')}</Paragraph>
      </Card.Header>
      <XStack
        padding="$4"
        borderRadius="$4"
        alignContent="center"
        justifyContent="space-between">
        {loading && (
          <XStack width="100%" alignItems="center">
            <Paragraph width="100%" paddingLeft="$1" opacity={0.5}>
              Loading...
            </Paragraph>
          </XStack>
        )}
        {error && (
          <XStack width="100%" alignItems="center">
            <Paragraph width="100%" paddingLeft="$1" opacity={0.5}>
              {error.message}
            </Paragraph>
          </XStack>
        )}
        {data &&
          !loading &&
          data.daily.time.map((time: any, index: any) => {
            const currentDate = new Date(time)
            const day = currentDate.getDate()
            const month = currentDate.getMonth() + 1
            const year = currentDate.getFullYear()
            const date =
              index === 0
<<<<<<< HEAD
                ? t('today')
                : index === 1
                ?  t('Tomorrow')
                : `${day}/${month}/${year}`
=======
                ? t("today")
                : index === 1
                ? t("Tomorrow")
                : `${day}/${month}/${year}`;
>>>>>>> main
            return (
              <YStack key={index} gap="$1" alignItems="center">
                <Text
                  fontSize="$5"
                  textAlign="center"
                  color={theme.green10.get()}
                  paddingBottom="$2">
                  {date}
                </Text>
                <XStack alignItems="center" gap="$1.5">
                  <Feather name="thermometer" size={20} color="black" />
                  <Text>{data.daily.temperature2mMax[index].toFixed(2)}°C</Text>
                </XStack>
                <XStack alignItems="center" gap="$1.5">
                  <Feather name="wind" size={20} color="black" />
                  <Text>
                    {data.daily.windSpeed10mMax[index].toFixed(2)} {t('km/h')}
                  </Text>
                </XStack>
                <XStack alignItems="center" gap="$1.5">
                  <Feather name="cloud-rain" size={20} color="black" />
                  <Text>{data.daily.precipitationProbabilityMax[index]}%</Text>
                </XStack>
              </YStack>
            )
          })}
      </XStack>
    </Card>
  )
}

export default WeatherUpdate

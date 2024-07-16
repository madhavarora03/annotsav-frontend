import { getWeatherData } from "@/utils/api";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import {
  Button,
  Card,
  H2,
  Paragraph,
  ScrollView,
  Spinner,
  Text,
  XStack,
  YStack,
  useTheme,
} from "tamagui";
export default function Page() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<{
    daily: {
      time: any;
      temperature2mMax: any;
      precipitationProbabilityMax: any;
      windSpeed10mMax: any;
    };
  } | null>(null);
  const theme = useTheme();

  const {
    refetch,
    data: weatherData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["weather-data"],
    queryFn: getWeatherData,
  });

  useEffect(() => {
    if (!isLoading) {
      setData(weatherData!);
    }
  }, [isLoading]);

  const handleRefresh = async () => {
    setData(null);
    setIsFetching(true);
    await refetch();
    setIsFetching(false);
    setData(weatherData!);
  };

  const loading = isLoading || isFetching;
  return (
    <Card elevate size="$4" bordered height={300} scale={0.95}>
      <Card.Header padded>
        <XStack justifyContent="space-between" alignItems="center">
          <H2>Weather Update</H2>
          {loading ? (
            <Spinner size="large" color="$green10" />
          ) : (
            <Button borderRadius="$12" onPress={handleRefresh}>
              <Feather name="refresh-cw" size={24} color="black" />
            </Button>
          )}
        </XStack>

        <Paragraph color={theme.green8.get()}>3 Day Forecast</Paragraph>
      </Card.Header>
      <ScrollView
        padding="$4"
        borderRadius="$4"
        alignContent="center"
        horizontal
        contentContainerStyle={{ gap: 14, paddingLeft: 7 }}
        showsHorizontalScrollIndicator={false}
      >
        {loading && <Text>Loading...</Text>}
        {error && <Text>{error.message}</Text>}
        {data &&
          data.daily.time.map((time: any, index: any) => (
            <YStack key={index} gap="$1" alignItems="center">
              <Text
                fontSize="$5"
                textAlign="center"
                color={theme.green10.get()}
                paddingBottom="$2"
              >
                {time.toDateString()}
              </Text>
              <XStack alignItems="center" gap="$1.5">
                <Feather name="thermometer" size={20} color="black" />
                <Text>{data.daily.temperature2mMax[index].toFixed(2)}°C</Text>
              </XStack>
              <XStack alignItems="center" gap="$1.5">
                <Feather name="wind" size={20} color="black" />
                <Text>{data.daily.windSpeed10mMax[index].toFixed(2)} km/h</Text>
              </XStack>
              <XStack alignItems="center" gap="$1.5">
                <Feather name="droplet" size={20} color="black" />
                <Text>{data.daily.precipitationProbabilityMax[index]}%</Text>
              </XStack>
            </YStack>
          ))}
      </ScrollView>
      <Card.Footer padded>
        <YStack width="100%">
          <Paragraph
            height={30}
            paddingLeft="$1"
            opacity={0.5}
            color={theme.accentColor.get()}
          >
            Moisture Level: 60%
          </Paragraph>
          <ProgressBar />
        </YStack>
      </Card.Footer>
    </Card>
  );
}

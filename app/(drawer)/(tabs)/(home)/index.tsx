import ProgressBar from "@/components/ProgressBar";
import { Card, H2, H3, XStack, YStack, Image, ScrollView } from "tamagui";
import WeatherUpdate from "@/components/WeatherUpdate";
import CropTable from "@/components/CropTable";
export default function Page() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <WeatherUpdate />
      <Card elevate size="$4" bordered scale={0.95}>
        <Card.Header padded>
          <XStack alignItems="center" justifyContent="space-between">
            <H2>Crop Status</H2>
            <Image
              source={{
                uri: "../../../assets/wheat.png",
                height: 130,
                width: 130,
              }}
              marginRight="$4"
            />
          </XStack>

          <YStack width="100%" paddingTop="$3" gap="$2">
            <H3 height={30} paddingLeft="$1" opacity={0.5}>
              Moisture Level: 60%
            </H3>
            <ProgressBar />
          </YStack>
        </Card.Header>
        <CropTable />
      </Card>
    </ScrollView>
  );
}

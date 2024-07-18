import { ScrollView } from "tamagui";
import WeatherUpdate from "@/components/WeatherUpdate";
import CropStatus from "@/components/CropStatus";
export default function Page() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <WeatherUpdate />
      <CropStatus />
    </ScrollView>
  );
}

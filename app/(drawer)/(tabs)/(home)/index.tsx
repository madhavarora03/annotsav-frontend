import { Ionicons } from "@expo/vector-icons";
import { Button, Card, H2, Image, Paragraph, XStack } from "tamagui";

export default function Page() {
  return (
    <Card
      elevate
      size="$4"
      bordered
      animation="bouncy"
      height={300}
      scale={0.9}
      hoverStyle={{ scale: 0.925 }}
      pressStyle={{ scale: 0.875 }}
    >
      <Card.Header padded>
        <H2>Weather Update</H2>
        <Paragraph theme="alt2">3 Day Forecast</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$12" onPress={()=>{}}>
          <Ionicons name="refresh" size={20} />
        </Button>
      </Card.Footer>
    </Card>
  );
}

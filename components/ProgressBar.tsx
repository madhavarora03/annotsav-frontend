import { Paragraph, Progress, XStack, YStack, useTheme } from "tamagui";
export default function ProgressBar() {
  const theme = useTheme();
  return (
    <Progress
      value={60}
      style={{
        backgroundColor: theme.green5.get(),
      }}
    >
      <Progress.Indicator
        animation={[
          "quick",
          {
            transform: {
              overshootClamping: true,
            },
          },
        ]}
        backgroundColor="$green10"
      />
    </Progress>
  );
}

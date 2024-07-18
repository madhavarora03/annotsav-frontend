import { Progress, useTheme } from "tamagui";
export default function ProgressBar({ val = 0 }) {
  const theme = useTheme();
  return (
    <Progress
      value={val}
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

const articles = [
  {
    summary:
      "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and max, or between 0 and 1 if max is omitted. If there is no value attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.",
    sentiment: 0.5,
    credebility: 0.4,
    NSFW: 0.1,
    aiGenerated: 0.2,
  },
];

export default articles;

export const newsAnalysis = {
  nsfw_classification: [
    {
      label: "NSFW",
      score: 0.8880352973937988,
    },
    {
      label: "SFW",
      score: 0.11196471750736237,
    },
  ],

  prediction: {
    prediction: 1,
  },

  sentiment_analysis: [
    {
      label: "negative",
      score: 0.5539623498916626,
    },
    {
      label: "positive",
      score: 0.4458857774734497,
    },
    {
      label: "neutral",
      score: 0.00015186854579951614,
    },
  ],
  summary:
    "Adam, as.keras pocket speech suggests assumption about code is typically typically considered parameters typically dev test enhancing movement trend tends usually requires schedules full-freeware",
};

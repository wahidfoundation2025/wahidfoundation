// Minimum donation per frequency (shared by the donate page and the
// project-details donation form). A project may set a lower minDonationAmount
// (e.g. a Rs.1 test project), in which case the lower value is honoured.
export const FREQUENCY_MIN = {
  "One-Time": 50,
  Weekly: 20,
  Monthly: 100,
  Yearly: 365,
};

export const getMinAmount = (frequency, projectMin) => {
  const freqMin = FREQUENCY_MIN[frequency] ?? 50;
  return projectMin != null ? Math.min(freqMin, projectMin) : freqMin;
};

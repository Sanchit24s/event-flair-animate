// Namah Events' Google reviews, copied word for word from the business listing
// (https://maps.google.com/?cid=14891251003118886206) on 19 October 2026.
// Nothing here is written by us. Update this file when new reviews come in;
// the rating and count are computed from it.

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
}

export const GOOGLE_REVIEWS_URL = "https://maps.google.com/?cid=14891251003118886206";
export const GOOGLE_WRITE_REVIEW_URL = "https://g.page/r/CT6dFN7jWajOEBM/review";

export const googleReviews: GoogleReview[] = [
  {
    author: "Grishma Mehta",
    rating: 5,
    text:
      "Excellent experience with Namah Events for our corporate gathering.\nWe chose Namah Events based on a strong reference from one of our colleagues, with the trust that we would receive professional and reliable service — and they lived up to that expectation. There were initial delays in timeline management during the early phase of execution, but the team quickly regrouped, took ownership and ensured everything was back on track. By the end, they successfully met the final deadline without compromising on quality.\n\nThe staging, lighting, décor and overall coordination were handled with precision, and their on-ground team was very responsive and supportive. We also appreciated how calmly they handled last-minute changes while maintaining a positive attitude throughout.\n\nOverall, a well-managed and impactful corporate event. Thank you, Namah Events — looking forward to future collaborations.\n\nThanks,\nMarvel Decor Ltd.",
  },
  {
    author: "rutik shah",
    rating: 4,
    text:
      "Full of Creativity and respect the budget with great services.Everything was planned so prefect. They have the best team and professional people who understands the briefing and do your work at convenience. They are active throughout the day and perform their duties promptly.We highly recommend this Event planner to your friends and family.",
  },
  {
    author: "Palak Hirani",
    rating: 5,
    text:
      "Jimmy and the entire team of Namah events are awesome and dedicated to bringing your vision of a perfect event to life. They help create classic and timeless memories which I will cherish forever.",
  },
  { author: "Rohit Debanath", rating: 5, text: "They are the true experts in organising getting the best outcome for any event!!!" },
  { author: "devendra mane", rating: 5, text: "Best event management company,after working with a lot of event companies." },
  { author: "Neeta shah Shah", rating: 5, text: "Creative team. One of the best event organised all the in Rajasthan. Wonderful experience." },
  {
    author: "Swati Shah",
    rating: 5,
    text:
      "Truly you give your 100% for all kinds of events ... u always been economical, good listener and always helpful\nWish u good luck for all ur upcoming future events @jimish shah😊",
  },
  { author: "Sonal Chougule", rating: 5, text: "Wonderful team and arrangements. Cost effective. Can refer anytime to anyone" },
  { author: "rushabh bheda", rating: 5, text: "It was really nice working with Namah Events.... Always a friendly person and continues work comes from him" },
  { author: "Akruti Panani", rating: 5, text: "Amazing decor!!!! Everything just goes perfect with the client requirements!!!! ❤️" },
  { author: "Akshat Mehta", rating: 5, text: "The management and decors done by the team is exceptional" },
  { author: "JC SHAH", rating: 5, text: "It's good event" },
  { author: "SHEETAL DANI", rating: 5, text: "Very nice experience\nWorth it" },
  { author: "S S", rating: 5, text: "It was awesome experience 😀" },
  { author: "Sarika Shah", rating: 5, text: "Just perfect" },
  { author: "Nimisha lakhani", rating: 5, text: "Gud team 🎉" },
  // star ratings left without a written review
  { author: "Aastha Ramnani", rating: 5, text: "" },
  { author: "45 FY- BFM Daivik", rating: 5, text: "" },
  { author: "Hitesh Mehta", rating: 5, text: "" },
  { author: "Kartik Shah", rating: 5, text: "" },
  { author: "Tarun Madhani", rating: 5, text: "" },
];

export const reviewCount = googleReviews.length;
export const averageRating =
  Math.round((googleReviews.reduce((s, r) => s + r.rating, 0) / googleReviews.length) * 10) / 10;

export const initials = (name: string) =>
  name
    .replace(/[^A-Za-z ]/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "★";

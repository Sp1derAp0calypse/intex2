import FaqItem from "./FaqItem";

const faqData = [
  {
    question: "What is CineNiche?",
    answer:
      "CineNiche is your go-to platform to discover curated, rare, and independent films.",
  },
  {
    question: "How much does CineNiche cost?",
    answer: "Plans start at $7.99/month with no commitment required.",
  },
  {
    question: "Where can I watch?",
    answer: "Anywhere! Use your TV, phone, tablet, or web browser.",
  },
  {
    question: "How do I cancel?",
    answer: "Cancel anytime through your account settings in just two clicks.",
  },
];

function FaqList() {
  return (
    <div className="faq-wrapper">
      {faqData.map((faq, index) => (
        <FaqItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}

export default FaqList;

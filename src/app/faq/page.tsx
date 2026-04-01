import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "FAQ",
  description: "Temukan jawaban atas pertanyaan umum seputar GameForSmart.",
};

const faqs = [
  {
    id: 1,
    question: "How we can buy and invest token?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 2,
    question: "What is a video game genre?",
    answer:
      "The gaming world never sleeps, and neither do we. Stay tuned for more breaking news reviews and insights into the gaming industry. Whether you're a casual gamer or a dedicated enthusiast",
  },
  {
    id: 3,
    question: "How can I improve my gaming skills?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 4,
    question: "Are there any career opportunities in the gaming industry?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 5,
    question: "How can I get Matic to pay for the Network Fee (gas)?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    id: 6,
    question: "Can I leave a tournament after it begins?",
    answer:
      "Molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main
        className="main-container container-fluid d-flex align-items-start pt-sm-20 pt-15 pb-20 px-0 position-relative"
        style={{ overflow: "visible" }}
      >
        <Sidebar />
        <article className="main-content mt-lg-10 mt-6">
          <section className="faq-section pb-120">
            <div className="container-fluid px-lg-15 px-md-10 px-6">
              <div className="mb-10">
                <Breadcrumbs />
              </div>
              <div className="row">
                <div className="col-12 mb-lg-15 mb-10">
                  <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                    Faq
                  </h2>
                </div>
              </div>
              <div className="container">
                <div className="row g-6">
                  <div className="col-lg-6 px-sm-3 px-0">
                    <div className="accordion-section faq-accordion d-grid gap-6">
                      {faqs.slice(0, 3).map((faq) => (
                        <div
                          key={faq.id}
                          className="accordion-single p-sm-5 p-3 bgn-4 rounded"
                        >
                          <h5 className="acc-header-area">
                            <button
                              className="accordion-btn text-start position-relative p-0 w-100 pe-7 fs-five fw-medium"
                              type="button"
                            >
                              {faq.question}
                            </button>
                          </h5>
                          <div className="acc-content-area d-block">
                            <div className="content-body mt-lg-6 mt-4">
                              <p className="tcn-6">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-6 px-sm-3 px-0">
                    <div className="accordion-section faq-accordion d-grid gap-6">
                      {faqs.slice(3, 6).map((faq) => (
                        <div
                          key={faq.id}
                          className="accordion-single p-sm-5 p-3 bgn-4 rounded"
                        >
                          <h5 className="acc-header-area">
                            <button
                              className="accordion-btn text-start position-relative p-0 w-100 pe-7 fs-five fw-medium"
                              type="button"
                            >
                              {faq.question}
                            </button>
                          </h5>
                          <div className="acc-content-area d-block">
                            <div className="content-body mt-lg-6 mt-4">
                              <p className="tcn-6">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

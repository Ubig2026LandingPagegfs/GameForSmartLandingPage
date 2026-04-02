import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import featuresRaw from "@/data/features.json";
import { Feature } from "@/data/types";

const features = featuresRaw as Feature[];

export default function FeaturesSection() {


  return (
    <section className="features-section pb-120 bgn-4">
      <div className="container-fluid pt-120">
        <div className="row justify-content-center mb-lg-15 mb-sm-10 mb-8">
          <div className="col-lg-6 text-center">
            <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
              Kenapa Memilih Kami?
            </h2>
            <p className="tcn-6 fs-lg mt-4">
              Platform belajar coding paling interaktif untuk mempersiapkan
              generasi digital masa depan.
            </p>
          </div>
        </div>
        <div className="row g-6">
          {features.map((feature) => (
            <div key={feature.id} className="col-xl-3 col-md-6">
              <Card
                className="feature-card p-xxl-10 p-6 bgn-4 rounded-5 text-center border-none bg-transparent"
                data-tilt
              >
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="feature-title tcn-1 cursor-scale growDown title-anim">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="feature-desc tcn-6 mb-0">{feature.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

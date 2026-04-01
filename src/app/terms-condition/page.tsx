import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
    title: 'Syarat & Ketentuan',
    description: 'Syarat dan ketentuan penggunaan platform GameForSmart.',
};

export default function TermsConditionPage() {
    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex align-items-start pt-sm-16 pt-12 pb-20 px-0 position-relative" style={{ overflow: "visible" }}>
                <Sidebar />
                <article className="main-content mt-lg-10">
                    <div className="container-fluid px-lg-15 px-md-10 px-6">
                        <div className="mb-10">
                            <Breadcrumbs />
                        </div>
                        <section className="terms-section pb-120">
                            <div className="row">
                                <div className="col-12 mb-10">
                                    <h1 className="display-four tcn-1 text-uppercase fw-bold">Syarat & Ketentuan</h1>
                                    <p className="tcn-6 mt-4">Terakhir diperbarui: 1 April 2026</p>
                                </div>
                                <div className="col-lg-10">
                                    <div className="terms-content tcn-1 fs-sm">
                                        <h3 className="text-white mt-8 mb-4">1. Penerimaan Ketentuan</h3>
                                        <p className="tcn-6 leading-relaxed mb-6">
                                            Dengan mengakses dan menggunakan platform GameForSmart, Anda setuju untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan bagian mana pun dari ketentuan ini, Anda tidak diperbolehkan untuk menggunakan layanan kami.
                                        </p>

                                        <h3 className="text-white mt-8 mb-4">2. Kelayakan Pengguna</h3>
                                        <p className="tcn-6 leading-relaxed mb-6">
                                            Layanan kami ditujukan untuk pelajar di seluruh Indonesia. Pendaftaran mungkin memerlukan verifikasi status pelajar untuk kompetisi tertentu. Pengguna di bawah umur harus mendapatkan izin dari orang tua atau wali.
                                        </p>

                                        <h3 className="text-white mt-8 mb-4">3. Akun Pengguna</h3>
                                        <p className="tcn-6 leading-relaxed mb-6">
                                            Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun dan kata sandi Anda. Anda setuju untuk menerima tanggung jawab atas semua aktivitas yang terjadi di bawah akun Anda.
                                        </p>

                                        <h3 className="text-white mt-8 mb-4">4. Aturan Kompetisi</h3>
                                        <p className="tcn-6 leading-relaxed mb-6">
                                            Setiap kompetisi atau turnamen memiliki aturan spesifik yang harus dipatuhi. Pelanggaran terhadap aturan kompetisi dapat mengakibatkan diskualifikasi dan pembekuan akun.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
}

import BaseNav from "@/components/BaseNav";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BaseNav />
      {children}
      <Footer />
    </>
  );
}

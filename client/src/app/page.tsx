import Image from "next/image";
import NavbarComponents from "@/components/Navbar";
import FooterComponents from "@/components/Footer";
import SliderHome from "@/components/SliderHome";

export default function Home() {
  return (
    <>
      <NavbarComponents />
      <main className="bg-[#edeef3] flex min-h-screen flex-col items-center justify-between">
        <SliderHome />
      </main>
      <FooterComponents />
    </>
  );
}

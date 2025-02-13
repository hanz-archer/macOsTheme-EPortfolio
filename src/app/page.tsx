import Image from "next/image";
import Terminal from "./components/Terminal";

export default function Home() {
  return (
  <main className="w-full h-screen bg-terminalBlack">
  <Terminal />
  </main>
  );
}


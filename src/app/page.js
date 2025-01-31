"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const sendEmail = async () => {
    setStatus("Sending...");

    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: email, full_name: name }),
    });

    const data = await res.json();
    setStatus(data.success ? "Email sent!" : "Error sending email");
  };

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Send an Email</h1>
      <input className="border p-2 mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={sendEmail}>Send</button>
      {status && <p className="mt-2">{status}</p>}
    </main>
  );
}
